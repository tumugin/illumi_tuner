import Vue from 'vue'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    title?: string | (() => string)
    ssrContext?: {
      title: string
    }
  }
}

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
    if (title && vue.$options.ssrContext) {
      vue.$options.ssrContext.title = title
    }
  }
}

const clientTitleMixin = {
  mounted() {
    const vue = (this as unknown) as Vue
    const title = getTitle(vue)
    if (title) {
      document.title = title
    }
  }
}

const titleMixin = process.env.VUE_ENV === 'server' ? serverTitleMixin : clientTitleMixin
export default titleMixin
