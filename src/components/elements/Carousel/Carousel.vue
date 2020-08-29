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

.slide-item {
  position: relative;
  float: left;
  outline: 0;
  height: 100%;
  min-height: 1px;
}
</style>
<script lang="ts">
import {
  h,
  defineComponent,
  computed,
  ref,
  onMounted,
  watch,
  onBeforeUnmount,
} from '@vue/composition-api'
import { VNode } from 'vue'
import CarouselTemplate from './CarouselTemplate.vue'
import debounce from '~/utils/debouce'

type Props = {}

export default defineComponent({
  props: {
    autoplay: {
      type: Boolean,
    },
    autoplaySpeed: {
      type: Number,
      default: 2000,
    },
  },
  components: {
    CarouselTemplate,
  },
  setup(_props: Props, context) {
    const widthSlideItem = ref(0)
    const currentSlide = ref(0)
    const windowWidth = ref(window.innerWidth)
    let slideList: VNode[] = []

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
      const childrens = context.slots.default().filter((vnode) => vnode.tag)
      slideList =
        childrens.length < 2
          ? [...childrens]
          : [childrens[childrens.length - 1], ...childrens, childrens[0]]
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
      getCarouselWidth()
      window.addEventListener('resize', debounce(handleWindowResize, 100, true))
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleWindowResize)
    })

    return () =>
      h(
        CarouselTemplate,
        {
          props: {
            nextPage,
            previousPage,
            widthSlideTrack: widthSlideTrack.value,
            translateX: translateX.value,
            widthSlideItem: widthSlideItem.value,
          },
        },
        slideList.map((vnode) =>
          h(
            'div',
            {
              attrs: {
                tabIndex: -1,
              },
              class: {
                'slide-item': true,
              },
              style: {
                width: `${widthSlideItem.value}px`,
              },
            },
            vnode.children
          )
        )
      )
  },
})
</script>
