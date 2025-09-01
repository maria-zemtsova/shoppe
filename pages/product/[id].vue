<script setup lang="ts">
  import ProductGallery from '~/components/ProductGallery.vue'
  import ProductInfo from '~/components/ProductInfo.vue'
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import type { Product } from '~/types/product'

  const route = useRoute()
  const product = ref<Product | null>(null)
  const loading = ref<boolean>(true)
  const error = ref<string | null>(null)

  const fetchProduct = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${route.params.id}`)
      if (!res.ok) throw new Error('Failed to fetch product')
      product.value = await res.json()
    } catch (err) {
      error.value = (err as Error).message || 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchProduct()
  })
</script>

<template>
  <div v-if="loading" class="product__spinner">
    <div></div>
  </div>
  <div v-else-if="error">Ошибка: {{ error }}</div>
  <section v-else class="product">
    <ProductGallery class="product__gallery" />
    <ProductInfo :product="product" class="product__info" />
  </section>
</template>

<style lang="scss" scoped>
  .product {
    display: flex;
    gap: 40px;
    margin-top: 128px;
    font-family: $font-dm-sans;

    @media (max-width: $breakpoints-l) {
      display: block;
      margin-top: 50px;
    }

    &__spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 600px;

      div {
        width: 50px;
        height: 50px;
        border: 4px solid $light-gray;
        border-top-color: $accent;
        border-radius: 50%;
        animation: spin 1s ease-in-out infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
</style>
