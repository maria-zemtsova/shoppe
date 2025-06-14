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
            <NuxtLink :to="item.path" :class="linkClass">
                <component :is="item.component" v-if="item.component" />
                <span v-else>{{ item.label }}</span>
            </NuxtLink>
        </li>
    </ul>
</template>
