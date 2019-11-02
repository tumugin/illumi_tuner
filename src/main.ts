import approuter from './router/router'
import Vue from 'vue'
import App from './app.vue'
import store from './store/main-store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueObserveVisibility from 'vue-observe-visibility'
import VueScrollTo from 'vue-scrollto'
// @ts-ignore
import VueAnalytics from 'vue-analytics'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
Vue.use(BootstrapVue)
Vue.use(VueObserveVisibility)
Vue.use(VueScrollTo)

const isProduction = process.env.NODE_ENV === 'production'
if (!isProduction) {
  console.log('App is running in debug mode!!')
}
Vue.use(VueAnalytics, {
  id: 'UA-139621116-1',
  debug: {
    sendHitTask: isProduction
  },
  router: approuter
})

const app = new Vue({
  router: approuter,
  store,
  components: { App },
  render(h) {
    return h(App)
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const mountPoint = document.getElementById('root')
  if (mountPoint) {
    app.$mount(mountPoint)
  }
})
