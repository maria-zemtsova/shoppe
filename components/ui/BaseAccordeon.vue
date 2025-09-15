<script setup lang="ts">
  import type { Component } from 'vue'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import { MoreIcon } from '~/components/icons/index'

  defineProps<{
    items: AccordionItem[]
  }>()
  interface AccordionItem {
    title: string
    component: Component
  }

  const activeIndex = defineModel<number | null>('modelValue', { default: null })

  const toggle = (i: number) => {
    activeIndex.value = activeIndex.value === i ? null : i
  }
</script>

<template>
  <div class="accordeon">
    <div v-for="(item, i) in items" :key="i" class="accordeon__item">
      <BaseButton
        tag="button"
        class="accordeon__header"
        :aria-expanded="activeIndex === i"
        @click="toggle(i)"
      >
        {{ item.title }}
        <MoreIcon
          class="accordeon__icon"
          :class="{ 'accordeon__icon--opened': activeIndex === i }"
        />
      </BaseButton>

      <Transition name="accordeon">
        <div v-show="activeIndex === i" class="accordeon__content">
          <component :is="item.component" />
        </div>
      </Transition>
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
      overflow: hidden;
      font-size: 16px;
      line-height: 20px;
      color: $dark-gray;
      transition:
        max-height 0.3s ease,
        opacity 0.3s ease,
        padding 0.3s ease;

      p {
        margin: 0;
      }

      @media (max-width: $breakpoints-m) {
        font-size: 12px;
        line-height: 20px;
      }
    }
  }

  // animation

  .accordeon-enter-from,
  .accordeon-leave-to {
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    opacity: 0;
  }

  .accordeon-enter-to,
  .accordeon-leave-from {
    max-height: 500px;
    padding-top: 8px;
    padding-bottom: 8px;
    opacity: 1;
  }

  .accordeon-enter-active,
  .accordeon-leave-active {
    transition:
      max-height 0.3s ease,
      opacity 0.3s ease,
      padding 0.3s ease;
  }
</style>
