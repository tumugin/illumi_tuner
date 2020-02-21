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
      <b-button class="characterItem button" variant="outline-danger" @click="unselectAllButtonClicked">
        すべて選択解除
      </b-button>
      <b-button class="characterItem button" variant="outline-success" @click="selectAllButtonClicked">
        表示アイテムを<br />すべて選択
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

export default Vue.extend({
  name: 'CharacterListView',
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
      return IllumiTunerVuexModule(this.$store)
        .imasCharacters.sort((a, b) => a.nameKana.localeCompare(b.nameKana))
        .sort((a, b) => a.title.localeCompare(b.title))
        .filter(item => item.name.includes(this.$data.filterText) || item.nameKana.includes(this.$data.filterText))
        .filter(item => IllumiTunerVuexModule(this.$store).filterOffice.includes(item.title))
    },
    idolOfficeList() {
      return [...new Set(IllumiTunerVuexModule(this.$store).imasCharacters.map(item => item.title))]
    },
    filterOffice: {
      get() {
        return IllumiTunerVuexModule(this.$store).filterOffice
      },
      set(value: string[]) {
        IllumiTunerVuexModule(this.$store).setFilterOffice(value)
      }
    }
  },
  methods: {
    makeUpdatedCharacterByState(item: INameAndColor, state: boolean) {
      const updatedItem = Object.assign({}, item)
      updatedItem.checked = state
      return updatedItem
    },
    selectAllButtonClicked() {
      IllumiTunerVuexModule(this.$store).updateImasCharacters(
        this.characters.map(item => this.makeUpdatedCharacterByState(item, true))
      )
    },
    unselectAllButtonClicked() {
      IllumiTunerVuexModule(this.$store).updateImasCharacters(
        this.characters.map(item => this.makeUpdatedCharacterByState(item, false))
      )
    }
  }
})
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
