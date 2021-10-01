import { boolean, withKnobs } from '@storybook/addon-knobs'
import LoadingView from '../components/loading-view.vue'

export default {
  title: 'UI/LoadingView',
  decorators: [withKnobs],
  component: LoadingView,
}

export const Basic = () => ({
  components: { LoadingView },
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
  template: '<LoadingView v-bind="$props"/>',
})
