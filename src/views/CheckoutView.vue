<script setup lang="ts">
import { ref, computed } from 'vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import CustomImage from '@/components/ui/CustomImage.vue'
import { useRouter } from 'vue-router'
import { Address, CartItem } from '@/utils/interface'
import { MapPin, Plus } from 'lucide-vue-next'

const router = useRouter()


// const selectedAddress = ref(addresses.getDefaultAddress()?.id || '')
const selectedAddress = ref<number>(1) // Tạm thời
const shippingMethod = ref('express')
const paymentMethod = ref('cod')
const showAddressDialog = ref(false)
const showNewAddressForm = ref(false)


// Dữ liệu mẫu cho address
const addresses  = ref<Address[]>([
  {
    id: 1,
    name: 'Địa chỉ 1',
    phone: '(+84) 972 393 574',
    address: 'Ký Túc Xá A - Đhqg, Khu Phố 6, Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí Minh',
    isDefault: true,
  },
  {
    id: 2,
    name: 'Địa chỉ 2',
    phone: '(+84) 972 393 574',
    address: '383/45A Bình Giã, Phường Nguyễn An Ninh, Thành Phố Vũng Tàu, Bà Rịa - Vũng Tàu',
    isDefault: false,
    },
])

// Dữ liệu mẫu cho cart item
const cartItems :CartItem[] = [
  {
    id: 1,
    title: 'Bút lông bảng Hoshi Thiên Long WB-025/HS - Công nghệ Nhật Bản',
    image: "https://product.hstatic.net/1000230347/product/artboard_1_copy_f944014ac3974259801d9e46d3ee4840.jpg",
    price: 10725,
    quantity: 2,
    checked: true
  },
  {
    id: 2,
    title: 'Combo 20 Bút gel Quick Dry Thiên Long GEL-040',
    image: "https://product.hstatic.net/1000230347/product/artboard_11_copy_1dc2800a2fdf4cf48ccb4b900a3348fc.jpg",
    price: 116000,
    quantity: 1 ,
    checked: true
  },
  {
    id: 3,
    title: 'Bút dạ quang Thiên Long HL-020 - Công nghệ Free-ink system mực ra đều liên tục',
    image: "https://cdn.hstatic.net/products/1000230347/artboard_3_copy_1144ee9290c642ab9ad6bd121e6ce576.jpg",
    price: 11250,
    quantity: 1 ,
    checked: false
  },
]

const addr_id = ref(3);
// Tạm thời
const currentAddress = ref(
  addresses.value.find(addr => addr.isDefault) || addresses.value[0]
)

const newAddress = ref<Address>({
  id: 3,
  name: '',
  phone: '',
  address: '',
  isDefault: false,
})

const checkoutItems = computed(() =>
  cartItems.filter(item => item.checked)
)



// subtotal
const subtotal = computed(() =>
  checkoutItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
)
const shippingFee = computed(() => (shippingMethod.value === 'express' ? 17000 : 0))
const total = computed(() => subtotal.value + shippingFee.value)

function handleSelectAddress(id: number) {
  selectedAddress.value = id
}

function handleConfirmAddress() {
  addresses.value = addresses.value.map(addr => ({
    ...addr,
    isDefault: addr.id === Number(selectedAddress.value) // hoặc +selectedAddress.value
  }))
  currentAddress.value = addresses.value.find(
    addr => addr.id === selectedAddress.value
  )!
  showAddressDialog.value = false
}

function handleAddNewAddress() {
  if (newAddress.value.name && newAddress.value.phone && newAddress.value.address) {
    newAddress.value.id = addr_id.value
    newAddress.value.isDefault = addresses.value.length === 0

    addresses.value.push({ ...newAddress.value })

    addr_id.value++

    // Reset
    newAddress.value = {
      id: addr_id.value,
      name: '',
      phone: '',
      address: '',
      isDefault: false,
    }

    showNewAddressForm.value = false
  }
}

function handlePlaceOrder() {
  if (!currentAddress.value) {
    alert('Vui lòng chọn địa chỉ')
    return
  }
  alert('Đặt hàng thành công!')
  router.back()
}

const onNavigateToHome = () => {
  router.push({ name: 'home' })
}

</script>

<template>
  <div class="min-h-screen bg-[rgb(255,245,240)]">

    <!-- HEADER -->
    <div class="bg-gradient-to-r from-[#bd0604] to-[#BF092F] text-white">
      <div class="container mx-auto px-4 py-4 flex items-center gap-4">
        <h1 class="text-2xl cursor-pointer" @click="onNavigateToHome">BuyIt</h1>
        <div class="border-l border-white/30 h-6 mx-2" />
        <span class="text-xl">Thanh Toán</span>
      </div>
    </div>

    <div class="container mx-auto px-4 py-6 max-w-5xl">

      <!-- SHIPPING ADDRESS SECTION -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <MapPin class="w-5 h-5 text-[#ee4d2d]" />
            <h2 class="text-[#ee4d2d]">Địa Chỉ Nhận Hàng</h2>
          </div>
          <button @click="showAddressDialog = true" class="text-blue-600 cursor-pointer hover:text-blue-900">
            Thay Đổi
          </button>
        </div>


        <template v-if="currentAddress">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span>{{ currentAddress.name }}</span>
              <span class="text-gray-400">|</span>
              <span class="text-gray-600">{{ currentAddress.phone }}</span>

              <span
                v-if="currentAddress.isDefault"
                class="px-2 py-0.5 bg-red-100 text-[#ee4d2d] text-xs rounded border border-[#ee4d2d]"
              >
                Mặc định
              </span>
            </div>
            <p class="text-gray-600">{{ currentAddress.address }}</p>
          </div>
        </template>

        <button
          v-else
          @click="showAddressDialog = true"
          class="text-blue-600 hover:text-blue-700"
        >
          + Thêm địa chỉ nhận hàng
        </button>
      </div>

      <!-- PRODUCT LIST -->

      <div class="bg-white rounded-lg shadow-sm mb-4">
        <div class="p-4 border-b border-gray-300">
          <div class="flex font-semibold items-center gap-4">
            <span class="flex-1">Sản phẩm</span>
            <span class="w-32 text-center">Đơn giá</span>
            <span class="w-32 text-center">Số lượng</span>
            <span class="w-32 text-center">Thành tiền</span>
          </div>
        </div>


        <div v-for="item in checkoutItems" :key="item.id" class="p-4 border-b border-gray-300 last:border-b-0">
          <div class="flex items-center gap-4">
            <div class="flex-1 flex items-center gap-3">
              <CustomImage
                :src="item.image"
                class="w-20 h-20 object-cover rounded border"
              />
              <div class="flex-1">
                <h3 class="line-clamp-2 mb-1">{{ item.title }}</h3>
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
        <h3 class="mb-4 font-semibold">Phương thức vận chuyển</h3>

        <div
          class="flex items-center justify-between py-3 border-b border-gray-300 cursor-pointer"
          @click="shippingMethod = 'express'"
        >
          <div class="flex items-center gap-3">
            <input type="radio" value="express" v-model="shippingMethod" />
            <span>Nhanh - Giao hàng nhanh</span>
          </div>
          <span class="text-gray-600">₫17.000</span> <!--Đổi thành giá thật-->
        </div>

        <div class="flex items-center justify-between py-3 cursor-pointer" @click="shippingMethod = 'standard'">
          <div class="flex items-center gap-3">
            <input type="radio" value="standard" v-model="shippingMethod" />
            <span>Tiêu chuẩn - Giao hàng tiết kiệm</span>
          </div>
          <span class="text-gray-600">Miễn phí</span>
        </div>
      </div>
      <!-- PAYMENT METHOD -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-4">
        <h3 class="mb-4 font-semibold">Phương thức thanh toán</h3>

        <label class="flex items-center gap-3 py-3 cursor-pointer border-b border-gray-300">
          <input type="radio" value="cod" v-model="paymentMethod" />
          <span>Thanh toán khi nhận hàng (COD)</span>
        </label>

        <label class="flex items-center gap-3 py-3 cursor-pointer">
          <input type="radio" value="banking" v-model="paymentMethod" />
          <span>Chuyển khoản ngân hàng</span>
        </label>
      </div>

      <!-- ORDER SUMMARY -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="space-y-3 mb-6">
          <div class="flex justify-between text-gray-600">
            <span>Tổng tiền hàng</span>
            <span>₫{{ subtotal.toLocaleString('vi-VN') }}</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Phí vận chuyển</span>
            <span>₫{{ shippingFee.toLocaleString('vi-VN') }}</span>
          </div>
          <div class="border-t border-gray-300 pt-3 flex justify-between items-center">
            <span>Tổng thanh toán</span>
            <div class="text-right">
              <div class="text-2xl text-[#ee4d2d]">₫{{ total.toLocaleString('vi-VN') }}</div>
              <div class="text-xs text-gray-500">(Đã bao gồm VAT)</div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">
              Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Điều khoản BuyIt
              </a>
            </p>

          <div class="text-right">
            <button @click="handlePlaceOrder" class="bg-[#ee4d2d] hover:bg-[#d73211] text-white px-12 h-12 rounded cursor-pointer">
              Đặt Hàng
            </button>
          </div>
        </div>
    </div>

    <!-- ADDRESS DIALOG -->
    <div v-if="showAddressDialog" class="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h2 class="text-lg font-semibold mb-4">Địa Chỉ Của Tôi</h2>

        <!-- LIST EXISTING ADDRESSES -->
        <template v-if="!showNewAddressForm">
          <div class="space-y-4 mb-4">
            <div
              v-for="addr in addresses"
              :key="addr.id"
              class="p-3 border rounded cursor-pointer hover:border-[#ee4d2d]"
              :class="{ 'border-[#ee4d2d] bg-red-50': selectedAddress === addr.id }"
              @click="handleSelectAddress(addr.id)"
            >
              <div class="flex items-center gap-2 mb-1">
                <strong>{{ addr.name }}</strong>
                <span class="text-gray-400">|</span>
                <span>{{ addr.phone }}</span>
                <span
                  v-if="addr.isDefault"
                  class="px-2 py-0.5 bg-red-100 text-[#ee4d2d] text-xs rounded border border-[#ee4d2d]"
                >Mặc định</span>
              </div>
              <p class="text-sm text-gray-600">{{ addr.address }}</p>
            </div>
          </div>

          <button
            class="w-full flex items-center justify-center gap-2 py-3 text-gray-500 border-2 border-dashed border-gray-300 rounded mb-4 hover:text-[#ee4d2d] hover:border-[#ee4d2d] cursor-pointer"
            @click="showNewAddressForm = true"
          >
            <Plus class="w-5 h-5" />
            Thêm Địa Chỉ Mới
          </button>

          <div class="flex gap-3">
            <button class="flex-1 text-sm border border-gray-300 py-2 rounded cursor-pointer" @click="showAddressDialog = false">Hủy</button>
            <button class="flex-1 bg-[#ee4d2d] text-sm text-white py-2 rounded hover:bg-gray-500 cursor-pointer" @click="handleConfirmAddress">
              Xác Nhận
            </button>
          </div>
        </template>

        <!-- ADD NEW ADDRESS FORM -->
        <template v-else>
          <div class="space-y-3 mb-4">
            <input class="border w-full p-2 rounded" placeholder="Tên người nhận" v-model="newAddress.name" />
            <input class="border w-full p-2 rounded" placeholder="Số điện thoại" v-model="newAddress.phone" />
            <input class="border w-full p-2 rounded" placeholder="Địa chỉ" v-model="newAddress.address" />
          </div>

          <div class="flex gap-3">
            <button class="flex-1 border py-2 rounded" @click="showNewAddressForm = false">Hủy</button>
            <button class="flex-1 bg-[#ee4d2d] text-white py-2 rounded" @click="handleAddNewAddress">Thêm</button>
          </div>
        </template>
      </div>
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
