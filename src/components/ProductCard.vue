<script setup>
import { computed, ref, watch } from 'vue'
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

const quantity = computed(() => {
  const item = cartStore.cartItems.find((item) => item.name === product.name)
  return item ? item.quantity : 0
})

const quantityChanged = ref(false)
watch(quantity, () => {
  quantityChanged.value = true
})

function handleAddToCart() {
  cartStore.addToCart(product)
}
function incrementQuantity() {
  cartStore.updateQuantity(product.name, 'INC')
}

function decrementQuantity() {
  cartStore.updateQuantity(product.name, 'DEC')
}
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <div
      class="relative flex justify-center items-center overflow-hidden p-1 rounded-lg shadow-lg before:content-[''] before:absolute before:w-[200%] before:h-[200%] before:-z-1"
      :class="[quantity > 0 ? 'animate-card' : quantityChanged ? 'animate-card-reverse' : '']"
    >
      <picture>
        <source media="(min-width: 64rem)" :srcset="product.image.desktop" />
        <source media="(min-width: 40rem)" :srcset="product.image.tablet" />
        <img
          :src="product.image.mobile"
          width="654"
          height="424"
          class="rounded-lg aspect-[654/424] md:aspect-[427/424] lg:aspect-[502/480]"
          loading="lazy"
          :alt="product.name"
        />
      </picture>
    </div>

    <Transition
      mode="out-in"
      enter-from-class="scale-0 opacity-0"
      leave-to-class="opacity-0"
      enter-active-class="transition-all ease-out duration-200"
      leave-active-class="transition-all ease-in duration-100"
    >
      <div
        v-if="quantity"
        class="flex justify-between items-center gap-8 self-center -translate-y-1/2 -mt-0.5 bg-orange-700 px-6 py-3 rounded-full border-1 border-orange-400"
      >
        <button
          @click="decrementQuantity()"
          class="group p-0.5 border-2 border-white rounded-full cursor-pointer transition-colors duration-200 hover:bg-white"
          type="button"
        >
          <IconDecrement
            width="12"
            height="12"
            class="w-3 h-3 fill-white transition-colors duration-200 group-hover:fill-orange-700"
          />
        </button>

        <span class="text-white font-semibold">{{ quantity }}</span>
        <button
          @click="incrementQuantity()"
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
    </Transition>

    <div class="text-sm">{{ product.category }}</div>
    <h2 class="font-semibold">{{ product.name }}</h2>
    <div class="text-orange-700 font-semibold">${{ product.price }}</div>
  </div>
</template>

<style scoped>
@reference "@/assets/main.css";

.animate-card::before {
  @apply animate-[spin-fill_1.5s_ease-in-out_1_forwards] bg-conic from-orange-700 to-transparent;
}

.animate-card-reverse::before {
  @apply animate-[spin-fill-fade_1s_linear_1_forwards] bg-conic from-orange-700 to-transparent;
}

@keyframes spin-fill {
  0% {
    transform: rotate(0deg);
    background-color: transparent;
  }
  100% {
    transform: rotate(-360deg);
    background-color: var(--color-orange-700);
  }
}

@keyframes spin-fill-fade {
  0% {
    transform: rotate(-360deg);
    background-color: var(--color-orange-700);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: rotate(0deg);
    background-color: transparent;
    opacity: 0;
  }
}
</style>
