<script setup lang="ts">
  import BaseButton from '~/components/ui/BaseButton.vue'
  import { useCartStore } from '@/stores/cart'

  const props = defineProps<{
    quantity?: number // локальный режим
    itemId?: number // корзина
  }>()

  const emit = defineEmits<{
    (e: 'update:quantity', value: number): void
  }>()

  const cartStore = useCartStore()

  // локальная переменная для локального режима (fallback)
  let localQuantity = props.quantity ?? 1

  const currentQuantity = () => {
    // если передан quantity (v-model) — берем его, иначе локальный
    return props.quantity ?? localQuantity
  }

  const handleDecrease = () => {
    if (props.itemId != null) {
      // корзина
      cartStore.decreaseQuantity(props.itemId)
    } else {
      if (localQuantity > 1) localQuantity--
      emit('update:quantity', localQuantity)
    }
  }

  const handleIncrease = () => {
    if (props.itemId != null) {
      const item = cartStore.items.find((i) => i.id === props.itemId)
      if (item) cartStore.increaseQuantity(item)
    } else {
      localQuantity++
      emit('update:quantity', localQuantity)
    }
  }
</script>

<template>
  <div class="quantity">
    <BaseButton class="quantity__button" text="-" @click="handleDecrease" />
    <p>{{ currentQuantity() }}</p>
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
