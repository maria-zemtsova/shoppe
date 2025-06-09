<script setup lang="ts">

import type { DefineComponent } from 'vue';
import LinksList from "~/components/LinksList.vue";
import type { LinkItem } from '~/types/links';
import BaseInput from '~/components/ui/BaseInput.vue';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '~/components/icons/index';
const footerLinks: LinkItem[] = [
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
const footerSocials: LinkItem[] = [
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

const { email, errorMessage, isSuccess, handleSubmit } = useEmailSubscribe('newsletterEmails');
</script>
<template>
    <footer class="footer">
        <div class="footer__wrapper">
            <LinksList :items="footerLinks" list-class="footer__nav" item-class="footer__nav-item"
                link-class="footer__nav-link" />
            <p class="footer__copyright"> <span>© 2021 Shelly.</span> Terms of use <span>and</span> privacy policy.</p>
        </div>

        <div class="footer__wrapper">
            <form @submit.prevent="handleSubmit">
                <BaseInput v-model="email" class="newsletter" type="email"
                    placeholder="Give an email, get the newsletter." :error="errorMessage">
                    <button class="newsletter__button" formnovalidate />
                </BaseInput>
                <div v-if="isSuccess" class="newsletter__success">
                    The email has been successfully sent.
                </div>
            </form>
            <LinksList :items="footerSocials" list-class="footer__socials" link-class="footer__socials-link" />
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
        cursor: pointer;
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

.newsletter {

    &__button {
        width: 25px;
        height: 9px;
        background-color: transparent;
        border: none;
        background-image: url(/assets/arrow.svg);
        background-repeat: no-repeat;
    }

    &__success {
        font-family: $font-dm-sans;
        font-size: 8px;
        margin-top: 8px;
        color: #43c16b;
    }

}
</style>