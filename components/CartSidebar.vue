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
        <p>$ {{ cartStore.totalPrice }}</p>
      </div>
      <BaseButton class="cart__link" text="checkout" tag="nuxt-link" to="#" />
    </aside>
  </Transition>
  <Transition name="fade">
    <div v-if="cartStore.isSidebarOpen" class="cart-overlay" @click="closeSidebar"></div>
  </Transition>
</template>
<style lang="scss" scoped>
  .cart {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 3;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 360px;
    height: 100%;
    padding: 72px 36px;
    font-family: $font-dm-sans;
    letter-spacing: 0.4px;
    background-color: $white;
    border: solid 1px $gray;

    @media (width <= 768px) {
      width: 100%;
      max-width: 100%;
      padding: 60px 150px;
      border: none;
    }

    @media (max-width: $breakpoints-m) {
      padding: 60px;
    }

    @media (width <= 400px) {
      padding: 48px 16px 16px;
    }

    &__header {
      margin: 0;

      @media (width <= 768px) {
        display: flex;
        gap: 34%;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 20px;
      }

      @media (max-width: $breakpoints-s) {
        gap: 84px;
      }
    }

    &__back-icon {
      display: none;
      cursor: pointer;

      @media (width <= 768px) {
        display: block;
        width: 24px;
        height: 24px;
        fill: $black;
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
      flex: 1;
      padding: 0;
      margin: 0;
      overflow-y: auto;
      list-style: none;
    }

    &__line {
      width: 360px;
      height: 1px;
      margin-top: 40px;
      margin-left: -36px;
      background-color: $gray;
      border: none;

      @media (width <= 768px) {
        width: 100%;
        margin: 20px 0;
        margin-left: 0;
      }
    }

    &__subtotal {
      display: flex;
      flex-shrink: 0;
      justify-content: space-between;
      margin-top: 22px;
      font-size: 16px;
      font-weight: 500;
      line-height: 28px;
      letter-spacing: 16;

      @media (width <= 768px) {
        margin-top: 16px;
        font-size: 14px;
        line-height: 24px;

        p {
          margin: 0;
        }
      }
    }

    &__link {
      flex-shrink: 0;
      width: 288px;
      height: 54px;
      margin-top: 22px;
      color: $black;
      text-transform: uppercase;
      background-color: transparent;
      border: 1px solid $black;
      border-radius: 4px;

      @media (width <= 768px) {
        width: 100%;
        height: 48px;
        margin-top: 16px;
        font-size: 14px;
      }

      @media (max-width: $breakpoints-m) {
        height: 44px;
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

  .cart-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: calc(100% - 360px);
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
    backdrop-filter: blur(2px);

    @media (width <= 768px) {
      width: 100%;
      background-color: rgb(0 0 0 / 30%);
    }

    @media (max-width: $breakpoints-m) {
      display: block;

      /* Показываем оверлей на мобильных */
    }
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  /* Добавляем адаптацию для Transition на мобильных */
  @media (width <= 768px) {
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
  }
</style>
