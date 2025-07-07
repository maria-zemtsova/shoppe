<script lang="ts" setup>
  import { ref, onBeforeMount } from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Autoplay, Pagination } from 'swiper/modules'
  import type { SwiperOptions } from 'swiper/types'
  import TextSlider from './TextSlider.vue'

  import 'swiper/scss'
  import 'swiper/scss/navigation'
  import 'swiper/scss/pagination'

  const carouselImages = ref<string[]>([])
  const carouselError = ref<string | null>(null)
  const isLoading = ref<boolean>(true)

  const swiperModules: SwiperOptions['modules'] = [Autoplay, Pagination]

  const paginationConfig: SwiperOptions['pagination'] = {
    clickable: true,
    type: 'bullets',
  }

  const autoplayConfig = {
    delay: 5000,
    pauseOnMouseEnter: true,
  }

  onBeforeMount(async () => {
    try {
      isLoading.value = true
      const responses = await Promise.all(
        Array.from({ length: 10 }, async () => {
          const res = await fetch('https://picsum.photos/1000/600')
          return res.ok ? res.url : Promise.reject('Download error')
        }),
      )
      carouselImages.value = responses
    } catch (err) {
      carouselError.value = err instanceof Error ? err.message : 'Download error'
    } finally {
      isLoading.value = false
    }
  })
</script>
<template>
  <section class="carousel">
    <div v-if="isLoading" class="carousel__spinner">
      <div></div>
    </div>
    <div v-else-if="carouselError" class="carousel__error">{{ carouselError }}</div>
    <Swiper
      v-else="carouselImages.length > 0"
      :modules="swiperModules"
      :slides-per-view="1"
      :loop="true"
      :pagination="paginationConfig"
      :autoplay="autoplayConfig"
    >
      <SwiperSlide v-for="image in carouselImages">
        <img class="carousel__image" :src="image" width="1200" height="600" loading="lazy" />
        <TextSlider class="carousel__description" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style lang="scss" scoped>
  .carousel {
    width: 1200px;
    height: 600px;
    margin-top: 18px;

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
      font-family: $font-dm-sans;
      font-size: 33px;
      color: $red;
      text-align: center;
    }

    &__image {
      border: none;
      border-radius: 16px;
    }

    &__description {
      position: absolute;
      top: 226px;
      left: 39px;
    }
  }

  // pagination settings

  :deep(.swiper-pagination) {
    bottom: 24px !important;
  }

  :deep(.swiper-pagination-bullet) {
    width: 9.14px;
    height: 9.14px;
    margin-right: 13px !important;
    background-color: $white;
    opacity: 1;
  }

  :deep(.swiper-pagination-bullet-active) {
    width: 16px;
    height: 16px;
    background-color: transparent;
    border: 1px solid $white;
  }
</style>
