<script lang="ts" setup>
  defineProps<{
    text: string
    link: string
  }>()
</script>
<template>
  <NuxtLink class="button" to="link">{{ text }}</NuxtLink>
</template>

<style lang="scss">
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-size: 16px;
    color: $accent;
    text-decoration: none;
  }
</style>
