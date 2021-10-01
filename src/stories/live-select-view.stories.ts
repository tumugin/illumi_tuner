import LiveSelectView from 'src/components/live-select-view.vue'
import { boolean, object } from '@storybook/addon-knobs'
import MockLives from '../test/mock-lives'

export default {
  title: 'UI/LiveSelectView',
  component: LiveSelectView,
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
}
