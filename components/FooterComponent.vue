<script setup lang="ts">

import type { DefineComponent } from 'vue';

import type { LinksText } from '~/types/linksText';
import type { Social } from '~/types/socials';
import { InputFooter } from '#components';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '~/components/icons/index';
const footerLinks: LinksText[] = [
    {
        id: 1,
        path: '/contact',
        label: 'contact'
    },
    {
        id: 2,
        path: '/services',
        label: 'terms of services'
    },
    {
        id: 3,
        path: '/shipping',
        label: 'shipping and returns'
    },
]
const footerSocials: Social[] = [
    {
        id: 1,
        component: FacebookIcon as DefineComponent,
        label: 'facebook',
        path: '/fb'
    },
    {
        id: 2,
        component: InstagramIcon as DefineComponent,
        label: 'instagram',
        path: '/insta'
    },
    {
        id: 3,
        component: TwitterIcon as DefineComponent,
        label: 'twwiter',
        path: '/tw'
    },
]

</script>
<template>
    <footer class="footer">
        <div class="footer__wrapper">
            <ul class="footer__nav">
                <li v-for="item in footerLinks" :key="item.id" class="footer__nav-item">
                    <NuxtLink class="footer__nav-link" :to="item.path">{{ item.label }}</NuxtLink>
                </li>
            </ul>
            <p class="footer__copyright"> <span>© 2021 Shelly.</span> Terms of use <span>and</span> privacy policy.</p>

        </div>

        <div class="footer__wrapper">
            <InputFooter placeholder="Give an email, get the newsletter." storage-key="newsletterEmails" />
            <ul class="footer__socials">
                <li v-for="item in footerSocials" :key="item.id">
                    <NuxtLink class="footer__socials-link" :to="item.path">
                        <component :is="item.component" />
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </footer>
</template>

<style lang="scss">
.footer {
    display: flex;
    justify-content: space-between;
    min-height: 159px;
    border-top: 1px solid $light-gray;
    padding-top: 37px;

    &__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
    }

    &__nav {
        display: flex;
        width: 535px;
        list-style: none;
        padding: 0;
        gap: 41px;
    }

    &__nav-link {
        font-family: $font-dm-sans;
        font-size: 16px;
        color: $dark-gray;
        text-decoration: none;
        text-transform: uppercase;
    }

    &__nav-link:hover {
        color: $black;

    }

    &__copyright {
        width: 100%;
        font-family: $font-dm-sans;
        font-size: 16px;
        color: $dark-gray;
        margin: 0;

        span {
            color: $black;
        }
    }

    &__socials {
        width: 110px;
        display: flex;
        gap: 30px;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    &__socials-link path:hover {
        fill: $black;
    }

}
</style>