<script setup>
import { computed } from 'vue'
import IconIncrement from '@/components/icons/IconIncrementQuantity.vue'
import IconDecrement from '@/components/icons/IconDecrementQuantity.vue'
import { useCartStore } from '@/stores/cart'

const { product } = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()

const quantityInCart = computed(() => {
  const item = cartStore.cartItems.find((item) => item.name === product.name)
  return item ? item.quantity : 0
})

function handleAddToCart() {
  cartStore.addToCart(product)
}
function incrementQuantityInCart() {
  cartStore.updateQuantity(product.name, 'INC')
}

function decrementQuantityInCart() {
  cartStore.updateQuantity(product.name, 'DEC')
}
</script>
<template>
  <div class="flex flex-col gap-0.5">
    <picture>
      <source media="(min-width: 64rem)" :srcset="product.image.desktop" />
      <source media="(min-width: 40rem)" :srcset="product.image.tablet" />
      <img
        :src="product.image.mobile"
        width="654"
        height="424"
        class="border-2 rounded-lg shadow-lg aspect-[654/424] md:aspect-[427/424] lg:aspect-[502/480]"
        :class="[quantityInCart ? 'border-orange-700' : 'border-transparent']"
        loading="lazy"
        :alt="product.name"
      />
    </picture>
    <div
      v-if="quantityInCart"
      class="flex justify-between items-center gap-8 self-center -translate-y-1/2 -mt-0.5 bg-orange-700 px-6 py-3 rounded-full border-1 border-orange-400"
    >
      <button
        @click="decrementQuantityInCart()"
        class="group p-0.5 border-2 border-white rounded-full cursor-pointer transition-colors duration-200 hover:bg-white"
        type="button"
      >
        <IconDecrement
          width="12"
          height="12"
          class="w-3 h-3 fill-white transition-colors duration-200 group-hover:fill-orange-700"
        />
      </button>

      <span class="text-white font-semibold">{{ quantityInCart }}</span>
      <button
        @click="incrementQuantityInCart()"
        class="group p-0.5 border-2 border-white rounded-full cursor-pointer transition-colors duration-200 hover:bg-white"
        type="button"
      >
        <IconIncrement
          width="12"
          height="12"
          class="w-3 h-3 fill-white transition-colors duration-200 group-hover:fill-orange-700"
        />
      </button>
    </div>
    <button
      v-else
      @click="handleAddToCart()"
      class="flex gap-4 justify-center self-center -translate-y-1/2 -mt-0.5 bg-white px-6 py-3.5 rounded-full border-1 border-orange-400 cursor-pointer"
      type="button"
    >
      <img src="@/assets/images/icon-add-to-cart.svg" width="20" class="w-5" alt="add to cart" />
      <span class="text-sm font-semibold">Add to Cart</span>
    </button>

    <div class="text-sm">{{ product.category }}</div>
    <h2 class="font-semibold">{{ product.name }}</h2>
    <div class="text-orange-700 font-semibold">${{ product.price }}</div>
  </div>
</template>
