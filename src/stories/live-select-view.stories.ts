import LiveSelectView from 'src/components/live-select-view.vue'
import { boolean, object, withKnobs } from '@storybook/addon-knobs'
import MockLives from '../test/mock-lives'

export default {
  title: 'UI/LiveSelectView',
  decorators: [withKnobs],
  component: LiveSelectView,
}

export const Basic = () => ({
  components: { LiveSelectView },
  props: {
    isMobile: {
      type: Boolean,
      default: boolean('isMobile', false),
    },
    liveList: {
      type: Array,
      default: () => object('liveList', MockLives),
    },
  },
  template: '<LiveSelectView v-bind="$props"/>',
})
