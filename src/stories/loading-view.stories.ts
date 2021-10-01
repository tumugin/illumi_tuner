import { boolean } from '@storybook/addon-knobs'
import LoadingView from '../components/loading-view.vue'

export default {
  title: 'UI/LoadingView',
  component: LoadingView,
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
}
