<script lang="ts" setup>
  import NotificationComponent from '~/components/ui/NotificationComponent.vue'

  import { ref } from 'vue'
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

  const notification = ref()
  const addToCart = () => {
    notification.value?.show()
  }
</script>

<template>
  <li class="latest__item">
    <div class="latest__image-wrapper">
      <img class="latest__image" :src="product.image" :alt="product.title" />
      <button class="latest__button" @click="addToCart">Add to cart</button>
    </div>
    <h3 class="latest__product-title">{{ product.title }}</h3>
    <span class="latest__price">$ {{ product.price }}</span>
  </li>
  <NotificationComponent ref="notification" message="The item was added to your Shopping bag." />
</template>

<style lang="scss" scoped>
  .latest {
    font-family: $font-dm-sans;

    &__item {
      position: relative;
      width: 377px;
    }

    &__image-wrapper {
      position: relative;
      width: 377px;
      height: 380px;
    }

    &__image {
      width: 100%;
      height: 100%;
      cursor: pointer;
      object-fit: contain;
      border-radius: 8px;
    }

    &__product-title {
      margin-top: 24px;
      margin-bottom: 16px;
      font-size: 20px;
      font-weight: 400;
      line-height: 26px;
      color: $black;
    }

    &__price {
      font-size: 20px;
      font-weight: 500;
      line-height: 26px;
      color: $accent;
    }

    &__button {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 66px;
      font-family: $font-dm-sans;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      background-color: rgb(255 255 255 / 50%);
      border: none;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &__image-wrapper:hover &__button {
      opacity: 1;
    }
  }
</style>
