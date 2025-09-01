<script lang="ts" setup>
  import { computed } from 'vue'
  import { StarIconFill, StarIconEmpty } from '~/components/icons/index'

  const props = defineProps<{
    rating: number
    max?: number
  }>()

  const maxStars = props.max ?? 5

  const stars = computed(() => {
    const fullStars = Math.floor(props.rating)
    const partialStar = props.rating - fullStars
    const emptyStars = maxStars - fullStars - (partialStar > 0 ? 1 : 0)
    return { fullStars, partialStar, emptyStars }
  })
</script>

<template>
  <div class="rating">
    <StarIconFill v-for="n in stars.fullStars" :key="'full-' + n" class="rating__icon" />
    <StarIconFill
      v-if="stars.partialStar > 0"
      class="rating__icon"
      :style="{ clipPath: `inset(0 ${100 - stars.partialStar * 100}% 0 0)` }"
    />
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
    }
  }
</style>
