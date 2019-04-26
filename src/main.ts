/* tslint:disable:no-unused-expression */
import approuter from './router/router'
import Vue from 'vue'
import App from './app.vue'
import store from './store/main-store'

// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: approuter,
  store,
  components: { App },
  template: '<App/>'
})
