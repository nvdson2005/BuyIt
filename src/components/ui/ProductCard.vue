<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { Star } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  id: { type: String, required: true },
  isSale: { type: Boolean, default: false },
  discountPercentage: { type: Number, default: 0 },
  imageUrl: { type: String, default: 'https://via.placeholder.com/150' },
  name: { type: String, default: 'Product Title' },
  description: { type: String, default: 'Product description goes here.' },
  price: { type: Number, default: 0 },
  originalPrice: { type: Number, default: 0 },
  rating: { type: Number, default: 0.0 },
  soldAmount: { type: Number, default: 0 },
})

function NavigateToDetails() {
  router.push(`/product/${props.id}`)
}

// function AddToCart() {
//   console.log(`Add to cart clicked for product ID: ${props.id}`)
// }

const isHovered = ref(false)
</script>
<template>
  <div
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    class="bg-white shadow-lg rounded-lg relative overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-200"
    @click="NavigateToDetails()"
  >
    <div
      class="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full"
      v-if="isSale"
    >
      SALE
    </div>
    <div
      class="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full"
      v-if="isSale"
    >
      -{{ discountPercentage }}%
    </div>
    <img :src="imageUrl" alt="Product Image" class="aspect-square min-w-full" />
    <div class="p-4">
      <h3 class="h-15 text-lg font-semibold line-clamp-2 overflow-clip">{{ name }}</h3>
      <p class="h-12 text-gray-600 line-clamp-2 overflow-clip">{{ description }}</p>
      <span class="text-orange-600 font-bold text-xl">${{ price }}</span>
      <span v-if="isSale" class="text-gray-500 line-through ml-2 text-sm"
        >${{ originalPrice }}</span
      >
    </div>
    <div class="w-full px-4 pb-10 flex items-center justify-between">
      <div class="flex items-center">
        <Star class="w-4 h-4 text-yellow-400" />
        <span class="ml-1 text-sm text-gray-600">{{ rating }}/5</span>
      </div>
      <div>
        <span class="text-sm text-gray-600 px-4">{{ soldAmount }} sold</span>
      </div>
    </div>
    <!-- <div
      class="w-full h-10 absolute bottom-0 left-0"
      :class="[isHovered ? 'opacity-100' : 'opacity-0', 'transition-opacity duration-100']"
    >
      <button
        @click="
          (e) => {
            e.stopPropagation()
            AddToCart()
          }
        "
        class="w-full h-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-200"
      >
        Add to Cart
      </button>
    </div> -->
  </div>
</template>
<style scoped></style>
