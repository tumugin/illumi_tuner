<template>
  <PenlightItem :penlight-color="penlightColor" :idols="idols" />
</template>

<script lang="ts">
import Vue, { ComponentOptions } from 'vue'
import PenlightItem from 'src/components/penlight-item.vue'
import { text, color } from '@storybook/addon-knobs'
import PenlightColor from '../models/penlight-color'
import MockIdols from '../test/mock-idols'

import { storiesOf } from '@storybook/vue'

const PenlightItemStories = {
  components: {
    PenlightItem
  },
  computed: {
    penlightColor() {
      return new PenlightColor(this.colorCode as string, this.colorName as string, false)
    }
  }
} as Vue.Component
export default PenlightItemStories

storiesOf('Penlight', module).add(
  'PenlightItem',
  () =>
    ({
      ...PenlightItemStories,
      props: {
        colorCode: {
          type: String,
          default: color('colorCode', '#3A75BB')
        },
        colorName: {
          type: String,
          default: text('colorName', 'ほげほげの色')
        },
        idols: {
          type: Array,
          default: MockIdols
        }
      }
    } as ComponentOptions<Vue>)
)
</script>

<style scoped></style>
