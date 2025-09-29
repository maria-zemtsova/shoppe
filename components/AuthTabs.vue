<script setup lang="ts">
  import { ref } from 'vue'
  import SignInForm from '~/components/SignInForm.vue'
  import RegisterForm from '~/components/RegisterForm.vue'
  import BaseTabs from '~/components/ui/BaseTabs.vue'

  const items = [
    { title: 'Sign in', component: SignInForm },
    { title: 'Register', component: RegisterForm },
  ]

  const activeTab = ref(false)
</script>

<template>
  <BaseTabs v-model="activeTab" :items="items" type="switch" />
</template>
