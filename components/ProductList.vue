<script setup lang="ts">
  import { ref, computed } from 'vue'
  import ProductCard from '~/components/ProductCard.vue'
  import PaginationComponent from '~/components/ui/PaginationComponent.vue'
  import type { Product } from '~/types/product'

  const props = defineProps<{
    products: Product[]
    isLoading: boolean
    error: string | null
  }>()

  const currentPage = ref(1)
  const itemsPerPage = ref(6)

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return props.products.slice(start, start + itemsPerPage.value)
  })
</script>

<template>
  <section class="product">
    <ul class="product__list">
      <li v-for="n in itemsPerPage" v-if="isLoading" :key="`skeleton-${n}`" class="skeleton" />
      <div v-else-if="error" class="product__error">{{ error }}</div>
      <ProductCard
        v-for="card in paginatedProducts"
        v-else
        :key="card.id"
        :product="card"
        class="product__item"
      />
    </ul>
    <PaginationComponent
      v-model="currentPage"
      :total-items="products.length"
      :per-page="itemsPerPage"
    />
  </section>
</template>

<style lang="scss" scoped>
  .product {
    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 70px 24px;
      padding: 0;
      margin: 0;
      list-style: none;

      @media (max-width: $breakpoints-xl) {
        grid-template-columns: 1fr 1fr;
        gap: 80px 28px;
      }

      @media (max-width: $breakpoints-l) {
        grid-template-columns: 1fr 1fr;
        gap: 80px 28px;
      }

      @media (max-width: $breakpoints-m) {
        grid-template-columns: 1fr 1fr;
        gap: 24px 20px;
      }

      @media (max-width: $breakpoints-s) {
        grid-template-columns: 1fr 1fr;
        gap: 24px 20px;
      }
    }

    &__item {
      width: 20px;
    }

    &__error {
      position: relative;
      top: -50%;
      left: 115%;
      width: 100%;
      padding-top: 200px;
      font-family: $font-dm-sans;
      font-size: 34px;
      color: $red;
      text-align: center;

      @media (max-width: $breakpoints-xl) {
        left: 50%;
      }

      @media (max-width: $breakpoints-l) {
        left: 100%;
      }

      @media (max-width: $breakpoints-m) {
        left: 50%;
      }
    }
  }

  .product :deep(.card__item) {
    width: 300px;

    @media (max-width: $breakpoints-xl) {
      width: 250px;
    }

    @media (max-width: $breakpoints-l) {
      width: 200px;
    }

    @media (max-width: $breakpoints-m) {
      width: 136px;
    }
  }

  .product :deep(.card__image-wrapper) {
    width: 300px;

    @media (max-width: $breakpoints-xl) {
      width: 250px;
    }

    @media (max-width: $breakpoints-l) {
      width: 200px;
    }

    @media (max-width: $breakpoints-m) {
      width: 136px;
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
