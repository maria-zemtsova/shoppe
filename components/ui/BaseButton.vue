<script lang="ts" setup>
  type ButtonTag = 'button' | 'a' | 'nuxt-link'

  interface Props {
    text?: string
    tag?: ButtonTag
    to?: string
    href?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    tag: 'button',
    type: 'button',
  })
</script>

<template>
  <button
    v-if="props.tag === 'button'"
    class="button"
    :type="props.type"
    :disabled="props.disabled"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      {{ props.text }}
    </template>
  </button>

  <a v-else-if="props.tag === 'a'" class="button" :href="props.href" :disabled="props.disabled">
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      {{ props.text }}
    </template>
  </a>

  <NuxtLink v-else class="button" :to="props.to" :disabled="props.disabled">
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      {{ props.text }}
    </template>
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
