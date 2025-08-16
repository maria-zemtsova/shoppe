<script setup lang="ts">
  import { VueAwesomePaginate } from 'vue-awesome-paginate'
  import 'vue-awesome-paginate/dist/style.css'
  import { ArrowIcon } from '~/components/icons/index'
  const model = defineModel<number>({ required: true })
  const props = defineProps<{
    totalItems: number
    perPage: number
  }>()
</script>

<template>
  <section>
    <VueAwesomePaginate
      v-model="model"
      :total-items="props.totalItems"
      :items-per-page="props.perPage"
      :max-pages-shown="3"
      :hide-prev-next-when-ends="true"
      :showBreakpointButtons="false"
      paginate-buttons-class="pagination__button"
      active-page-class="pagination__button--active"
    >
      <template #prev-button>
        <button>
          <ArrowIcon class="pagination__prev" aria-label="Previos page" />
        </button>
      </template>
      <template #next-button>
        <button>
          <ArrowIcon class="pagination__next" aria-label="Next page" />
        </button>
      </template>
    </VueAwesomePaginate>
  </section>
</template>

<style lang="scss" scoped>
  :deep(.pagination) {
    font-family: $font-dm-sans;
    color: $black;
  }

  :deep(.pagination-container) {
    gap: 12px;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 88px;
  }

  :deep(.pagination__button) {
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

  :deep(.pagination__button--active) {
    color: $white;
    background-color: $black;
    border-radius: 4px;
  }

  :deep(.pagination__prev) {
    cursor: pointer;
    transform: scaleX(-1);
  }

  :deep(.pagination__next) {
    cursor: pointer;
    background-repeat: no-repeat;
  }
</style>
