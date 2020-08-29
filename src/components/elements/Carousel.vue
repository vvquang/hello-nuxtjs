
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
        <slot :widthSlideItem="widthSlideItem" />
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
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  watch,
  onBeforeUnmount,
} from '@vue/composition-api'
import debounce from '~/utils/debouce'

type Props = {}

export default defineComponent({
  props: {
    autoplay: {
      type: Boolean,
    },
    autoplaySpeed: {
      type: Number,
    },
  },
  // use `provide` to avoid `Slide` being nested with other components
  provide() {
    return {
      carousel: this,
    }
  },
  setup(_props: Props, context) {
    const widthSlideItem = ref(0)
    const currentSlide = ref(0)
    const windowWidth = ref(window.innerWidth)
    let slideList: never[] | HTMLCollection = []

    const widthSlideTrack = computed(
      () => widthSlideItem.value * slideList.length
    )
    const translateX = computed(
      () => -(currentSlide.value * widthSlideItem.value)
    )

    watch(windowWidth, () => {
      getCarouselWidth()
    })

    const getSlideList = () => {
      const elMainSlider: HTMLElement | null = document.querySelector(
        '.main-slider'
      )
      const elSlideTrack = elMainSlider
        ? elMainSlider.querySelector('.slide-track')
        : null

      const childrens = elSlideTrack ? elSlideTrack.children : []
      // if (childrens.length <= 1) {
      slideList = childrens
      // } else {
      //   slideList = slideList.push(childrens[0])
      // }

      // console.log(context.slots.default)

      widthSlideItem.value = elMainSlider ? elMainSlider.offsetWidth : 0
    }

    const getCarouselWidth = () => {
      const elMainSlider: HTMLElement | null = document.querySelector(
        '.main-slider'
      )
      widthSlideItem.value = elMainSlider ? elMainSlider.offsetWidth : 0
    }

    const nextPage = () => {
      currentSlide.value =
        currentSlide.value + 1 < slideList.length
          ? currentSlide.value + 1
          : currentSlide.value
    }

    const previousPage = () => {
      currentSlide.value =
        currentSlide.value > 0 ? currentSlide.value - 1 : currentSlide.value
    }

    const handleWindowResize = () => {
      windowWidth.value = window.innerWidth
    }

    onMounted(() => {
      getSlideList()
      window.addEventListener('resize', debounce(handleWindowResize, 100, true))
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleWindowResize)
    })

    return {
      slideList,
      widthSlideItem,
      widthSlideTrack,
      translateX,
      previousPage,
      nextPage,
      currentSlide,
      windowWidth,
    }
  },
})
</script>
