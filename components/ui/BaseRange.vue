<script lang="ts" setup>
  import Slider from '@vueform/slider'
  import '@vueform/slider/themes/default.css'
  import debounce from 'lodash.debounce'

  const model = defineModel<[number, number]>({ required: true })

  const setValue = debounce((val: [number, number]) => {
    model.value = val
  }, 300)

  const formattedPrice = computed(() => {
    const format = (val: number) => '$' + Math.round(val)
    return `${format(model.value[0])} - ${format(model.value[1])}`
  })
</script>

<template>
  <div class="range__wrapper">
    <Slider
      v-model="model"
      class="range"
      :min="0"
      :max="1000"
      :tooltips="false"
      @update:modelValue="setValue"
    />
    <div class="range__price">Price: {{ formattedPrice }}</div>
  </div>
</template>

<style lang="scss" scoped>
  .range {
    width: 260px;
    margin-top: 40px;

    @media (max-width: $breakpoints-xl) {
      width: 900px;
    }

    @media (max-width: $breakpoints-l) {
      width: 600px;
    }

    @media (max-width: $breakpoints-m) {
      width: 288px;
    }

    &__price {
      margin-top: 8px;
      font-family: $font-dm-sans;
      font-size: 14px;
      line-height: 22px;
      color: $dark-gray;
    }
  }

  .range :deep(.slider-base) {
    height: 2px;
  }

  .range :deep(.slider-handle) {
    right: -2px;
    width: 2px;
    height: 10px;
    background: $black;
    border-radius: 0;
    box-shadow: none;
    transform: translateX(-50%);
  }

  .range :deep(.slider-touch-area) {
    width: 6px;
    height: 20px;
  }

  .range :deep(.slider-connects) {
    height: 2px;
    background-color: $gray;
    border-radius: 0;
  }

  .range :deep(.slider-connect) {
    height: 2px;
    background: $black;
  }
</style>
