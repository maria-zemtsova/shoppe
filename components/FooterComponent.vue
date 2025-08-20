<script setup lang="ts">
  import type { DefineComponent } from 'vue'
  import LinksList from '~/components/LinksList.vue'
  import type { LinkItem } from '~/types/links'
  import BaseInput from '~/components/ui/BaseInput.vue'
  import { FacebookIcon, TwitterIcon, InstagramIcon } from '~/components/icons/index'
  import { useEmailSubscribe } from '~/composables/useEmailValidation'

  const footerLinks: LinkItem[] = [
    { id: 1, path: '#', label: 'contact' },
    { id: 2, path: '#', label: 'terms of services' },
    { id: 3, path: '#', label: 'shipping and returns' },
  ]

  const footerSocials: LinkItem[] = [
    { id: 1, component: FacebookIcon as DefineComponent, label: 'facebook', path: '#' },
    { id: 2, component: InstagramIcon as DefineComponent, label: 'instagram', path: '#' },
    { id: 3, component: TwitterIcon as DefineComponent, label: 'twitter', path: '#' },
  ]

  const { email, errorMessage, isSuccess, handleSubmit } = useEmailSubscribe('newsletterEmails')
</script>

<template>
  <footer class="footer">
    <LinksList :items="footerLinks" className="footer__nav" />
    <p class="footer__copyright">
      <span>© 2021 Shelly.</span> Terms of use <span>and</span> privacy policy.
    </p>

    <form class="footer__form" @submit.prevent="handleSubmit">
      <BaseInput
        v-model="email"
        class="newsletter"
        type="email"
        placeholder="Give an email, get the newsletter."
        :error="errorMessage"
      >
        <button class="newsletter__button" formnovalidate />
      </BaseInput>
      <div v-if="isSuccess" class="newsletter__success">The email has been successfully sent.</div>
      <p class="newsletter__agreement">i agree to the website’s terms and conditions</p>
    </form>

    <div class="footer__socials-wrapper">
      <p>Follow us</p>
      <hr class="social__line" />
      <LinksList :items="footerSocials" className="footer__social" />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  .footer {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 44% 32%;
    gap: 55px 24%;
    width: 100%;
    min-height: 159px;
    padding-top: 37px;
    border-top: 1px solid $light-gray;

    @media (max-width: $breakpoints-l) {
      display: flex;
      flex-direction: column;
      gap: 35px;
    }

    &__nav {
      gap: 40px;
      order: 2;
      font-size: 16px;
      line-height: 28px;
      color: $dark-gray;
      text-transform: uppercase;

      @media (max-width: $breakpoints-m) {
        flex-direction: column;
        gap: 8px;
        align-items: flex-start;
        font-size: 12px;
        line-height: 20px;
      }
    }

    &__copyright {
      grid-row: 2/3;
      grid-column: 1/2;
      width: 100%;
      margin: 0;
      font-family: $font-dm-sans;
      font-size: 16px;
      color: $dark-gray;

      @media (max-width: $breakpoints-m) {
        order: 4;
        font-size: 12px;
        line-height: 20px;
      }

      span {
        color: $black;
      }
    }

    &__form {
      grid-row: 1/2;
      grid-column: 2/3;

      @media (max-width: $breakpoints-m) {
        order: 1;
      }
    }

    &__socials-wrapper {
      display: flex;
      gap: 15px;
      justify-content: flex-end;

      @media (max-width: $breakpoints-l) {
        justify-content: flex-start;
      }

      p {
        display: none;
        font-family: $font-dm-sans;
        font-size: 12px;
        line-height: 20px;
        color: $black;

        @media (max-width: $breakpoints-m) {
          display: block;
        }
      }

      .social__line {
        display: none;
        width: 48px;
        height: 1px;
        margin: 0;
        color: $black;
        border: none;

        @media (max-width: $breakpoints-m) {
          display: block;
        }
      }

      @media (max-width: $breakpoints-m) {
        order: 2;
      }
    }

    &__social {
      gap: 30px;
    }
  }

  .newsletter {
    cursor: pointer;

    &__agreement {
      display: none;
      padding-left: 17px;
      font-family: $font-dm-sans;
      font-size: 12px;
      line-height: 20px;

      @media (max-width: $breakpoints-m) {
        display: block;
      }
    }

    &__button {
      width: 25px;
      height: 9px;
      cursor: pointer;
      background-color: transparent;
      background-image: url('/assets/arrow.svg');
      background-repeat: no-repeat;
      border: none;
    }

    &__success {
      margin-top: 8px;
      font-family: $font-dm-sans;
      font-size: 12px;
      color: #43c16b;
    }
  }
</style>
