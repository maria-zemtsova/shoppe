<script setup lang="ts">
  import { ref } from 'vue'
  import SignInForm from '~/components/SignInForm.vue'
  import RegisterForm from '~/components/RegisterForm.vue'
  import BaseSwitch from '~/components/ui/BaseSwitch.vue'

  const items = [
    { title: 'Sign in', component: SignInForm },
    { title: 'Register', component: RegisterForm },
  ]

  const activeTab = ref(0)
</script>

<template>
  <BaseSwitch v-model="activeTab" :items="items" />
</template>
