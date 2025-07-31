<script lang="ts" setup>
  import HeaderComponent from '~/components/HeaderComponent.vue'
  import FooterComponent from '~/components/FooterComponent.vue'
</script>

<template>
  <div class="container">
    <HeaderComponent />
    <slot />
    <FooterComponent />
  </div>
</template>
