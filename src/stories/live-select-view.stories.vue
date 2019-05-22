<template>
  <LiveSelectView :is-mobile="isMobile" :live-list="liveList" ref="button" />
</template>

<script lang="ts">
import Vue, { ComponentOptions } from 'vue'
import { storiesOf } from '@storybook/vue'
import LiveSelectView from 'src/components/live-select-view.vue'
import { boolean, object } from '@storybook/addon-knobs'
import MockLives from '../test/mock-lives'

const LiveSelectViewStories = {
  components: {
    LiveSelectView
  }
} as Vue.Component
export default LiveSelectViewStories
const story = storiesOf('UI', module)
story.add(
  'LiveSelectView',
  () =>
    ({
      ...LiveSelectViewStories,
      props: {
        isMobile: {
          type: Boolean,
          default: boolean('isMobile', false)
        },
        liveList: {
          type: Array,
          default: () => object('liveList', MockLives)
        }
      }
    } as ComponentOptions<Vue>)
)
story.add(
  'LiveSelectView[PC][HasAnimation]',
  () =>
    ({
      ...LiveSelectViewStories,
      props: {
        isMobile: {
          type: Boolean,
          default: boolean('isMobile', false)
        },
        liveList: {
          type: Array,
          default: () => object('liveList', MockLives)
        }
      },
      mounted() {
        Vue.nextTick(() => this.$refs.button.$el.querySelector('button').click())
      }
    } as ComponentOptions<Vue>)
)
story.add(
  'LiveSelectView[Mobile][HasAnimation]',
  () =>
    ({
      ...LiveSelectViewStories,
      props: {
        isMobile: {
          type: Boolean,
          default: boolean('isMobile', true)
        },
        liveList: {
          type: Array,
          default: () => object('liveList', MockLives)
        }
      },
      mounted() {
        Vue.nextTick(() => this.$refs.button.$el.querySelector('button').click())
      }
    } as ComponentOptions<Vue>)
)
</script>

<style scoped></style>
