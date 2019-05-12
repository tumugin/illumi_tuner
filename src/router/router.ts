import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: async () => await require('../components/main-view.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: async () => await require('../components/about-page.vue')
    }
  ],
  mode: 'history'
})
