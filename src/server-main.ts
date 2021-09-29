import createApp from './app-main'
import { RootState } from './store/main-store'

export default async function context(context: {
  url: string
  rendered?: () => void
  state?: RootState
  title?: string
}) {
  const { app, router, store } = createApp()
  const result = await router.push(context.url)
  if (result.matched.length === 0) {
    throw { code: 404 }
  }
  context.rendered = () => {
    context.state = store.state
  }
  await new Promise<void>((resolve, reject) => {
    router.onReady(() => {
      resolve()
    }, reject)
  })
  if (!context.title) {
    // 何も無いと落ちるので
    context.title = ''
  }
  return app
}
