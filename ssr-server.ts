import { createBundleRenderer } from 'vue-server-renderer'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

const renderer = createBundleRenderer(path.join(__dirname, 'dist-server/vue-ssr-server-bundle.json'), {
  runInNewContext: false,
  template: fs.readFileSync('./public/index.ssr.template.html', 'utf-8'),
  clientManifest: require('./dist/vue-ssr-client-manifest.json')
})

const server = express()
server.use('/*.js', express.static('dist'))
server.use('/*.js.map', express.static('dist'))
server.get('*', (req, res) => {
  const context = { url: req.url }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.error(err)
    }
    res.end(html)
  })
})

server.listen(8080)
