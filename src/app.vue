<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand to="/">
        IllumiTuner β
      </b-navbar-brand>
      <b-collapse is-nav id="main-navigation">
        <b-navbar-nav>
          <b-nav-item to="/about">これなあに</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
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
