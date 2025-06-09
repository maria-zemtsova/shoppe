<script setup lang="ts">

defineProps<
    {
        type?: string
        placeholder?: string
        modelValue?: string
        error?: string;
    }>()
defineEmits(['update:modelValue']);
</script>


<template>

    <div class="input__wrapper">
        <input class="input" :type="type" :placeholder="placeholder" :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
        <slot />
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>


</template>

<style lang="scss" scoped>
.input__wrapper {
    min-width: 396px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $black;
    padding-bottom: 13px;
    font-family: $font-dm-sans;
}

.input {
    width: 245px;
    padding: 0;
    border: none;
    font-size: 16px;
    color: $dark-gray
}

.input:focus {
    outline: none;
    box-shadow: none;
    color: $black
}

.error-message {
    font-family: $font-dm-sans;
    font-size: 8px;
    margin-top: 8px;
    color: $red;
}
</style>