<script setup lang="ts">
  import { ref } from 'vue'
  import RatingComponent from '~/components/ui/RatingComponent.vue'
  import ProductDetailActions from '~/components/ProductDetailActions.vue'
  import LinksList from '~/components/LinksList.vue'
  import type { LinkItem } from '~/types/links'
  import type { Product } from '~/types/product'

  const isNotificationVisible = ref(false)
  const markNotificationVisible = () => {
    isNotificationVisible.value = true
  }
  interface Props {
    product: Product
    productSocials: LinkItem[]
  }

  defineProps<Props>()
</script>

<template>
  <div class="info__layout--desktop">
    <h3 class="info__title">{{ product.title }}</h3>
    <div class="info__price-wrapper">
      <span class="info__price">$ {{ product.price }}</span>
    </div>
    <RatingComponent class="info__rating" :rating="product.rating.rate" />
    <p class="info__description">
      {{ product.description }}
    </p>
    <ProductDetailActions :product="product" @added="markNotificationVisible" />
    <LinksList class="info__socials" :items="productSocials" />
    <p class="info__sku">
      Sku: <span>{{ product.rating.count }}</span>
    </p>
    <p class="info__category">
      Categories: <span>{{ product.category }}</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
  .info {
    &__title {
      margin: 0;
      margin-bottom: 24px;
      font-size: 26px;
      font-weight: 400;
      line-height: 36px;
    }

    &__price-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0;
    }

    &__price {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
      line-height: 26px;
      color: $accent;
    }

    &__rating {
      margin-top: 60px;
      margin-bottom: 18px;

      @media (max-width: $breakpoints-xl) {
        margin-top: 40px;
      }
    }

    &__description {
      margin-top: 0;
      margin-bottom: 48px;
      font-size: 16px;
      line-height: 26px;
      color: $dark-gray;
    }

    &__socials {
      gap: 24px;
      margin-top: 80px;
      margin-bottom: 38px;

      @media (max-width: $breakpoints-xl) {
        margin-top: 40px;
        margin-bottom: 20px;
      }
    }

    &__sku,
    &__category {
      margin: 0;
      font-size: 16px;
      line-height: 28px;
      text-transform: uppercase;

      span {
        padding-left: 16px;
        color: $dark-gray;
      }
    }

    &__category {
      margin-bottom: 0;
      text-transform: none;
    }
  }
</style>
