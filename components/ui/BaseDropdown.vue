<script setup lang="ts">
  import DropdownIcon from '~/components/icons/DropdownIcon.vue'
  import { ref, computed } from 'vue'

  const props = defineProps<{
    options: DropdownOption[]
    placeholder: string
    modelValue?: string
  }>()

  const model = defineModel<string | undefined>()

  interface DropdownOption {
    id: number
    value: string
    label: string
  }

  const selectOption = (option: DropdownOption) => {
    model.value = option.value
    isOpen.value = false
  }

  const selectedLabel = computed(() => {
    const selected = props.options.find((o) => o.value === model.value)
    return selected?.label || ''
  })
  const isOpen = ref(false)
</script>
<template>
  <div class="dropdown">
    <button
      class="dropdown__trigger"
      :class="{ 'dropdown__trigger--active': isOpen }"
      aria-label="Open dropdown menu"
      @click="isOpen = !isOpen"
    >
      <span class="dropdown__placeholder">{{ selectedLabel || placeholder }}</span>
      <DropdownIcon class="dropdown__icon" />
    </button>
    <transition name="dropdown">
      <ul v-show="isOpen" class="dropdown__list">
        <li
          v-for="option in options"
          :key="option.id"
          class="dropdown__item"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style lang="scss">
  .dropdown {
    margin-bottom: 16px;

    &__trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 260px;
      height: 52px;
      padding: 0;
      padding-right: 12px;
      padding-left: 12px;
      cursor: pointer;
      background-color: transparent;
      border: 1px solid $gray;
      border-radius: 4px;

      @media (max-width: $breakpoints-xl) {
        width: 440px;
      }

      @media (max-width: $breakpoints-l) {
        width: 290px;
      }

      @media (max-width: $breakpoints-m) {
        width: 288px;
      }
    }

    &__trigger--active {
      border: 1px solid $accent;
    }

    &__placeholder {
      font-family: $font-dm-sans;
      font-size: 14px;
      line-height: 22px;
    }

    &__list {
      padding: 12px;
      margin: 4px 0;
      list-style: none;
      background-color: $white;
      border: 1px solid $gray;
      border-radius: 4px;
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

  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }

  .dropdown-enter-to,
  .dropdown-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }
</style>
