<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Product } from '@/utils/interface'

import ProductCard from '../ui/ProductCard.vue'
import apiClient from '@/api/client'

const todayProducts = ref<Array<Product>>([])
onMounted(async () => {
  try {
    const response = await apiClient.get('/products/explore-today')
    // Validate response
    if (response.data && Array.isArray(response.data.products)) {
      todayProducts.value = response.data.products
      console.log('Fetched products for Explore Today:', todayProducts.value)
    } else {
      console.error('Invalid response format:', response.data)
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
</script>
<template>
  <div class="w-full h-full bg-white rounded-xl shadow-md shadow-gray-300 relative flex flex-col">
    <h2 class="text-slate-800 text-xl p-4 shrink-0">EXPLORE TODAY</h2>
    <div class="w-full h-full overflow-x-auto overflow-y-auto flex-col items-center justify-center">
      <div class="w-full grid grid-cols-5 p-4 min-w-max justify-between">
        <div v-for="product in todayProducts" :key="product.id" class="w-70">
          <ProductCard
            :id="product.id"
            :name="product.name"
            :imageUrl="product.image_url"
            :price="product.sale_price"
            :originalPrice="product.price"
            :rating="product.rating"
            :soldAmount="product.sold_amount"
            :isSale="product.sale_price < product.price"
            :discountPercentage="
              Math.round(((product.price - product.sale_price) / product.price) * 100)
            "
            :description="product.description"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
