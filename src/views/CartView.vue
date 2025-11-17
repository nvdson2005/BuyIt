<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import apiClient from '@/api/client'
import CustomImage from '@/components/ui/CustomImage.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const onNavigateToCheckout = () => {
  router.push({ name: 'checkout' })
}

interface CartItem {
  quantity: number
  prod_id: string
  prod_var_id: string
  productVariant: {
    product_id: string
    variant_id: string
    name: string
    price: number
    stock_quantity: number | string
    image_url: string
    created_at: string
    updated_at: string
  }
  product: {
    id: string
    shop_id: string
    name: string
    description: string
    rating: number
    price: number
    sold_amount: number | string
    stock_quantity: number | string
    image_url: string
    created_at: string
    updated_at: string
    is_active: boolean
    sub_category_id: string
    sale_price: number
  }
  checked?: boolean
}

const cartItems = ref<CartItem[]>([])

onMounted(async () => {
  document.title = 'BuyIt - Your Cart'
  try {
    const response = await apiClient.get('/buyer/cart/items')
    if (Array.isArray(response.data.items)) {
      cartItems.value = response.data.items.map((item: any) => ({
        ...item,
        quantity: Number(item.quantity),
        checked: false,
        productVariant: {
          ...item.productVariant,
          price: Number(item.productVariant.price),
          stock_quantity: Number(item.productVariant.stock_quantity),
        },
        product: {
          ...item.product,
          price: Number(item.product.price),
          sale_price: Number(item.product.sale_price),
          rating: Number(item.product.rating),
          sold_amount: Number(item.product.sold_amount),
          stock_quantity: Number(item.product.stock_quantity),
        },
      }))
      console.log('Fetched cart items:', cartItems.value)
    } else {
      console.error('Invalid response format:', response.data)
    }
  } catch (error) {
    console.error('Error fetching cart items:', error)
  }
})
// const cartItems = ref<CartItem[]>([
//   {
//     id: 1,
//     title: 'Laptop Dell Inspiron 15 3520 i5-1235U RAM 8GB SSD 256GB 15.6" FHD',
//     image:
//       'https://product.hstatic.net/200000710483/product/611nhsehs5l._ac_sx679__cbea54784c0e4bf78b8fdf17398f4394_1024x1024.jpg',
//     price: 12990000,
//     oldPrice: 17990000,
//     quantity: 2,
//     checked: false,
//   },
//   {
//     id: 2,
//     title: 'Laptop HP Pavilion 15-eg2xxx i7-1255U RAM 16GB SSD 512GB 15.6" FHD',
//     image: '/assets/sample-laptop-2.jpg',
//     price: 18500000,
//     oldPrice: 24900000,
//     quantity: 1,
//     checked: false,
//   },
//   {
//     id: 3,
//     title: 'Laptop Gaming ASUS ROG Strix G15 RTX 4060 Ryzen 7 7735HS 16GB 512GB',
//     image: '/assets/sample-laptop-3.jpg',
//     price: 28900000,
//     oldPrice: 36900000,
//     quantity: 1,
//     checked: false,
//   },
// ])

const allChecked = computed({
  get: () => cartItems.value.length > 0 && cartItems.value.every((item) => item.checked),
  set: (val: boolean) => {
    cartItems.value.forEach((item) => (item.checked = val))
  },
})

const selectedCount = computed(() => cartItems.value.filter((i) => i.checked).length)

const totalPrice = computed(() =>
  cartItems.value
    .filter((i) => i.checked)
    .reduce((sum, i) => sum + i.productVariant.price * i.quantity, 0),
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
function removeItem(id: string) {
  cartItems.value = cartItems.value.filter((i) => i.prod_var_id !== id)
}
function removeSelected() {
  cartItems.value = cartItems.value.filter((i) => !i.checked)
}
</script>

<template>
  <div class="w-full min-h-screen bg-[#f8ece7] flex flex-col items-center overflow-y-auto">
    <NavBar />
    <div class="w-full max-w-6xl px-4 flex flex-col items-start">
      <h1 class="text-3xl font-bold mt-10 mb-6 text-slate-800">Your Cart</h1>

      <!-- Table header -->
      <div
        class="w-full grid grid-cols-[40px_2fr_1fr_1fr_1fr_60px] gap-4 bg-white rounded-lg px-6 py-3 font-semibold text-slate-500 text-base"
      >
        <div>
          <input type="checkbox" v-model="allChecked" />
        </div>
        <div>Product</div>
        <div>Unit Price</div>
        <div>Quantity</div>
        <div>Total Price</div>
        <div>Actions</div>
      </div>

      <!-- Cart items -->
      <div v-for="item in cartItems" :key="item.prod_var_id" class="w-full">
        <div
          class="w-full grid grid-cols-[40px_2fr_1fr_1fr_1fr_60px] gap-4 bg-white my-3 rounded-lg px-6 py-4 items-center shadow-sm"
        >
          <div>
            <input type="checkbox" v-model="item.checked" />
          </div>
          <div class="flex items-center gap-4">
            <!-- Variant image -->
            <CustomImage
              :src="item.productVariant.image_url || item.product.image_url"
              alt=""
              class="w-20 h-20 object-cover rounded-md"
            />
            <div>
              <div class="font-medium text-slate-800 text-base">{{ item.product.name }}</div>
              <div class="text-xs text-slate-500">{{ item.productVariant.name }}</div>
              <div class="text-xs text-slate-400">{{ item.product.description }}</div>
            </div>
          </div>
          <div>
            <div class="text-rose-600 font-semibold text-lg">
              {{ formatPrice(item.productVariant.price) }}
            </div>
            <div
              v-if="item.product.price > item.productVariant.price"
              class="text-xs text-slate-400 line-through"
            >
              {{ formatPrice(item.product.price) }}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              class="w-8 h-8 rounded border border-gray-400 text-lg flex items-center justify-center cursor-pointer"
              @click="decrease(item)"
            >
              -
            </button>
            <span class="w-8 text-center">{{ item.quantity }}</span>
            <button
              class="w-8 h-8 rounded border border-gray-400 text-lg flex items-center justify-center cursor-pointer"
              @click="increase(item)"
            >
              +
            </button>
          </div>
          <div class="text-rose-600 font-semibold text-lg">
            {{ formatPrice(item.productVariant.price * item.quantity) }}
          </div>
          <div>
            <button @click="removeItem(item.prod_var_id)" class="text-slate-400 hover:text-red-500 cursor-pointer">
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
          <span>Select all ({{ cartItems.length }})</span>
          <button @click="removeSelected" class="text-rose-500 hover:underline cursor-pointer">Delete</button>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-base text-slate-600">Total purchase ({{ selectedCount }} items):</span>
          <span class="text-2xl font-bold text-rose-600">{{ formatPrice(totalPrice) }}</span>
          <button
            class="bg-rose-400 text-white px-8 py-2 rounded-lg text-lg font-semibold hover:bg-rose-600 transition cursor-pointer"
            @click="onNavigateToCheckout"
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
