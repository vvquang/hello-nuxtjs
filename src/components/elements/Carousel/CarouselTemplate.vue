<template>
  <div class="main-slider">
    <button class="slide-prev slide-arrow" @click="previousPage">
      Previous
    </button>
    <div class="slide-list">
      <div
        class="slide-track"
        :style="{
          width: `${widthSlideTrack}px`,
          opacity: 1,
          transform: `translate3d(${translateX}px, 0px, 0px)`,
        }"
      >
        <slot />
      </div>
    </div>
    <button class="slide-next slide-arrow" @click="nextPage">Next</button>
  </div>
</template>

<style lang="scss" scoped>
.slide-list {
  position: relative;
  display: block;
  overflow: hidden;
  margin: 0;
  padding: 0;
  transform: translate3d(0, 0, 0);
}
.slide-list:focus {
  outline: none;
}
.slide-list.dragging {
  cursor: pointer;
  cursor: hand;
}

.slide-track {
  position: relative;
  top: 0;
  left: 0;
  display: block;
  margin-left: auto;
  margin-right: auto;

  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}
.slide-track:before,
.slide-track:after {
  display: table;
  content: '';
}
</style>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    previousPage: {
      type: Function,
    },
    nextPage: {
      type: Function,
    },
    widthSlideTrack: {
      type: Number,
    },
    translateX: {
      type: Number,
    },
    widthSlideItem: {
      type: Number,
    },
  },
  setup() {
    return {}
  },
})
</script>
