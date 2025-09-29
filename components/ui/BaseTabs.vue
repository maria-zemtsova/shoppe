<script setup lang="ts">
  import type { Component } from 'vue'

  interface TabItem {
    title: string
    component: Component
  }

  const props = defineProps<{
    items: TabItem[]
    type?: 'default' | 'switch'
  }>()

  const activeTab = defineModel<number | boolean>('modelValue', { default: 0 })

  function selectTab(index: number) {
    if (props.type === 'switch') {
      activeTab.value = index === 1
    } else {
      activeTab.value = index
    }
  }

  const isActive = (index: number) => {
    if (props.type === 'switch') {
      return (activeTab.value as boolean) === (index === 1)
    }
    return (activeTab.value as number) === index
  }
</script>

<template>
  <section :class="['tab', { 'tab--switch': type === 'switch' }]">
    <div class="tab__header">
      <button
        v-for="(tab, idx) in items"
        :key="idx"
        :class="['tab__button', { 'tab__button--active': isActive(idx) }]"
        type="button"
        @click="selectTab(idx)"
      >
        {{ tab.title }}
      </button>
    </div>

    <div class="tab__body">
      <div v-for="(tab, idx) in items" :key="idx">
        <component :is="tab.component" v-show="isActive(idx)" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .tab {
    &__header {
      display: flex;
      gap: 96px;
      justify-content: flex-start;
      height: 60px;
      border-bottom: 1px solid $gray;
    }

    &__button {
      padding: 0;
      padding-bottom: 60px;
      font-family: $font-dm-sans;
      font-size: 20px;
      line-height: 26px;
      color: $dark-gray;
      text-align: start;
      cursor: pointer;
      background-color: transparent;
      border: none;
    }

    &__button:hover {
      color: $black;
    }

    &__button--active {
      color: $black;
      border-bottom: 1px solid $black;
    }

    &__body {
      margin-top: 40px;
      font-family: $font-dm-sans;
      font-size: 16px;
      line-height: 28px;
      color: $dark-gray;
    }
  }

  .tab--switch {
    .tab__header {
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

    .tab__button {
      flex: 1;
      padding: 0;
      font-size: 14px;
      line-height: 26px;
      color: $black;
      text-align: center;
      border-bottom: none;

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
