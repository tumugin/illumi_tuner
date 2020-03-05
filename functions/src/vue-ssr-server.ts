import { BundleRenderer, createBundleRenderer } from 'vue-server-renderer'
import * as fs from 'fs'
import * as path from 'path'
import * as functions from 'firebase-functions'

let renderer: BundleRenderer | undefined = undefined
function lazyRenderer() {
  if (!renderer) {
    renderer = createBundleRenderer(
      JSON.parse(fs.readFileSync(path.join(__dirname, 'vue-ssr-server-bundle.json'), 'utf-8')),
      {
        runInNewContext: false,
        template: fs.readFileSync(path.join(__dirname, 'index.ssr.template.html'), 'utf-8'),
        clientManifest: JSON.parse(fs.readFileSync(path.join(__dirname, 'vue-ssr-client-manifest.json'), 'utf-8'))
      }
    )
  }
  return renderer
}

export const vueSSRServer = functions.https.onRequest(async (request, response) => {
  const context = { url: request.url }
  try {
    const html = await lazyRenderer().renderToString(context)
    response.send(html)
  } catch (ex) {
    if (ex.code && typeof ex.code === 'number') {
      response.status(ex.code)
      response.send()
      return
    }
    console.error(ex)
    response.status(500)
    response.send('Internal Server Error.')
  }
})
