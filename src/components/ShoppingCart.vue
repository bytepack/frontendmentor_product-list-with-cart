<script setup>
import { ref, computed } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import ModalConfirmOrder from './ModalConfirmOrder.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const confirmModalOpen = ref(false)

const totalQuantity = computed(() => {
  return cartStore.cartItems.reduce((total, item) => total + item.quantity, 0)
})

const totalPrice = computed(() => {
  return cartStore.cartItems.reduce((total, item) => item.quantity * item.price + total, 0)
})

function confirmOrder() {
  confirmModalOpen.value = true
}

function startOver() {
  if (!confirmModalOpen.value) {
    cartStore.clearCart()
  }
}
</script>
<template>
  <div>
    <Transition
      mode="out-in"
      appear
      enter-from-class="translate-y-5 opacity-0"
      leave-to-class="translate-y-5 opacity-0"
      enter-active-class="transition-all duration-500"
      leave-active-class="transition-all duration-500"
    >
      <div
        v-if="cartStore.cartItems.length"
        class="flex flex-col gap-4 bg-white rounded-lg shadow-lg p-8"
      >
        <h3 class="font-bold text-2xl text-orange-700 self-start">
          Your Cart ({{ totalQuantity }})
        </h3>

        <TransitionGroup
          tag="ul"
          appear
          enter-from-class="opacity-0 -translate-x-8 max-h-0"
          enter-to-class="opacity-100 translate-x-0 max-h-30"
          leave-from-class="opacity-100 translate-x-0 max-h-30"
          leave-to-class="opacity-0 -translate-x-8 max-h-0"
          enter-active-class="transition-all duration-500 ease-in overflow-y-hidden"
          leave-active-class="transition-all duration-300 delay-100 ease-in-out overflow-y-hidden"
          move-class="transition-all duration-500 ease-in-out"
          class="max-h-[calc(100vh-20rem)] overflow-y-auto flex flex-col gap-4 text-sm border-b border-gray-300 py-4 px-2"
        >
          <li
            v-for="item in cartStore.cartItems"
            :key="item.name"
            class="grid grid-cols-[1fr_auto] gap-2"
          >
            <h3 class="font-semibold">{{ item.name }}</h3>
            <button
              class="row-span-2 self-center cursor-pointer"
              @click="cartStore.removeFromCart(item.name)"
              type="button"
            >
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
        </TransitionGroup>
        <div class="flex justify-between">
          <span>Order Total</span>
          <span class="font-bold text-2xl">${{ totalPrice }}</span>
        </div>
        <BaseButton @click="confirmOrder()">Confirm Order</BaseButton>
      </div>

      <div v-else class="flex flex-col gap-4 bg-white rounded-lg shadow-lg p-8">
        <h3 class="font-bold text-2xl text-orange-700 self-start">
          Your Cart ({{ totalQuantity }})
        </h3>
        <img
          class="self-center"
          src="@/assets/images/illustration-empty-cart.svg"
          alt="empty cart"
        />
        <p class="self-center text-orange-900">Your added items will appear here</p>
      </div>
    </Transition>

    <ModalConfirmOrder v-model:open="confirmModalOpen" @update:open="startOver()" />
  </div>
</template>
