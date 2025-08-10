<script lang="ts" setup>
  const props = defineProps<{
    modelValue: boolean
    text?: string
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

  const toggle = () => {
    emit('update:modelValue', !props.modelValue)
  }
</script>

<template>
  <div class="tumbler">
    <p v-if="text" class="tumbler__text">{{ text }}</p>
    <button
      class="tumbler__button"
      type="button"
      aria-label="Toggle switch"
      :class="{ '--active': props.modelValue }"
      @click="toggle"
    >
      <span class="tumbler__thumb" />
    </button>
  </div>
</template>

<style lang="scss">
  .tumbler {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 260px;
    margin-top: 40px;

    @media (max-width: $breakpoints-m) {
      width: 288px;
    }

    &__text {
      margin: 0;
      font-family: $font-dm-sans;
      font-size: 16px;
      line-height: 27px;
    }

    &__button {
      position: relative;
      width: 34px;
      height: 20px;
      cursor: pointer;
      background-color: $dark-gray;
      border: none;
      border-radius: 25px;
      transition: background 0.3s ease;
    }

    &__button--active {
      background: $accent;

      .tumbler__thumb {
        transform: translateX(calc(#{28px} - #{12px} - 2px));
      }

      &__thumb {
        position: absolute;
        top: 4px;
        left: 4px;
        width: 12px;
        height: 12px;
        background: $white;
        border-radius: 50%;
        box-shadow: 0 1px 2px rgb(0 0 0 / 20%);
        transition: transform 0.3s ease;
      }
    }
  }
</style>
