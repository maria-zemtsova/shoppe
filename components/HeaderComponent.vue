<script setup lang="ts">
import HeaderLogo from './icons/HeaderLogo.vue';
import type { LinkItem } from '~/types/links';
import { UserIcon, ShoppingIcon, SearchIcon, BurgerIcon, CloseIcon, LogoutIcon } from '~/components/icons/index';
import type { DefineComponent } from 'vue';
import LinksList from '~/components/LinksList.vue';

const isMobileMenu = ref(false);
const toggleMobileMenu = () => {
    isMobileMenu.value = !isMobileMenu.value;
};

const menuLinks: LinkItem[] = [
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

const mobileMenuLinks: LinkItem[] = [
    {
        id: 1,
        path: '/',
        label: 'Home',
    },
    {
        id: 2,
        path: '/shop',
        label: 'Shop',
    },
    {
        id: 3,
        path: '/about',
        label: 'About',
    },
    {
        id: 4,
        path: '/blog',
        label: 'Blog',
    },
    {
        id: 5,
        path: '/help',
        label: 'Help',
    },
    {
        id: 6,
        path: '/contact',
        label: 'Contact',
    },
    {
        id: 7,
        path: '/search',
        label: 'Search',
    },
];

const mobileUserLinks: LinkItem[] = [
    {
        id: 1,
        path: '/account',
        label: 'My Account',
        component: UserIcon as DefineComponent
    },
    {
        id: 2,
        path: '/logout',
        label: 'Logout',
        component: LogoutIcon as DefineComponent
    }
];

const iconLinks: LinkItem[] = [
    {
        id: 1,
        path: '/',
        label: 'search',
        component: SearchIcon as DefineComponent
    },
    {
        id: 2,
        path: '/',
        label: 'shopping',
        component: ShoppingIcon as DefineComponent
    },
    {
        id: 3,
        path: '/',
        label: 'user',
        component: UserIcon as DefineComponent
    },
];
</script>

<template>
    <header class="header">
        <div class="header__top">
            <HeaderLogo class="header__logo" />

            <nav class="header__nav">
                <!-- Desktop  -->
                <LinksList :items="menuLinks" class="header__list header__list--menu" list-class="header__list-inner"
                    item-class="header__item" link-class="header__link" />
                <LinksList :items="iconLinks" class="header__list header__list--icons"
                    list-class="header__list-inner" />

                <!-- Mobile -->
                <div class="header__mobile-controls">
                    <button class="header__button">
                        <component :is="ShoppingIcon" />
                    </button>
                    <button class="header__button" @click="toggleMobileMenu">
                        <component :is="isMobileMenu ? CloseIcon : BurgerIcon" />
                    </button>
                </div>
            </nav>
        </div>

        <!-- Mobile menu -->
        <div v-if="isMobileMenu" class="header__mobile-menu">
            <LinksList :items="mobileMenuLinks" class="header__mobile-list" list-class="header__mobile-list-inner"
                item-class="header__mobile-item" link-class="header__mobile-link" />
            <ul class="user-menu">
                <li v-for="item in mobileUserLinks" :key="item.id" class="user-menu__item">
                    <NuxtLink class="user-menu__link" :to="item.path">
                        <component :is="item.component" class="user-menu__icon" />
                        <span class="user-menu__text">{{ item.label }}</span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </header>
</template>

<style lang="scss">
@use '/assets/scss/variables' as *;
@use '/assets/scss/fonts' as *;

.header {
    display: flex;
    flex-direction: column;

    &__top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 48px;
    }

    &__nav {
        display: flex;
        align-items: center;
        gap: 48px;
    }

    &__list {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;

        &--menu {
            align-items: center;
            gap: 24px;

            .header__list-inner::after {
                content: '';
                width: 1px;
                height: 17px;
                background: $dark-gray;
                margin-left: 24px;
            }
        }

        &--icons {
            gap: 39px;
        }
    }

    &__list-inner {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    &__link {
        text-decoration: none;
        color: $black;
        font-family: $font-dm-sans;
        line-height: 27px;
        font-size: 16px;
    }

    &__mobile-controls {
        display: none;
    }

    &__button {
        padding: 0;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    &__mobile-menu {
        width: 100%;
        background-color: $white;
        padding: 20px 0;
    }

    &__mobile-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        list-style: none;
        padding: 0;
        margin: 0 0 24px 0;
    }

    &__mobile-link {
        text-decoration: none;
        color: $black;
        font-family: $font-dm-sans;
        line-height: 26px;
        font-size: 20px;
    }
}

.user-menu {
    list-style: none;
    padding: 24px 0 0 0;
    margin: 0;
    border-top: 1px solid $gray;

    &__item {
        margin-bottom: 16px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    &__link {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        color: $black;
        font-family: $font-dm-sans;
        line-height: 26px;
        font-size: 20px;
    }
}

@media (max-width: 600px) {
    .header {
        &__logo {
            width: 99px;
            height: 36px;
        }

        &__list {

            &--menu,
            &--icons {
                display: none;
            }
        }

        &__mobile-controls {
            display: flex;
            gap: 20px;
        }
    }
}
</style>