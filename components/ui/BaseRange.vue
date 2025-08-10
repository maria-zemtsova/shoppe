<script lang="ts" setup>
  import Slider from '@vueform/slider'
  import '@vueform/slider/themes/default.css'

  interface Props {
    modelValue: [number, number]
  }

  const props = defineProps<Props>()
  const emit = defineEmits<{
    (e: 'update:modelValue', value: [number, number]): void
  }>()

  const formatPrice = (value: number) => '$' + Math.round(value)
</script>

<template>
  <div class="range__wrapper">
    <Slider
      v-model="props.modelValue"
      class="range"
      :min="0"
      :max="1000"
      :tooltips="false"
      @update:modelValue="emit('update:modelValue', $event)"
    />
    <div class="range__price">
      Price: {{ formatPrice(props.modelValue[0]) }} - {{ formatPrice(props.modelValue[1]) }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .range {
    width: 260px;
    margin-top: 40px;

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
