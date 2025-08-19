<script lang="ts" setup>
  import { useCartStore } from '@/stores/cart'
  import { onMounted, onBeforeUnmount } from 'vue'
  import { BackIcon } from '~/components/icons'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import CartItem from '~/components/CartItem.vue'

  const cartStore = useCartStore()

  const closeSidebar = () => {
    cartStore.isSidebarOpen = false
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeSidebar()
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeyDown)
    cartStore.init()
  })
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeyDown))
</script>

<template>
  <Transition name="slide">
    <aside v-if="cartStore.isSidebarOpen" class="cart">
      <div class="cart__header">
        <BackIcon class="cart__back-icon" @click="cartStore.toggleSidebar()" />
        <h2 class="cart__title">Shopping bag</h2>
      </div>

      <p class="cart__amount">{{ cartStore.totalItems }} items</p>

      <TransitionGroup class="cart__list" name="fade" tag="ul">
        <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
      </TransitionGroup>

      <hr class="cart__line" />
      <div class="cart__subtotal">
        <p>Subtotal ({{ cartStore.totalItems }} items)</p>
        <p>{{ cartStore.totalPrice.toFixed(2) }}</p>
      </div>
      <BaseButton class="cart__link" text="checkout" tag="nuxt-link" to="#" />
    </aside>
  </Transition>
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
      fill: $black;

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

    &__line {
      width: 360px;
      height: 1px;
      margin-top: 40px;
      margin-left: -36px;
      background-color: $gray;
      border: none;

      @media (max-width: $breakpoints-m) {
        margin-left: -16px;
      }
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
        width: 100%;
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
</style>

<style lang="scss">
  // animation
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
</style>
