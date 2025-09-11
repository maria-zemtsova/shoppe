<script setup lang="ts">
  import { ref } from 'vue'
  import { useCartStore } from '~/stores/cart'
  import type { Product } from '~/types/product'
  import QuantityCounter from '~/components/ui/QuantityCounter.vue'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import NotificationComponent from '~/components/ui/NotificationComponent.vue'

  const props = defineProps<{ product: Product }>()
  const cartStore = useCartStore()
  const quantity = ref(1)
  const isNotificationVisible = ref(false)

  const addToCart = () => {
    cartStore.increaseQuantity(props.product)
    if (quantity.value > 1) {
      cartStore.updateQuantity(props.product.id, quantity.value)
    }
    isNotificationVisible.value = true
  }
</script>

<template>
  <div class="info__actions">
    <QuantityCounter v-model:quantity="quantity" class="info__counter" />
    <BaseButton text="Add to cart" tag="button" class="info__button" @click="addToCart" />
    <NotificationComponent
      v-model="isNotificationVisible"
      message="The item was added to your Shopping bag."
    />
  </div>
</template>

<style lang="scss" scoped>
  .info {
    &__actions {
      display: flex;
      gap: 24px;
      align-items: center;
      justify-content: center;
      margin-bottom: 48px;

      @media (max-width: $breakpoints-l) {
        order: 3;
        margin-bottom: 24px;
      }

      @media (max-width: $breakpoints-m) {
        gap: 16px;
        margin-bottom: 20px;
      }
    }

    &__counter {
      width: 102px;
      height: 54px;

      @media (max-width: $breakpoints-l) {
        display: none;
      }
    }

    &__button {
      width: 360px;
      height: 54px;
      font-size: 16px;
      font-weight: 700;
      color: $black;
      text-transform: uppercase;
      background-color: transparent;
      border: 1px solid $black;
      border-radius: 4px;

      @media (max-width: $breakpoints-l) {
        width: 100%;
      }

      @media (max-width: $breakpoints-m) {
        height: 32px;
        font-size: 12px;
        font-weight: 400;
      }
    }

    &__button:hover {
      color: $white;
      background-color: $black;
    }
  }
</style>
