import { defineStore } from 'pinia'
import type { Product } from '~/types/product'
import debounce from 'lodash.debounce'
import { watch } from 'vue'

export interface CartItemType extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItemType[],
    isSidebarOpen: false,
  }),
  getters: {
    totalItems: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  },
  actions: {
    init() {
      if (!process.client) return
      const data = localStorage.getItem('cart')
      if (data) this.items = JSON.parse(data)
      watch(
        () => this.items,
        debounce(() => this._saveCart(), 500),
        { deep: true },
      )
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    addItem(product: Product) {
      const existing = this.items.find((item) => item.id === product.id)
      if (existing) existing.quantity++
      else this.items.push({ ...product, quantity: 1 })
    },
    removeItem(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId)
    },
    decreaseQuantity(productId: number) {
      const item = this.items.find((item) => item.id === productId)
      if (!item) return
      if (item.quantity > 1) {
        item.quantity--
      } else {
        this.removeItem(productId)
        return
      }
    },
    updateQuantity(productId: number, newQuantity: number) {
      const item = this.items.find((item) => item.id === productId)
      if (item) item.quantity = newQuantity
    },
    async _saveCart() {
      if (!process.client) return
      localStorage.setItem('cart', JSON.stringify(this.items))
      try {
        await fetch('https://fakestoreapi.com/carts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.items),
        })
      } catch (error) {
        console.error('Error saving cart', error)
      }
    },
  },
})
