<template>
  <div class="parent">
    <div class="caption">公演が何もありません...🥺</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NoLive',
})
</script>

<style scoped lang="scss">
.parent {
  padding: 20px;
  .caption {
    text-align: center;
    font-size: calc(100% + 0.1vw);
  }
}
</style>
