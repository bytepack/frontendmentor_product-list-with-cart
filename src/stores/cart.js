import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useCartStore = defineStore('store', () => {
  const cartItems = reactive([])

  function addToCart(product) {
    cartItems.push({ ...product, quantity: 1 })
  }

  function removeFromCart(name) {
    const index = cartItems.findIndex((item) => item.name === name)
    if (index !== -1) cartItems.splice(index, 1)
  }

  function updateQuantity(name, incOrDec) {
    const index = cartItems.findIndex((item) => item.name === name)
    if (incOrDec === 'INC') {
      cartItems[index].quantity++
    } else {
      cartItems[index].quantity--
      if (cartItems[index].quantity === 0) {
        removeFromCart(cartItems[index].name)
      }
    }
  }

  function clearCart() {
    cartItems.splice(0)
  }

  return { cartItems, addToCart, removeFromCart, updateQuantity, clearCart }
})
