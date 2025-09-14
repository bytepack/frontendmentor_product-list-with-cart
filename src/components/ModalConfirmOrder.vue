<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { computed } from 'vue'
import { useScrollLock } from '@/composables/useScrollLock'
import { useCartStore } from '@/stores/cart'

const open = defineModel('open')

const cartStore = useCartStore()

const { unlockScrollbar } = useScrollLock(open)

function onAfterLeave() {
  unlockScrollbar()
}

function closeModal() {
  open.value = false
}

const totalPrice = computed(() => {
  return cartStore.cartItems.reduce((total, item) => item.quantity * item.price + total, 0)
})
</script>
<template>
  <Transition
    enter-from-class="translate-y-full opacity-0 sm:translate-y-0"
    leave-to-class="translate-y-full opacity-0 sm:translate-y-0"
    enter-active-class="transition-all duration-500 ease-out"
    leave-active-class="transition-all duration-500 ease-in"
    @after-leave="onAfterLeave"
  >
    <Teleport to="body">
      <div v-if="open" class="fixed z-10 inset-0 flex items-end sm:items-center sm:justify-center">
        <div
          class="max-h-[calc(100vh-2rem)] w-full sm:max-w-md flex flex-col gap-4 bg-white rounded-t-lg sm:rounded-b-lg p-8"
        >
          <img
            width="48"
            height="48"
            class="w-12 rounded-lg"
            src="@/assets/images/icon-order-confirmed.svg"
            alt="Order Confirmed"
          />
          <h3 class="font-bold text-4xl">Order Confirmed</h3>
          <p>We hope you enjoy your food!</p>
          <ul
            class="flex flex-col gap-4 overflow-y-auto text-sm border-b border-gray-300 py-4 px-2"
          >
            <li
              v-for="item in cartStore.cartItems"
              :key="item.name"
              class="grid grid-cols-[auto_1fr_auto] gap-4"
            >
              <img
                :src="item.image.thumbnail"
                alt="item.name"
                width="100"
                height="96"
                class="w-15 aspect-[100/96]"
              />
              <div class="self-center flex flex-col gap-4">
                <h3 class="font-semibold">{{ item.name }}</h3>
                <div class="flex gap-4">
                  <span class="font-semibold text-orange-700">{{ item.quantity }}x</span>
                  <span>@ ${{ item.price }}</span>
                </div>
              </div>
              <span class="font-semibold self-center"
                >${{ (item.price * item.quantity).toFixed(2) }}</span
              >
            </li>
          </ul>
          <div class="flex justify-between">
            <span>Order Total</span>
            <span class="font-bold text-2xl">${{ totalPrice }}</span>
          </div>
          <BaseButton @click="closeModal()">Start New Order</BaseButton>
        </div>
      </div>
    </Teleport>
  </Transition>

  <Transition
    enter-from-class="opacity-0 "
    leave-to-class="opacity-0 "
    enter-active-class="transition-opacity duration-500 ease-out"
    leave-active-class="transition-opacity duration-500 ease-in"
  >
    <Teleport to="body">
      <div v-if="open" class="bg-black/50 fixed top-0 bottom-0 right-0 left-0"></div>
    </Teleport>
  </Transition>
</template>
