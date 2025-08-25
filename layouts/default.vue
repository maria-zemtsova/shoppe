<script lang="ts" setup>
  import HeaderComponent from '~/components/HeaderComponent.vue'
  import FooterComponent from '~/components/FooterComponent.vue'
  import CartSidebar from '~/components/CartSidebar.vue'
</script>

<template>
  <div class="container">
    <HeaderComponent />
    <slot />
    <FooterComponent />
    <CartSidebar />
  </div>
</template>
