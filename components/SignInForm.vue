<script lang="ts" setup>
  import BaseInput from '~/components/ui/BaseInput.vue'
  import BaseChecbox from '~/components/ui/BaseChecbox.vue'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import NotificationComponent from '~/components/ui/NotificationComponent.vue'
  import { reactive, ref } from 'vue'
  import { useAuthStore } from '~/stores/auth'
  import { useRouter } from 'vue-router'

  const authStore = useAuthStore()
  const router = useRouter()

  const form = reactive({
    email: { value: '', error: '' },
    password: { value: '', error: '' },
    rememberMe: false,
  })
  const successMessage = ref('')
  const errorMessage = ref('')
  const isNotificationVisible = ref(false)
  const REQUIRED_FIELD_ERROR = 'Required field'
  const validateForm = () => {
    form.email.error = ''
    form.password.error = ''
    errorMessage.value = ''

    if (!form.password.value.trim()) {
      form.password.error = REQUIRED_FIELD_ERROR
    }
    if (!form.email.value.trim()) {
      form.email.error = REQUIRED_FIELD_ERROR
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value)) {
      form.email.error = 'Invalid address'
    }
    return !Object.values(form).some(
      (item) => typeof item === 'object' && 'error' in item && !!item.error,
    )
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    const result = await authStore.login({
      email: form.email.value,
      password: form.password.value,
      rememberMe: form.rememberMe,
    })

    if (result.success) {
      isNotificationVisible.value = true
      errorMessage.value = ''
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      errorMessage.value = result.error || 'Authentication failed'
      successMessage.value = ''
    }
  }
</script>

<template>
  <form class="account__form" @submit.prevent="handleSubmit">
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
    <BaseChecbox v-model="form.rememberMe" label="Remember me" class="account__checkbox" />

    <NotificationComponent
      v-model="isNotificationVisible"
      class="account__success"
      message="You have been successfully logged in."
    />
    <p v-if="errorMessage" class="account__error">{{ errorMessage }}</p>

    <BaseButton text="Sing in" type="submit" class="account__button" />
    <BaseButton text="Have forgotten your password?" tag="a" class="account__link" href="/reset" />
  </form>
</template>

<style lang="scss" scoped>
  .account {
    &__input {
      margin-top: 46px;
    }

    &__checkbox {
      margin-top: 16px;

      @media (max-width: $breakpoints-l) {
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

      @media (max-width: $breakpoints-l) {
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

      @media (max-width: $breakpoints-l) {
        margin-top: 16px;
        font-size: 12px;
        line-height: 20px;
      }
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

    @media (max-width: $breakpoints-l) {
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
