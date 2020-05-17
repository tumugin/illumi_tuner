<template>
  <div
    :style="{ backgroundColor: characterColor }"
    :class="{ characterBox: true, checked: $props.checked }"
    @click="onParentBoxClicked"
  >
    <div class="textContainer">
      <div class="titleView whiteBox">
        {{ characterTitle }}
      </div>
      <div class="whiteBox characterNameView" :class="{ smallNameView: isLongName }">
        {{ characterName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'CharacterItem',
  data() {
    return {}
  },
  computed: {
    isLongName() {
      return (this.characterName as string).length > 5
    },
  },
  props: {
    characterName: {
      type: String,
      required: true,
    },
    characterColor: {
      type: String,
      required: true,
    },
    characterTitle: {
      type: String,
      default: null,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onParentBoxClicked() {
      this.$emit('onCheckStateChanged', !this.$props.checked)
    },
  },
})
</script>

<style scoped lang="scss">
.characterBox {
  min-width: 120px;
  max-width: 180px;
  min-height: 70px;
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
    display: table;
  }
  .titleView {
    font-size: calc(50% + 0.1vw);
    margin-bottom: 5px;
    margin-right: auto;
    margin-left: auto;
  }
  .characterNameView {
    font-size: calc(100% + 0.1vw);
    margin-right: auto;
    margin-left: auto;
    &.smallNameView {
      font-size: calc(70% + 0.1vw);
    }
  }
  &.checked {
    transform: rotate(-5deg);
  }
}
</style>
