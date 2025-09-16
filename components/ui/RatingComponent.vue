<script lang="ts" setup>
  import { computed } from 'vue'
  import { StarIconFill, StarIconEmpty } from '~/components/icons/index'

  const props = defineProps<{
    rating: number
    max?: number
  }>()

  const maxStars = props.max ?? 5

  const stars = computed(() => {
    const fullStars = Math.floor(Math.min(Math.max(props.rating, 0), maxStars))
    const emptyStars = maxStars - fullStars
    return { fullStars, emptyStars }
  })
</script>

<template>
  <div class="rating">
    <StarIconFill v-for="n in stars.fullStars" :key="'full-' + n" class="rating__icon" />
    <StarIconEmpty v-for="n in stars.emptyStars" :key="'empty-' + n" class="rating__icon" />
  </div>
</template>

<style lang="scss" scoped>
  .rating {
    display: flex;
    gap: 6px;
    align-items: center;

    &__icon {
      width: 18px;
      height: 18px;

      @media (max-width: $breakpoints-m) {
        width: 15px;
        height: 15px;
      }
    }
  }
</style>
