<script lang="ts" setup>
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
  })

  // const component = computed(() => {
  //   if (props.tag === 'nuxt-link' && props.to) return resolveComponent('NuxtLink')
  //   return props.tag
  // })
</script>

<template>
  <button v-if="props.tag === 'button'" :type="props.type" :disabled="props.disabled">
    {{ text }}
  </button>
  <a v-else-if="props.tag === 'a'" :href="props.href" :disabled="props.disabled">
    {{ text }}
  </a>
  <NuxtLink v-else="props.tag = 'nuxt-link'" :to="props.to" :disabled="props.disabled">{{
    text
  }}</NuxtLink>
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
