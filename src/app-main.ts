import Vue from 'vue'
import App from './app.vue'
import { createRouter } from './router/router'
import createStore from './store/main-store'
import VueAnalytics from 'vue-analytics'
import './initialize'

export default function createApp() {
  const router = createRouter()
  const store = createStore()
  Vue.use(VueAnalytics, {
    id: 'UA-139621116-1',
    debug: {
      sendHitTask: IS_PRODUCTION,
    },
    router: router,
  })
  const app = new Vue({
    router,
    store,
    components: { App },
    render(h) {
      return h(App)
    },
  })
  return { app, router, store }
}
