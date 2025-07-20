<script lang="ts" setup>
  import { watch } from 'vue'
  import BaseButton from '~/components/ui/BaseButton.vue'

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
</script>

<template>
  <section v-if="modelValue" class="notification">
    <div>
      <img class="notification__icon" src="/assets/tick.svg" width="20" height="20" alt="tick" />
      <p class="notification__message">{{ message }}</p>
    </div>
    <BaseButton class="notification__button" tag="nuxt-link" to="/cart" text="View cart" />
  </section>
</template>

<style lang="scss">
  .notification {
    position: fixed;
    top: 107px;
    left: 50%;
    z-index: 2;
    display: flex;
    gap: 58%;
    justify-content: center;
    width: 86%;
    color: $black;
    background-color: $light-gray;
    border-radius: 4px;
    transform: translateX(-50%);
    animation: fade-in-out 3s ease-in-out;

    @media (max-width: $breakpoints-l) {
      left: 50%;
      gap: 52%;
      width: 80%;
    }

    @media (max-width: $breakpoints-m) {
      gap: 20%;
      width: 90%;
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
    }

    &__icon {
      width: 20px;
      height: 20px;

      @media (max-width: $breakpoints-l) {
        width: 16px;
        height: 16px;
      }
    }

    &__message {
      font-size: 16px;

      @media (max-width: $breakpoints-l) {
        width: 135px;
        font-size: 12px;
        line-height: 20px;
      }
    }

    &__button {
      font-size: 16px;
      font-weight: bold;
      color: $accent;
      text-transform: uppercase;
      border: none;

      @media (max-width: $breakpoints-l) {
        width: 68px;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
</style>
