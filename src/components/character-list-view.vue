<template>
  <div>
    <character-item
      v-for="item in characters"
      :character-name="item.name"
      :key="item.key"
      :checked="item.checked"
      @onCheckStateChanged="characterItemUpdateCheckedState(item, $event)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IllumiTunerVuexModule from '../store/illumi-tuner-vuex-module'
import CharacterItem from './character-item.vue'
// eslint-disable-next-line no-unused-vars
import INameAndColor from '../models/i-name-and-color'

const CharacterListView = Vue.extend({
  components: {
    'character-item': CharacterItem
  },
  computed: {
    characters() {
      return IllumiTunerVuexModule.imasCharacters
    }
  },
  async mounted() {
    await IllumiTunerVuexModule.fetchImasCharacters()
  },
  methods: {
    characterItemUpdateCheckedState(item: INameAndColor, state: boolean) {
      const updatedItem = Object.assign({}, item)
      updatedItem.checked = state
      IllumiTunerVuexModule.updateImasCharacter(updatedItem, item.key)
    }
  }
})
export default CharacterListView
</script>

<style scoped module></style>
