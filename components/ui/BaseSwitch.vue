<script setup lang="ts">
  import type { Component } from 'vue'

  interface SwitchItem {
    title: string
    component: Component
  }

  defineProps<{
    items: SwitchItem[]
  }>()

  // v-model — индекс активной вкладки
  const model = defineModel<number>('modelValue', { default: 0 })

  function select(index: number) {
    model.value = index
  }

  const isActive = (index: number) => model.value === index
</script>

<template>
  <section class="switch">
    <div class="switch__header">
      <button
        v-for="(tab, idx) in items"
        :key="idx"
        :class="['switch__button', { 'switch__button--active': isActive(idx) }]"
        type="button"
        @click="select(idx)"
      >
        {{ tab.title }}
      </button>
    </div>

    <div class="switch__body">
      <component
        :is="tab.component"
        v-for="(tab, idx) in items"
        v-show="isActive(idx)"
        :key="idx"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .switch {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__header {
      display: flex;
      gap: 0;
      align-items: center;
      width: 500px;
      height: 60px !important;
      height: auto;
      margin-bottom: 126px;
      overflow: hidden;
      background: $light-gray;
      border-bottom: none;
      border-radius: 8px;

      @media (max-width: $breakpoints-m) {
        width: 288px;
        height: 32px !important;
        margin-bottom: 86px;
      }
    }

    &__button {
      flex: 1;
      padding: 0;
      font-family: $font-dm-sans;
      font-size: 20px;
      line-height: 26px;
      color: $black;
      color: $dark-gray;
      text-align: center;
      cursor: pointer;
      background-color: transparent;
      border: none;

      @media (max-width: $breakpoints-m) {
        font-size: 12px;
        line-height: 20px;
      }

      &--active {
        width: 236px;
        height: 50px;
        margin: 6px;
        background: $white;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgb(0 0 0 / 10%);

        @media (max-width: $breakpoints-m) {
          width: 134px;
          height: 28px;
          margin: 2px;
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  }
</style>
