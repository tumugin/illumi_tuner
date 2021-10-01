import CharacterItem from 'src/components/character-item.vue'
import { boolean, color, text, withKnobs } from '@storybook/addon-knobs'
import MockIdols from '../test/mock-idols'

export default {
  title: 'Components/CharacterItem',
  decorators: [withKnobs],
}

export const Basic = () => ({
  components: { CharacterItem },
  props: {
    characterName: {
      type: String,
      default: text('characterName', MockIdols[0].name),
    },
    characterColor: {
      type: String,
      default: color('characterColor', MockIdols[0].colorHEX),
    },
    characterTitle: {
      type: String,
      default: text('characterTitle', MockIdols[0].title),
    },
    checked: {
      type: Boolean,
      default: boolean('checked', false),
    },
  },
  template: '<CharacterItem v-bind="$props"/>',
})
