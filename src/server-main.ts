import createApp from './app-main'

export default function context() {
  const { app } = createApp()
  return app
}
