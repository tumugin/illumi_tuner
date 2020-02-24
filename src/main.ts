import createApp from './app-main'

document.addEventListener('DOMContentLoaded', () => {
  const mountPoint = document.getElementById('root')
  if (mountPoint) {
    const { app } = createApp()
    app.$mount(mountPoint)
  }
})
