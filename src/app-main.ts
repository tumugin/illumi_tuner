import Vue from 'vue'
import App from './app.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueObserveVisibility from 'vue-observe-visibility'
import VueScrollTo from 'vue-scrollto'
import VueCompositionApi from '@vue/composition-api'
import titleMixin from './mixins/title-mixin'
import { createRouter } from './router/router'
import createStore from './store/main-store'
import VueAnalytics from 'vue-analytics'

Vue.use(VueCompositionApi)
Vue.use(BootstrapVue)
Vue.use(VueObserveVisibility)
Vue.use(VueScrollTo)
Vue.mixin(titleMixin)

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
