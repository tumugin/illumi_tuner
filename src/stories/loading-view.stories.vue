<template>
  <loading-view :is-visible="isVisible" :is-load-failed="isLoadFailed" />
</template>

<script lang="ts">
import Vue, { ComponentOptions } from 'vue'
import { storiesOf } from '@storybook/vue'
import { boolean } from '@storybook/addon-knobs'
import LoadingView from '../components/loading-view.vue'

const LoadingViewStories = {
  components: {
    LoadingView,
  },
} as Vue.Component
export default LoadingViewStories

storiesOf('UI', module).add('LoadingView', () => {
  return {
    ...LoadingViewStories,
    props: {
      isVisible: {
        type: Boolean,
        default: boolean('isVisible', false),
      },
      isLoadFailed: {
        type: Boolean,
        default: boolean('isLoadFailed', false),
      },
    },
  } as ComponentOptions<Vue>
})
</script>
