<template>
  <b-dropdown text="公演を選択する">
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
</template>

<script lang="ts">
import Vue from 'vue'
import { formatDate } from '../utils/date-utils'
import IllumiTunerVuexModule from '../store/illumi-tuner-vuex-module'
import ILive from '../models/i-live'

const LiveSelectView = Vue.extend({
  props: {
    liveList: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate: formatDate,
    selectLive(live: ILive) {
      const selectedIdol = IllumiTunerVuexModule.imasCharacters.filter(item => live.liveActor.includes(item.actor))
      selectedIdol.forEach(item => {
        item.checked = true
        IllumiTunerVuexModule.updateImasCharacter(item, item.key)
      })
    }
  }
})
export default LiveSelectView
</script>

<style scoped></style>
