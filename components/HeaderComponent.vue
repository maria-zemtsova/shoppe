<script setup lang="ts">
  import HeaderLogo from './icons/HeaderLogo.vue'
  import type { LinkItem } from '~/types/links'
  import {
    UserIcon,
    ShoppingIcon,
    SearchIcon,
    BurgerIcon,
    CloseIcon,
    LogoutIcon,
  } from '~/components/icons/index'
  import type { DefineComponent } from 'vue'
  import LinksList from '~/components/LinksList.vue'
  import { useCartStore } from '~/stores/cart'
  import { useAuthStore } from '~/stores/auth'
  import AuthIcon from '~/components/icons/AuthIcon.vue'
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  const cartStore = useCartStore()
  const authStore = useAuthStore()
  const router = useRouter()

  // Инициализируем auth store при загрузке компонента
  onMounted(() => {
    authStore.checkAuth()
  })

  const isMobileMenu = ref(false)
  const toggleMobileMenu = () => {
    isMobileMenu.value = !isMobileMenu.value
  }

  const handleLogout = async () => {
    await authStore.logout()
    router.push('/')
  }

  const menuLinks: LinkItem[] = [
    {
      id: 1,
      path: '/catalog',
      label: 'Shop',
    },
    {
      id: 2,
      path: '#',
      label: 'Blog',
    },
    {
      id: 3,
      path: '#',
      label: 'Our Story',
    },
  ]

  const mobileMenuLinks: LinkItem[] = [
    {
      id: 1,
      path: '/',
      label: 'Home',
    },
    {
      id: 2,
      path: '/catalog',
      label: 'Shop',
    },
    {
      id: 3,
      path: '#',
      label: 'About',
    },
    {
      id: 4,
      path: '#',
      label: 'Blog',
    },
    {
      id: 5,
      path: '#',
      label: 'Help',
    },
    {
      id: 6,
      path: '#',
      label: 'Contact',
    },
    {
      id: 7,
      path: '#',
      label: 'Search',
    },
  ]

  const mobileUserLinks: LinkItem[] = [
    {
      id: 1,
      path: '/account',
      label: 'My Account',
      component: UserIcon as DefineComponent,
    },
    {
      id: 2,
      path: '#',
      label: 'Logout',
      component: LogoutIcon as DefineComponent,
      action: handleLogout,
    },
  ]

  const iconLinks: LinkItem[] = [
    {
      id: 1,
      path: '#',
      label: 'search',
      component: SearchIcon as DefineComponent,
    },
    {
      id: 2,
      path: '#',
      label: 'shopping',
      component: ShoppingIcon as DefineComponent,
      action: () => cartStore.toggleSidebar(),
    },
  ]
</script>

<template>
  <header class="header">
    <div class="header__top">
      <HeaderLogo class="header__logo" />

      <nav class="header__nav">
        <LinksList :items="menuLinks" class="header__list header__menu-list" />
        <div class="header__list header__icons-list">
          <LinksList :items="iconLinks" class="header__icons-list" />

          <div class="header__user">
            <NuxtLink to="/account" class="header__user-link">
              <AuthIcon v-if="authStore.isLoggedIn" class="header__user-indicator" />
              <UserIcon />
            </NuxtLink>
          </div>
        </div>

        <div class="header__mobile-controls">
          <button class="header__button" @click="cartStore.toggleSidebar()">
            <component :is="ShoppingIcon" />
          </button>
          <button class="header__button" @click="toggleMobileMenu">
            <component :is="isMobileMenu ? CloseIcon : BurgerIcon" />
          </button>
        </div>
      </nav>
    </div>

    <div v-if="isMobileMenu" class="header__mobile-menu">
      <LinksList :items="mobileMenuLinks" class="header__mobile-list" />
      <ul class="user-menu">
        <li v-for="item in mobileUserLinks" :key="item.id" class="user-menu__item">
          <NuxtLink v-if="item.path !== '#'" class="user-menu__link" :to="item.path">
            <component :is="item.component" class="user-menu__icon" />
            <span class="user-menu__text">{{ item.label }}</span>
          </NuxtLink>
          <button v-else class="user-menu__link user-menu__button" @click="item.action">
            <component :is="item.component" class="user-menu__icon" />
            <span class="user-menu__text">{{ item.label }}</span>
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-top: 48px;

      @media (max-width: $breakpoints-s) {
        width: 320px;
      }
    }

    &__logo {
      @media (max-width: $breakpoints-l) {
        width: 99px;
        height: 36px;
      }
    }

    &__nav {
      display: flex;
      gap: 48px;
      align-items: center;
    }

    &__list {
      @media (max-width: $breakpoints-l) {
        display: none;
      }
    }

    &__menu-list {
      gap: 64px;
    }

    &__menu-list::after {
      width: 1px;
      height: 17px;
      content: '';
      background: $dark-gray;
    }

    &__icons-list {
      display: flex;
      gap: 40px;
      align-items: center;

      @media (max-width: $breakpoints-l) {
        display: none;
      }
    }

    &__mobile-controls {
      display: none;

      @media (max-width: $breakpoints-l) {
        display: flex;
        gap: 20px;
      }
    }

    &__button {
      padding: 0;
      cursor: pointer;
      background-color: transparent;
      border: none;
    }

    &__mobile-menu {
      display: none;
      width: 100%;
      padding: 20px 0;
      background-color: $white;

      @media (max-width: $breakpoints-l) {
        display: block;
      }
    }

    &__mobile-list {
      display: flex;
      flex-direction: column;
      gap: 24px;
      align-items: flex-start;
      width: 100%;
      padding: 0;
      margin: 0 0 24px;
      list-style: none;
    }

    &__user {
      position: relative;
      display: flex;
      align-items: center;
    }

    &__user-link {
      position: relative;
      display: flex;
      align-items: center;
      text-decoration: none;
    }

    &__user-indicator {
      position: absolute;
      top: -2px;
      right: 18px;
    }
  }

  .user-menu {
    padding: 24px 0 0;
    margin: 0;
    list-style: none;
    border-top: 1px solid $gray;

    &__item {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__link {
      display: flex;
      gap: 10px;
      align-items: center;
      font-family: $font-dm-sans;
      font-size: 20px;
      line-height: 26px;
      color: $black;
      text-decoration: none;
    }

    &__button {
      padding: 0;
      font-family: $font-dm-sans;
      font-size: 20px;
      line-height: 26px;
      color: $black;
      cursor: pointer;
      background-color: transparent;
      border: none;
    }
  }
</style>
