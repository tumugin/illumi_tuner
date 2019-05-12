import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: async () => await import('../components/main-view.vue'),
      meta: {
        title: 'IllumiTuner β'
      }
    },
    {
      path: '/about',
      name: 'About',
      component: async () => await import('../components/about-page.vue'),
      meta: {
        title: 'これなあに - IllumiTuner'
      }
    },
    {
      path: '/terms',
      name: 'Terms',
      component: async () => await import('../components/terms-page.vue'),
      meta: {
        title: '利用規約 - IllumiTuner'
      }
    }
  ],
  mode: 'history'
})

router.afterEach(to => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'IllumiTuner'
  }
})

export default router
