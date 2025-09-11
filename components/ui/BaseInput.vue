<script setup lang="ts">
  interface Props {
    type?: string
    placeholder?: string
    error?: string
  }

  defineProps<Props>()

  const model = defineModel<string>()
</script>

<template>
  <div>
    <div class="input__wrapper">
      <input v-model="model" class="input" :type="type" :placeholder="placeholder" />
      <slot />
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
  .input__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 13px;
    font-family: $font-dm-sans;
    border-bottom: 1px solid $black;

    @media (max-width: $breakpoints-m) {
      min-width: 288px;
      max-width: 288px;
    }
  }

  .input {
    width: 245px;
    padding: 0;
    font-size: 16px;
    color: $dark-gray;
    border: none;

    @media (max-width: $breakpoints-m) {
      font-size: 12px;
    }
  }

  .input:focus {
    color: $black;
    outline: none;
    box-shadow: none;
  }

  .error-message {
    margin-top: 8px;
    font-family: $font-dm-sans;
    font-size: 12px;
    color: $red;
  }
</style>
