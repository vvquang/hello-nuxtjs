<template>
  <div class="footer">
    <div class="footer__container">
      <address class="copyright">
        Copyright © VU VAN QUANG. All rights reserved.
      </address>
      <div class="change-language">
        <div>Language:</div>
        <button @click="$i18n.setLocale('en')">English</button>
        <button @click="$i18n.setLocale('vi')">Vietnam</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.footer {
  padding: 16px 0;
  width: 100%;
  background: rgba(5, 48, 56, 0.8);
  color: #fff;

  &__container {
    display: flex;
    flex-direction: row;
  }
}

.change-language {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    background-color: #fff;
    color: #000;
  }
}
</style>

<script>
export default {}
</script>
