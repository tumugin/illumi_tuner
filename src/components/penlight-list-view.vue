<template>
  <div class="penlightColorContainer">
    <div
      class="penlightColor"
      v-for="item in suggestedPenlightColor"
      :key="item.nameAndColor.key"
      :style="{ backgroundColor: item.penlightColor.colorHEX }"
    >
      {{ item.nameAndColor.name }}
      <br />
      {{ item.penlightColor.colorName }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IllumiTunerVuexModule from '../store/illumi-tuner-vuex-module'
import MixPenla from '../service/penlight/mix-penla'
// eslint-disable-next-line no-unused-vars
import INameAndColorWithPenlightColor from '../models/i-name-and-color-with-penlight-color'

const PenlightListView = Vue.extend({
  data() {
    return {
      penlight: new MixPenla()
    }
  },
  computed: {
    suggestedPenlightColor() {
      const checkedItem = IllumiTunerVuexModule.imasCharacters.filter(item => item.checked)
      return this.$data.penlight
        .searchColor(checkedItem, false)
        .sort((a: INameAndColorWithPenlightColor, b: INameAndColorWithPenlightColor) =>
          a.penlightColor.colorHEX.localeCompare(b.penlightColor.colorHEX)
        )
    }
  }
})
export default PenlightListView
</script>

<style scoped lang="scss">
p {
  line-height: 1px;
}

.penlightColorContainer {
  display: flex;
  flex-wrap: wrap;

  .penlightColor {
    width: 200px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    word-break: break-all;
    cursor: pointer;
    border-radius: 5px;
    user-select: none;
    margin: 5px;
  }
}
</style>
