<template>
  <div class="container" :style="styles">
    <slot />
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
}

.container .container {
  padding-left: unset;
  padding-right: unset;
}

@media (min-width: calc(1280px + 1px)) {
  .container {
    padding-left: 80px;
    padding-right: 80px;
  }
}

@media (max-width: 1280px) and (min-width: calc(768px + 1px)) {
  .container {
    padding-left: 56px;
    padding-right: 56px;
  }
}

@media (max-width: 768px) {
  .container {
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (max-width: 320px) {
  .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

type Props = {
  full: Boolean
}

const containerWidth = 1280
const paddingWieight = 0
const maxWidth = containerWidth - paddingWieight * 2

export default defineComponent({
  props: {
    full: Boolean,
  },
  setup(props: Props) {
    const styles = computed(() => {
      if (props.full) {
        return null
      }

      return {
        maxWidth: `${maxWidth}px`,
      }
    })

    return {
      styles,
    }
  },
})
</script>
