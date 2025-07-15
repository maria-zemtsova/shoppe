<script lang="ts" setup>
  import ProductCard from './ProductCard.vue'
  import { onBeforeMount, ref } from 'vue'

  interface ProductCardItem {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
      rate: number
      count: number
    }
  }

  const productCards = ref<ProductCardItem[]>([])
  const isLoading = ref<boolean>(true)
  const productError = ref<string | null>(null)
  onBeforeMount(async () => {
    try {
      isLoading.value = true
      const response = await fetch('https://fakestoreapi.com/products?category=jewelery&limit=6')
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
      <NuxtLink class="latest__button" to="/catalog">View All</NuxtLink>
    </div>
    <ul class="latest__list">
      <li v-for="n in 6" v-if="isLoading" :key="`skeleton-${n}`" class="skeleton" />
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
      font-size: 33px;
      font-weight: 500;
      line-height: 43px;
      color: $black;

      @media (max-width: $breakpoints-l) {
        font-size: 16px;
        line-height: 27px;
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
      gap: 86px 57px;
      padding: 0;
      margin-top: 39px;
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
    width: 377px;
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
