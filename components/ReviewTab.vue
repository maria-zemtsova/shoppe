<script setup lang="ts">
  import { ref, watch, onMounted, computed } from 'vue'
  import ReviewForm from '~/components/ReviewForm.vue'
  import type { Review } from '~/types/review'
  import RatingComponent from '~/components/ui/RatingComponent.vue'
  const props = defineProps<{
    productId: string | number
    productTitle: string
  }>()

  const reviews = ref<Review[]>([])
  const storageKey = computed(() => `reviews_${props.productId}`)

  onMounted(() => {
    const stored = localStorage.getItem(storageKey.value)
    if (stored) {
      reviews.value = JSON.parse(stored)
    }
  })

  watch(
    reviews,
    (newVal) => {
      localStorage.setItem(storageKey.value, JSON.stringify(newVal))
    },
    { deep: true },
  )

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    reviews.value.push({
      ...review,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    })
  }

  const reviewTitle = computed(() => {
    const count = reviews.value.length
    const word = count === 1 ? 'Review' : 'Reviews'
    return `${count} ${word} for ${props.productTitle}`
  })

  defineExpose({
    reviewsCount: computed(() => reviews.value.length),
  })
</script>

<template>
  <section class="review">
    <div>
      <h3 class="review__title">{{ reviewTitle }}</h3>
      <ul class="review__list">
        <li v-for="review in reviews" :key="review.id" class="review__item">
          <div class="review__header">
            <span class="review__author">{{ review.name }}</span>
            <span class="review__date">{{ review.date }}</span>
          </div>
          <div class="review__rating">
            <RatingComponent :rating="review.rating" />
          </div>
          <p class="review__text">{{ review.text }}</p>
        </li>
      </ul>
    </div>
    <ReviewForm type="submit" @submit-review="addReview" />
  </section>
</template>

<style lang="scss" scoped>
  .review {
    display: flex;
    justify-content: space-between;

    @media (max-width: $breakpoints-xl) {
      gap: 8%;
      justify-content: center;
    }

    @media (max-width: $breakpoints-l) {
      display: block;
    }

    div {
      width: 580px;

      @media (max-width: $breakpoints-xl) {
        width: 46%;
      }

      @media (max-width: $breakpoints-l) {
        width: 100%;
      }
    }

    &__title {
      margin-bottom: 78px;
      font-size: 20px;
      font-weight: 400;
      line-height: 26px;
      color: $black;

      @media (max-width: $breakpoints-l) {
        margin-bottom: 30px;
        font-size: 16px;
        line-height: 20px;
      }

      @media (max-width: $breakpoints-m) {
        font-size: 12px;
      }
    }

    &__list {
      padding: 0;
      list-style: none;
    }

    &__item {
      margin-bottom: 24px;
      border-bottom: 1px solid $gray;
    }

    &__item:last-child {
      border-bottom: none;
    }

    &__header {
      margin-bottom: 16px;
    }

    &__author {
      padding-right: 16px;
      font-size: 20px;
      line-height: 26px;
      color: $black;

      @media (max-width: $breakpoints-l) {
        padding-right: 6px;
        font-size: 16px;
        line-height: 20px;
      }

      @media (max-width: $breakpoints-m) {
        font-size: 12px;
      }
    }

    &__date {
      font-size: 14px;
      line-height: 22px;
      color: $dark-gray;

      @media (max-width: $breakpoints-l) {
        font-size: 12px;
        line-height: 20px;
      }

      @media (max-width: $breakpoints-m) {
        font-size: 10px;
      }
    }

    &__rating {
      margin-bottom: 24px;

      svg {
        @media (max-width: $breakpoints-l) {
          width: 10px;
          height: 10px;
          padding-right: 2px;
        }
      }
    }

    &__text {
      width: 100%;
      height: auto;
      padding-bottom: 39px;
      margin: 0;
      word-wrap: break-word;
      white-space: pre-wrap;

      @media (max-width: $breakpoints-l) {
        font-size: 16px;
        line-height: 20px;
      }

      @media (max-width: $breakpoints-m) {
        padding-bottom: 20px;
        font-size: 12px;
      }
    }
  }
</style>
