<template>
  <div :style="{ backgroundColor: penlightColor.colorHEX }" class="container">
    <span class="title">{{ penlightColor.colorName }}</span>
    <div class="idolListContainer">
      <span v-for="idol in idols" :key="idol.key" class="idol">{{ idol.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
const PenlightItem = Vue.extend({
  props: {
    penlightColor: {
      type: Object,
      required: true
    },
    idols: {
      type: Array,
      required: true
    }
  }
})
export default PenlightItem
</script>

<style scoped lang="scss">
.container {
  border-radius: 5px;
  padding: 10px;
  .title {
    background-color: white;
    border-radius: 5px;
    padding: 5px;
    font-size: calc(100% + 0.3vw);
  }
  .idolListContainer {
    display: flex;
    margin-top: 3px;
    .idol {
      padding: 2px;
      background-color: white;
      border-radius: 15px;
      margin-right: 3px;
    }
  }
}
</style>
