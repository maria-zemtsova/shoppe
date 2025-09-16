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
  const props = withDefaults(defineProps<Props>(), {
    tag: 'button',
    type: 'button',
  })

  const slots = useSlots()
  const hasSlot = computed(() => !!slots.default)

  const componentProps = computed(() => {
    const baseProps = { class: 'button', disabled: props.disabled }

    switch (props.tag) {
      case 'button':
        return { ...baseProps, type: props.type }
      case 'a':
        return { ...baseProps, href: props.href }
      case 'nuxt-link':
        return { ...baseProps, to: props.to }
      default:
        return baseProps
    }
  })
</script>

<template>
  <component :is="tag" v-bind="componentProps">
    <slot v-if="hasSlot" />
    <template v-else>{{ text }}</template>
  </component>
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
