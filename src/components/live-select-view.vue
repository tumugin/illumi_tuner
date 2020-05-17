<template>
  <div>
    <!--デスクトップ用公演選択画面-->
    <b-dropdown text="公演から選択する" v-if="!isMobile">
      <no-live v-if="isNoLive" class="no-live-view" />
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
      <no-live v-if="isNoLive" />
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
import NoLive from './no-live.vue'

export default Vue.extend({
  name: 'LiveSelectView',
  data() {
    return {
      showMobileModal: false,
    }
  },
  components: {
    NoLive,
  },
  props: {
    liveList: {
      type: Array,
      required: true,
    },
    isMobile: {
      type: Boolean,
      default: () => (typeof window !== 'undefined' ? window.innerWidth < 700 : false), // computedで動的に検知できないのでpropsを使う
    },
  },
  computed: {
    isNoLive() {
      return this.liveList.length === 0
    },
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
    },
  },
})
</script>

<style scoped lang="scss">
.no-live-view {
  width: 500px;
}
</style>
