<script setup lang="ts">
import type { LinkItem } from '~/types/links';

defineProps<{
    items: LinkItem[],
    listClass?: string;
    itemClass?: string;
    linkClass?: string;
}>();

</script>
<template>
    <ul :class="listClass">
        <li v-for="item in items" :key="item.id" :class="itemClass">
            <NuxtLink v-if="item.component" :class="linkClass" :to="item.path" />
            <NuxtLink v-else :class="linkClass">{{ item.label }}</NuxtLink>
        </li>
    </ul>
</template>