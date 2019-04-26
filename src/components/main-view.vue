<template>
  <character-list-view/>
</template>

<script lang="ts">
import Vue from 'vue'
import CharacterListView from './character-list-view.vue'

const MainView = Vue.extend({
  components: {
    CharacterListView
  }
})
export default MainView
</script>

<style lang="scss" scoped>
</style>
