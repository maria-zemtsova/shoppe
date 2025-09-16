<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Autoplay } from 'swiper/modules'
  import 'swiper/css'
  import ProductCard from '~/components/ProductCard.vue'
  import type { Product } from '~/types/product'

  interface Props {
    category: string
    currentId: number
  }

  const props = defineProps<Props>()
  const similars = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const modules = [Autoplay]
  const SWIPER_AUTOPLAY_DELAY = 2500
  const SWIPER_BRAKEPOINT = 12
  const SWIPER_BRAKEPOINT_XL = 54
  const fetchSimilars = async () => {
    if (!props.category) return
    loading.value = true
    error.value = null
    try {
      const categoryEncoded = encodeURIComponent(props.category)
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products/category/${categoryEncoded}`,
      )
      if (!res.ok) throw new Error('Failed to fetch similar products')
      const data: Product[] = await res.json()
      similars.value = data.filter((p) => p.id !== props.currentId)
    } catch (err) {
      error.value = (err as Error).message || 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    await fetchSimilars()
  })
  watch(() => props.category, fetchSimilars)
</script>

<template>
  <div class="similars">
    <h3 class="similars__title">Similar Items</h3>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="similars.length === 0">Nothing was found</div>
    <Swiper
      v-else
      :modules="modules"
      :loop="true"
      :autoplay="{ delay: SWIPER_AUTOPLAY_DELAY, disableOnInteraction: false }"
      :spaceBetween="SWIPER_BRAKEPOINT"
      :slidesPerView="'auto'"
      :breakpoints="{
        600: { spaceBetween: SWIPER_BRAKEPOINT },
        1200: { spaceBetween: SWIPER_BRAKEPOINT_XL },
      }"
    >
      <SwiperSlide v-for="item in similars" :key="item.id" class="similars__slide">
        <ProductCard :product="item" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
<style scoped lang="scss">
  .similars {
    margin-top: 66px;
    margin-bottom: 250px;

    @media (max-width: $breakpoints-l) {
      margin-top: 14px;
      margin-bottom: 40px;
    }

    &__title {
      margin: 0;
      margin-bottom: 48px;
      font-size: 26px;
      font-weight: 400;
      line-height: 36px;

      @media (max-width: $breakpoints-l) {
        font-size: 16px;
        line-height: 27px;
      }
    }

    &__slide {
      display: flex;
      flex: 0 0 auto;
      align-items: flex-start;
      justify-content: center;
      width: 380px;

      @media (max-width: $breakpoints-l) {
        width: 200px;
      }

      @media (max-width: $breakpoints-m) {
        width: 136px;
        height: 188px;
      }
    }

    :deep(.card__image-wrapper) {
      position: relative;
      width: 380px;
      height: 380px;
      overflow: hidden;

      @media (max-width: $breakpoints-l) {
        width: 200px;
        height: 200px;
      }

      @media (max-width: $breakpoints-m) {
        width: 136px;
        height: 136px;
      }
    }

    :deep(.card__image) {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    :deep(.card__badge) {
      display: none;
    }

    :deep(.card__product-title) {
      margin-top: 24px;

      @media (max-width: $breakpoints-m) {
        margin-top: 6px;
      }
    }

    &__empty {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      font-size: 16px;
      color: $gray;
    }
  }
</style>
