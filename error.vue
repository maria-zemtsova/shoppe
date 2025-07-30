<script lang="ts" setup>
  import BaseButton from '~/components/ui/BaseButton.vue'
  import { clearError } from 'nuxt/app'

  const { error } = defineProps<{
    error: {
      statusCode: number
      statusMessage?: string
    }
  }>()

  const handleRedirect = () => {
    clearError({ redirect: '/' })
  }
</script>

<template>
  <NuxtLayout name="default">
    <section class="error">
      <h2 class="error__title">{{ error.statusCode }} error</h2>
      <p v-if="error.statusCode === 404" class="error__description">
        This page not found; <br />back to home and start again
      </p>
      <p v-if="error.statusCode === 500" class="error__description">
        Server error; <br />try refreshing the page or come back later.
      </p>
      <BaseButton class="error__button" tag="button" text="homepage" @click="handleRedirect" />
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
    height: 700px;
    font-family: $font-dm-sans;

    @media (max-width: $breakpoints-s) {
      gap: 10px;
      height: 400px;
    }

    &__title {
      margin: 0;
      font-size: 34px;
      font-weight: 600;
      line-height: 44px;
      text-transform: uppercase;

      @media (max-width: $breakpoints-s) {
        font-size: 20px;
        line-height: 26px;
      }
    }

    &__description {
      margin: 0;
      margin-bottom: 40px;
      font-size: 20px;
      line-height: 26px;
      color: $dark-gray;
      text-align: center;

      @media (max-width: $breakpoints-s) {
        margin-bottom: 14px;
        font-size: 12px;
        line-height: 20px;
      }
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

      @media (max-width: $breakpoints-s) {
        width: 116px;
        height: 32px;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
</style>
