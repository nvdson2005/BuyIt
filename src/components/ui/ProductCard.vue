<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { Star } from 'lucide-vue-next'
defineProps({
  isSale: { type: Boolean, default: false },
  discountPercentage: { type: Number, default: 0 },
  imageUrl: { type: String, default: 'https://via.placeholder.com/150' },
  title: { type: String, default: 'Product Title' },
  description: { type: String, default: 'Product description goes here.' },
  price: { type: Number, default: 99.99 },
  originalPrice: { type: Number, default: 199.99 },
  rating: { type: Number, default: 5.0 },
  soldAmount: { type: Number, default: 0 },
  onCardClick: { type: Function, default: () => {} },
  onAddToCartClick: { type: Function, default: () => {} },
})

const isHovered = ref(false)
</script>
<template>
  <div
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    class="bg-white shadow-lg rounded-lg relative overflow-hidden"
  >
    <div
      class="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10"
    >
      SALE
    </div>
    <div
      class="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10"
    >
      50% OFF
    </div>
    <img
      src="https://via.placeholder.com/150"
      alt="Product Image"
      class="aspect-square min-w-full"
    />
    <div class="p-4">
      <h3 class="text-lg font-semibold line-clamp-2 overflow-clip">{{ title }}</h3>
      <p class="text-gray-600 line-clamp-2 overflow-clip">{{ description }}</p>
      <span class="text-orange-600 font-bold text-xl">${{ price }}</span>
      <span class="text-gray-500 line-through ml-2 text-sm">${{ originalPrice }}</span>
    </div>
    <div class="w-full px-4 pb-4 flex items-center justify-between">
      <div class="flex items-center">
        <Star class="w-4 h-4 text-yellow-400" />
        <span class="ml-1 text-sm text-gray-600">{{ rating }}</span>
      </div>
      <div>
        <span class="text-sm text-gray-600 px-4">{{ soldAmount }} sold</span>
      </div>
    </div>
    <div
      class="w-full h-10"
      :class="[isHovered ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-100']"
    >
      <button
        @click="(event) => onAddToCartClick(event)"
        class="w-full h-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>
<style scoped></style>
