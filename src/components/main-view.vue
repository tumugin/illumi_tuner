<template>
  <b-container>
    <live-select-view :live-list="liveList" class="buttonMargin" @live-selected="liveSelected" />
    <character-list-view />
    <div class="alertStyle" v-if="penlightColorAlert || !isAnyIdolSelected">
      <b-alert dismissible class="alertStyle" variant="danger" v-model="penlightColorAlert">
        以下のペンライト色の表示は自動的に色差を計算した結果を元に表示しています。実際の色と異なる場合があるかもしれないのでご注意ください。
      </b-alert>
      <b-alert :show="!isAnyIdolSelected">
        まだどのアイドルも選択されてません！誰か一人でも選択してみましょう
      </b-alert>
    </div>
    <penlight-list-view :style="{ marginTop: '20px' }" v-observe-visibility="onPenlightVisible" id="penlightListView" />
    <div class="jumpToDown" :class="{ visible: !isPenlightVisible && isAnyIdolSelected }" @click="moveToPenlightView">
      {{ isTouch ? 'タップ' : 'クリック' }}して色プレビューを表示する
    </div>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import CharacterListView from './character-list-view.vue'
import PenlightListView from './penlight-list-view.vue'
import IllumiTunerVuexModule from '../store/illumi-tuner-vuex-module'
import LocalStorageUtils from '../utils/local-storage-utils'
import LiveSelectView from './live-select-view.vue'
import ILive from '../models/i-live'

const MainView = Vue.extend({
  data() {
    return {
      isPenlightVisible: false,
      penlightColorAlert: LocalStorageUtils.getLocalStorageData('AlertMesgColorMightBeWrong', true, 'boolean')
    }
  },
  components: {
    CharacterListView,
    PenlightListView,
    LiveSelectView
  },
  async mounted() {
    if (IllumiTunerVuexModule.imasCharacters.length === 0) {
      await IllumiTunerVuexModule.fetchImasCharacters()
    }
    await IllumiTunerVuexModule.fetchImasLiveList()
  },
  computed: {
    isAnyIdolSelected() {
      return IllumiTunerVuexModule.imasCharacters.filter(item => item.checked).length > 0
    },
    isTouch() {
      return 'ontouchstart' in window || navigator.maxTouchPoints
    },
    liveList() {
      return IllumiTunerVuexModule.imasLiveList
    }
  },
  methods: {
    onPenlightVisible(isVisible: boolean) {
      this.$data.isPenlightVisible = isVisible
    },
    moveToPenlightView() {
      this.$scrollTo('#penlightListView', 1000)
    },
    liveSelected(live: ILive) {
      IllumiTunerVuexModule.imasCharacters.forEach(item => {
        const updatedItem = Object.assign({}, item)
        updatedItem.checked = false
        IllumiTunerVuexModule.updateImasCharacter(updatedItem)
      })
      const selectedIdol = IllumiTunerVuexModule.imasCharacters.filter(item => live.liveActor.includes(item.actor))
      selectedIdol.forEach(item => {
        const updatedItem = Object.assign({}, item)
        updatedItem.checked = true
        IllumiTunerVuexModule.updateImasCharacter(updatedItem)
      })
      this.moveToPenlightView()
    }
  },
  watch: {
    penlightColorAlert(value: boolean) {
      LocalStorageUtils.setLocalStorageData('AlertMesgColorMightBeWrong', value)
    }
  }
})
export default MainView
</script>

<style lang="scss" scoped>
.buttonMargin {
  margin-bottom: 5px;
}
.alertStyle {
  margin-top: 15px;
}
.jumpToDown {
  display: none;
  position: sticky;
  bottom: 0;
  background-color: dimgray;
  color: white;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  cursor: pointer;
  &.visible {
    display: block;
  }
}
</style>
