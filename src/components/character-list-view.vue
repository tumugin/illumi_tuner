<template>
  <div>
    <CharacterItem v-for="item in characters" :character-name="item.name" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IllumiTunerVuexModule from '../store/illumi-tuner-vuex-module'
import CharacterItem from './character-item.vue'

const CharacterListView = Vue.extend({
  components: {
    CharacterItem: CharacterItem
  },
  computed: {
    characters: () => IllumiTunerVuexModule.imasCharacters
  },
  async mounted() {
    await IllumiTunerVuexModule.fetchImasCharacters()
  }
})
export default CharacterListView
</script>

<style scoped module></style>
