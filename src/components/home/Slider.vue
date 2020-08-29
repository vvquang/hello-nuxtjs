<template>
  <div>
    <carousel>
      <div v-for="item in slides" :key="item.id">
        <div class="slide-image">
          <div
            class="slide-image__content"
            :style="{
              backgroundImage: `url(/img/slide/${item.id}.jpg)`,
            }"
          />
        </div>
        <div class="slide-content">{{ item.content }}</div>
      </div>

      <div>hello</div>
      <div>hihhiih</div>
    </carousel>
  </div>
</template>

<style lang="scss" scoped>
.slide-item {
  position: relative;
  float: left;
  outline: 0;
  height: 100%;
  min-height: 1px;
}

.slide-image {
  position: relative;
  width: 100%;
  height: auto;
  padding-top: 50%;

  &__content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    // width: 100% !important;
    height: 100%;

    display: block;
    background-repeat: no-repeat !important;
    background-size: cover !important;
  }
}
.slide-content {
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Slide } from '~/domain/Slide'
import Carousel from '~/components/elements/Carousel'

type Props = {
  slides: Slide[]
}

export default defineComponent({
  props: {
    slides: {
      type: Array as () => Slide[],
      required: true,
    },
  },
  components: {
    Carousel,
  },
  setup() {
    return {}
  },
})
</script>
