<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import BaseInput from '~/components/ui/BaseInput.vue'
  import BaseChecbox from '~/components/ui/BaseChecbox.vue'
  import StarScore from '~/components/ui/StarScore.vue'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import { useEmailSubscribe } from '~/composables/useEmailValidation'

  const { email, errorMessage } = useEmailSubscribe('newsletterEmails')

  const reviewText = ref('')
  const name = ref('')
  const rating = ref(0)
  const rememberMe = ref(false)

  const emit = defineEmits(['submit-review'])

  onMounted(() => {
    const savedName = localStorage.getItem('reviewer_name')
    const savedEmail = localStorage.getItem('reviewer_email')
    if (savedName) name.value = savedName
    if (savedEmail) email.value = savedEmail
  })

  const isValid = computed(
    () =>
      reviewText.value.trim() !== '' &&
      name.value.trim() !== '' &&
      email.value.trim() !== '' &&
      rating.value > 0,
  )

  const handleSubmit = () => {
    if (!isValid.value) return

    emit('submit-review', {
      text: reviewText.value,
      name: name.value,
      email: email.value,
      rating: rating.value,
    })

    if (rememberMe.value) {
      localStorage.setItem('reviewer_name', name.value)
      localStorage.setItem('reviewer_email', email.value)
    } else {
      localStorage.removeItem('reviewer_name')
      localStorage.removeItem('reviewer_email')
      name.value = ''
      email.value = ''
    }

    reviewText.value = ''
    rating.value = 0
  }
</script>

<template>
  <section class="review__form">
    <h2 class="review__title">Add a Review</h2>
    <p class="review__text">
      Your email address will not be published. Required fields are marked *
    </p>

    <form @submit.prevent="handleSubmit">
      <BaseInput v-model="reviewText" class="review__input" placeholder="Your Review*" />
      <BaseInput v-model="name" class="review__input" placeholder="Enter your name*" />
      <BaseInput
        v-model="email"
        class="review__input"
        type="email"
        :error="errorMessage"
        placeholder="Enter your Email*"
      />

      <BaseChecbox
        v-model="rememberMe"
        class="review__checkbox"
        label="Save my name, email, and website in this browser for the next time I comment"
      />

      <div class="review__score">
        <p>Your Rating*</p>
        <StarScore v-model="rating" class="review__star" />
      </div>

      <BaseButton
        text="Submit"
        type="submit"
        class="review__button"
        :disabled="!isValid"
        formnovalidate
      />
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
  }
</style>
