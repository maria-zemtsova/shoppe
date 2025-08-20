<script setup lang="ts">
  import type { LinkItem } from '~/types/links'

  defineProps<{
    items: LinkItem[]
    className?: string
  }>()
</script>

<template>
  <ul :class="['link-list', className]">
    <li v-for="item in items" :key="item.id" class="link-list__item">
      <button v-if="item.action" class="link-list__button" @click="item.action">
        <component :is="item.component" v-if="item.component" />
        <span v-else>{{ item.label }}</span>
      </button>
      <NuxtLink v-else :to="item.path" class="link-list__link">
        <component :is="item.component" v-if="item.component" />
        <span v-else>{{ item.label }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss">
  .link-list {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    &__link,
    &__button {
      display: inline-flex;
      align-items: center;
      font-family: $font-dm-sans;
      font-size: inherit;
      color: inherit;
      text-decoration: none;
      cursor: pointer;
      background: transparent;
      border: none;
    }

    &__link:hover {
      color: $black;
    }
  }
</style>
