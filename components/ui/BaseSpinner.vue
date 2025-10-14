<script setup lang="ts">
  defineProps<{
    height: string
  }>()
</script>

<template>
  <div class="spinner" :style="{ height }">
    <div class="spinner__circle"></div>
  </div>
</template>

<style lang="scss" scoped>
  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 600px;

    &__circle {
      width: 50px;
      height: 50px;
      border: 4px solid $light-gray;
      border-top-color: $accent;
      border-radius: 50%;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  }
</style>
