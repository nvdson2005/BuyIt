<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'
import CategoryDetail from '@/components/layout/CategoryDetail.vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import BrandItem from '@/components/ui/BrandItem.vue'
const route = useRoute()
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
  <div class="w-screen h-screen bg-[var(--light-pink)] flex flex-col items-center">
    <NavBar />
    <div class="w-full">
      <CategoryDetail
        :categoryName="Array.isArray(route.params.id) ? route.params.id[0] : route.params.id"
      />
    </div>
    <!-- Header / category banner -->
    <div class="w-full max-w-4/5 px-6 mt-6">
      <div class="bg-white rounded-lg p-4 flex items-start justify-between gap-4 shadow-sm">
        <div class="flex-1">
          <h3 class="text-sm font-semibold text-slate-600 uppercase">Shopee Mall</h3>

          <!-- brand chips -->
          <div class="mt-3 flex gap-3 overflow-x-auto pb-1">
            <div
              v-for="brand in brands"
              :key="brand"
              class="min-w-[84px] h-20 rounded-lg p-2 flex items-center justify-center bg-white"
            >
              <BrandItem :brandName="brand" />
            </div>
          </div>
        </div>

        <a class="text-sm text-red-500 hover:underline self-start">Xem tất cả</a>
      </div>
    </div>

    <!-- Filters -->
    <div class="w-full max-w-4/5 px-6 mt-6">
      <div class="bg-white/60 rounded-lg p-4 flex items-center justify-between gap-4 shadow-sm">
        <div class="flex items-center gap-3 flex-wrap">
          <span class="text-sm text-slate-500">Sắp xếp theo:</span>
          <button class="px-3 py-1 rounded-md bg-rose-500 text-white text-sm">Phổ biến</button>
          <button class="px-3 py-1 rounded-md bg-white text-slate-600 border">Mới nhất</button>
          <button class="px-3 py-1 rounded-md bg-white text-slate-600 border">Bán chạy</button>
        </div>

        <div class="flex items-center gap-3">
          <select class="input-box text-sm">
            <option>Tất cả giá</option>
            <option>0 - 500</option>
            <option>500 - 2000</option>
          </select>
        </div>
      </div>
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
  </div>
</template>
<style scoped></style>
