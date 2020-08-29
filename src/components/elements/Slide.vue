<template>
  <div
    tabindex="-1"
    class="slide-item"
    :style="{ width: `${widthSlideItem}px` }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Slide',
  inject: ['carousel'],
  computed: {
    widthSlideItem() {
      return this.carousel.widthSlideItem
    },
  },
}
</script>

<style lang="scss" scoped>
.slide-item {
  position: relative;
  float: left;
  outline: 0;
  height: 100%;
  min-height: 1px;
}
</style>
