<script setup lang="ts">
  import type { DefineComponent } from 'vue'
  import { ref } from 'vue'
  import { useCartStore } from '@/stores/cart'
  import type { Product } from '~/types/product'
  import type { LinkItem } from '~/types/links'
  import {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    EmailIcon,
    ShareIcon,
    MoreIcon,
  } from '~/components/icons/index'
  import LinksList from '~/components/LinksList.vue'
  import QuantityCounter from '~/components/ui/QuantityCounter.vue'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import RatingComponent from '~/components/ui/RatingComponent.vue'
  import NotificationComponent from '~/components/ui/NotificationComponent.vue'

  const quantity = ref(1)

  const props = defineProps<{ product: Product | null }>()
  const cartStore = useCartStore()
  const isNotificationVisible = ref(false)
  const isExpanded = ref(false)

  const addToCart = () => {
    isNotificationVisible.value = true
    if (!props.product) return
    cartStore.increaseQuantity(props.product)
    if (quantity.value > 1) {
      cartStore.updateQuantity(props.product.id, quantity.value)
    }
  }

  const productSocials: LinkItem[] = [
    { id: 1, component: EmailIcon as DefineComponent, label: 'email', path: '#' },
    { id: 2, component: FacebookIcon as DefineComponent, label: 'facebook', path: '#' },
    { id: 3, component: InstagramIcon as DefineComponent, label: 'instagram', path: '#' },
    { id: 4, component: TwitterIcon as DefineComponent, label: 'twitter', path: '#' },
  ]
</script>

<template>
  <section v-if="product" class="info">
    <div class="info__layout--desktop">
      <h3 class="info__title">{{ product.title }}</h3>
      <div class="info__price-wrapper">
        <span class="info__price">$ {{ product.price }}</span>
        <ShareIcon class="info__icon" />
      </div>
      <RatingComponent class="info__rating" :rating="product.rating.rate" />
      <p class="info__description">
        {{ product.description }}
      </p>
      <div class="info__actions">
        <QuantityCounter v-model:quantity="quantity" class="info__counter" />
        <BaseButton class="info__button" text="Add to cart" tag="button" @click="addToCart" />
      </div>
      <LinksList class="info__socials" :items="productSocials" />
      <p class="info__sku">
        Sku: <span>{{ product.rating.count }}</span>
      </p>
      <p class="info__category">
        Categories: <span>{{ product.category }}</span>
      </p>
    </div>

    <div class="info__layout--mobile">
      <h3 class="info__title">{{ product.title }}</h3>
      <div class="info__price-wrapper">
        <span class="info__price">$ {{ product.price }}</span>
        <ShareIcon class="info__icon" />
      </div>
      <div class="info__content">
        <p class="info__description" :class="{ 'info__description--expanded': isExpanded }">
          {{ product.description }}
        </p>
        <div class="info__collapsible" :class="{ 'info__collapsible--expanded': isExpanded }">
          <RatingComponent
            class="info__rating info__rating--mobile"
            :rating="product.rating.rate"
          />
          <div class="info__additional">
            <LinksList class="info__socials" :items="productSocials" />
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
    <NotificationComponent
      v-model="isNotificationVisible"
      message="The item was added to your Shopping bag."
    />
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

    &__layout--desktop {
      @media (max-width: $breakpoints-l) {
        display: none;
      }
    }

    &__layout--mobile {
      display: none;

      @media (max-width: $breakpoints-l) {
        display: block;
      }
    }

    &__title {
      margin: 0;
      margin-bottom: 24px;
      font-size: 26px;
      font-weight: 400;
      line-height: 36px;

      @media (max-width: $breakpoints-l) {
        order: 1;
        margin-top: 24px;
        margin-bottom: 6px;
      }

      @media (max-width: $breakpoints-m) {
        font-size: 20px;
        line-height: 28px;
      }
    }

    &__price-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0;

      @media (max-width: $breakpoints-l) {
        order: 2;
        margin-bottom: 24px;
      }
    }

    &__price {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
      line-height: 26px;
      color: $accent;

      @media (max-width: $breakpoints-m) {
        font-size: 16px;
        font-weight: 400;
        line-height: 28px;
      }
    }

    &__icon {
      display: none;
      width: 14px;
      height: 14px;

      @media (max-width: $breakpoints-l) {
        display: block;
      }
    }

    &__rating {
      margin-top: 60px;
      margin-bottom: 18px;

      @media (max-width: $breakpoints-xl) {
        margin-top: 40px;
      }

      @media (max-width: $breakpoints-l) {
        display: flex;
        margin: 20px 0;
      }
    }

    &__actions {
      display: flex;
      gap: 24px;
      align-items: center;
      justify-content: center;
      margin-bottom: 48px;

      @media (max-width: $breakpoints-l) {
        order: 3;
        margin-bottom: 24px;
      }

      @media (max-width: $breakpoints-m) {
        gap: 16px;
        margin-bottom: 20px;
      }
    }

    &__counter {
      width: 102px;
      height: 54px;

      @media (max-width: $breakpoints-l) {
        display: none;
      }
    }

    &__button {
      width: 360px;
      height: 54px;
      font-size: 16px;
      font-weight: 700;
      color: $black;
      text-transform: uppercase;
      background-color: transparent;
      border: 1px solid $black;
      border-radius: 4px;

      @media (max-width: $breakpoints-l) {
        width: 100%;
      }

      @media (max-width: $breakpoints-m) {
        height: 32px;
        font-size: 12px;
        font-weight: 400;
      }
    }

    &__button:hover {
      color: $white;
      background-color: $black;
    }

    &__content {
      @media (max-width: $breakpoints-l) {
        order: 4;
      }
    }

    &__description {
      margin-top: 0;
      margin-bottom: 48px;
      font-size: 16px;
      line-height: 26px;
      color: $dark-gray;

      @media (max-width: $breakpoints-l) {
        display: -webkit-box;
        margin-bottom: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;

        &--expanded {
          display: block;
          -webkit-line-clamp: unset;
          line-clamp: unset;
        }
      }

      @media (max-width: $breakpoints-m) {
        margin-bottom: 12px;
        font-size: 12px;
        line-height: 20px;
      }
    }

    &__collapsible {
      @media (min-width: $breakpoints-l) {
        display: block;
      }

      @media (max-width: $breakpoints-l) {
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: all 0.3s ease;

        &--expanded {
          max-height: 500px;
          opacity: 1;
        }
      }
    }

    &__socials {
      gap: 24px;
      margin-top: 80px;
      margin-bottom: 38px;

      @media (max-width: $breakpoints-xl) {
        margin-top: 40px;
        margin-bottom: 20px;
      }

      @media (max-width: $breakpoints-l) {
        display: none;
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
