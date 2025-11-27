<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import apiClient from '@/api/client'
import CustomImage from '@/components/ui/CustomImage.vue'
import { useRouter } from 'vue-router'
import type { AxiosResponse } from 'axios'
import { navigateToProduct } from '@/utils/navigateFunctions'

const router = useRouter()

const onNavigateToCheckout = () => {
  router.push({ name: 'checkout' })
}
interface ApiCartItem {
  id: string
  quantity: string
  prod_id: string
  prod_var_id: string
  variant_name: string
  price: number
  image_url: string
  product_name: string
  stock_quantity: number
}
interface CartItem {
  id: string
  quantity: number
  prod_id: string
  prod_var_id: string
  productVariant: {
    name: string
    price: number
    image_url: string
    stock_quantity: number
  }
  product: {
    id: string
    name: string
    image_url: string
  }
  checked?: boolean
}

const cartItems = ref<CartItem[]>([])

onMounted(async () => {
  document.title = 'BuyIt - Your Cart'
  try {
    const response = await apiClient.get('/buyer/cart/items')
    if (Array.isArray(response.data.items)) {
      cartItems.value = response.data.items.map((item: ApiCartItem) => ({
        id: item.id,
        quantity: Number(item.quantity),
        prod_var_id: item.prod_var_id,
        prod_id: item.prod_id,
        checked: false,
        productVariant: {
          name: item.variant_name,
          price: Number(item.price),
          image_url: item.image_url,
          stock_quantity: Number(item.stock_quantity),
        },
        product: {
          id: item.prod_id,
          name: item.product_name,
          image_url: item.image_url,
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

onUnmounted(async () => {
  const updatedQuantities = cartItems.value.map((item) => ({
    cartItemId: item.id,
    quantity: item.quantity,
  }))
  const response: AxiosResponse = await apiClient.put('/buyer/cart/items', {
    items: updatedQuantities,
  })
  if (response.status === 200) {
    console.log('Successfully updated cart items on server')
  } else {
    console.error('Failed to update cart items on server:', response)
  }
})

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
  if (item.quantity < item.productVariant.stock_quantity) {
    item.quantity++
  }
}
function decrease(item: CartItem) {
  if (item.quantity > 1) item.quantity--
}
async function removeItem(id: string) {
  try {
    const response: AxiosResponse = await apiClient.delete(`/buyer/cart/item/${id}`)

    // console.log(`Removed item with ID: ${id} from server cart`)

    if (response.status !== 200) {
      console.error('Failed to remove item from cart on server:', response)
      return
    }

    cartItems.value = cartItems.value.filter((i) => i.id !== id)
  } catch (error) {
    console.error('Error removing item from cart:', error)
  }
  cartItems.value = cartItems.value.filter((i) => i.id !== id)
}

function removeSelected() {
  cartItems.value = cartItems.value.filter((i) => !i.checked)
}

function isAnySelected(): boolean {
  return cartItems.value.some((i) => i.checked)
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
          <div
            class="flex items-center gap-4 cursor-pointer"
            v-on:click="() => navigateToProduct(item.prod_id)"
          >
            <!-- Variant image -->
            <CustomImage
              :src="item.productVariant.image_url"
              alt=""
              class="w-20 h-20 object-cover rounded-md"
            />
            <div>
              <div class="font-medium text-slate-800 text-base">{{ item.product.name }}</div>
              <div class="text-xs text-slate-500">{{ item.productVariant.name }}</div>
            </div>
          </div>
          <div>
            <div class="text-rose-600 font-semibold text-lg">
              {{ formatPrice(item.productVariant.price) }}
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
            <button
              @click="removeItem(item.id)"
              class="text-slate-400 hover:text-red-500 cursor-pointer"
            >
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
          <button @click="removeSelected" class="text-rose-500 hover:underline cursor-pointer">
            Delete
          </button>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-base text-slate-600">Total purchase ({{ selectedCount }} items):</span>
          <span class="text-2xl font-bold text-rose-600">{{ formatPrice(totalPrice) }}</span>
          <button
            class="bg-rose-600 text-white px-8 py-2 rounded-lg text-lg font-semibold hover:bg-rose-400 transition cursor-pointer"
            @click="onNavigateToCheckout"
            :class="[isAnySelected() ? '' : 'pointer-events-none cursor-not-allowed opacity-50']"
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
