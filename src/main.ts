import createApp from './app-main'
import { RootState } from './store/main-store'

declare global {
  interface Window {
    __INITIAL_STATE__?: RootState
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const mountPoint = document.getElementById('root')
  if (mountPoint) {
    const { app, store } = createApp()
    if (window.__INITIAL_STATE__) {
      store.replaceState(window.__INITIAL_STATE__)
    }
    app.$mount(mountPoint)
  }
})
