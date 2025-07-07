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
      <NuxtLink :to="item.path" :class="styles?.link">
        <component :is="item.component" v-if="item.component" />
        <span v-else>{{ item.label }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>
