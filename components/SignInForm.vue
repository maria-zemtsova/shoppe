<script lang="ts" setup>
  import BaseInput from '~/components/ui/BaseInput.vue'
  import BaseChecbox from '~/components/ui/BaseChecbox.vue'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import NotificationComponent from '~/components/ui/NotificationComponent.vue'
  import BaseSpinner from '~/components/ui/BaseSpinner.vue'
  import { ref } from 'vue'
  import { useAuthStore } from '~/stores/auth'
  import { useRouter } from 'vue-router'
  import { useFormValidation } from '~/composables/useFormValidation'
  import { NuxtLink } from '#components'

  const authStore = useAuthStore()
  const router = useRouter()
  const DELAY_BEFORE_ROUTING = 1500
  const formConfig = {
    email: { required: true, email: true },
    password: { required: true },
  }

  const { form, errorMessage, validateForm } = useFormValidation(formConfig)
  const rememberMe = ref(false)
  const isNotificationVisible = ref(false)
  const isLoading = ref(false)

  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }
    isLoading.value = true
    try {
      const hashedPassword = await hashPassword(form.password.value)
      const result = await authStore.login({
        email: form.email.value,
        password: hashedPassword,
        rememberMe: rememberMe.value,
      })

      if (result.success) {
        isNotificationVisible.value = true
        errorMessage.value = ''
        setTimeout(() => {
          router.push('/')
        }, DELAY_BEFORE_ROUTING)
      } else {
        errorMessage.value = result.error || 'Authentication failed'
      }
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <form class="account__form" @submit.prevent="handleSubmit">
    <BaseSpinner v-if="isLoading" height="50px" />
    <template v-else>
      <BaseInput
        v-model="form.email.value"
        placeholder="Email"
        class="account__input"
        :error="form.email.error"
      />
      <BaseInput
        v-model="form.password.value"
        placeholder="Password"
        type="password"
        class="account__input"
        :error="form.password.error"
      />
      <BaseChecbox v-model="rememberMe" label="Remember me" class="account__checkbox" />

      <NotificationComponent
        v-model="isNotificationVisible"
        class="account__success"
        message="You have been successfully logged in."
      />
      <p v-if="errorMessage" class="account__error">{{ errorMessage }}</p>

      <BaseButton text="Sing in" type="submit" class="account__button" />
      <BaseButton
        text="Have forgotten your password?"
        :tag="NuxtLink"
        to="/reset"
        class="account__link"
      />
    </template>
  </form>
</template>

<style lang="scss" scoped>
  .account {
    &__input {
      margin-top: 46px;
    }

    &__checkbox {
      margin-top: 16px;

      @media (max-width: $breakpoints-m) {
        margin-top: 22px;
      }
    }

    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 500px;
      height: 54px;
      margin-top: 70px;
      font-size: 16px;
      font-weight: 700;
      color: $white;
      text-transform: uppercase;
      letter-spacing: 1px;
      background-color: $black;
      border: none;
      border-radius: 4px;

      @media (max-width: $breakpoints-m) {
        width: 100%;
        height: 32px;
        margin-top: 12px;
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

    &__link {
      margin-top: 14px;
      font-size: 16px;
      line-height: 28px;
      color: $black;

      @media (max-width: $breakpoints-m) {
        margin-top: 16px;
        font-size: 12px;
        line-height: 20px;
      }
    }

    &__link:hover {
      color: $dark-gray;
    }

    &__error {
      margin-top: 8px;
      font-family: $font-dm-sans;
      font-size: 12px;
      color: $red;
    }
  }

  :deep(.input__wrapper) {
    border-bottom: 1px solid $light-gray;
  }

  :deep(.checkbox__label) {
    font-size: 16px;
    line-height: 28px;
    color: $black;

    @media (max-width: $breakpoints-m) {
      font-size: 12px;
      line-height: 20px;
    }
  }

  :deep(.checkbox__custom) {
    border-radius: 2px;
  }

  :deep(.notification__button) {
    display: none;
  }
</style>
