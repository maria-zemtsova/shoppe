<script setup lang="ts">
  import SignInForm from '~/components/SignInForm.vue'
  import RegisterForm from '~/components/RegisterForm.vue'
  import BaseTabs from '~/components/ui/BaseTabs.vue'

  const items = [
    { title: 'Sign in', component: SignInForm },
    { title: 'Register', component: RegisterForm },
  ]
</script>

<template>
  <BaseTabs :items="items" class="tab--switch" />
</template>
