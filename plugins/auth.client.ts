import { useAuthStore } from '~/stores/auth'
import { defineNuxtPlugin } from 'nuxt/app'
export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  authStore.checkAuth()
})
