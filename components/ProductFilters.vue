<script setup lang="ts">
  import BaseInput from '~/components/ui/BaseInput.vue'
  import BaseDropdown from '~/components/ui/BaseDropdown.vue'
  import BaseRange from '~/components/ui/BaseRange.vue'
  import TumblerButton from '~/components/ui/TumblerButton.vue'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import { FiltersIcon, CloseIcon, FiltersLogo } from '~/components/icons/index'
  import { ref, computed } from 'vue'
  import debounce from 'lodash.debounce'
  import type { Filters } from '~/types/filters'

  interface DropdownOption {
    id: number
    value: string
    label: string
  }

  const isFiltersShow = ref(false)
  const toggleFilters = () => {
    isFiltersShow.value = !isFiltersShow.value
  }

  const categoryList: DropdownOption[] = [
    { id: 1, value: "men's clothing", label: "men's clothing" },
    { id: 2, value: 'jewelery', label: 'jewelery' },
    { id: 3, value: 'electronics', label: 'electronics' },
    { id: 4, value: "women's clothing", label: "women's clothing" },
    { id: 5, value: '', label: 'all' },
  ]

  const sortByList: DropdownOption[] = [{ id: 1, value: 'price', label: 'price' }]

  const props = defineProps<{ modelValue: Filters }>()
  const emit = defineEmits(['update:modelValue'])

  const updateSearch = debounce((value: string) => {
    emit('update:modelValue', { ...props.modelValue, searchQuery: value })
  }, 500)

  function makeComputed<K extends keyof typeof props.modelValue>(key: K) {
    return computed({
      get: () => props.modelValue[key],
      set: (value) => emit('update:modelValue', { ...props.modelValue, [key]: value }),
    })
  }
  const searchQuery = computed({
    get: () => props.modelValue.searchQuery,
    set: (value) => updateSearch(value),
  })
  const category = makeComputed('category')
  const sortBy = makeComputed('sortBy')
  const priceRange = makeComputed('priceRange')
  const isInStock = makeComputed('inStock')

  const isOnSale = computed({
    get: () => props.modelValue.discountPercentage > 0,
    set: (value: boolean) =>
      emit('update:modelValue', {
        ...props.modelValue,
        discountPercentage: value ? 1 : 0,
      }),
  })
</script>

<template>
  <section class="filters">
    <div class="filters__menu" :class="{ 'filters__menu--closed': isFiltersShow }">
      <FiltersIcon class="filters__icon" />
      <BaseButton class="filters__button" type="button" text="Filters" @click="toggleFilters" />
    </div>
    <div class="filters__content" :class="{ 'filters__content--active': isFiltersShow }">
      <div class="filters__header">
        <FiltersLogo class="filters__logo" />
        <CloseIcon @click="toggleFilters" />
      </div>
      <BaseInput v-model="searchQuery" class="filters__input" placeholder="Search...">
        <button />
      </BaseInput>
      <BaseDropdown v-model="category" placeholder="Category" :options="categoryList" />
      <BaseDropdown v-model="sortBy" placeholder="Sort By" :options="sortByList" />
      <BaseRange v-model="priceRange" />
      <TumblerButton v-model="isOnSale" text="On sale" />
      <TumblerButton v-model="isInStock" text="In stock" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .filters {
    &__menu {
      display: none;
      gap: 8px;
      align-items: center;
      width: 60px;
      margin-bottom: 16px;

      @media (max-width: $breakpoints-xl) {
        display: flex;
      }
    }

    &__menu--closed {
      display: none;
    }

    &__button {
      font-family: $font-dm-sans;
      font-size: 12px;
      line-height: 20px;
      background-color: transparent;
      border: none;
    }

    &__icon {
      width: 18px;
      height: 18px;
    }

    &__content {
      @media (max-width: $breakpoints-xl) {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        padding-top: 20px;
        padding-bottom: 40px;
        background: $white;
        opacity: 0;
        transform: translateY(-100%);
        transition:
          transform 0.3s ease,
          opacity 0.3s ease;
      }
    }

    &__content--active {
      @media (max-width: $breakpoints-xl) {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &__header {
      display: none;
      width: 288px;
      margin-bottom: 32px;

      @media (max-width: $breakpoints-xl) {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    &__input {
      width: 260px;
      margin-bottom: 40px;

      @media (max-width: $breakpoints-xl) {
        width: 288px;
      }

      button {
        display: inline-block;
        width: 19px;
        height: 19px;
        cursor: pointer;
        background-color: transparent;
        background-image: url('../assets/search.svg');
        background-repeat: no-repeat;
        border: none;
      }
    }
  }
</style>
