<template>
  <div :style="{ backgroundColor: penlightColor.colorHEX }" class="container">
    <span class="title">{{ penlightColor.colorName }}</span>
    <div class="idolListContainer">
      <span v-for="idol in idols" :key="idol.key" class="idol">
        <div class="colorIndicator" :style="{ backgroundColor: idol.colorHEX }"/>
        {{ idol.name }}
      </span>
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
  padding: 15px;
  min-width: 300px;
  .title {
    background-color: white;
    border-radius: 5px;
    padding: 5px;
    font-size: calc(100% + 0.3vw);
  }
  .idolListContainer {
    display: flex;
    flex-flow: wrap;
    margin-top: 10px;
    .idol {
      padding: 5px;
      background-color: white;
      border-radius: 10px;
      margin: 3px;
      font-size: calc(70% + 0.1vw);
    }
  }
}
.colorIndicator {
  height: 5px;
  border-radius: 30px;
}
</style>
