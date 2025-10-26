<script setup lang="ts">
  import { computed } from 'vue'
  import type { Component } from 'vue'

  interface TabItem {
    title: string
    component: Component
  }

  defineProps<{
    items: TabItem[]
  }>()

  const START_INDEX = 0
  const activeTab = defineModel<number>('modelValue', { default: START_INDEX })

  function selectTab(index: number) {
    activeTab.value = index
  }
  const isActive = computed(() => (index: number) => activeTab.value === index)
</script>

<template>
  <section class="tab">
    <div class="tab__header">
      <button
        v-for="(tab, index) in items"
        :key="index"
        :class="['tab__button', { 'tab__button--active': isActive(index) }]"
        type="button"
        @click="selectTab(index)"
      >
        {{ tab.title }}
      </button>
    </div>

    <div class="tab__body">
      <div v-for="(tab, index) in items" :key="index">
        <component :is="tab.component" v-show="isActive(index)" />
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
