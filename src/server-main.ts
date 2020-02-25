import createApp from './app-main'

export default async function context({ url }: { url: string }) {
  const { app, router } = createApp()
  const result = await router.push(url)
  if (result.matched.length === 0) {
    throw { code: 404 }
  }
  return app
}
