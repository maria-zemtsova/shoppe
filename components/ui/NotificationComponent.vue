<script lang="ts" setup>
  import { watch } from 'vue'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import { useCartStore } from '~/stores/cart'

  const cartStore = useCartStore()

  const props = defineProps<{
    message: string
    modelValue: boolean
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

  const NOTIFICATION_DURATION = 3000

  watch(
    () => props.modelValue,
    (visible) => {
      if (visible) {
        setTimeout(() => {
          emit('update:modelValue', false)
        }, NOTIFICATION_DURATION)
      }
    },
  )

  const openSidebar = () => {
    cartStore.isSidebarOpen = true
    emit('update:modelValue', false)
  }
</script>

<template>
  <section v-if="modelValue" class="notification">
    <div>
      <img class="notification__icon" src="/assets/tick.svg" width="20" height="20" alt="tick" />
      <p class="notification__message">{{ message }}</p>
    </div>
    <BaseButton class="notification__button" tag="button" text="View cart" @click="openSidebar" />
  </section>
</template>

<style lang="scss">
  .notification {
    position: fixed;
    top: 107px;
    left: 50%;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    width: 80%;
    padding: 24px;
    font-family: $font-dm-sans;
    color: $black;
    background-color: $light-gray;
    border-radius: 4px;
    transform: translateX(-50%);
    animation: fade-in-out 3s ease-in-out;

    @media (max-width: $breakpoints-l) {
      left: 50%;
    }

    @media (max-width: $breakpoints-m) {
      align-items: flex-start;
      padding: 16px;
    }

    @keyframes fade-in-out {
      0% {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
      }

      10% {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      90% {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      100% {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
      }
    }

    div {
      display: flex;
      gap: 16px;
      align-items: center;

      @media (max-width: $breakpoints-l) {
        gap: 8px;
      }

      @media (max-width: $breakpoints-m) {
        align-items: flex-start;
      }
    }

    &__icon {
      width: 20px;
      height: 20px;

      @media (max-width: $breakpoints-l) {
        width: 16px;
        height: 16px;
        padding-top: 2px;
      }
    }

    &__message {
      margin: 0;
      font-size: 16px;
      font-weight: 400;

      @media (max-width: $breakpoints-l) {
        width: 135px;
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 0.2px;
      }
    }

    &__button {
      font-size: 16px;
      font-weight: bold;
      color: $accent;
      text-transform: uppercase;
      border: none;

      &:hover,
      &:active {
        color: $black;
      }

      @media (max-width: $breakpoints-l) {
        width: 68px;
        font-size: 12px;
        line-height: 20px;
      }

      @media (max-width: $breakpoints-m) {
        width: 100px;
        font-weight: 400;
      }
    }
  }
</style>
