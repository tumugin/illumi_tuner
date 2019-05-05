/* tslint:disable:no-unused-expression */
import approuter from './router/router'
import Vue from 'vue'
import App from './app.vue'
import store from './store/main-store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueObserveVisibility from 'vue-observe-visibility'
import * as VueScrollTo from 'vue-scrollto'
// @ts-ignore
import VueAnalytics from 'vue-analytics'

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

// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: approuter,
  store,
  components: { App },
  template: '<App/>'
})
