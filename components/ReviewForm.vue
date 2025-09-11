<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue'
  import BaseInput from '~/components/ui/BaseInput.vue'
  import BaseChecbox from '~/components/ui/BaseChecbox.vue'
  import StarScore from '~/components/ui/StarScore.vue'
  import BaseButton from '~/components/ui/BaseButton.vue'

  const form = reactive({
    review: '',
    name: '',
    email: '',
    rating: 0,
    rememberMe: false,
  })

  const errors = reactive({
    review: '',
    name: '',
    email: '',
    rating: '',
  })
  const successMessage = ref('')

  const emit = defineEmits(['submit-review'])

  onMounted(() => {
    const savedName = localStorage.getItem('reviewer_name')
    const savedEmail = localStorage.getItem('reviewer_email')
    if (savedName) form.name = savedName
    if (savedEmail) form.email = savedEmail
  })

  const validateForm = () => {
    let isValid = true
    errors.review = ''
    errors.name = ''
    errors.email = ''
    errors.rating = ''

    if (!form.review.trim()) {
      errors.review = 'Required field'
      isValid = false
    }
    if (!form.name.trim()) {
      errors.name = 'Required field'
      isValid = false
    }
    if (!form.email.trim()) {
      errors.email = 'Required field'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Invalid address'
      isValid = false
    }
    if (form.rating <= 0) {
      errors.rating = 'Rating is required'
      isValid = false
    }

    return isValid
  }
  const handleSubmit = () => {
    if (!validateForm()) return

    emit('submit-review', { ...form })

    if (form.rememberMe) {
      localStorage.setItem('reviewer_name', form.name)
      localStorage.setItem('reviewer_email', form.email)
    } else {
      localStorage.removeItem('reviewer_name')
      localStorage.removeItem('reviewer_email')
      form.name = ''
      form.email = ''
      form.rememberMe = false
    }

    form.review = ''
    form.rating = 0
    successMessage.value = 'Your review has been submitted successfully!'
  }
</script>

<template>
  <section class="review__form">
    <h2 class="review__title">Add a Review</h2>
    <p class="review__text">
      Your email address will not be published. Required fields are marked *
    </p>

    <form @submit.prevent="handleSubmit">
      <BaseInput
        v-model="form.review"
        class="review__input"
        placeholder="Your Review*"
        :error="errors.review"
      />
      <BaseInput
        v-model="form.name"
        class="review__input"
        placeholder="Enter your name*"
        :error="errors.name"
      />
      <BaseInput
        v-model="form.email"
        class="review__input"
        type="email"
        placeholder="Enter your Email*"
        :error="errors.email"
      />
      <BaseChecbox
        v-model="form.rememberMe"
        class="review__checkbox"
        label="Save my name, email, and website in this browser for the next time I comment"
      />
      <div class="review__score">
        <p>Your Rating*</p>
        <StarScore v-model="form.rating" class="review__star" />
        <span v-if="errors.rating" class="review__error">{{ errors.rating }}</span>
      </div>
      <p v-if="successMessage" class="review__success">{{ successMessage }}</p>
      <BaseButton text="Submit" type="submit" class="review__button" formnoValidate />
    </form>
  </section>
</template>

<style lang="scss" scoped>
  .review {
    font-family: $font-dm-sans;

    &__form {
      width: 580px;

      @media (max-width: $breakpoints-xl) {
        width: 46%;
      }

      @media (max-width: $breakpoints-l) {
        width: 100%;
      }
    }

    &__title {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: 400;
      line-height: 26px;
      color: $black;

      @media (max-width: $breakpoints-l) {
        font-size: 16px;
        line-height: 20px;
      }
    }

    &__text {
      margin-bottom: 94px;
      font-size: 14px;
      line-height: 30px;
      color: $dark-gray;

      @media (max-width: $breakpoints-l) {
        margin-bottom: 30px;
        font-size: 12px;
        line-height: 20px;
      }
    }

    &__input {
      width: 100%;
      margin-bottom: 46px;
      color: $gray;

      @media (max-width: $breakpoints-l) {
        margin-bottom: 20px;
      }

      :deep(.input) {
        width: 100%;
        font-size: 14px;
        line-height: 22px;

        @media (max-width: $breakpoints-l) {
          font-size: 12px;
          line-height: 20px;
        }
      }

      :deep(.input__wrapper) {
        border-bottom: 1px solid $gray;
      }
    }

    &__input-email {
      margin-bottom: 24px;
    }

    &__checkbox {
      margin-bottom: 46px;

      @media (max-width: $breakpoints-l) {
        margin-bottom: 20px;
      }
    }

    &__score {
      @media (max-width: $breakpoints-l) {
        display: flex;
        gap: 16px;
      }

      p {
        margin: 0;
        margin-bottom: 14px;
        font-size: 14px;
        line-height: 22px;
        color: $dark-gray;

        @media (max-width: $breakpoints-l) {
          font-size: 12px;
          line-height: 20px;
        }
      }
    }

    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 124px;
      height: 54px;
      margin-top: 48px;
      font-size: 16px;
      font-weight: 700;
      color: $white;
      letter-spacing: 1px;
      background-color: $black;
      border: none;
      border-radius: 4px;

      @media (max-width: $breakpoints-l) {
        width: 100px;
        height: 30px;
        margin-top: 30px;
        font-size: 12px;
        line-height: 20px;
      }
    }

    &__button:hover {
      color: $black;
      background-color: $white;
      border: 1px solid $black;
    }

    &__error {
      margin-top: 8px;
      font-family: $font-dm-sans;
      font-size: 12px;
      color: $red;
    }

    &__success {
      margin-top: 8px;
      font-family: $font-dm-sans;
      font-size: 12px;
      color: #43c16b;
    }
  }
</style>
