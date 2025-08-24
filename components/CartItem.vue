<script lang="ts" setup>
  import { useCartStore, type CartItemType } from '@/stores/cart'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import { RemoveIcon } from '~/components/icons'
  import { computed } from 'vue'

  const props = defineProps<{
    item: CartItemType
  }>()

  const cartStore = useCartStore()

  const handleDecrease = () => {
    cartStore.decreaseQuantity(props.item.id)
  }

  const handleIncrease = () => {
    cartStore.increaseQuantity(props.item)
  }

  const itemPriceFormatted = computed(() => props.item.price.toFixed(2))
</script>

<template>
  <li class="cart__item">
    <img class="cart__image" :src="item.image" :alt="item.title" />
    <div class="cart__content">
      <div class="cart__info">
        <h3 class="cart__product-title">{{ item.title }}</h3>
        <p class="cart__description">{{ item.category }}</p>
        <p class="cart__price">$ {{ itemPriceFormatted }}</p>
      </div>
      <div class="cart__actions">
        <button class="cart__remove" @click="cartStore.removeItem(item.id)">
          <RemoveIcon class="cart__icon" />
        </button>
        <div class="cart__quantity">
          <BaseButton class="cart__button" text="-" @click="handleDecrease" />
          <p>{{ item.quantity }}</p>
          <BaseButton class="cart__button" text="+" @click="handleIncrease" />
        </div>
      </div>
    </div>
  </li>
</template>
<style lang="scss" scoped>
  .cart {
    &__item {
      position: relative;
      display: grid;
      grid-template-columns: 136px 152px;
      gap: 6px;
      margin-bottom: 22px;

      @media (width <= 768px) {
        gap: 26px;
      }

      @media (max-width: $breakpoints-m) {
        gap: 6px;
      }
    }

    &__image {
      width: 136px;
      height: 136px;
      object-fit: contain;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 144px;

      @media (width <= 768px) {
        width: 200px;
      }

      @media (max-width: $breakpoints-m) {
        width: 144px;
      }
    }

    &__info {
      flex: 1;
    }

    &__product-title {
      width: 80%;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      white-space: nowrap;

      @media (max-width: $breakpoints-m) {
        font-size: 12px;
        line-height: 20px;
      }
    }

    &__description {
      margin: 0;
      font-size: 14px;
      line-height: 22px;
      color: $dark-gray;

      @media (max-width: $breakpoints-m) {
        font-size: 12px;
        line-height: 20px;
      }
    }

    &__price {
      margin: 0;
      font-size: 14px;
      line-height: 22px;
      color: $accent;

      @media (max-width: $breakpoints-m) {
        font-size: 12px;
        line-height: 20px;
      }
    }

    &__actions {
      position: absolute;
      right: 0;
      display: flex;
      flex-direction: column;
      gap: 92px;
      align-items: flex-end;
    }

    &__quantity {
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

      p,
      button {
        font-family: $font-dm-sans;
      }
    }

    &__button,
    &__remove {
      background-color: transparent;
      border: none;
    }

    &__button {
      color: $dark-gray;
    }

    &__remove {
      fill: $black;
    }

    &__icon {
      width: 8px;
      height: 8px;
      color: $black;
    }
  }
</style>
