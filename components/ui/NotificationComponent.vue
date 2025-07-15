<script lang="ts" setup>
  import { ref } from 'vue'

  defineProps<{
    message: string
  }>()

  const isVisible = ref(false)
  const NOTIFICATION_DURATION = 3000

  const show = () => {
    isVisible.value = true
    setTimeout(() => {
      isVisible.value = false
    }, NOTIFICATION_DURATION)
  }

  defineExpose({ show })
</script>

<template>
  <section v-if="isVisible" class="notification">
    <div>
      <img
        class="notification__icon"
        src="/assets/tick.png"
        width="20px"
        height="20px"
        alt="tick"
      />
      <p class="notification__message">{{ message }}</p>
    </div>

    <button class="notification__button">View cart</button>
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
      display: inline-block;
      padding: 0;
      font-size: 16px;
      font-weight: bold;
      color: $accent;
      text-transform: uppercase;
      background: transparent;
      border: none;

      @media (max-width: $breakpoints-l) {
        width: 68px;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
</style>
