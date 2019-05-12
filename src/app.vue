<template>
  <div>
    <b-navbar type="dark" variant="dark" toggleable="sm">
      <b-navbar-brand to="/">
        IllumiTuner β
      </b-navbar-brand>
      <b-navbar-toggle target="main-navigation" />
      <b-collapse is-nav id="main-navigation">
        <b-navbar-nav>
          <b-nav-item to="/about">
            これなあに
          </b-nav-item>
          <b-nav-item to="/terms">
            利用規約
          </b-nav-item>
          <b-nav-item href="https://github.com/tumugin/illumi_tuner" target="_blank">
            GitHub
          </b-nav-item>
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
