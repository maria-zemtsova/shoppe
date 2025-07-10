<script lang="ts" setup>
  defineProps<{
    product: {
      id: number
      title: string
      price: number
      description: string
      category: string
      image: string
      rating: {
        rate: number
        count: number
      }
    }
  }>()
</script>

<template>
  <li class="latest__item">
    <img class="latest__image" :src="product.image" :alt="product.title" />
    <h3 class="latest__product-title">{{ product.title }}</h3>
    <span class="latest__price">$ {{ product.price }}</span>
  </li>
</template>

<style lang="scss" scoped>
  .latest {
    font-family: $font-dm-sans;

    &__item {
      width: 377px;
    }

    &__image {
      width: 377px;
      height: 380px;
      object-fit: contain;
      border-radius: 8px;
    }

    &__product-title {
      margin-top: 24px;
      margin-bottom: 16px;
      font-size: 20px;
      line-height: 26px;
      color: $black;
    }

    &__price {
      font-size: 20px;
      font-weight: 500;
      line-height: 26px;
      color: $accent;
    }
  }
</style>
