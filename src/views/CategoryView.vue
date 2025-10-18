<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'
import CategoryDetail from '@/components/layout/CategoryDetail.vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import BrandItem from '@/components/ui/BrandItem.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import SortPanel from '@/components/layout/SortPanel.vue'
const route = useRoute()
const router = useRouter()
const handleBrandClick = (brandName: string) => {
  console.log(`Brand clicked: ${brandName}`)
  router.push(`/brands/${brandName}`)
}
const brands = Array.from({ length: 6 }, (_, i) => `brand-${i}`)
const products = ref([
  {
    id: 1,
    title: 'Laptop Dell Inspiron 15 3500 15.6" FHD',
    image: '/assets/sample-laptop-1.jpg',
    price: 1299000,
    oldPrice: 1499000,
    rating: 4.7,
    sold: 920,
    badge: true,
    discount: 21,
  },
  {
    id: 2,
    title: 'Laptop HP Pavilion 15-eg2xxx 16GB SSD 512GB',
    image: '/assets/sample-laptop-2.jpg',
    price: 1850000,
    oldPrice: 2100000,
    rating: 4.9,
    sold: 560,
    badge: true,
    discount: 25,
  },
  {
    id: 3,
    title: 'Laptop Gaming ASUS ROG Strix G15 RTX 4060',
    image: '/assets/sample-laptop-3.jpg',
    price: 2890000,
    oldPrice: 3150000,
    rating: 4.9,
    sold: 425,
    badge: true,
    discount: 22,
  },
  {
    id: 4,
    title: 'Màn hình Gaming ASUS 27" 165Hz',
    image: '/assets/sample-monitor.jpg',
    price: 699000,
    oldPrice: 899000,
    rating: 4.8,
    sold: 678,
    badge: false,
    discount: 22,
  },
  {
    id: 5,
    title: 'Bàn phím cơ Corsair K70 RGB MK.2 Cherry MX Red',
    image: '/assets/sample-keyboard.jpg',
    price: 289000,
    oldPrice: 349000,
    rating: 4.7,
    sold: 1240,
    badge: true,
    discount: 28,
  },
])
function formatPrice(v: number) {
  return v.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
</script>

<template>
  <div class="w-fit h-fit bg-[var(--light-pink)] flex flex-col items-center overflow-y-auto">
    <NavBar />
    <div class="w-full">
      <CategoryDetail
        :categoryName="Array.isArray(route.params.id) ? route.params.id[0] : route.params.id"
      />
    </div>
    <!-- Header / category banner -->
    <div class="w-full max-w-4/5 px-6 mt-6 mb-6 h-70 min-h-60">
      <div
        class="bg-white h-full w-full rounded-lg p-4 flex items-start justify-between gap-4 shadow-sm"
      >
        <div class="flex flex-col items-start h-full">
          <h3 class="text-sm font-semibold text-slate-600 uppercase">Shopee Mall</h3>

          <!-- brand chips -->
          <div class="mt-3 grid grid-cols-6 gap-4">
            <div v-for="brand in brands" :key="brand">
              <BrandItem :brandName="brand" @click="handleBrandClick(brand)" />
            </div>
          </div>
        </div>

        <a class="text-sm text-red-500 hover:underline self-start">Xem tất cả</a>
      </div>
    </div>

    <!-- Filters -->
    <div class="w-full max-w-4/5 mt-6">
      <SortPanel
        @sort-changed="
          (newSort) => {
            console.log('Sort changed to:', newSort)
          }
        "
        @price-filter-changed="
          (newFilter) => {
            console.log('Price filter changed to:', newFilter)
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
          :key="product.id"
          :title="product.title"
          :price="parseInt(formatPrice(product.price))"
          :originalPrice="parseInt(formatPrice(product.oldPrice))"
          :rating="product.rating"
          :soldAmount="product.sold"
          :onCardClick="() => {}"
          :onAddToCartClick="() => {}"
        />
      </div>
    </div>
    <PageFooter />
  </div>
</template>
<style scoped></style>
