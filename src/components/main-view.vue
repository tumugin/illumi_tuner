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
      ここを選択して色プレビューを表示する
    </div>
    <loading-view v-if="!$isServer" :is-visible="isLoading" :is-load-failed="isLoadFailed" />
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
import LoadingView from '../components/loading-view.vue'

export default Vue.extend({
  name: 'MainView',
  data() {
    return {
      isPenlightVisible: false,
      penlightColorAlert: LocalStorageUtils.getLocalStorageData('AlertMesgColorMightBeWrong', true, 'boolean'),
      isLoading: false,
      isLoadFailed: false
    }
  },
  components: {
    CharacterListView,
    PenlightListView,
    LiveSelectView,
    LoadingView
  },
  async serverPrefetch() {
    await IllumiTunerVuexModule(this.$store).fetchImasCharacters()
    await IllumiTunerVuexModule(this.$store).fetchImasLiveList()
  },
  async created() {
    try {
      if (
        IllumiTunerVuexModule(this.$store).imasCharacters.length === 0 ||
        IllumiTunerVuexModule(this.$store).imasLiveList.length === 0
      ) {
        this.isLoading = true
        await IllumiTunerVuexModule(this.$store).fetchImasCharacters()
        await IllumiTunerVuexModule(this.$store).fetchImasLiveList()
        this.isLoading = false
      }
    } catch {
      this.isLoadFailed = false
    }
  },
  computed: {
    isAnyIdolSelected() {
      return IllumiTunerVuexModule(this.$store).imasCharacters.filter(item => item.checked).length > 0
    },
    liveList() {
      return IllumiTunerVuexModule(this.$store).imasLiveList
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
      IllumiTunerVuexModule(this.$store).imasCharacters.forEach(item => {
        const updatedItem = Object.assign({}, item)
        updatedItem.checked = false
        IllumiTunerVuexModule(this.$store).updateImasCharacter(updatedItem)
      })
      const selectedIdol = IllumiTunerVuexModule(this.$store).imasCharacters.filter(item =>
        live.liveActor.includes(item.actor)
      )
      selectedIdol.forEach(item => {
        const updatedItem = Object.assign({}, item)
        updatedItem.checked = true
        IllumiTunerVuexModule(this.$store).updateImasCharacter(updatedItem)
      })
      this.moveToPenlightView()
    }
  },
  watch: {
    penlightColorAlert(value: boolean) {
      LocalStorageUtils.setLocalStorageData('AlertMesgColorMightBeWrong', value)
    }
  },
  title: 'IllumiTuner β'
})
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
  filter: drop-shadow(0 0 0.7rem white);
  font-weight: bold;

  &.visible {
    display: block;
    animation-name: fadeIn;
    animation-duration: 0.3s;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
