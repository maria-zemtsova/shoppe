import { defineStore } from 'pinia'
import type { Product } from '~/types/product'
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'

export interface CartItemType extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: (): { items: CartItemType[]; isSidebarOpen: boolean } => ({
    items: [],
    isSidebarOpen: false,
  }),
  getters: {
    totalItems: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: (state) =>
      state.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2),
  },
  actions: {
    init() {
      if (!process.client) return

      const data = localStorage.getItem('cart')
      if (data) {
        try {
          this.items = JSON.parse(data)
        } catch (error) {
          console.error('Error parsing cart data from localStorage', error)
          this.items = []
        }
      }

      let lastItems: CartItemType[] = [...this.items]

      const debouncedSave = debounce(async (items: CartItemType[]) => {
        if (isEqual(items, lastItems)) return
        lastItems = [...items]

        localStorage.setItem('cart', JSON.stringify(items))
        try {
          await fetch('https://fakestoreapi.com/carts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(items),
          })
        } catch (err) {
          console.error(err)
        }
      }, 500)
      this.$subscribe(
        (mutation, state) => {
          const events = Array.isArray(mutation.events) ? mutation.events : [mutation.events]
          if (events.some((e) => e.key === 'items')) {
            debouncedSave(state.items)
          }
        },
        { detached: true },
      )
    },

    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },

    increaseQuantity(product: Product) {
      const existing = this.items.find((item) => item.id === product.id)
      if (existing) {
        this.$patch((state) => {
          state.items = state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        })
      } else {
        this.$patch((state) => {
          state.items.push({ ...product, quantity: 1 })
        })
      }
    },

    decreaseQuantity(productId: number) {
      const item = this.items.find((i) => i.id === productId)
      if (!item) return

      if (item.quantity > 1) {
        this.$patch((state) => {
          state.items = state.items.map((i) =>
            i.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
          )
        })
      } else {
        this.removeItem(productId)
      }
    },

    updateQuantity(productId: number, newQuantity: number) {
      if (newQuantity < 1) {
        this.removeItem(productId)
        return
      }
      this.$patch((state) => {
        state.items = state.items.map((i) =>
          i.id === productId ? { ...i, quantity: newQuantity } : i,
        )
      })
    },

    removeItem(productId: number) {
      this.$patch((state) => {
        state.items = state.items.filter((i) => i.id !== productId)
      })
    },
  },
})
