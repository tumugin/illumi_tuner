<template>
  <b-container>
    <character-list-view />
    <penlight-list-view :style="{ marginTop: '20px' }" />
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import CharacterListView from './character-list-view.vue'
import PenlightListView from './penlight-list-view.vue'
import IllumiTunerVuexModule from '../store/illumi-tuner-vuex-module'

const MainView = Vue.extend({
  components: {
    CharacterListView,
    PenlightListView
  },
  async mounted() {
    await IllumiTunerVuexModule.fetchImasCharacters()
  }
})
export default MainView
</script>

<style lang="scss" scoped></style>
