<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import BaseInput from '~/components/ui/BaseInput.vue'
  import BaseChecbox from '~/components/ui/BaseChecbox.vue'
  import StarScore from '~/components/ui/StarScore.vue'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import { useFormValidation } from '~/composables/useFormValidation'

  const emit = defineEmits(['submit-review'])

  const formConfig = {
    review: { required: true },
    name: { required: true },
    email: { required: true, email: true },
  }

  const { form, successMessage, validateForm } = useFormValidation(formConfig)
  const rating = ref(0)
  const ratingError = ref('')
  const rememberMe = ref(false)

  onMounted(() => {
    const savedName = localStorage.getItem('reviewer_name')
    const savedEmail = localStorage.getItem('reviewer_email')
    if (savedName) form.name.value = savedName
    if (savedEmail) form.email.value = savedEmail
  })

  const validateReviewForm = () => {
    ratingError.value = ''

    if (!validateForm()) {
      return false
    }

    if (rating.value <= 0) {
      ratingError.value = 'Rating is required'
      return false
    }

    return true
  }
  const handleSubmit = () => {
    if (!validateReviewForm()) return

    emit('submit-review', {
      ...form,
      rating: rating.value,
      rememberMe: rememberMe.value,
    })

    if (rememberMe.value) {
      localStorage.setItem('reviewer_name', form.name.value)
      localStorage.setItem('reviewer_email', form.email.value)
    } else {
      localStorage.removeItem('reviewer_name')
      localStorage.removeItem('reviewer_email')
      form.name.value = ''
      form.email.value = ''
      rememberMe.value = false
    }

    form.review.value = ''
    rating.value = 0
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
        v-model="form.review.value"
        placeholder="Your Review*"
        class="review__input"
        :error="form.review.error"
      />
      <BaseInput
        v-model="form.name.value"
        placeholder="Enter your name*"
        class="review__input"
        :error="form.name.error"
      />
      <BaseInput
        v-model="form.email.value"
        placeholder="Enter your Email*"
        class="review__input"
        type="email"
        :error="form.email.error"
      />
      <BaseChecbox
        v-model="rememberMe"
        label="Save my name, email, and website in this browser for the next time I comment"
        class="review__checkbox"
      />
      <div class="review__score">
        <p>Your Rating*</p>
        <StarScore v-model="rating" class="review__star" />
        <span v-if="ratingError" class="review__error">{{ ratingError }}</span>
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

        .review__error {
          margin-top: 0;
        }
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
