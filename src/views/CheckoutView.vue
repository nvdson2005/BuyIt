<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MapPin, Plus } from 'lucide-vue-next'
import PageFooter from '@/components/layout/PageFooter.vue'
import CustomImage from '@/components/ui/CustomImage.vue'
import apiClient from '@/api/client'
import type { Address, Payment, PaymentMethod, CartItem } from '@/utils/interface'

const router = useRouter()
const route = useRoute()

// Refs
const addresses = ref<Address[]>([])
const checkoutItems = ref<CartItem[]>([])
const methods = ref<PaymentMethod[]>([])
const currentAddress = ref<Address>()
const selectedAddress = ref('')
const shippingMethod = ref('express')
const showAddressDialog = ref(false)
const showNewAddressForm = ref(false)

// Computed
const item_ids = computed(() => route.query.ids?.split(',') || [])
const card_methods = computed(() => methods.value.filter(m => m.name === 'Online Banking'))
const subtotal = computed(() => checkoutItems.value.reduce((total, item) => total + item.price * item.quantity, 0))
const shippingFee = computed(() => shippingMethod.value === 'express' ? 17000 : 0)
const total = computed(() => subtotal.value + shippingFee.value)
const payment = ref<Payment>({
  method_name: "Cash",
  method_id: "",
  option_id: ""
})

const newAddress = ref<Omit<Address, 'address_id' | 'user_id' | 'created_at' | 'updated_at'>>({
  full_name: '',
  street: '',
  ward: '',
  district: '',
  city: '',
  state: '',
  zipcode: '',
  phone_number: '',
  is_default: false
})


// Methods
const handleConfirmAddress = () => {
  currentAddress.value = addresses.value.find(addr => addr.address_id === selectedAddress.value)!
  showAddressDialog.value = false
}

const handleAddNewAddress = async () => {
  const requiredFields = ['full_name', 'phone_number', 'street', 'city']
  const isValid = requiredFields.every(field => newAddress.value[field as keyof typeof newAddress.value])

  if (!isValid) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc')
    return
  }

  try {
    const response = await apiClient.post('/user/address', newAddress.value)
    addresses.value.push(response.data.address as Address)
    resetNewAddress()
    showNewAddressForm.value = false
  } catch (err) {
      console.error("Adding new address failed:", err)

  }
}

const resetNewAddress = () => {
  newAddress.value = {
    full_name: '',
    street: '',
    ward: '',
    district: '',
    city: '',
    state: '',
    zipcode: '',
    phone_number: '',
    is_default: false
  }
}


const handlePlaceOrder = async () => {
  if (!currentAddress.value) {
    alert('Vui lòng chọn địa chỉ')
    return
  }

  const order_items = checkoutItems.value.map((item: CartItem) => ({
    productId: item.prod_id,
    productVariantId: item.prod_var_id,
    quantity: item.quantity,
    price: item.price
  }))

  if (payment.value.method_name === 'Cash') {
    const cashMethod = methods.value.find(m => m.name === 'Cash')
    payment.value.method_id = cashMethod?.method_id || ''
    payment.value.option_id = cashMethod?.option_id || ''
  }
  else {
    const cardMethod = methods.value.find(m => m.name === 'Online Banking')
    payment.value.option_id = cardMethod?.option_id || ''
  }
  const selectedMethod = methods.value.find(m => m.method_id === payment.value.method_id)

  if (!selectedMethod) {
    alert('Phương thức thanh toán không hợp lệ')
    return
  }

  try {
    const order_res = await apiClient.post('buyer/order/create', {
      addressId: currentAddress.value.address_id,
      orderItems: order_items,
      methodId: payment.value.method_id,
      optionId: payment.value.option_id,
      amount: total.value,
      shippingCost: shippingFee.value
    })

    alert('Đặt hàng thành công!')
    router.back()
  } catch (error) {
    console.error('Order creation failed:', error)
  }
}

const onNavigateToHome = () => {
  router.push({ name: 'home' })
}

// Lifecycle
onMounted(async () => {
  try {
    const [productsRes, addressRes, methodsRes] = await Promise.all([
      apiClient.get(`/products/get-by-items/${item_ids.value.join(',')}`),
      apiClient.get<{ addresses: Address[] }>(`/user/addresses`),
      apiClient.get(`/buyer/payments`)
    ])

    checkoutItems.value = productsRes.data.products.map((item: CartItem) => ({
      id: item.id,
      quantity: item.quantity,
      prod_id: item.prod_id,
      prod_var_id: item.prod_var_id,
      variant_name: item.variant_name,
      price: item.price,
      image_url: item.image_url,
      product_name: item.product_name,
      stock_quantity: item.stock_quantity
    }))

    addresses.value = addressRes.data.addresses
    methods.value = methodsRes.data.payments.map((method: PaymentMethod) => ({
      name: method.name,
      method_id: method.method_id,
      option_id: method.option_id,
      account_number: method.account_number,
      is_default: method.is_default
    }))
    currentAddress.value = addresses.value.find(addr => addr.is_default) || addresses.value[0]
  } catch (err) {
    console.error("Getting data failed:", err)
  }
})
</script>

<template>
  <div class="min-h-screen bg-[rgb(255,245,240)]">
    <!-- HEADER -->
    <div class="bg-gradient-to-r from-[#bd0604] to-[#BF092F] text-white">
      <div class="container mx-auto px-4 py-4 flex items-center gap-4">
        <h1 class="text-2xl cursor-pointer" @click="onNavigateToHome">BuyIt</h1>
        <div class="border-l border-white/30 h-6 mx-2" />
        <span class="text-xl">Checkout</span>
      </div>
    </div>

    <div class="container mx-auto px-4 py-6 max-w-5xl">
      <!-- SHIPPING ADDRESS SECTION -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <MapPin class="w-5 h-5 text-[#ee4d2d]" />
            <h2 class="text-[#ee4d2d]">Delivery Address</h2>
          </div>
          <button @click="showAddressDialog = true" class="text-blue-600 cursor-pointer hover:text-blue-900">
            Change
          </button>
        </div>

        <template v-if="currentAddress">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span>{{ currentAddress.full_name }}</span>
              <span class="text-gray-400">|</span>
              <span class="text-gray-600">{{ currentAddress.phone_number }}</span>
              <span
                v-if="currentAddress.is_default"
                class="px-2 py-0.5 bg-red-100 text-[#ee4d2d] text-xs rounded border border-[#ee4d2d]"
              >
                Default
              </span>
            </div>
            <p class="text-gray-600">{{ currentAddress.street }}, {{ currentAddress.ward }}, {{ currentAddress.district }}, {{ currentAddress.city }}</p>
          </div>
        </template>

        <button
          v-else
          @click="showAddressDialog = true"
          class="text-blue-600 hover:text-blue-700"
        >
          + Add new address
        </button>
      </div>

      <!-- PRODUCT LIST -->
      <div class="bg-white rounded-lg shadow-sm mb-4">
        <div class="p-4 border-b border-gray-300">
          <div class="flex font-semibold items-center gap-4">
            <span class="flex-1">Product</span>
            <span class="w-32 text-center">Unit Price</span>
            <span class="w-32 text-center">Amount</span>
            <span class="w-32 text-center">Item Subtotal</span>
          </div>
        </div>

        <div v-for="item in checkoutItems" :key="item.id" class="p-4 border-b border-gray-300 last:border-b-0">
          <div class="flex items-center gap-4">
            <div class="flex-1 flex items-center gap-3">
              <CustomImage
                :src="item.image_url"
                class="w-20 h-20 object-cover rounded"
              />
              <div class="flex-1">
                <h3 class="line-clamp-2 mb-1">{{ item.product_name }}</h3>
                <p class="text-sm">{{ item.variant_name }}</p>
              </div>
            </div>

            <div class="w-32 text-center text-gray-600">
              ₫{{ item.price.toLocaleString('vi-VN') }}
            </div>

            <div class="w-32 text-center">{{ item.quantity }}</div>

            <div class="w-32 text-center text-[#ee4d2d]">
              ₫{{ (item.price * item.quantity).toLocaleString('vi-VN') }}
            </div>
          </div>
        </div>
      </div>

      <!-- SHIPPING METHOD -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-4">
        <h3 class="mb-4 font-semibold">Shipping method</h3>

        <div
          class="flex items-center justify-between py-3 border-b border-gray-300 cursor-pointer"
          @click="shippingMethod = 'express'"
        >
          <div class="flex items-center gap-3">
            <input type="radio" value="express" v-model="shippingMethod" />
            <span>Express - Giao hàng nhanh</span>
          </div>
          <span class="text-gray-600">₫17.000</span>
        </div>

        <div class="flex items-center justify-between py-3 cursor-pointer" @click="shippingMethod = 'standard'">
          <div class="flex items-center gap-3">
            <input type="radio" value="standard" v-model="shippingMethod" />
            <span>Standard - Giao hàng tiết kiệm</span>
          </div>
          <span class="text-gray-600">Miễn phí</span>
        </div>
      </div>

      <!-- PAYMENT METHOD -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-4">
        <h3 class="mb-4 font-semibold">Payment Method</h3>

        <label class="flex items-center gap-3 py-3 cursor-pointer border-b border-gray-300">
          <input type="radio" value="Cash" v-model="payment.method_name" />
          <span>Cash On Delivery (COD)</span>
        </label>

        <label class="flex items-center gap-3 py-3 cursor-pointer">
          <input type="radio" value="Online Banking" v-model="payment.method_name" />
          <span>Credit/Debit Card</span>
        </label>

        <div v-if="payment.method_name === 'Online Banking'">
          <div v-for="method in card_methods" :key="method.method_id" class="flex items-center gap-3 px-3 py-1 cursor-pointer">
            <input type="radio" :value="method.method_id" v-model="payment.method_id" />
            <span>Card number: {{ method.account_number }}</span>
          </div>
        </div>
      </div>

      <!-- ORDER SUMMARY -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="space-y-3 mb-6">
          <div class="flex justify-between text-gray-600">
            <span>Merchandise Subtotal</span>
            <span>₫{{ subtotal.toLocaleString('vi-VN') }}</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Shipping Subtotal</span>
            <span>₫{{ shippingFee.toLocaleString('vi-VN') }}</span>
          </div>
          <div class="border-t border-gray-300 pt-3 flex justify-between items-center">
            <span>Total Payment</span>
            <div class="text-right">
              <div class="text-2xl text-[#ee4d2d]">₫{{ total.toLocaleString('vi-VN') }}</div>
              <div class="text-xs text-gray-500">(VAT included)</div>
            </div>
          </div>
        </div>

        <div>
          <p class="text-sm text-gray-500 mb-4">
            By clicking "Place Order," you are agreeing to BuyIt's
            <a href="#" class="text-blue-600 hover:underline"> Terms and Conditions.</a>
          </p>

          <div class="text-right">
            <button
              @click="handlePlaceOrder"
              class="bg-[#ee4d2d] hover:bg-[#d73211] text-white px-12 h-12 rounded cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ADDRESS DIALOG -->
    <div v-if="showAddressDialog" class="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h2 class="text-lg font-semibold mb-4">My Address</h2>

        <template v-if="!showNewAddressForm">
          <div class="space-y-4 mb-4">
            <div
              v-for="addr in addresses"
              :key="addr.address_id"
              class="p-3 border rounded cursor-pointer hover:border-[#ee4d2d]"
              :class="{ 'border-[#ee4d2d] bg-red-50': selectedAddress === addr.address_id }"
              @click="selectedAddress = addr.address_id"
            >
              <div class="flex items-center gap-2 mb-1">
                <strong>{{ addr.full_name }}</strong>
                <span class="text-gray-400">|</span>
                <span>{{ addr.phone_number }}</span>
                <span
                  v-if="addr.is_default"
                  class="px-2 py-0.5 bg-red-100 text-[#ee4d2d] text-xs rounded border border-[#ee4d2d]"
                >Default</span>
              </div>
              <p class="text-sm text-gray-600">{{ addr.street }}, {{ addr.ward }}, {{ addr.district }}, {{ addr.city }}</p>
            </div>
          </div>

          <button
            class="w-full flex items-center justify-center gap-2 py-3 text-gray-500 border-2 border-dashed border-gray-300 rounded mb-4 hover:text-[#ee4d2d] hover:border-[#ee4d2d] cursor-pointer"
            @click="showNewAddressForm = true"
          >
            <Plus class="w-5 h-5" />
            Add New Address
          </button>

          <div class="flex gap-3">
            <button class="flex-1 text-sm border border-gray-300 py-2 rounded hover:bg-gray-100 cursor-pointer" @click="showAddressDialog = false">Cancel</button>
            <button class="flex-1 bg-[#ee4d2d] text-sm text-white py-2 rounded hover:bg-[#d73211] cursor-pointer" @click="handleConfirmAddress">
              Confirm
            </button>
          </div>
        </template>

        <!-- ADD NEW ADDRESS FORM -->
        <template v-else>
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium">
                Full Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newAddress.full_name"
                class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300"
                placeholder="VD: Nguyen Van A"
              />
            </div>

            <div>
              <label class="text-sm font-medium">
                Phone Number <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newAddress.phone_number"
                class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300"
                placeholder="Nhập số điện thoại"
              />
            </div>

            <h3 class="text-lg font-semibold mb-2">Address</h3>

            <div>
              <label class="text-sm font-medium">
                Street Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newAddress.street"
                class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300"
                placeholder="VD: 123 Hai Bà Trưng"
              />
            </div>

            <div class="flex gap-4">
              <div class="flex-1">
                <label class="text-sm font-medium">
                  Ward <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="newAddress.ward"
                  class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300"
                  placeholder="VD: Phường 2"
                />
              </div>

              <div class="flex-1">
                <label class="text-sm font-medium">
                  District <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="newAddress.district"
                  class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300"
                  placeholder="VD: Quận 1"
                />
              </div>
            </div>

            <div>
              <label class="text-sm font-medium">
                City <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newAddress.city"
                class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300"
                placeholder="VD: TP.Hồ Chí Minh"
              />
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <button class="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-100 cursor-pointer" @click="showNewAddressForm = false">Cancel</button>
            <button class="flex-1 bg-[#ee4d2d] text-white py-2 rounded hover:bg-[#d73211] cursor-pointer" @click="handleAddNewAddress">Submit</button>
          </div>
        </template>
      </div>
    </div>

    <PageFooter />
  </div>
</template>

<style scoped>
.radio-group {
  display: flex;
  gap: 20px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

input[type="radio"] {
  width: 16px;
  height: 16px;
  accent-color: #dc2626;
}
</style>
