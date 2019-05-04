<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="#">
        IllumiTuner β
      </b-navbar-brand>
    </b-navbar>
    <router-view class="mainview" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.component('App', {})
</script>

<style lang="scss" scoped>
.mainview {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
