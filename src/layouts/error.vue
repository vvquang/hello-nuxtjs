<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Error = {
  statusCode: number
}

export default Vue.extend({
  props: {
    error: {
      type: Object as () => Error,
      required: true,
    },
  },
})
</script>
