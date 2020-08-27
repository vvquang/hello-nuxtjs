<template>
  <div class="default-layout-container">
    <div class="default-layout">
      <header class="default-layout__header">
        <Header />
      </header>
      <main class="default-layout__main">
        <Nuxt />
      </main>
      <footer class="default-layout__footer">
        <Footer />
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-layout-container {
  height: 100%;
  position: relative;
}
.default-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 1;

  &__header {
    /* position: fixed;
    top: 0;
    left: 0;
    z-index: var(--z-index-header); */
    width: 100%;
    background: rgba(255, 255, 255, 0.85);
  }

  &__main {
    flex: 1 0 auto;
    /* margin-top: 144px; */
  }

  &__footer {
    flex-shrink: 0;
  }
}

/* width <=  md */
@media (max-width: 768px) {
  .default-layout__main {
    margin-top: 68px;
  }
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Header from '~/components/modules/Header'
import Footer from '~/components/modules/Footer'

export default defineComponent({
  components: {
    Header,
    Footer,
  },
  setup() {
    return {}
  },
})
</script>
