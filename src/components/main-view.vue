<template>
  <b-container>
    <character-list-view />
    <b-alert show dismissible class="alertStyle" variant="danger">
      以下のペンライト色の表示は自動的に色差を計算した結果を元に表示しています。実際の色と異なる場合があるかもしれないのでご注意ください。
    </b-alert>
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

const MainView = Vue.extend({
  data() {
    return {
      isPenlightVisible: false
    }
  },
  components: {
    CharacterListView,
    PenlightListView
  },
  async mounted() {
    await IllumiTunerVuexModule.fetchImasCharacters()
  },
  computed: {
    isAnyIdolSelected() {
      return IllumiTunerVuexModule.imasCharacters.filter(item => item.checked).length > 0
    },
    isTouch() {
      return 'ontouchstart' in window || navigator.maxTouchPoints
    }
  },
  methods: {
    onPenlightVisible(isVisible: boolean) {
      this.$data.isPenlightVisible = isVisible
    },
    moveToPenlightView() {
      this.$scrollTo('#penlightListView', 1000)
    }
  }
})
export default MainView
</script>

<style lang="scss" scoped>
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
