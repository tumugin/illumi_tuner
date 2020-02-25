import Vue from 'vue'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    title?: string | (() => string)
  }
}

const defaultTitle = ''

function getTitle(vm: Vue): string | undefined {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function' ? title.call(vm) : title
  }
  return undefined
}

const serverTitleMixin = {
  created() {
    const vue = (this as unknown) as Vue
    const title = getTitle(vue)
    if (vue.$ssrContext) {
      vue.$ssrContext.title = title || defaultTitle
    }
  }
}

const clientTitleMixin = {
  mounted() {
    const vue = (this as unknown) as Vue
    const title = getTitle(vue)
    document.title = title || defaultTitle
  }
}

const titleMixin = process.env.VUE_ENV === 'server' ? serverTitleMixin : clientTitleMixin
export default titleMixin
