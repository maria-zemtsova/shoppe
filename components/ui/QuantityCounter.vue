<script setup lang="ts">
  import BaseButton from '~/components/ui/BaseButton.vue'

  const quantity = defineModel<number>('quantity', { default: 1 })

  const handleDecrease = () => {
    if (quantity.value > 1) quantity.value--
  }

  const handleIncrease = () => {
    quantity.value++
  }
</script>

<template>
  <div class="quantity">
    <BaseButton class="quantity__button" text="-" @click="handleDecrease" />
    <p>{{ quantity }}</p>
    <BaseButton class="quantity__button" text="+" @click="handleIncrease" />
  </div>
</template>

<style lang="scss" scoped>
  .quantity {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 102px;
    height: 34px;
    font-size: 16px;
    line-height: 28px;
    color: $dark-gray;
    background-color: $light-gray;
    border-radius: 4px;

    @media (max-width: $breakpoints-m) {
      width: 84px;
      height: 34px;
    }

    &__button {
      font-family: $font-dm-sans;
      color: $dark-gray;
      background-color: transparent;
      border: none;
    }

    p {
      font-family: $font-dm-sans;
    }
  }
</style>
