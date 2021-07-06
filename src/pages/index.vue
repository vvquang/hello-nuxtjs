<template>
  <container>
    <div class="home-page">
      <div class="home-page__hello">
        <h1>{{ $t('helloWord') }}</h1>
      </div>
      <div class="home-page__slider">
        <Slider :slides="slides" />
      </div>
      <div class="home-page__slider">
        <Carousel />
      </div>
    </div>
  </container>
</template>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  &__hello {
    padding: 16px 0;
  }

  &__slider {
    margin-top: 20px;
    width: 100%;
  }
}
</style>

<script lang="ts">
import Vue from 'vue'
import Slider from '~/components/home/Slider.vue'
import Carousel from '~/components/home/Carousel.vue'

export default Vue.extend({
  name: 'Home',
  components: {
    Slider,
    Carousel,
  },
  async fetch({ store }) {
    await store.dispatch('slides/fetch')
  },
  computed: {
    slides() {
      return this.$store.getters['slides/all']
    },
  },
})
</script>
