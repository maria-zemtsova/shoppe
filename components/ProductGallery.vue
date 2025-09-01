<script lang="ts" setup>
  import type { ImageItem } from '~/types/image'
  import { ref } from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import type { Swiper as SwiperClass } from 'swiper'
  import { Thumbs, Scrollbar } from 'swiper/modules'
  import 'swiper/css'
  import 'swiper/css/thumbs'
  import 'swiper/css/pagination'
  import 'swiper/css/scrollbar'

  const imageList: ImageItem[] = [
    { id: 1, alt: 'Image 1', src: '/gallery/mock1.png' },
    { id: 2, alt: 'Image 2', src: '/gallery/mock2.png' },
    { id: 3, alt: 'Image 3', src: '/gallery/mock3.png' },
    { id: 4, alt: 'Image 4', src: '/gallery/mock4.png' },
  ]

  const thumbsSwiper = ref<SwiperClass | null>(null)
  const onThumbsSwiper = (swiper: SwiperClass) => {
    thumbsSwiper.value = swiper
  }
</script>

<template>
  <section class="gallery">
    <div class="gallery--desktop">
      <Swiper
        class="gallery__thumbs"
        :direction="'vertical'"
        :slides-per-view="4"
        :space-between="40"
        :modules="[Thumbs]"
        @swiper="onThumbsSwiper"
      >
        <SwiperSlide v-for="img in imageList" :key="img.id" class="gallery__item">
          <img class="gallery__image" :src="img.src" :alt="img.alt" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        class="gallery__main"
        :space-between="10"
        :modules="[Thumbs, Scrollbar]"
        :thumbs="{ swiper: thumbsSwiper || undefined }"
        :scrollbar="{ draggable: true }"
      >
        <SwiperSlide v-for="img in imageList" :key="img.id">
          <img :src="img.src" :alt="img.alt" class="gallery__main-image" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .gallery {
    width: 760px;

    @media (max-width: $breakpoints-l) {
      width: 100%;
    }

    &--desktop {
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }

    &__thumbs {
      flex-shrink: 0;
      width: 120px;
      height: 600px;

      @media (max-width: $breakpoints-xl) {
        display: none;
      }
    }

    &__item {
      width: 120px;
      height: 120px;
      cursor: pointer;
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-fit: contain;
    }

    &__main {
      flex: 1;
      width: 540px;
      height: 600px;

      @media (max-width: $breakpoints-l) {
        width: 100%;
      }

      @media (max-width: $breakpoints-xl) {
        width: 460px;
        height: 520px;
      }

      @media (max-width: $breakpoints-m) {
        width: 288px;
        height: 374px;
      }

      .swiper-wrapper,
      .swiper-slide {
        @media (max-width: $breakpoints-l) {
          display: flex;
          justify-content: center;
        }
      }
    }

    &__main-image {
      width: 540px;
      height: 600px;
      object-fit: contain;

      @media (max-width: $breakpoints-xl) {
        width: 460px;
        height: 520px;
      }

      @media (max-width: $breakpoints-m) {
        width: 288px;
        height: 374px;
      }
    }
  }
</style>
