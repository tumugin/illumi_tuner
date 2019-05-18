<template>
  <div>
    <!--デスクトップ用公演選択画面-->
    <b-dropdown text="公演を選択する" v-if="!isMobile">
      <template v-for="(live, index) in liveList">
        <b-dropdown-item :key="index" @click="selectLive(live)">
          <b-badge variant="primary">
            {{ formatDate(live.liveDate, 'YYYY/MM/DD') }}
          </b-badge>
          <b-badge variant="dark">
            {{ live.liveLocation }}
          </b-badge>
          <div>
            {{ live.liveName }}
          </div>
        </b-dropdown-item>
      </template>
    </b-dropdown>
    <!--モバイル用公演選択画面-->
    <b-button @click="openMobileModal" class="dropdown-toggle" v-else>
      公演を選択する
    </b-button>
    <!--モバイル用公演選択モーダル-->
    <b-modal :visible="showMobileModal" title="公演を選択してください" hide-footer @hidden="closeModal">
      <template v-for="(live, index) in liveList">
        <div :key="index" @click="selectLive(live)">
          <b-badge variant="primary">
            {{ formatDate(live.liveDate, 'YYYY/MM/DD') }}
          </b-badge>
          <b-badge variant="dark">
            {{ live.liveLocation }}
          </b-badge>
          <div>
            {{ live.liveName }}
          </div>
          <hr class="dropdown-divider" v-if="index + 1 !== liveList.length" />
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatDate } from '../utils/date-utils'
import IllumiTunerVuexModule from '../store/illumi-tuner-vuex-module'
import ILive from '../models/i-live'

const LiveSelectView = Vue.extend({
  data() {
    return {
      showMobileModal: false
    }
  },
  props: {
    liveList: {
      type: Array,
      required: true
    }
  },
  computed: {
    isMobile() {
      // 以下のコードは動的なリサイズを変更検知できない
      return window.innerWidth < 700
    }
  },
  methods: {
    formatDate: formatDate,
    selectLive(live: ILive) {
      this.showMobileModal = false
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
      this.$emit('live-selected')
    },
    openMobileModal() {
      if (this.isMobile) {
        this.showMobileModal = true
      }
    },
    closeModal() {
      this.showMobileModal = false
    }
  }
})
export default LiveSelectView
</script>

<style scoped></style>
