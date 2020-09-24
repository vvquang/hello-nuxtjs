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

export default defineComponent({
  name: 'slider',
  props: {
    autoplay: {
      type: Boolean,
    },
    autoplaySpeed: {
      type: Number,
      default: 2000,
    },
    /**
     * Flag to make the carousel loop around when it reaches the end
     */
    loop: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CarouselTemplate,
  },
  setup(props, context) {
    const widthSlideItem = ref(0)
    const currentPage = ref(0)
    const windowWidth = ref(window.innerWidth)
    let slideList: VNode[] = []

    const widthSlideTrack = computed(
      () => widthSlideItem.value * slideList.length
    )
    const translateX = computed(
      () => -(currentPage.value * widthSlideItem.value)
    )
    const pageCount = computed(() => slideList.length)

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
      if (currentPage.value < pageCount.value - 1) return currentPage.value + 1

      return props.loop ? 0 : currentPage.value
    }

    const previousPage = () => {
      if (currentPage.value > 0) {
        return currentPage.value - 1
      }
      return props.loop ? pageCount.value - 1 : currentPage
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
