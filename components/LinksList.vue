<script setup lang="ts">
  import type { LinkItem } from '~/types/links'

  defineProps<{
    items: LinkItem[]
    styles?: {
      list?: string
      item?: string
      link?: string
    }
  }>()
</script>

<template>
  <ul :class="styles?.list">
    <li v-for="item in items" :key="item.id" :class="styles?.item">
      <button v-if="item.action" :class="styles?.link" @click="item.action">
        <component :is="item.component" v-if="item.component" />
        <span v-else>{{ item.label }}</span>
      </button>

      <NuxtLink v-else :to="item.path" :class="styles?.link">
        <component :is="item.component" v-if="item.component" />
        <span v-else>{{ item.label }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  button {
    background-color: transparent;
    border: none;
  }
</style>
