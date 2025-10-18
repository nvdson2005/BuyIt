<script lang="ts" setup>
import { ref, computed } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import { type CartItem } from '@/utils/interface'

const cartItems = ref<CartItem[]>([
  {
    id: 1,
    title: 'Laptop Dell Inspiron 15 3520 i5-1235U RAM 8GB SSD 256GB 15.6" FHD',
    image:
      'https://product.hstatic.net/200000710483/product/611nhsehs5l._ac_sx679__cbea54784c0e4bf78b8fdf17398f4394_1024x1024.jpg',
    price: 12990000,
    oldPrice: 17990000,
    quantity: 2,
    checked: false,
  },
  {
    id: 2,
    title: 'Laptop HP Pavilion 15-eg2xxx i7-1255U RAM 16GB SSD 512GB 15.6" FHD',
    image: '/assets/sample-laptop-2.jpg',
    price: 18500000,
    oldPrice: 24900000,
    quantity: 1,
    checked: false,
  },
  {
    id: 3,
    title: 'Laptop Gaming ASUS ROG Strix G15 RTX 4060 Ryzen 7 7735HS 16GB 512GB',
    image: '/assets/sample-laptop-3.jpg',
    price: 28900000,
    oldPrice: 36900000,
    quantity: 1,
    checked: false,
  },
])

const allChecked = computed({
  get: () => cartItems.value.length > 0 && cartItems.value.every((item) => item.checked),
  set: (val: boolean) => {
    cartItems.value.forEach((item) => (item.checked = val))
  },
})

const selectedCount = computed(() => cartItems.value.filter((i) => i.checked).length)

const totalPrice = computed(() =>
  cartItems.value.filter((i) => i.checked).reduce((sum, i) => sum + i.price * i.quantity, 0),
)

function formatPrice(v: number) {
  return v.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

function increase(item: CartItem) {
  item.quantity++
}
function decrease(item: CartItem) {
  if (item.quantity > 1) item.quantity--
}
function removeItem(id: number) {
  cartItems.value = cartItems.value.filter((i) => i.id !== id)
}
function removeSelected() {
  cartItems.value = cartItems.value.filter((i) => !i.checked)
}
</script>

<template>
  <div class="w-full min-h-screen bg-[#f8ece7] flex flex-col items-center overflow-y-auto">
    <NavBar />
    <div class="w-full max-w-6xl px-4 flex flex-col items-start">
      <h1 class="text-3xl font-bold mt-10 mb-6 text-slate-800">Giỏ Hàng Của Bạn</h1>

      <!-- Table header -->
      <div
        class="w-full grid grid-cols-[40px_1.5fr_1fr_1fr_1fr_60px] gap-4 bg-white rounded-lg px-6 py-3 font-semibold text-slate-500 text-base"
      >
        <div>
          <input type="checkbox" v-model="allChecked" />
        </div>
        <div>Product name</div>
        <div>Unit Price</div>
        <div>Quantity</div>
        <div>Total Price</div>
        <div>Actions</div>
      </div>

      <!-- Cart items -->
      <div v-for="item in cartItems" :key="item.id">
        <div
          class="w-full grid grid-cols-[40px_1.5fr_1fr_1fr_1fr_60px] gap-4 bg-white my-3 rounded-lg px-6 py-4 items-center shadow-sm"
        >
          <div>
            <input type="checkbox" v-model="item.checked" />
          </div>
          <div class="flex items-center gap-4">
            <img :src="item.image" alt="" class="w-20 h-20 object-cover rounded-md" />
            <span class="font-medium text-slate-800 text-base">{{ item.title }}</span>
          </div>
          <div>
            <div class="text-rose-600 font-semibold text-lg">{{ formatPrice(item.price) }}</div>
            <div v-if="item.oldPrice" class="text-xs text-slate-400 line-through">
              {{ formatPrice(item.oldPrice) }}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              class="w-8 h-8 rounded border text-lg flex items-center justify-center"
              @click="decrease(item)"
            >
              -
            </button>
            <span class="w-8 text-center">{{ item.quantity }}</span>
            <button
              class="w-8 h-8 rounded border text-lg flex items-center justify-center"
              @click="increase(item)"
            >
              +
            </button>
          </div>
          <div class="text-rose-600 font-semibold text-lg">
            {{ formatPrice(item.price * item.quantity) }}
          </div>
          <div>
            <button @click="removeItem(item.id)" class="text-slate-400 hover:text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer actions -->
      <div
        class="w-full bg-white rounded-b-lg px-6 py-4 flex items-center justify-between mt-2 mb-6 shadow-sm"
      >
        <div class="flex items-center gap-4">
          <input type="checkbox" v-model="allChecked" />
          <span>Select all[({{ cartItems.length }})</span>
          <button @click="removeSelected" class="text-rose-500 hover:underline">Xóa</button>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-base text-slate-600">Total purchase ({{ selectedCount }} items):</span>
          <span class="text-2xl font-bold text-rose-600">{{ formatPrice(totalPrice) }}</span>
          <button
            class="bg-rose-400 text-white px-8 py-2 rounded-lg text-lg font-semibold hover:bg-rose-500 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
    <PageFooter />
  </div>
</template>

<style scoped></style>
