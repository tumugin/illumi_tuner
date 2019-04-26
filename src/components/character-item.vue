<template>
  <div
    :style="{ backgroundColor: characterColor }"
    :class="{ characterBox: alwaysTrue, checked: $props.checked }"
    @click="onParentBoxClicked"
  >
    {{ characterName }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
const CharacterItem = Vue.extend({
  data() {
    return {
      alwaysTrue: true
    }
  },
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

<style scoped lang="scss">
.characterBox {
  width: 100px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-all;
  cursor: pointer;
  border-radius: 5px;
  user-select: none;
  &.checked {
    transform: rotate(-5deg);
  }
}
</style>
