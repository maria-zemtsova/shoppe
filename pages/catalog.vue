<script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import ProductFilters from '~/components/ProductFilters.vue'
  import ProductList from '~/components/ProductList.vue'
  import type { Product } from '~/types/product'

  const route = useRoute()
  const router = useRouter()

  const filters = ref({
    searchQuery: '',
    category: '',
    sortBy: '',
    priceRange: [0, 500] as [number, number],
    inStock: false,
    discountPercentage: 0,
  })

  onMounted(() => {
    const query = route.query
    filters.value = {
      searchQuery: query.searchQuery?.toString() || '',
      category: query.category?.toString() || '',
      sortBy: query.sortBy?.toString() || '',
      priceRange:
        query.priceMin && query.priceMax
          ? [Number(query.priceMin), Number(query.priceMax)]
          : [0, 500],
      discountPercentage: query.discountPercentage ? Number(query.discountPercentage) : 0,
      inStock: query.inStock === 'true',
    }
  })

  watch(
    filters,
    (newFilters) => {
      router.replace({
        query: {
          searchQuery: newFilters.searchQuery || undefined,
          category: newFilters.category || undefined,
          sortBy: newFilters.sortBy || undefined,
          priceMin: String(newFilters.priceRange[0]),
          priceMax: String(newFilters.priceRange[1]),
          discountPercentage:
            newFilters.discountPercentage > 0 ? String(newFilters.discountPercentage) : undefined,
          inStock: newFilters.inStock ? 'true' : undefined,
        },
      })
    },
    { deep: true },
  )

  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const productError = ref<string | null>(null)

  const fetchProducts = async () => {
    try {
      isLoading.value = true
      productError.value = null

      const baseUrl = 'https://fakestoreapi.com/products'
      const url = filters.value.category
        ? `${baseUrl}/category/${encodeURIComponent(filters.value.category)}`
        : baseUrl

      const res = await fetch(url)
      if (!res.ok) throw new Error('Ошибка загрузки товаров')

      let data: Product[] = await res.json()

      data = data.map((p) => {
        let discount = 0
        if (p.price < 50) discount = 0
        else if (p.price < 100) discount = 10
        else if (p.price < 200) discount = 15

        return {
          ...p,
          discountPercentage: discount,
          inStock: p.rating.count > 2,
        }
      })
      products.value = data
    } catch (e) {
      productError.value = e instanceof Error ? e.message : 'Неизвестная ошибка'
    } finally {
      isLoading.value = false
    }
  }

  watch(
    () => filters.value.category,
    () => {
      fetchProducts()
    },
    { immediate: true },
  )

  const filteredProducts = computed(() => {
    return products.value
      .filter((p) => p.title.toLowerCase().includes(filters.value.searchQuery.toLowerCase()))
      .filter(
        (p) => p.price >= filters.value.priceRange[0] && p.price <= filters.value.priceRange[1],
      )
      .filter(
        (p) =>
          filters.value.discountPercentage === 0 ||
          p.discountPercentage >= filters.value.discountPercentage,
      )
      .filter((p) => !filters.value.inStock || p.inStock)
      .sort((a, b) => {
        if (filters.value.sortBy === 'price') return a.price - b.price
        return 0
      })
  })
</script>

<template>
  <section class="catalog">
    <h2 class="catalog__title">Shop</h2>
    <div class="catalog__content">
      <ProductFilters v-model="filters" />
      <ProductList :products="filteredProducts" :is-loading="isLoading" :error="productError" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .catalog {
    margin-top: 96px;
    margin-bottom: 40px;
    font-family: $font-dm-sans;
    color: $black;

    @media (max-width: $breakpoints-m) {
      margin-top: 24px;
    }

    &__title {
      margin-top: 0;
      margin-bottom: 40px;
      font-size: 34px;
      font-weight: 600;
      line-height: 44px;

      @media (max-width: $breakpoints-m) {
        margin-bottom: 16px;
        font-size: 20px;
        line-height: 26px;
      }
    }

    &__content {
      display: grid;
      grid-template-columns: 22fr 76fr;
      gap: 34px;

      @media (max-width: $breakpoints-xl) {
        gap: 90px;
      }

      @media (max-width: $breakpoints-l) {
        gap: 34px;
      }

      @media (max-width: $breakpoints-m) {
        display: block;
      }
    }
  }
</style>
