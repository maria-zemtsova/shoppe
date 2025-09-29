import { defineStore } from 'pinia'
import type { User } from '~/types/user'

interface LoginCredentials extends Pick<User, 'email'> {
  password: string
  rememberMe?: boolean
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isAuthenticated: false,
    error: null as string | null,
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && !!state.user,
    userEmail: (state) => state.user?.email || '',
  },

  actions: {
    async login(credentials: LoginCredentials) {
      this.error = null
      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials.email,
            password: credentials.password,
          }),
        })

        if (!response.ok) {
          throw new Error(`Authentication failed: ${response.status}`)
        }

        const data = await response.json()
        const token = data.token

        this.token = token
        this.user = {
          id: '1',
          email: credentials.email,
        }
        this.isAuthenticated = true

        if (credentials.rememberMe && token) {
          localStorage.setItem('auth_token', token)
          localStorage.setItem('user_email', credentials.email)
        }

        return { success: true }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Authentication failed'
        return { success: false, error: this.error }
      }
    },

    async logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      this.error = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_email')
    },

    async checkAuth() {
      const token = localStorage.getItem('auth_token')
      const email = localStorage.getItem('user_email')

      if (token && email) {
        this.token = token
        this.user = {
          id: '1',
          email: email,
        }
        this.isAuthenticated = true
      }
    },

    clearError() {
      this.error = null
    },
  },
})
