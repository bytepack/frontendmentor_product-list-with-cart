<script setup>
import AppCart from './components/AppCart.vue'
import ProductList from './components/ProductList.vue'
import { provide, reactive } from 'vue'

const cartItems = reactive([])

function addToCart(item) {
  cartItems.push({ ...item, quantity: 1 })
}

function removeFromCart(name) {
  const items = cartItems.filter((item) => item.name !== name)
  cartItems.splice(0, cartItems.length, ...items)
}

function updateQuantity(name, incOrDec) {
  const index = cartItems.findIndex((product) => product.name === name)
  if (incOrDec === 'INC') {
    cartItems[index].quantity++
  } else {
    cartItems[index].quantity--
    if (cartItems[index].quantity === 0) {
      removeFromCart(cartItems[index].name)
    }
  }
}

provide('cart', {
  cartItems,
  addToCart,
  removeFromCart,
  updateQuantity,
})
</script>

<template>
  <main class="grid gap-6 sm:grid-cols-[1fr_1fr] md:grid-cols-[55fr_45fr] lg:grid-cols-[70fr_30fr]">
    <ProductList />
    <AppCart class="sticky top-5 sm:self-start sm:mt-18" />
  </main>
</template>
