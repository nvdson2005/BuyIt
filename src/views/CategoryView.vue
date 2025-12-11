<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'
import CategoryDetail from '@/components/layout/CategoryDetail.vue'
import ProductCard from '@/components/ui/ProductCard.vue'
// import BrandItem from '@/components/ui/BrandItem.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import SortPanel from '@/components/layout/SortPanel.vue'
import apiClient from '@/api/client'
import type { Product } from '@/utils/interface'
import { SortOption } from '@/utils/enum'
const route = useRoute()
// const router = useRouter()
// const handleBrandClick = (brandName: string) => {
//   console.log(`Brand clicked: ${brandName}`)
//   router.push(`/brands/${brandName}`)
// }
// const brands = Array.from({ length: 6 }, (_, i) => `brand-${i}`)
const products: Ref<Product[]> = ref([])
const isLoading = ref(true)
onMounted(async () => {
  document.title = `BuyIt - Category: ${
    Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  }`
  // Fetch products based on category from API
  apiClient
    .get(
      `/category/products/${Array.isArray(route.params.id) ? route.params.id[0] : route.params.id}`,
    )
    .then((response) => {
      products.value = response.data.products
      console.log('Fetched products:', products.value)
    })
    .catch((error) => {
      console.error('Error fetching products:', error)
    })
    .finally(() => {
      isLoading.value = false
    })
})

function SortProducts(sortOption: SortOption) {
  switch (sortOption) {
    case SortOption.MOST_SOLD:
      products.value.sort((a, b) => b.sold_amount - a.sold_amount)
      break
    case SortOption.MOST_RATED:
      products.value.sort((a, b) => b.rating - a.rating)
      break
    case SortOption.PRICE_LOW_TO_HIGH:
      products.value.sort((a, b) => a.sale_price - b.sale_price)
      break
    case SortOption.PRICE_HIGH_TO_LOW:
      products.value.sort((a, b) => b.sale_price - a.sale_price)
      break
    default:
      break
  }
}
</script>

<template>
  <div class="w-full h-full bg-(--light-pink) flex flex-col items-center overflow-y-auto">
    <LoadingScreen v-if="isLoading" />
    <template v-else>
      <NavBar />
      <div class="w-full">
        <CategoryDetail
          :categoryName="Array.isArray(route.params.id) ? route.params.id[0] : route.params.id"
        />
      </div>
      <!-- Filters -->
      <div class="w-full max-w-4/5 mt-6">
        <SortPanel
          @sort-changed="
            (newSort) => {
              SortProducts(newSort)
            }
          "
        />
      </div>

      <!-- Products grid -->
      <div class="w-full max-w-4/5 p-6 mt-6 mb-12 rounded-2xl bg-white">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <ProductCard
            v-for="product in products"
            :id="product.id"
            :key="product.id"
            :name="product.name"
            :description="product.description"
            :price="product.sale_price"
            :originalPrice="product.price"
            :rating="product.rating"
            :soldAmount="product.sold_amount"
            :imageUrl="product.image_url"
            :isSale="product.sale_price < product.price"
            :discountPercentage="
              Math.round(((product.price - product.sale_price) / product.price) * 100)
            "
          />
        </div>
        <div v-if="products.length === 0" class="text-center text-gray-500">No products found</div>
      </div>
      <PageFooter />
    </template>
  </div>
</template>
<style scoped></style>
