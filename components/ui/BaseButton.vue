<script lang="ts" setup>
  import { computed, useSlots } from 'vue'

  type ButtonTag = 'button' | 'a' | 'nuxt-link'

  interface Props {
    text?: string
    tag?: ButtonTag
    to?: string
    href?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }

  withDefaults(defineProps<Props>(), {
    tag: 'button',
    type: 'button',
  })

  const slots = useSlots()
  const hasSlot = computed(() => !!slots.default)
</script>

<template>
  <button v-if="tag === 'button'" class="button" :type="type" :disabled="disabled">
    <slot v-if="hasSlot" />
    <template v-else>{{ text }}</template>
  </button>

  <a v-else-if="tag === 'a'" class="button" :href="href" :disabled="disabled">
    <slot v-if="hasSlot" />
    <template v-else>{{ text }}</template>
  </a>

  <NuxtLink v-else class="button" :to="to" :disabled="disabled">
    <slot v-if="hasSlot" />
    <template v-else>{{ text }}</template>
  </NuxtLink>
</template>

<style lang="scss" scoped>
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: $accent;
    text-decoration: none;
    cursor: pointer;
  }
</style>
