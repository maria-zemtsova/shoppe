<script setup lang="ts">
  import { ref } from 'vue'
  import { StarIconEmpty, StarIconFill } from '~/components/icons'

  const rating = defineModel<number>('modelValue', { required: true })
  const props = defineProps<{
    max?: number
  }>()

  const maxStars = props.max ?? 5
  const hoverValue = ref(0)

  const setRating = (value: number) => {
    rating.value = value
  }

  const onHover = (value: number) => {
    hoverValue.value = value
  }

  const onLeave = () => {
    hoverValue.value = 0
  }
</script>

<template>
  <div class="score" @mouseleave="onLeave">
    <button
      v-for="star in maxStars"
      :key="star"
      class="score__star"
      type="button"
      @click="setRating(star)"
      @mouseenter="onHover(star)"
    >
      <component
        :is="
          hoverValue >= star || (hoverValue === 0 && rating >= star) ? StarIconFill : StarIconEmpty
        "
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
  .score {
    &__star {
      padding: 0;
      padding-right: 10px;
      margin: 0;
      cursor: pointer;
      background-color: transparent;
      border: none;

      @media (max-width: $breakpoints-l) {
        padding-right: 2px;

        svg {
          width: 10px;
          height: 10px;
        }
      }
    }
  }
</style>
