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

Vue.use(BootstrapVue)
Vue.use(VueObserveVisibility)
Vue.use(VueScrollTo)

// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: approuter,
  store,
  components: { App },
  template: '<App/>'
})
