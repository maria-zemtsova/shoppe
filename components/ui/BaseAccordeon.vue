<script setup lang="ts">
  import { ref, watch } from 'vue'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import { MoreIcon } from '~/components/icons/index'

  interface AccordionItem {
    title: string
  }

  const props = defineProps<{
    items: AccordionItem[]
    multiple?: boolean
    modelValue?: number | number[]
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: number | number[]): void
  }>()

  const active = ref(props.modelValue ?? (props.multiple ? [] : -1))

  watch(
    () => props.modelValue,
    (val) => {
      if (val !== undefined) active.value = val
    },
  )

  const isOpen = (index: number) => {
    if (props.multiple && Array.isArray(active.value)) {
      return active.value.includes(index)
    }
    return active.value === index
  }

  const toggle = (index: number) => {
    if (props.multiple && Array.isArray(active.value)) {
      if (active.value.includes(index)) {
        active.value = active.value.filter((i) => i !== index)
      } else {
        active.value = [...active.value, index]
      }
    } else {
      active.value = active.value === index ? -1 : index
    }

    emit('update:modelValue', active.value)
  }
</script>
<template>
  <div class="accordeon">
    <div v-for="(item, i) in props.items" :key="i" class="accordeon__item">
      <BaseButton
        tag="button"
        :text="item.title"
        class="accordeon__header"
        :aria-expanded="isOpen(i)"
        @click="toggle(i)"
      >
        <MoreIcon class="accordeon__icon" :class="{ 'accordeon__icon--opened': isOpen(i) }" />
      </BaseButton>

      <div v-show="isOpen(i)" class="accordeon__content">
        <slot :name="`item-${i}`" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .accordeon {
    width: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    font-family: $font-dm-sans;
    border-top: 1px solid $gray;
    border-bottom: 1px solid $gray;

    &__header {
      justify-content: space-between;
      width: 100%;
      margin-bottom: 20px;
      font-family: $font-dm-sans;
      font-size: 16px;
      line-height: 26px;
      color: $black;
      cursor: pointer;
      background-color: transparent;
      border: none;

      @media (max-width: $breakpoints-m) {
        height: 20px;
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 20px;
      }
    }

    &__icon {
      position: relative;
      right: 2px;
      transform: rotate(90deg);
    }

    &__icon--opened {
      transform: rotate(-90deg);
      transition: transform 0.3s ease;
    }

    &__content {
      padding: 0 16px;
      font-size: 16px;
      line-height: 20px;
      color: $dark-gray;

      p {
        margin: 0;
      }

      @media (max-width: $breakpoints-m) {
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
</style>
