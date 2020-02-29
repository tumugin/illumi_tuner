import * as functions from 'firebase-functions'
import { createBundleRenderer } from 'vue-server-renderer'
import * as path from 'path'
import * as fs from 'fs'

const renderer = createBundleRenderer(
  JSON.parse(fs.readFileSync(path.join('.', 'dist', 'vue-ssr-server-bundle.json'), 'utf-8')),
  {
    runInNewContext: false,
    template: fs.readFileSync(path.join('.', 'dist', 'index.ssr.template.html'), 'utf-8'),
    clientManifest: JSON.parse(fs.readFileSync(path.join('.', 'dist', 'vue-ssr-client-manifest.json'), 'utf-8'))
  }
)

export const vueSSRServer = functions.https.onRequest(async (request, response) => {
  const context = { url: request.url }
  const html = await renderer.renderToString(context)
  response.send(html)
})
