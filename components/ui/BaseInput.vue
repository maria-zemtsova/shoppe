<script setup lang="ts">
  interface Props {
    type?: string
    placeholder?: string
    modelValue?: string
    error?: string
  }

  const props = defineProps<Props>()
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()
</script>

<template>
  <div>
    <div class="input__wrapper">
      <input
        class="input"
        :type="props.type"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <slot />
    </div>
    <span v-if="props.error" class="error-message">{{ props.error }}</span>
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

    @media (width <= 600px) {
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

    @media (width <= 600px) {
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
