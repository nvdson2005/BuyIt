<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { Bell } from 'lucide-vue-next'
import AddProductView from './AddProductView.vue'
import SellerDashBoard from './SellerDashBoard.vue'
import SellerProductsView from './SellerProductsView.vue'
import SellerOrdersView from './SellerOrdersView.vue'
import SellerVoucherView from './SellerVoucherView.vue'
import ShopProgram from './ShopProgram.vue'
import MarketingView from './MarketingView.vue'


const router = useRouter()
const activeView = ref('dashboard')
const isUserMenuOpen = ref(false)
const isLoading = ref(true)
const username = ref('')
const isLoggedIn = ref(true)

const sidebarNav = {
  'Quản Lý Đơn Hàng': ['Tất cả', 'Bàn Giao Đơn Hàng'],
  'Quản Lý Sản Phẩm': ['Tất Cả Sản Phẩm', 'Thêm Sản Phẩm'],
  'Kênh Marketing': [
    'Kênh Marketing',
    'Khuyến Mãi của Shop',
    'Mã giảm giá của Shop'
  ],
  'Chăm sóc khách hàng': ['Quản lý Đánh Giá']
}

function handleAddProduct() {
  activeView.value = 'all-products'
}

function handleNavClick(item: string) {
  if (item === 'Tất cả') activeView.value = 'all-orders'
  else if (item === 'Tất Cả Sản Phẩm') activeView.value = 'all-products'
  else if (item === 'Thêm Sản Phẩm') activeView.value = 'add-product'
  else if (item === 'Kênh Marketing') activeView.value = 'marketing'
  else if (item === 'Mã giảm giá của Shop') activeView.value = 'voucher'
  else if (item === 'Khuyến Mãi của Shop') activeView.value = 'program'

}

const currentView = computed(() => {
  switch (activeView.value) {
    case 'all-orders':
      return SellerOrdersView
    case 'all-products':
      return SellerProductsView
    case 'add-product':
      return AddProductView
    case 'marketing':
      return MarketingView
    case 'voucher':
      return SellerVoucherView
    case 'program':
      return ShopProgram
    case 'dashboard':
    default:
      return SellerDashBoard
  }
})


function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const handleLogout: () => Promise<void> = async () => {
  isLoggedIn.value = false
  await cookieStore.delete('connect.sid')
  localStorage.removeItem('username')
  localStorage.removeItem('role')
  localStorage.removeItem('id')
  router.push('/sellerlog')
}



onMounted(async () => {
  const cookie = await cookieStore.get('connect.sid')
  const role = localStorage.getItem('role')
  // console.log('Cookie:', cookie)
  if (!cookie) {
    router.push('/sellerlog')
    return
  }
  else if(role === 'buyer'){
    router.push('/')
  }
  else{
    username.value = localStorage.getItem('username') || ''
    if (username.value) {
      setTimeout(() => {
        isLoading.value = false
      }, 1000)
      return
    } else {
      await RetrieveUsername()
      isLoading.value = false
    }
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }
})

async function RetrieveUsername() {
  console.error('RetrieveUsername function is currently disabled.')
}

</script>
<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white text-gray-800 flex flex-col border-r border-gray-300 flex-shrink-0">
      <div class="p-4 bg-[rgb(189,6,4)] text-white shadow cursor-pointer" @click="activeView = 'dashboard'">
        <h2 class="text-xl font-semibold">Kênh Người Bán</h2>
      </div>
      <nav class="flex-1 overflow-y-auto">
        <div v-for="(items, section) in sidebarNav" :key="section" class="p-4">
          <h3 class="text-xs uppercase text-gray-500 font-bold mb-2">{{ section }}</h3>
          <ul>
            <li v-for="item in items" :key="item">
              <button
                @click="handleNavClick(item)"
                class="w-full text-left py-1.5 px-2 rounded hover:bg-gray-100 text-sm cursor-pointer"
              >
                {{ item }}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-[rgb(189,6,4)] text-white p-4 flex items-center justify-between flex-shrink-0">
        <div></div>
        <div class="flex items-center gap-4">
          <button><Bell class="w-5 h-5 text-white" /></button>
          <div class="relative">
            <button @click="toggleUserMenu" class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-gray-200 cursor-pointer"></div>
              <span class="text-sm cursor-pointer">{{ username }}</span>
            </button>

            <!-- Dropdown -->
            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50"
            >
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-y-auto">
        <component
          :is="currentView"
          @add-new-product="() => (activeView = 'add-product')"
          @cancel="() => (activeView = 'all-products')"
          @save="handleAddProduct"
          @voucher="() => (activeView = 'voucher')"
          @program="() => (activeView = 'program')"
        />
      </main>
    </div>
  </div>
</template>
<style scoped>
</style>
