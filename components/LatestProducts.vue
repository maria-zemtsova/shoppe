<script lang="ts" setup>
  import ProductCard from '~/components/ProductCard.vue'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import { onBeforeMount, ref } from 'vue'
  import type { Product } from '~/types/product'

  const productCards = ref<Product[]>([])
  const isLoading = ref(true)
  const productError = ref<string | null>(null)
  const DEFAULT_ITEMS_COUNT = 6
  onBeforeMount(async () => {
    try {
      isLoading.value = true
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products?category=jewelery&limit=${DEFAULT_ITEMS_COUNT}`,
      )
      if (!response.ok) throw new Error('Unable to fetch products. Try again later')
      productCards.value = await response.json()
    } catch (err) {
      productError.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  })
</script>

<template>
  <section class="latest">
    <div>
      <h2 class="latest__title">Shop The Latest</h2>
      <BaseButton class="latest__button" :link="'/catalog'" :text="'View all'" />
    </div>
    <ul class="latest__list">
      <li
        v-for="n in DEFAULT_ITEMS_COUNT"
        v-if="isLoading"
        :key="`skeleton-${n}`"
        class="skeleton"
      />
      <div v-else-if="productError" class="latest__error">{{ productError }}</div>
      <ProductCard v-for="card in productCards" v-else :key="card.id" :product="card" />
    </ul>
  </section>
</template>

<style lang="scss" scoped>
  .latest {
    margin-top: 64px;
    font-family: $font-dm-sans;

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__title {
      margin: 0;
      font-size: 34px;
      font-weight: 500;
      line-height: 44px;
      color: $black;

      @media (max-width: $breakpoints-l) {
        font-size: 16px;
        line-height: 28px;
      }
    }

    &__button {
      font-size: 20px;
      font-weight: 500;
      line-height: 26px;
      color: $accent;
      text-decoration: none;

      @media (max-width: $breakpoints-l) {
        font-size: 14px;
        line-height: 22px;
      }
    }

    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 86px 56px;
      padding: 0;
      margin-top: 40px;
      list-style: none;

      @media (max-width: $breakpoints-xl) {
        grid-template-columns: 1fr 1fr;
        gap: 80px 28px;
      }

      @media (max-width: $breakpoints-l) {
        grid-template-columns: 1fr 1fr 1fr;
        gap: 80px 28px;
      }

      @media (max-width: $breakpoints-m) {
        grid-template-columns: 1fr 1fr;
        gap: 24px 20px;
      }
    }

    &__error {
      width: 100%;
      padding-top: 200px;
      font-family: $font-dm-sans;
      font-size: 34px;
      color: $red;
      text-align: center;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 0.2;
    }

    50% {
      opacity: 0.4;
    }

    100% {
      opacity: 0.6;
    }
  }

  .skeleton {
    width: 378px;
    height: 380px;
    background: $accent;
    border-radius: 8px;
    animation: pulse 1.5s ease-in-out infinite;

    @media (max-width: $breakpoints-l) {
      width: 136px;
      height: 136px;
    }
  }
</style>
