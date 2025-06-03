<script setup lang="ts">
import HeaderLogo from './icons/HeaderLogo.vue';
import type { MenuLink, IconLink } from '@/types/header';
import IconSearch from './icons/IconSearch.vue';
import IconShopping from './icons/IconShopping.vue';
import IconUser from './icons/IconUser.vue';
import type { DefineComponent } from 'vue';



const menuLinks: MenuLink[] = [
    {
        id: 1,
        path: '/shop',
        label: 'Shop'
    },
    {
        id: 2,
        path: '/blog',
        label: 'Blog'
    },
    {
        id: 3,
        path: '/story',
        label: 'Our Story'
    }
];

const iconLinks: IconLink[] = [
    {
        id: 1,
        path: '/',
        label: 'search',
        component: IconSearch as DefineComponent

    },
    {
        id: 2,
        path: '/',
        label: 'shopping',
        component: IconShopping as DefineComponent
    },

    {
        id: 3,
        path: '/',
        label: 'user',
        component: IconUser as DefineComponent

    },
]
</script>

<template>
    <header class="header container">
        <HeaderLogo />
        <nav class="header__nav">
            <ul class="header__list header__list-menu">
                <li v-for="item in menuLinks" :key="item.id" class="menu__item">
                    <NuxtLink class="menu__link" :to="item.path">{{ item.label }}</NuxtLink>
                </li>
            </ul>
            <ul class="header__list header__list-icons">
                <li v-for="item in iconLinks" :key="item.id">
                    <NuxtLink :to="item.path">
                        <component :is="item.component" />
                    </NuxtLink>
                </li>
            </ul>
        </nav>

    </header>


</template>

<style lang="scss">
//@use '/assets/scss/variables' as *;
@use '/assets/scss/fonts' as *;

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 48px;

    &__nav {
        display: flex;
        align-items: center;
        gap: 48px;
    }

    &__list {
        display: flex;
        width: auto;
        list-style: none;
        padding: 0;
    }

    &__list-menu {
        display: flex;
        align-items: center;
        gap: 24px;
    }

    &__list-menu::after {
        content: '';
        width: 1px;
        height: 17px;
        background: $dark-gray;
        margin-left: 24px;
    }

    &__list-icons {
        gap: 39px;
    }
}

.menu__link {
    text-decoration: none;
    color: $black;
    font-family: $font-dm-sans;
    line-height: 27px;
    font-size: 16px;
}
</style>
