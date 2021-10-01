import PenlightItem from 'src/components/penlight-item.vue'
import { text, color, withKnobs } from '@storybook/addon-knobs'
import PenlightColor from '../models/penlight-color'
import MockIdols from '../test/mock-idols'

export default {
  title: 'UI/PenlightItem',
  decorators: [withKnobs],
  component: PenlightItem,
}

export const Basic = () => ({
  components: { PenlightItem },
  props: {
    idols: {
      type: Array,
      default: () => MockIdols,
    },
    penlightColor: {
      default: new PenlightColor(color('colorCode', '#3A75BB'), text('colorName', 'ほげほげの色'), false),
    },
  },
  template: '<PenlightItem v-bind="$props"/>',
})
