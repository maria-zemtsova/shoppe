<script setup lang="ts">
  import type { Component } from 'vue'

  interface TabItem {
    title: string
    component: Component
  }

  const props = defineProps<{
    items: TabItem[]
  }>()

  const activeTab = defineModel<number>('modelValue', { default: 0 })

  function selectTab(index: number) {
    activeTab.value = index
  }
</script>

<template>
  <section class="tab">
    <div class="tab__header">
      <button
        v-for="(tab, idx) in props.items"
        :key="idx"
        :class="['tab__button', { 'tab__button--active': idx === activeTab }]"
        type="button"
        @click="selectTab(idx)"
      >
        {{ tab.title }}
      </button>
    </div>

    <div class="tab__body">
      <div v-for="(tab, idx) in props.items" :key="idx">
        <component :is="tab.component" v-show="idx === activeTab" />
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
</style>
