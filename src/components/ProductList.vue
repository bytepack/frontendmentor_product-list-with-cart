<script setup>
import ProductCard from './ProductCard.vue'
import products from '@/data.json'
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold mb-8">Deserts</h1>
    <div class="grid gap-6 md:gap-y-8 lg:grid-cols-3">
      <ProductCard v-for="product in products" :product="product" :key="product.name" />
    </div>
  </div>
</template>
