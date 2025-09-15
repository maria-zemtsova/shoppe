<script setup lang="ts">
  import type { DefineComponent } from 'vue'
  import { ref, onMounted, onUnmounted } from 'vue'
  import type { Product } from '~/types/product'
  import type { LinkItem } from '~/types/links'
  import { FacebookIcon, TwitterIcon, InstagramIcon, EmailIcon } from '~/components/icons/index'
  import ProductInfoDesktop from '~/components/ProductInfoDesktop.vue'
  import ProductInfoMobile from '~/components/ProductInfoMobile.vue'
  defineProps<{
    product: Product | null
    productSocials?: LinkItem
  }>()

  const isMobile = ref(false)
  const BRAKEPOINT_L = 900
  const checkScreen = () => {
    isMobile.value = window.innerWidth <= BRAKEPOINT_L
  }

  onMounted(() => {
    checkScreen()
    window.addEventListener('resize', checkScreen)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreen)
  })
  const productSocials: LinkItem[] = [
    { id: 1, component: EmailIcon as DefineComponent, label: 'email', path: '#' },
    { id: 2, component: FacebookIcon as DefineComponent, label: 'facebook', path: '#' },
    { id: 3, component: InstagramIcon as DefineComponent, label: 'instagram', path: '#' },
    { id: 4, component: TwitterIcon as DefineComponent, label: 'twitter', path: '#' },
  ]
</script>

<template>
  <section v-if="product" class="info">
    <ProductInfoDesktop v-if="!isMobile" :product="product" :product-socials="productSocials" />
    <ProductInfoMobile v-else :product="product" :product-socials="productSocials" />
  </section>
</template>

<style lang="scss" scoped>
  .info {
    position: relative;
    width: 484px;

    @media (max-width: $breakpoints-xl) {
      width: 400px;
    }

    @media (max-width: $breakpoints-l) {
      width: 100%;
    }
  }
</style>
