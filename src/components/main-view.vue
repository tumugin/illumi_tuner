<template>
  <div>
    <character-list-view />
    <penlight-list-view :style="{ marginTop: '20px' }" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CharacterListView from './character-list-view.vue'
import PenlightListView from './penlight-list-view.vue'

const MainView = Vue.extend({
  components: {
    CharacterListView,
    PenlightListView
  }
})
export default MainView
</script>

<style lang="scss" scoped></style>
