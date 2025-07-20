<script lang="ts" setup>
  import { computed, resolveComponent } from 'vue'

  type ButtonTag = 'button' | 'a' | 'nuxt-link'

  interface Props {
    text: string
    tag?: ButtonTag
    to?: string
    href?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    tag: 'button',
    type: 'button',
    disabled: false,
  })

  const component = computed(() => {
    if (props.tag === 'nuxt-link' && props.to) return resolveComponent('NuxtLink')
    return props.tag
  })
</script>

<template>
  <component
    :is="component"
    class="button"
    :to="tag === 'nuxt-link' ? to : undefined"
    :href="tag === 'a' ? href : undefined"
    :type="tag === 'button' ? type : undefined"
  >
    {{ text }}
  </component>
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
