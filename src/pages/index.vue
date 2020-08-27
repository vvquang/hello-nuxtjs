<template>
  <container>
    <div>
      <h1>{{ $t('helloWord') }}</h1>
    </div>
  </container>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
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
