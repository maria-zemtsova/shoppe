<script setup lang="ts">
  import { VueAwesomePaginate } from 'vue-awesome-paginate'
  import 'vue-awesome-paginate/dist/style.css'

  const props = defineProps<{
    modelValue: number
    totalItems: number
    perPage: number
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', page: number): void
  }>()

  const updatePage = (page: number) => {
    emit('update:modelValue', page)
  }
</script>

<template>
  <section>
    <VueAwesomePaginate
      :model-value="props.modelValue"
      :total-items="props.totalItems"
      :items-per-page="props.perPage"
      :max-pages-shown="3"
      :hide-prev-next-when-ends="true"
      :showBreakpointButtons="false"
      paginate-buttons-class="pagination__button"
      active-page-class="pagination__button--active"
      @update:model-value="updatePage"
    >
      <template #prev-button>
        <button>
          <img class="pagination__prev" src="/assets/next.svg" alt="Previos page" />
        </button>
      </template>
      <template #next-button>
        <button>
          <img class="pagination__next" src="/assets/next.svg" alt="Next page" />
        </button>
      </template>
    </VueAwesomePaginate>
  </section>
</template>

<style lang="scss">
  .pagination {
    font-family: $font-dm-sans;
    color: $black;

    &-container {
      gap: 12px;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-top: 88px;
    }

    &__button {
      width: 46px;
      height: 46px;
      cursor: pointer;
      background: transparent;
      border: 1px solid $gray;
      border-radius: 4px;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 0;
        background: transparent;
        border: none;
      }
    }

    &__button--active {
      color: $white;
      background-color: $black;
      border-radius: 4px;
    }

    &__prev {
      cursor: pointer;
      transform: scaleX(-1);
    }

    &__next {
      cursor: pointer;
      background-repeat: no-repeat;
    }
  }
</style>
