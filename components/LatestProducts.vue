<script lang="ts" setup>
  import ProductCard from './ProductCard.vue'
  import { onBeforeMount, ref } from 'vue'
  // import SkeletonLoader from 'vue-skeleton-loader'

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
      if (!response.ok) {
        throw new Error('Unable to fetch products. Try again later')
      }
      const data: ProductCardItem[] = await response.json()
      productCards.value = data
    } catch (err) {
      productError.value =
        err instanceof Error ? err.message : 'Unable to fetch products. Try again later'
    } finally {
      isLoading.value = false
      console.log(productCards)
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
      <SkeletonLoader
        v-if="isLoading"
        :width="377"
        :height="500"
        :speed="2"
        primary-color="#f3f3f3"
        secondary-color="#ecebeb"
      >
        <rect x="0" y="0" width="377" height="380" />
        <rect x="16" y="400" width="200" height="24" />
        <rect x="16" y="440" width="100" height="20" />
      </SkeletonLoader>
      <ProductCard v-for="card in productCards" :key="card.id" :product="card" />
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
    }

    &__button {
      font-size: 20px;
      font-weight: 500;
      line-height: 26px;
      color: $accent;
      text-decoration: none;
    }

    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 86px 57px;
      padding: 0;
      margin-top: 39px;
      list-style: none;
    }
  }
</style>
