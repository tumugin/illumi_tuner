<template>
  <div>
    <!--デスクトップ用公演選択画面-->
    <b-dropdown text="公演から選択する" v-if="!isMobile">
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
      公演から選択する
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
import ILive from '../models/i-live'

export default Vue.extend({
  name: 'LiveSelectView',
  data() {
    return {
      showMobileModal: false
    }
  },
  props: {
    liveList: {
      type: Array,
      required: true
    },
    isMobile: {
      type: Boolean,
      default: () => window.innerWidth < 700 // computedで動的に検知できないのでpropsを使う
    }
  },
  methods: {
    formatDate: formatDate,
    selectLive(live: ILive) {
      this.showMobileModal = false
      this.$emit('live-selected', live)
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
</script>

<style scoped></style>
