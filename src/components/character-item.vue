<template>
  <div
    :style="{ backgroundColor: characterColor, [$style.characterBox]: true, [$style.characterBox.checked]: checked }"
    @click="onParentBoxClicked"
  >
    {{ characterName }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
const CharacterItem = Vue.extend({
  props: {
    characterName: {
      type: String,
      required: true
    },
    characterColor: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onParentBoxClicked() {
      this.$emit('onCheckStateChanged', !this.$props.checked)
    }
  }
})
export default CharacterItem
</script>

<style scoped module lang="scss">
.characterBox {
  width: 100px;
  height: 50px;
  .checked {
    transform: rotate(-5deg);
  }
}
</style>
