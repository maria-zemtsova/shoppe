<script lang="ts" setup>
  import { useCartStore } from '@/stores/cart'
  import BaseButton from './ui/BaseButton.vue'
  import { CloseIcon } from './icons'
  const cart = useCartStore()
  import { onMounted, onBeforeUnmount } from 'vue'
  import type { CartItem } from '@/stores/cart'
  import { BackIcon } from './icons'

  const decreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      cart.updateQuantity(item.id, item.quantity - 1)
    } else {
      cart.removeItem(item.id)
    }
  }
  const closeSidebar = () => {
    cart.isSidebarOpen = false
  }
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeSidebar()
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeyDown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeyDown)
  })
</script>

<template>
  <div v-if="cart.isSidebarOpen" class="overlay" @click.self="closeSidebar">
    <Transition name="slide">
      <aside v-if="cart.isSidebarOpen" class="cart">
        <div class="cart__header">
          <BackIcon class="cart__back-icon" />

          <h2 class="cart__title">Shopping bag</h2>
        </div>

        <p class="cart__amount">{{ cart.totalItems }} items</p>
        <ul class="cart__list">
          <TransitionGroup name="fade" tag="div">
            <li v-for="item in cart.items" :key="item.id" class="cart__item">
              <img class="cart__image" :src="item.image" :alt="item.title" />
              <div class="cart__content">
                <div class="cart__info">
                  <h3 class="cart__product-title">{{ item.title }}</h3>
                  <p class="cart__description">{{ item.category }}</p>
                  <p class="cart__price">Price: $ {{ item.price }}</p>
                </div>
                <div class="cart__actions">
                  <button class="cart__remove" @click="cart.removeItem(item.id)">
                    <CloseIcon class="cart__icon" />
                  </button>
                  <div class="cart__quantity">
                    <BaseButton class="cart__button" text="-" @click="decreaseQuantity(item)" />
                    <p>{{ item.quantity }}</p>
                    <BaseButton class="cart__button" text="+" @click="cart.addItem(item)" />
                  </div>
                </div>
              </div>
            </li>
          </TransitionGroup>
        </ul>
        <hr class="cart__line" />
        <div class="cart__subtotal">
          <p>Subtotal ({{ cart.totalItems }} items)</p>
          <p>{{ cart.totalPrice }}</p>
        </div>
        <BaseButton class="cart__link" text="checkout" tag="nuxt-link" to="#" />
      </aside>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
  .cart {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    box-sizing: border-box;
    width: 360px;
    height: 100%;
    padding: 72px 36px;
    font-family: $font-dm-sans;
    background-color: $white;
    border: solid 1px $gray;

    @media (max-width: $breakpoints-m) {
      padding: 12px 16px;
    }

    &__header {
      margin: 0;

      @media (max-width: $breakpoints-m) {
        display: flex;
        gap: 84px;
        align-items: center;
        justify-content: start;
      }
    }

    &__back-icon {
      display: none;

      @media (max-width: $breakpoints-m) {
        display: block;
      }
    }

    &__title {
      margin: 0;
      font-size: 16px;
      font-weight: 400;
      line-height: 28px;
    }

    &__amount {
      margin-top: 18px;
      margin-bottom: 4px;
      font-size: 12px;
      line-height: 20px;
      color: $dark-gray;
    }

    &__list {
      padding: 0;
      list-style: none;
    }

    &__item {
      position: relative;
      display: flex;
      gap: 8px;
      justify-content: space-between;
      margin-bottom: 22px;
    }

    &__image {
      width: 136px;
      height: 136px;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__info {
      flex: 1;
    }

    &__product-title {
      width: 80%;
      margin: 0;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;

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
      font-family: $font-dm-sans;
      font-size: 16px;
      line-height: 28px;
      color: $dark-gray;
      background-color: $light-gray;
      border-radius: 4px;

      @media (max-width: $breakpoints-m) {
        width: 84px;
        height: 34px;
      }
    }

    &__button,
    &__remove {
      background-color: transparent;
      border: none;
    }

    &__icon {
      width: 8px;
      height: 8px;
      color: $black;
    }

    &__line {
      width: 360px;
      height: 1px;
      margin-top: 40px;
      margin-left: -36px;
      background-color: $gray;
      border: none;
    }

    &__subtotal {
      display: flex;
      justify-content: space-between;
      margin-top: 22px;
      font-size: 16px;
      line-height: 28px;

      @media (max-width: $breakpoints-m) {
        font-size: 12px;
        line-height: 20px;
      }
    }

    &__link {
      width: 288px;
      height: 54px;
      margin-top: 22px;
      color: $black;
      text-transform: uppercase;
      background-color: transparent;
      border: 1px solid $black;
      border-radius: 4px;

      @media (max-width: $breakpoints-m) {
        height: 32px;
        margin-top: 16px;
        font-size: 12px;
      }
    }

    &__link:hover {
      color: $white;
      background-color: $black;
    }
  }

  .overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background-color: rgb(0 0 0 / 50%);
  }

  .slide-enter-from {
    transform: translateX(100%);
  }

  .slide-enter-to {
    transform: translateX(0);
  }

  .slide-leave-from {
    transform: translateX(0);
  }

  .slide-leave-to {
    transform: translateX(100%);
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }

  .fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }

  .fade-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }
</style>
