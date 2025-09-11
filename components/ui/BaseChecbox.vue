<script setup lang="ts">
  defineProps<{
    label: string
  }>()
  const modelValue = defineModel<boolean>('modelValue', { default: false })

  const toggle = () => {
    modelValue.value = !modelValue.value
  }
</script>

<template>
  <label class="checkbox">
    <input type="checkbox" class="checkbox__input" :checked="modelValue" @change="toggle" />
    <span class="checkbox__custom"></span>
    <span class="checkbox__label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
  .checkbox {
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
    user-select: none;

    &__input {
      position: absolute;
      pointer-events: none;
      opacity: 0;
    }

    &__custom {
      box-sizing: border-box;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      padding-bottom: 2px;
      border: 1px solid $black;
      border-radius: 1px;
      transition: all 0.2s ease;

      &::after {
        width: 8px;
        height: 4px;
        content: '';
        border-bottom: 1px solid $black;
        border-left: 1px solid $black;
        opacity: 0;
        transform: rotate(-45deg) scale(0);
        transition: all 0.2s ease;
      }
    }

    &__input:checked + .checkbox__custom::after {
      opacity: 1;
      transform: rotate(-45deg) scale(1);
    }

    &__label {
      font-size: 12px;
      line-height: 18px;
      vertical-align: middle;
      color: $dark-gray;
    }
  }
</style>
