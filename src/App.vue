<script setup>
import ShoppingCart from './components/ShoppingCart.vue'
import ProductList from './components/ProductList.vue'
</script>

<template>
  <main class="grid gap-6 sm:grid-cols-[1fr_1fr] md:grid-cols-[55fr_45fr] lg:grid-cols-[70fr_30fr]">
    <ProductList />
    <ShoppingCart class="sticky top-5 sm:self-start sm:mt-18" />
  </main>
</template>
