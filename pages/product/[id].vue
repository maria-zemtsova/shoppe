<script setup lang="ts">
  import ProductGallery from '~/components/ProductGallery.vue'
  import ProductInfo from '~/components/ProductInfo.vue'

  import { ref, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import type { Product } from '~/types/product'
  import BaseTabs from '~/components/ui/BaseTabs.vue'
  import ReviewTab from '~/components/ReviewTab.vue'
  import BaseAccordeon from '~/components/ui/BaseAccordeon.vue'
  import SimilarProducts from '~/components/SimilarProducts.vue'

  const route = useRoute()
  const product = ref<Product | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const reviewTabRef = ref<InstanceType<typeof ReviewTab> | null>(null)
  const activeTab = ref(0)

  const fetchProduct = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${route.params.id}`)
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

  const reviewsCount = computed(() => reviewTabRef.value?.reviewsCount ?? 0)

  const tabs = computed(() => [
    { title: 'Description' },
    { title: 'Additional information' },
    { title: `Reviews (${reviewsCount.value})` },
  ])

  const productId = computed(() => product.value?.id ?? 0)
  const productTitle = computed(() => product.value?.title ?? '')
</script>

<template>
  <div v-if="loading" class="product__spinner">
    <div></div>
  </div>
  <div v-else-if="error">Ошибка: {{ error }}</div>

  <section v-else class="product">
    <div class="product__content">
      <ProductGallery class="product__gallery" />
      <ProductInfo :product="product" class="product__info" />
    </div>

    <BaseTabs v-model="activeTab" class="product__tabs" :items="tabs">
      <template #item-0>
        <p>{{ product?.description }}</p>
      </template>

      <template #item-1>
        <ul>
          <li>Weight: 0.3 kg</li>
          <li>Dimensions: 15 x 10 x 1 cm</li>
          <li>Colours: Black, Browns, White</li>
          <li>Material: Metal</li>
        </ul>
      </template>

      <template #item-2>
        <ReviewTab
          v-if="product"
          ref="reviewTabRef"
          :product-id="productId"
          :product-title="productTitle"
        />
      </template>
    </BaseTabs>
    <BaseAccordeon class="product__accordeon" :items="tabs">
      <template #item-0>
        <p>{{ product?.description }}</p>
      </template>
      <template #item-1>
        <ul>
          <li>Weight: 0.3 kg</li>
          <li>Dimensions: 15 x 10 x 1 cm</li>
          <li>Colours: Black, Browns, White</li>
          <li>Material: Metal</li>
        </ul>
      </template>
      <template #item-2>
        <ReviewTab :product-id="productId" :product-title="productTitle" />
      </template>
    </BaseAccordeon>
    <SimilarProducts v-if="product" :category="product.category" :current-id="product.id" />
  </section>
</template>

<style lang="scss" scoped>
  .product {
    font-family: $font-dm-sans;

    &__content {
      display: flex;
      gap: 40px;
      margin-top: 128px;
      font-family: $font-dm-sans;

      @media (max-width: $breakpoints-l) {
        display: block;
        margin-top: 50px;
      }
    }

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

    &__tabs {
      margin-top: 100px;
      margin-bottom: 66px;

      @media (max-width: $breakpoints-l) {
        display: none;
      }
    }

    &__accordeon {
      display: none;

      @media (max-width: $breakpoints-l) {
        display: block;
      }
    }
  }
</style>
