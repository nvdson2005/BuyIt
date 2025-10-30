<script lang="ts" setup>
import NavBar from '@/components/layout/NavBar.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import apiClient from '@/api/client'
import { type Product, type Shop, type ProductVariant } from '@/utils/interface'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import LoadingScreen from '@/components/layout/LoadingScreen.vue'
import ProductCard from '@/components/ui/ProductCard.vue'

const product = ref<Product | null>(null)
const shop = ref<Shop | null>(null)
const route = useRoute()
const isLoading = ref(true)
const sale = ref(0)
const quantity = ref(1)
const recommendedProducts = ref<Product[]>([])
const productVariants = ref<Array<ProductVariant>>([])
const chosenVariant = ref<ProductVariant | null>(null)
onMounted(async () => {
  const response = await apiClient.get(`/products/get-by-id/${route.params.id}`)
  product.value = response.data.product
  console.log('Fetched product details:', product.value)
  isLoading.value = false
  if (product.value) {
    sale.value = Math.round(
      ((product.value.price - product.value.sale_price) / product.value.price) * 100,
    )
  }
  const shopResponse = await apiClient.get(`/shop/get-detail/${product.value?.shop_id}`)
  console.log('Fetched shop details:', shopResponse.data.shop)
  shop.value = shopResponse.data.shop
  const recommendedResponse = await apiClient.get(`/products/explore-today`)
  recommendedProducts.value = recommendedResponse.data.products
  console.log('Fetched recommended products:', recommendedProducts.value)

  const variantsResponse = await apiClient.get(`/products/get-variants/${product.value?.id}`)
  console.log('Fetched product variants:', variantsResponse.data.variants)
  productVariants.value = variantsResponse.data.variants
})

function OnAddToCart() {
  if (!chosenVariant.value) {
    console.error('No variant selected.')
    return
  }
  apiClient.post('/buyer/cart/add-item', {
    productVariantId: chosenVariant.value?.variant_id,
    productId: product.value?.id,
    quantity: quantity.value,
    price: chosenVariant.value.price,
  })
}
</script>
<template>
  <NavBar />
  <div
    v-if="!isLoading"
    class="min-h-screen bg-linear-to-br from-[#f8fafd] to-[#f3f1f7] flex flex-col items-center py-6"
  >
    <!-- Product Main Info -->
    <div class="w-full max-w-6xl bg-white rounded-xl shadow p-8 flex gap-8 mb-6">
      <!-- Left: Images -->
      <div class="flex flex-col gap-4 w-1/2">
        <div
          class="w-full h-[400px] bg-gray-100 rounded flex items-center justify-center overflow-hidden"
        >
          <img
            :alt="product?.name"
            class="object-contain h-full w-full"
            :src="chosenVariant ? chosenVariant.image_url : product?.image_url"
          />
        </div>
        <!-- <div class="flex gap-3">
          <img class="w-20 h-20 object-cover rounded border-2 border-rose-500" />
          <img class="w-20 h-20 object-cover rounded border" />
          <img class="w-20 h-20 object-cover rounded border" />
        </div> -->
      </div>
      <!-- Right: Info -->
      <div class="flex-1 flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <span class="bg-rose-100 text-rose-500 text-xs px-2 py-0.5 rounded">Mall</span>
        </div>
        <div class="text-xl font-semibold text-slate-800 leading-snug">
          {{ product?.name }}
        </div>
        <div class="flex items-center gap-4 text-sm mt-2">
          <span class="text-orange-500 font-semibold">{{ product?.rating }}</span>
          <span class="text-yellow-400">★</span>
          <span class="text-blue-500 underline cursor-pointer">348 Reviews</span>
          <span>|</span>
          <span>{{ product?.sold_amount }} sold</span>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 flex items-center gap-4 mt-2">
          <div class="text-3xl text-rose-500 font-bold">
            {{ chosenVariant ? chosenVariant.price : product?.sale_price }} đ
          </div>
          <div v-if="sale > 0" class="text-slate-400 line-through">{{ product?.price }} đ</div>
          <div v-if="sale > 0" class="bg-rose-500 text-white text-xs px-2 py-0.5 rounded">
            -{{ sale }}%
          </div>
        </div>
        <div class="flex items-center gap-3 text-slate-600 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h18M3 14h18"
            />
          </svg>
          <span>Transport</span>
          <span class="text-green-600 font-medium">Free nationwide shipping</span>
        </div>
        <div class="flex items-center gap-4 mt-2">
          <span class="text-slate-600">Quantity</span>
          <button class="w-8 h-8 border rounded text-lg" @click="quantity--">-</button>
          <span> 1 </span>
          <button class="w-8 h-8 border rounded text-lg" @click="quantity++">+</button>
          <span class="text-slate-400 ml-2"
            >{{
              chosenVariant ? chosenVariant.stock_quantity : product?.stock_quantity
            }}
            Available</span
          >
        </div>
        <div class="mt-4 flex gap-2">
          <button v-for="variant in productVariants" :key="variant.variant_id" class="p-0">
            <div
              class="w-fit h-fit border rounded flex items-center justify-center cursor-pointer hover:shadow-md"
              :class="[chosenVariant == variant ? 'border-rose-500 shadow-md' : 'border-gray-300']"
              @click="
                () => {
                  chosenVariant = variant
                }
              "
            >
              <span class="text-sm text-slate-700">{{ variant.name }}</span>
            </div>
          </button>
        </div>
        <div class="flex gap-4 mt-4">
          <button
            :class="
              chosenVariant && chosenVariant.stock_quantity > 0
                ? 'hover:bg-orange-200'
                : 'opacity-50 cursor-not-allowed'
            "
            class="flex-1 border border-orange-500 text-orange-700 px-6 py-3 rounded font-semibold flex items-center justify-center gap-2"
            @click="OnAddToCart()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h18v18H3V3zm3 3v12h12V6H6zm3 3h6v6H9V9z"
              />
            </svg>
            Add to Cart
          </button>
          <button
            class="flex-1 bg-orange-500 text-white px-6 py-3 rounded font-semibold hover:bg-orange-600"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
    <!-- Shop Info -->
    <div
      class="w-full max-w-6xl bg-white rounded-xl shadow flex items-center justify-between px-8 py-4 mb-6"
    >
      <div class="flex items-center gap-4">
        <img class="w-14 h-14 rounded object-cover" />
        <div>
          <div class="font-semibold text-slate-800">{{ shop?.name }}</div>
          <div class="text-xs text-slate-500 mt-1">
            {{ shop?.followers }} followers | {{ shop?.rating }}
            <span class="text-yellow-400">★</span>
          </div>
        </div>
      </div>
      <div class="flex gap-3">
        <button
          class="border px-6 py-2 rounded text-slate-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
            />
          </svg>
          Chat
        </button>
        <button
          class="border px-6 py-2 rounded text-slate-700 hover:bg-gray-50 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
          Visit Shop
        </button>
      </div>
    </div>
    <!-- Product Suggestion Grids -->
    <div class="w-full max-w-6xl flex flex-col gap-6">
      <!-- <div class="bg-white rounded-xl shadow p-6"> -->
      <!-- <div class="font-semibold text-slate-700 mb-4">You May Also Like</div>
        <div class="grid grid-cols-5 gap-4"> -->
      <!-- Suggestion Card Example -->
      <!-- <div
            v-for="i in 5"
            :key="'suggest-' + i"
            class="bg-white rounded-xl border p-3 shadow-sm hover:shadow-md transition"
          >
            <div class="relative">
              <div
                class="absolute left-2 top-2 bg-yellow-400 text-[10px] font-semibold text-black px-2 py-0.5 rounded"
              >
                Flash Sale
              </div>
              <div
                class="absolute right-2 top-2 bg-rose-500 text-[10px] text-white px-2 py-0.5 rounded"
              >
                -28%
              </div>
              <img alt="" class="object-cover h-32 w-full rounded" />
            </div>
            <div class="mt-2 text-sm font-medium text-slate-800 line-clamp-2">
              Laptop Dell Inspiron 15 3520 i5-1235U RAM 8GB SSD 256GB 15.6" FHD
            </div>
            <div class="mt-1 flex items-baseline gap-2">
              <div class="text-rose-500 font-semibold text-base">₫12,990.00</div>
              <div class="text-xs text-slate-400 line-through">₫17,990.00</div>
            </div>
            <div class="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <span class="text-yellow-400">★</span>
              <span>4.7</span>
              <span>890 sold</span>
            </div>
          </div> -->
      <!-- </div> -->
      <!-- </div> -->
      <!-- Other Shop Products -->
      <div class="bg-white rounded-xl shadow p-6">
        <div class="font-semibold text-slate-700 mb-4">Other products</div>
        <div class="grid grid-cols-5 gap-4">
          <div
            v-for="product in recommendedProducts"
            :key="product.id"
            class="bg-white rounded-xl border p-3 shadow-sm hover:shadow-md transition"
          >
            <ProductCard
              :id="product.id"
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
        </div>
      </div>
    </div>
    <!-- Product Details & Reviews -->
    <div class="w-full max-w-6xl mt-8 flex flex-col gap-6">
      <!-- Product Details -->
      <div class="bg-white rounded-xl shadow p-6">
        <div class="font-semibold text-slate-700 mb-4">PRODUCT DETAILS</div>
        <!-- <div class="mb-4">
          <div class="font-medium text-slate-600 mb-2">Specifications</div>
          <pre class="bg-gray-50 rounded p-4 text-sm text-slate-700 overflow-x-auto">
            Introduction Goes Here
          </pre>
        </div> -->
        <div class="font-medium text-slate-600 mb-2">Product Description</div>
        <div class="text-slate-700 text-sm leading-relaxed mb-2">{{ product?.description }}</div>
      </div>
      <!-- Product Reviews -->
      <div class="bg-white rounded-xl shadow p-6">
        <div class="font-semibold text-slate-700 mb-4">PRODUCT REVIEWS</div>
        <div class="flex gap-8 mb-6">
          <div class="flex flex-col items-center justify-center w-40">
            <div class="text-3xl font-bold text-rose-500">4.8 out of 5</div>
            <div class="flex items-center gap-1 text-yellow-400 text-lg mt-1">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <div class="text-xs text-slate-500 mt-1">342 reviews</div>
          </div>
          <div class="flex-1 flex flex-col gap-1 justify-center">
            <div
              v-for="(percent, idx) in [70, 20, 10, 10, 10]"
              :key="idx"
              class="flex items-center gap-2"
            >
              <span class="text-xs text-slate-600 w-4"
                >{{ 5 - idx }} <span class="text-yellow-400">★</span></span
              >
              <div class="flex-1 h-2 bg-rose-100 rounded">
                <div class="h-2 bg-rose-400 rounded" :style="{ width: percent + '%' }"></div>
              </div>
              <span class="text-xs text-slate-600 w-8 text-right">{{ percent }}%</span>
            </div>
          </div>
        </div>
        <!-- Review List -->
        <div class="flex flex-col gap-6">
          <div class="flex gap-4 items-start">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              class="w-10 h-10 rounded-full"
            />
            <div class="flex-1">
              <div class="font-semibold text-slate-800">Nguyễn Văn A</div>
              <div class="flex items-center gap-1 text-yellow-400 text-sm mb-1">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div class="text-xs text-slate-500 mb-1">15/03/2025 | Type: 8GB</div>
              <div class="text-slate-700 mb-2">
                Sản phẩm rất tốt, đóng gói cẩn thận. Giao hàng nhanh. Shop phục vụ nhiệt tình.
              </div>
              <div class="flex gap-2">
                <img class="w-16 h-16 object-cover rounded" />
                <img class="w-16 h-16 object-cover rounded" />
              </div>
            </div>
          </div>
          <div class="flex gap-4 items-start">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              class="w-10 h-10 rounded-full"
            />
            <div class="flex-1">
              <div class="font-semibold text-slate-800">Trần Thị B</div>
              <div class="flex items-center gap-1 text-yellow-400 text-sm mb-1">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div class="text-xs text-slate-500 mb-1">12/03/2025 | Type: 8GB GDDR6</div>
              <div class="text-slate-700 mb-2">
                Chơi game mượt mà 60fps. Rất hài lòng với sản phẩm.
              </div>
            </div>
          </div>
          <div class="flex gap-4 items-start">
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              class="w-10 h-10 rounded-full"
            />
            <div class="flex-1">
              <div class="font-semibold text-slate-800">Lê Văn C</div>
              <div class="flex items-center gap-1 text-yellow-400 text-sm mb-1">
                <span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div class="text-xs text-slate-500 mb-1">10/03/2025 | Type: 8GB GDDR6</div>
              <div class="text-slate-700 mb-2">
                Sản phẩm OK, hiệu năng tốt trong tầm giá. Có chút nóng nhưng vẫn chấp nhận được.
              </div>
              <div class="flex gap-2">
                <img class="w-16 h-16 object-cover rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <LoadingScreen />
  </div>
  <PageFooter />
</template>

<style scoped></style>
