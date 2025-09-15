<script setup lang="ts">
  import { ref } from 'vue'
  import RatingComponent from '~/components/ui/RatingComponent.vue'
  import ProductDetailActions from '~/components/ProductDetailActions.vue'
  import { MoreIcon, ShareIcon } from '~/components/icons/index'
  import type { Product } from '~/types/product'

  defineProps<Props>()
  interface Props {
    product: Product
  }

  const isExpanded = ref(false)
  const isNotificationVisible = ref(false)
  const markNotificationVisible = () => {
    isNotificationVisible.value = true
  }
</script>

<template>
  <div class="info__layout--mobile">
    <h3 class="info__title">{{ product.title }}</h3>
    <div class="info__price-wrapper">
      <span class="info__price">$ {{ product.price }}</span>
      <ShareIcon class="info__icon" />
    </div>
    <ProductDetailActions :product="product" @added="markNotificationVisible" />
    <div class="info__content">
      <p class="info__description" :class="{ 'info__description--expanded': isExpanded }">
        {{ product.description }}
      </p>
      <div class="info__collapsible" :class="{ 'info__collapsible--expanded': isExpanded }">
        <RatingComponent class="info__rating info__rating--mobile" :rating="product.rating.rate" />
        <div class="info__additional">
          <p class="info__sku">
            Sku: <span>{{ product.rating.count }}</span>
          </p>
          <p class="info__category">
            Categories: <span>{{ product.category }}</span>
          </p>
        </div>
      </div>
    </div>

    <button class="info__toggle" @click="isExpanded = !isExpanded">
      {{ isExpanded ? 'View less' : 'View more' }}
      <MoreIcon :class="{ rotated: isExpanded }" />
    </button>
  </div>
</template>
<style lang="scss" scoped>
  .info {
    &__title {
      margin-top: 24px;
      margin-bottom: 6px;

      @media (max-width: $breakpoints-m) {
        font-size: 20px;
        line-height: 28px;
      }
    }

    &__price-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    &__price {
      margin: 0;
      font-size: 16px;
      font-weight: 400;
      line-height: 28px;
      color: $accent;
    }

    &__icon {
      width: 14px;
      height: 14px;
    }

    &__rating {
      display: flex;
      margin: 20px 0;
    }

    &__description {
      display: -webkit-box;
      margin-top: 0;
      margin-bottom: 48px;
      margin-bottom: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      font-size: 16px;
      line-height: 26px;
      color: $dark-gray;
      -webkit-box-orient: vertical;

      &--expanded {
        display: block;
        -webkit-line-clamp: unset;
        line-clamp: unset;
      }

      @media (max-width: $breakpoints-m) {
        margin-bottom: 12px;
        font-size: 12px;
        line-height: 20px;
      }
    }

    &__collapsible {
      display: block;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: all 0.3s ease;

      &--expanded {
        max-height: 500px;
        opacity: 1;
      }
    }

    &__sku,
    &__category {
      margin: 0;
      font-size: 16px;
      line-height: 28px;
      text-transform: uppercase;

      @media (max-width: $breakpoints-m) {
        font-size: 12px;
        line-height: 20px;
      }

      span {
        padding-left: 16px;
        color: $dark-gray;
      }
    }

    &__category {
      margin-bottom: 0;
      text-transform: none;
    }

    &__toggle {
      display: none;
      padding: 0;
      margin: 16px 0;
      font-family: $font-dm-sans;
      color: $accent;
      cursor: pointer;
      background-color: transparent;
      border: none;

      svg {
        position: relative;
        top: 1.4px;

        @media (max-width: $breakpoints-m) {
          top: 0;
        }
      }

      @media (max-width: $breakpoints-l) {
        display: flex;
        gap: 4px;
        align-items: center;
        justify-content: space-between;
        order: 5;
        width: 90px;
        font-size: 16px;
      }

      @media (max-width: $breakpoints-m) {
        width: 68px;
        margin: 12px 0;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }

  .rotated {
    transform: rotate(-90deg);
    transition: transform 0.3s ease;
  }
</style>
