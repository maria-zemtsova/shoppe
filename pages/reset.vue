<script lang="ts" setup>
  import BaseInput from '~/components/ui/BaseInput.vue'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import NotificationComponent from '~/components/ui/NotificationComponent.vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const email = ref('')
  const emailError = ref('')
  const isNotificationVisible = ref(false)
  const DELAY_BEFORE_ROUTING = 1500
  const validateEmail = () => {
    emailError.value = ''
    if (!email.value.trim()) {
      emailError.value = 'Required field'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      emailError.value = 'Invalid address'
    }
    return !emailError.value
  }

  const handleReset = () => {
    if (!validateEmail()) return
    setTimeout(() => {
      router.push('/')
    }, DELAY_BEFORE_ROUTING)
    isNotificationVisible.value = true
  }
</script>
<template>
  <section class="reset">
    <h3 class="reset__title">Have you Forgotten Your Password ?</h3>
    <p class="reset__description">
      If you've forgotten your password, enter your e-mail <br />
      address and we'll send you an e-mail
    </p>
    <BaseInput
      v-model="email"
      placeholder="Email"
      class="reset__input"
      :error="emailError"
      @blur="validateEmail"
    />
    <BaseButton text="Reset Password" class="reset__button" @click="handleReset" />
    <NotificationComponent
      v-model="isNotificationVisible"
      message="We sent the password to your email"
    />
  </section>
</template>

<style lang="scss" scoped>
  .reset {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 570px;
    margin: 0 auto;
    margin-top: 128px;
    margin-bottom: 250px;
    font-family: $font-dm-sans;

    @media (max-width: $breakpoints-m) {
      width: 288px;
      margin-top: 24px;
      margin-bottom: 96px;
    }

    &__title {
      margin-bottom: 40px;
      font-size: 32px;
      font-weight: 500;
      line-height: 42px;
      text-align: center;

      @media (max-width: $breakpoints-m) {
        margin-bottom: 16px;
        font-size: 20px;
        line-height: 26px;
      }
    }

    &__description {
      margin: 0;
      margin-bottom: 76px;
      font-size: 20px;
      line-height: 26px;
      text-align: center;

      @media (max-width: $breakpoints-m) {
        margin-bottom: 64px;
        font-size: 12px;
        line-height: 20px;
      }

      @media (max-width: $breakpoints-s) {
        text-align: left;
      }
    }

    &__input {
      width: 500px;

      @media (max-width: $breakpoints-m) {
        width: 288px;
      }
    }

    :deep(.input__wrapper) {
      border-bottom: 1px solid $light-gray;
    }

    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 500px;
      height: 54px;
      margin-top: 64px;
      font-size: 16px;
      font-weight: 700;
      color: $white;
      text-transform: uppercase;
      letter-spacing: 1px;
      background-color: $black;
      border: none;
      border-radius: 4px;

      @media (max-width: $breakpoints-m) {
        width: 288px;
        height: 32px;
        margin-top: 40px;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
      }
    }

    &__button:hover {
      color: $black;
      background-color: $white;
      border: 1px solid $black;
    }
  }

  :deep(.notification__button) {
    display: none;
  }
</style>
