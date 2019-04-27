<template>
  <div>
    <div>
      <input v-model="filterText" />
    </div>
    <div class="characterListView">
      <character-item
        v-for="item in characters"
        class="characterItem"
        :character-name="item.name"
        :character-title="item.title"
        :key="item.key"
        :checked="item.checked"
        :character-color="item.colorHEX"
        @onCheckStateChanged="characterItemUpdateCheckedState(item, $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IllumiTunerVuexModule from '../store/illumi-tuner-vuex-module'
import CharacterItem from './character-item.vue'
// eslint-disable-next-line no-unused-vars
import INameAndColor from '../models/i-name-and-color'

const CharacterListView = Vue.extend({
  data() {
    return {
      filterText: ''
    }
  },
  components: {
    CharacterItem
  },
  computed: {
    characters() {
      return IllumiTunerVuexModule.imasCharacters
        .sort((a, b) => a.title.localeCompare(b.title))
        .filter(item => item.name.includes(this.$data.filterText) || item.nameKana.includes(this.$data.filterText))
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

<style scoped lang="scss">
.characterListView {
  display: flex;
  flex-wrap: wrap;

  .characterItem {
    margin: 5px;
  }
}
</style>
