<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    placeholder?: string;
    storageKey: string;
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: 'email',
});

const email = ref('');

const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleSubmit = (): void => {
    const trimmedEmail = email.value.trim();

    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
        return;
    }

    const storedEmails = JSON.parse(localStorage.getItem(props.storageKey) || '[]');
    storedEmails.push(trimmedEmail);
    localStorage.setItem(props.storageKey, JSON.stringify(storedEmails));
};
</script>

<template>
    <form class="newsletter" @submit.prevent="handleSubmit">
        <input v-model="email" :placeholder="placeholder" type="email" required class="newsletter__input">
        <button type="submit" class="newsletter__button" aria-label="send email">
            <span class="visually-hidden">send</span>
        </button>
    </form>
</template>
<style lang="scss">
.newsletter {
    width: 396px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $black;
    padding-bottom: 13px;

    &__input {
        width: 245px;
        padding: 0;
        border: none;
        font-family: $font-dm-sans;
        font-size: 16px;
        color: $dark-gray
    }

    &__input:focus {
        outline: none;
        box-shadow: none;
    }

    &__button {
        width: 25px;
        height: 9px;
        background-color: transparent;
        border: none;
        background-image: url(/assets/arrow.svg);
        background-repeat: no-repeat;
    }

}
</style>