import createApp from './app-main'

export default async function context(context: { url: string; rendered?: () => void; state?: object }) {
  const { app, router, store } = createApp()
  const result = await router.push(context.url)
  if (result.matched.length === 0) {
    throw { code: 404 }
  }
  context.rendered = () => {
    context.state = store.state
  }
  await new Promise((resolve, reject) => {
    router.onReady(() => {
      resolve()
    }, reject)
  })
  return app
}
