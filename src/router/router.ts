import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    routes: [
      {
        path: '/',
        name: 'Main',
        component: async () => await import('../components/main-view.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: async () => await import('../components/about-page.vue')
      },
      {
        path: '/terms',
        name: 'Terms',
        component: async () => await import('../components/terms-page.vue')
      }
    ],
    mode: 'history'
  })
}
