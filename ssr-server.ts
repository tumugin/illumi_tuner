import { BundleRenderer, createBundleRenderer } from 'vue-server-renderer'
import webpack from 'webpack'
import webpackConf from './build/webpack.conf'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

let renderer: BundleRenderer | null = null
const environment = process.env.NODE_ENV || 'development'

function setRenderer(serverDistDir: string, clientDistDir: string) {
  renderer = createBundleRenderer(path.join(__dirname, serverDistDir, 'vue-ssr-server-bundle.json'), {
    runInNewContext: false,
    template: fs.readFileSync(path.join(__dirname, 'public', 'index.ssr.template.html'), 'utf-8'),
    clientManifest: JSON.parse(
      fs.readFileSync(path.join(__dirname, clientDistDir, 'vue-ssr-client-manifest.json'), 'utf-8')
    )
  })
}

if (environment === 'development') {
  const builder = webpack(
    webpackConf({}, { mode: 'development' }).map(conf => {
      const newConfig: webpack.Configuration = { ...conf, mode: 'development' }
      return newConfig
    })
  )
  builder.watch({}, err => {
    if (err) {
      console.error(err)
      return
    }
    try {
      setRenderer('dist-server', 'dist')
      console.log('[LOG] updated renderer.')
    } catch {}
  })
} else {
  setRenderer('prod-server', 'prod')
}

const server = express()
// 静的ファイル(JSやCSS)
server.use('/static', express.static(path.join(__dirname, environment === 'development' ? 'dist' : 'prod', 'static')))
// Vueレンダラー
server.get('*', (req, res) => {
  const context = { url: req.url }
  renderer?.renderToString(context, (err, html) => {
    if (err) {
      console.error(err)
      res.status(((err as unknown) as { code: number }).code || 500).end()
    }
    res.end(html)
  })
})

server.listen(8080)
