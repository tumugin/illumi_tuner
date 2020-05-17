<template>
  <transition name="fade" appear>
    <div class="loading-view-container" v-if="isVisible">
      <template v-if="!isLoadFailed">
        <div class="loading-description">
          <b-spinner class="loading-spinner" type="grow" />
          <div class="loading-text">アイドルの一覧と直近の公演リストをim@sparqlから読込中です...</div>
        </div>
      </template>
      <template v-else>
        <div class="loading-description">
          <div class="loading-text">
            <p>ネットワークが不安定、もしくはim@sparqlが落ちていてデータを読み込めませんでした。</p>
            <p>一度ページのリロードを試してみてください。</p>
          </div>
        </div>
      </template>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'LoadingView',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    isLoadFailed: {
      type: Boolean,
    },
  },
})
</script>

<style scoped lang="scss">
.fade-leave-active {
  transition: opacity 1s;
}
.fade-leave-to {
  opacity: 0;
}

.loading-view-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;

  .loading-description {
    .loading-spinner {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 15vh;
      height: 15vh;
      color: white;
    }
    .loading-text {
      text-align: center;
      color: white;
      margin-top: 24px;
      font-size: 2.5vh;
    }
  }
}
</style>
