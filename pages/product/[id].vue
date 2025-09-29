<script setup lang="ts">
  import ProductGallery from '~/components/ProductGallery.vue'
  import ProductInfo from '~/components/ProductInfo.vue'
  import { ref, onMounted, computed, h, defineComponent } from 'vue'
  import { useRoute } from 'vue-router'
  import type { Product } from '~/types/product'
  import BaseTabs from '~/components/ui/BaseTabs.vue'
  import ReviewTab from '~/components/ReviewTab.vue'
  import BaseAccordeon from '~/components/ui/BaseAccordeon.vue'
  import SimilarProducts from '~/components/SimilarProducts.vue'
  import ProductInfoDetails from '~/components/ProductInfoDetails.vue'
  import { useRuntimeConfig } from 'nuxt/app'

  const route = useRoute()
  const product = ref<Product | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)
  const config = useRuntimeConfig()
  const fetchProduct = async () => {
    loading.value = true
    error.value = null
    const id = Number(route.params.id)

    if (!id || Number.isNaN(id) || id <= 0) {
      error.value = 'Invalid product id'
      loading.value = false
      return
    }

    try {
      const res = await fetch(`${config.public.apiBase}/products/${id}`)
      if (!res.ok) throw new Error('Failed to fetch product')
      product.value = await res.json()
    } catch (err) {
      error.value = (err as Error).message || 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchProduct)
  console.log(config.public.apiBase)
  const descriptionContent = defineComponent({
    setup: () => () => h('p', product.value?.description ?? ''),
  })

  const reviewTabRef = ref<InstanceType<typeof ReviewTab> | null>(null)
  const reviewsCount = computed(() => reviewTabRef.value?.reviewsCount ?? 0)

  const reviewsContent = defineComponent({
    setup: () => () =>
      h(ReviewTab, {
        ref: reviewTabRef,
        productId: product.value?.id ?? 0,
        productTitle: product.value?.title ?? '',
      }),
  })

  const tabs = computed(() => [
    { title: 'Description', component: descriptionContent },
    { title: 'Additional information', component: ProductInfoDetails },
    { title: `Reviews (${reviewsCount.value})`, component: reviewsContent },
  ])

  const activeTab = ref(0)
</script>

<template>
  <div v-if="loading" class="product__spinner">
    <div></div>
  </div>
  <div v-else-if="error" class="product__error">{{ error }}</div>

  <section v-else class="product">
    <div class="product__content">
      <ProductGallery class="product__gallery" />
      <ProductInfo :product="product" class="product__info" />
    </div>

    <BaseTabs v-model="activeTab" class="product__tabs" :items="tabs" type="default" />
    <BaseAccordeon class="product__accordeon" :items="tabs" />

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

    &__error {
      width: 100%;
      height: 200px;
      margin-top: 25%;
      font-family: $font-dm-sans;
      font-size: 20px;
      color: $red;
      text-align: center;
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
