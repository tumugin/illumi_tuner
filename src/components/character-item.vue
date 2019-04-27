<template>
  <div
    :style="{ backgroundColor: characterColor }"
    :class="{ characterBox: true, checked: $props.checked }"
    @click="onParentBoxClicked"
  >
    <div class="textContainer">
      <span class="titleView whiteBox">{{ characterTitle }}</span>
      <br />
      <span :class="{ whiteBox: true, characterNameView: true, smallNameView: isLongName }">{{ characterName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
const CharacterItem = Vue.extend({
  data() {
    return {}
  },
  computed: {
    isLongName() {
      return (this.$props.characterName as string).length > 5
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
    characterTitle: {
      type: String,
      default: null
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
  .textContainer {
    text-align: center;
  }
  .whiteBox {
    background-color: white;
    padding: 3px;
    border-radius: 5px;
  }
  .titleView {
    font-size: calc(50% + 0.1vw);
  }
  .characterNameView {
    font-size: calc(100% + 0.1vw);
    &.smallNameView {
      font-size: calc(70% + 0.1vw);
    }
  }
  &.checked {
    transform: rotate(-5deg);
  }
}
</style>
