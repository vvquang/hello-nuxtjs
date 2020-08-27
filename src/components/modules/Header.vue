<template>
  <div class="header">
    <container>
      <div class="header__container">
        <div class="header__logo">
          <nuxt-link to="/" class="non-styled-link">
            <span class="logo">
              <company-logo />
            </span>
          </nuxt-link>
        </div>
        <nav class="header__menu">
          <nuxt-link to="/" class="non-styled-link">
            <span class="navigation__label"> Home </span>
          </nuxt-link>
          <nuxt-link to="/about" class="non-styled-link">
            <span class="navigation__label"> About </span>
          </nuxt-link>
        </nav>
      </div>
    </container>
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding: 16px 0;
  width: 100%;
  border-bottom: 1px solid rgb(184, 184, 184);

  &__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  &__logo {
    flex-grow: 1;
  }
  &__menu {
    flex-grow: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
}
.navigation__label {
  display: block;
  margin: 0 16px;

  font-size: 16px;
  line-height: 32px;

  &:hover {
    color: #666;
  }
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
