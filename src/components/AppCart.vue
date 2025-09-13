<script setup>
import { inject, ref, computed } from 'vue'
import AppButton from '@/components/AppButton.vue'
import ModalConfirmOrder from './ModalConfirmOrder.vue'
const { cartItems, removeFromCart } = inject('cart')

const confirmModalOpen = ref(false)

const totalQuantity = computed(() => {
  return cartItems.reduce((total, item) => total + item.quantity, 0)
})

const totalPrice = computed(() => {
  return cartItems.reduce((total, item) => item.quantity * item.price + total, 0)
})

function confirmOrder() {
  confirmModalOpen.value = true
}

function startOver() {
  if (!confirmModalOpen.value) {
    ;[...cartItems].forEach((item) => removeFromCart(item.name))
  }
}
</script>
<template>
  <div class="flex flex-col gap-4 bg-white rounded-lg shadow-lg p-8">
    <div class="font-bold text-2xl text-orange-700 self-start">Your Cart ({{ totalQuantity }})</div>
    <template v-if="cartItems.length">
      <ul
        class="max-h-[calc(100vh-20rem)] overflow-y-auto flex flex-col gap-4 text-sm border-b border-gray-300 py-4 px-2"
      >
        <li v-for="item in cartItems" :key="item.name" class="grid grid-cols-[1fr_auto] gap-2">
          <h3 class="font-semibold">{{ item.name }}</h3>
          <button class="row-span-2 self-center cursor-pointer" @click="removeFromCart(item.name)">
            <img
              class="w-5 h-5 border-2 border-[#CAAFA7] p-0.5 rounded-full"
              width="20"
              src="@/assets/images/icon-remove-item.svg"
              alt="Remove from cart"
            />
          </button>
          <div class="flex gap-4">
            <span class="font-semibold text-orange-700">{{ item.quantity }}x</span>
            <span>@ ${{ item.price }}</span>
            <span class="font-semibold">${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </li>
      </ul>
      <div class="flex justify-between">
        <span>Order Total</span>
        <span class="font-bold text-2xl">${{ totalPrice }}</span>
      </div>
      <AppButton @click="confirmOrder()">Confirm Order</AppButton>
    </template>
    <template v-else>
      <img class="self-center" src="@/assets/images/illustration-empty-cart.svg" alt="empty cart" />
      <p class="self-center text-orange-900">Your added items will appear here</p>
    </template>

    <ModalConfirmOrder v-model:open="confirmModalOpen" @update:open="startOver()" />
  </div>
</template>
