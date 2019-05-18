<template>
  <div>
    <div>
      <b-form-input placeholder="キャラ名を入力して検索" v-model="filterText" />
      <b-form-checkbox-group v-model="filterOffice">
        <b-form-checkbox v-for="(officeName, index) in idolOfficeList" :key="index" :value="officeName">
          {{ officeName }}
        </b-form-checkbox>
      </b-form-checkbox-group>
    </div>
    <div class="characterListView">
      <b-button class="characterItem button" variant="outline-danger" @click="unselectAllButtonClicked()">
        すべて選択解除
      </b-button>
      <b-button class="characterItem button" variant="outline-success" @click="selectAllButtonClicked()">
        すべて選択
      </b-button>
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
        .sort((a, b) => a.nameKana.localeCompare(b.nameKana))
        .sort((a, b) => a.title.localeCompare(b.title))
        .filter(item => item.name.includes(this.$data.filterText) || item.nameKana.includes(this.$data.filterText))
        .filter(item => (IllumiTunerVuexModule.filterOffice).includes(item.title))
    },
    idolOfficeList() {
      return [...new Set(IllumiTunerVuexModule.imasCharacters.map(item => item.title))]
    },
    filterOffice: {
      get() {
        return IllumiTunerVuexModule.filterOffice
      },
      set(value: string[]) {
        IllumiTunerVuexModule.setFilterOffice(value)
      }
    }
  },
  watch: {
    idolOfficeList: function(value: Array<string>, oldValue: Array<string>) {
      // infinity update loop対策
      if (JSON.stringify(value) !== JSON.stringify(oldValue)) {
        IllumiTunerVuexModule.setFilterOffice(value)
      }
    }
  },
  methods: {
    characterItemUpdateCheckedState(item: INameAndColor, state: boolean) {
      const updatedItem = Object.assign({}, item)
      updatedItem.checked = state
      IllumiTunerVuexModule.updateImasCharacter(updatedItem)
    },
    selectAllButtonClicked() {
      this.characters.forEach(item => this.characterItemUpdateCheckedState(item, true))
    },
    unselectAllButtonClicked() {
      this.characters.forEach(item => this.characterItemUpdateCheckedState(item, false))
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
    flex: 1;
  }
  .button {
    min-width: 120px;
    max-width: 180px;
    min-height: 70px;
  }
}
</style>
