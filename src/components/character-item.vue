<template>
  <div :style="{ backgroundColor: characterColor, [$style.characterBox]: true }">
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
    }
  }
})
export default CharacterItem
</script>

<style scoped module lang="scss">
.characterBox {
  width: 100px;
  height: 50px;
}
</style>
