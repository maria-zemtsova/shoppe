<script lang="ts" setup>
  import AuthTabs from '~/components/AuthTabs.vue'
</script>

<template>
  <section class="account">
    <h2 class="account__title">My account</h2>
    <AuthTabs />
  </section>
</template>

<style lang="scss" scoped>
  .account {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 128px;
    padding-bottom: 246px;
    font-family: $font-dm-sans;

    @media (max-width: $breakpoints-m) {
      padding-top: 70px;
      padding-bottom: 92px;
    }

    &__title {
      margin: 0;
      margin-bottom: 64px;
      font-size: 33px;
      font-weight: 500;
      line-height: 43px;

      @media (max-width: $breakpoints-m) {
        margin-bottom: 24px;
        font-size: 20px;
        line-height: 26px;
      }
    }
  }
</style>
