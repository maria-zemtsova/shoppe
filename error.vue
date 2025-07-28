<script lang="ts" setup>
  import BaseButton from '~/components/ui/BaseButton.vue'
  import { clearError } from 'nuxt/app'
  const handleRedirect = () => {
    clearError({ redirect: '/' })
  }
</script>
<template>
  <NuxtLayout name="default">
    <section class="error">
      <h2 class="error__title">404 error</h2>
      <p class="error__description">This page not found; <br />back to home and start again</p>
      <BaseButton
        class="error__button"
        tag="button"
        text="homepage"
        @click="handleRedirect"
      ></BaseButton>
    </section>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
  .error {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    justify-content: center;
    height: 756px;
    font-family: $font-dm-sans;

    &__title {
      margin: 0;
      font-size: 34px;
      font-weight: 600;
      line-height: 44px;
      text-transform: uppercase;
    }

    &__description {
      margin: 0;
      margin-bottom: 40px;
      font-size: 20px;
      line-height: 26px;
      color: $dark-gray;
      text-align: center;
    }

    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 188px;
      height: 54px;
      font-size: 16px;
      font-weight: 700;
      line-height: 100%;
      color: $black;
      text-transform: uppercase;
      background-color: transparent;
      border: 1px solid $black;
      border-radius: 4px;
    }
  }
</style>
