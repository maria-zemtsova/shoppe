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
const errorMessage = ref('');
const isSuccess = ref(false);

const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleSubmit = (): void => {
    const trimmedEmail = email.value.trim();
    errorMessage.value = '';
    isSuccess.value = false;

    // Валидации
    if (!trimmedEmail) {
        errorMessage.value = 'Required field.';
        return;
    }
    if (!isValidEmail(trimmedEmail)) {
        errorMessage.value = 'Invalid address';
        return;
    }


    const storedEmails = JSON.parse(localStorage.getItem(props.storageKey) || '[]');
    if (storedEmails.includes(trimmedEmail)) {
        errorMessage.value = 'The email address already exists';
        return;
    }


    storedEmails.push(trimmedEmail);
    localStorage.setItem(props.storageKey, JSON.stringify(storedEmails));
    email.value = '';
    isSuccess.value = true;
};
</script>

<template>
    <section>


        <form class="newsletter" @submit.prevent="handleSubmit">
            <div class="newsletter__wrapper">
                <input v-model="email" :placeholder="placeholder" type="email" class="newsletter__input"
                    @input="errorMessage = ''">
                <button type="submit" class="newsletter__button" aria-label="Submit email" formnovalidate />
            </div>

        </form>
        <div v-if="errorMessage" class="newsletter__error">
            {{ errorMessage }}
        </div>
        <div v-if="isSuccess" class="newsletter__success">
            The email has been successfully sent.
        </div>
    </section>
</template>
<style lang="scss">
.newsletter {
    width: 396px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $black;
    padding-bottom: 13px;
    font-family: $font-dm-sans;

    &__input {
        width: 245px;
        padding: 0;
        border: none;
        font-size: 16px;
        color: $dark-gray
    }

    &__input:focus {
        outline: none;
        box-shadow: none;
        color: $black
    }

    &__button {
        width: 25px;
        height: 9px;
        background-color: transparent;
        border: none;
        background-image: url(/assets/arrow.svg);
        background-repeat: no-repeat;
    }

    &__error {
        font-size: 8px;
        margin-top: 8px;
        color: $red;
    }

    &__success {
        font-size: 8px;
        margin-top: 8px;
        color: #43c16b;
    }

}
</style>