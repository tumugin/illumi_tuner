<template>
  <CharacterItem
    :character-name="characterName"
    :character-color="characterColor"
    :character-title="characterTitle"
    :checked="checked"
  />
</template>

<script lang="ts">
import Vue, { ComponentOptions } from 'vue'
import CharacterItem from 'src/components/character-item.vue'
import { storiesOf } from '@storybook/vue'
import { boolean, color, text } from '@storybook/addon-knobs'
import MockIdols from '../test/mock-idols'

const CharacterItemStories = {
  components: {
    CharacterItem
  }
} as Vue.Component
export default CharacterItemStories

storiesOf('Character', module).add(
  'CharacterItem',
  () =>
    ({
      ...CharacterItemStories,
      props: {
        characterName: {
          type: String,
          default: text('characterName', MockIdols[0].name)
        },
        characterColor: {
          type: String,
          default: color('characterColor', MockIdols[0].colorHEX)
        },
        characterTitle: {
          type: String,
          default: text('characterTitle', MockIdols[0].title)
        },
        checked: {
          type: Boolean,
          default: boolean('checked', false)
        }
      }
    } as ComponentOptions<Vue>)
)
</script>

<style scoped></style>
