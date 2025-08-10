<script setup lang="ts">
  import DropdownIcon from '~/components/icons/DropdownIcon.vue'
  import { ref } from 'vue'

  interface DropdownOption {
    id: number
    value: string
    label: string
  }

  defineProps<{
    options: DropdownOption[]
    placeholder: string
    modelValue?: string
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const selectOption = (option: DropdownOption) => {
    emit('update:modelValue', option.value)
    isOpen.value = false
  }
  const isOpen = ref()
</script>
<template>
  <div class="dropdown">
    <button class="dropdown__trigger" aria-label="Open dropdown menu" @click="isOpen = !isOpen">
      <span class="dropdown__placeholder">{{ placeholder }}</span>
      <DropdownIcon class="dropdown__icon" />
    </button>
    <ul v-if="isOpen" class="dropdown__list">
      <li
        v-for="option in options"
        :key="option.id"
        class="dropdown__item"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  .dropdown {
    margin-bottom: 16px;

    &__trigger {
      display: flex;
      gap: 168px;
      align-items: center;
      justify-content: center;
      width: 260px;
      height: 52px;
      padding: 0;
      cursor: pointer;
      background-color: transparent;
      border: 1px solid $gray;
      border-radius: 4px;

      @media (max-width: $breakpoints-m) {
        gap: 180px;
        width: 288px;
      }
    }

    &__placeholder {
      font-family: $font-dm-sans;
      font-size: 14px;
      line-height: 22px;
    }

    &__list {
      padding: 0;
      padding-left: 12px;
      list-style: none;
    }

    &__item {
      margin-bottom: 10px;
      font-family: $font-dm-sans;
      font-size: 12px;
      line-height: 20px;
      color: $dark-gray;
      cursor: pointer;
    }

    &__item:hover {
      color: $accent;
    }
  }
</style>
