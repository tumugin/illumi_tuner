<template>
  <div class="penlightColorContainer">
    <penlight-item
      v-for="item in suggestedPenlightColor2"
      :key="item.key"
      :penlight-color="item.color"
      :idols="item.idols"
      class="item"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IllumiTunerVuexModule from '../store/illumi-tuner-vuex-module'
import MixPenla from '../service/penlight/mix-penla'
import PenlightItem from './penlight-item.vue'
import AbstractPenlight from '../service/penlight/abstract-penlight'
import AbstractPenlightColor from '../models/abstract-penlight-color'
import INameAndColor from '../models/i-name-and-color'
import md5 from 'md5'

interface PenlightColorWithIdolList {
  color: AbstractPenlightColor
  idols: INameAndColor[]
  key: string
  index: number
}

export default Vue.extend({
  name: 'PenlightListView',
  components: {
    PenlightItem,
  },
  data() {
    return {
      penlight: new MixPenla(),
    }
  },
  computed: {
    suggestedPenlightColor2() {
      const checkedItem = IllumiTunerVuexModule(this.$store).imasCharacters.filter((item) => item.checked)
      const searchResult = (this.$data.penlight as AbstractPenlight).searchColor(checkedItem, false)
      const distinctColors = [...new Set(searchResult.map((item) => item.penlightColor))]
      return distinctColors
        .map((penlightColor) => {
          return {
            color: penlightColor,
            idols: searchResult.filter((idol) => idol.penlightColor === penlightColor).map((idol) => idol.nameAndColor),
            key: md5(penlightColor.colorName + penlightColor.colorHEX),
            index: this.$data.penlight.availableColors.indexOf(penlightColor),
          } as PenlightColorWithIdolList
        })
        .sort((a, b) => a.index - b.index)
    },
  },
})
</script>

<style scoped lang="scss">
p {
  line-height: 1px;
}

.penlightColorContainer {
  display: flex;
  flex-wrap: wrap;
  .item {
    margin: 5px;
    flex: 1;
  }
}
</style>
