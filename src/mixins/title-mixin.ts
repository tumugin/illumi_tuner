import Vue from 'vue'

declare module 'vue/types/options' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ComponentOptions<V extends Vue> {
    title?: string | (() => string)
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
    const vue = this as unknown as Vue
    const title = getTitle(vue)
    if (vue.$ssrContext && title) {
      vue.$ssrContext.title = title
    }
  },
}

const clientTitleMixin = {
  mounted() {
    const vue = this as unknown as Vue
    const title = getTitle(vue)
    if (title) {
      document.title = title
    }
  },
}

const titleMixin = IS_SERVER ? serverTitleMixin : clientTitleMixin
export default titleMixin
