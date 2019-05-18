<template>
  <div>
    <b-dropdown text="公演を選択する" @toggle="openMobileModal">
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
    <b-modal :visible="showMobileModal" title="公演を選択してください" hide-footer @close="closeModal">
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
  methods: {
    formatDate: formatDate,
    selectLive(live: ILive) {
      this.showMobileModal = false
      const selectedIdol = IllumiTunerVuexModule.imasCharacters.filter(item => live.liveActor.includes(item.actor))
      selectedIdol.forEach(item => {
        item.checked = true
        IllumiTunerVuexModule.updateImasCharacter(item, item.key)
      })
    },
    openMobileModal() {
      if (window.innerWidth < 700) {
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
