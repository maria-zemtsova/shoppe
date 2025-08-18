import { defineStore } from 'pinia'
import type { Product } from '~/types/product'

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: process.client ? (JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[]) : [],
    isSidebarOpen: false,
  }),
  getters: {
    totalItems: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  },
  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    addItem(product: Product) {
      const existing = this.items.find((item) => item.id === product.id)
      if (existing) existing.quantity++
      else this.items.push({ ...product, quantity: 1 })
      this.saveCart()
    },
    removeItem(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId)
      this.saveCart()
    },
    updateQuantity(productId: number, newQuantity: number) {
      const item = this.items.find((item) => item.id === productId)
      if (item) item.quantity = newQuantity
      this.saveCart()
    },
    async saveCart() {
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
