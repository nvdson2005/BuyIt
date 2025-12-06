<script setup lang="ts">
import { ref, type Ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {type Notification } from '@/utils/interface'
import { Bell } from 'lucide-vue-next'
import AddProductView from './AddProductView.vue'
import SellerDashBoard from './SellerDashBoard.vue'
import SellerProductsView from './SellerProductsView.vue'
import SellerOrdersView from './SellerOrdersView.vue'
import SellerVoucherView from './SellerVoucherView.vue'
import ShopProgram from './ShopProgram.vue'
import MarketingView from './MarketingView.vue'
import NotificationItem from '@/components/ui/NotificationItem.vue'
import apiClient from '@/api/client'

const router = useRouter()
const activeView = ref('dashboard')
const isUserMenuOpen = ref(false)
const isLoading = ref(true)
const username = ref('')
const isLoggedIn = ref(true)
const isShowingNotificationsDropdown: Ref<boolean> = ref(false)
const notifications = ref<Notification[]>([])

const sidebarNav = {
  'Order Management': ['All Orders', 'Order Handover'],
  'Product Management': ['All Products', 'Add New Product'],
  'Marketing Centre': [
    'Marketing Centre',
    'Shop Promotions',
    'Shop Vouchers'
  ],
  'Customer Service': ['Review Management']
}

function handleAddProduct() {
  activeView.value = 'all-products'
}

function handleNavClick(item: string) {
  if (item === 'All Orders') activeView.value = 'all-orders'
  else if (item === 'All Products') activeView.value = 'all-products'
  else if (item === 'Add New Product') activeView.value = 'add-product'
  else if (item === 'Marketing Centre') activeView.value = 'marketing'
  else if (item === 'Shop Promotions') activeView.value = 'program'
  else if (item === 'Shop Vouchers') activeView.value = 'voucher'

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
    RetrieveNotifications()
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

// onUnmounted(() => {
//   UpdateReadStatus().catch((error) => {
//     console.error('Error updating read status:', error)
//   })
// })

async function RetrieveNotifications() {
  const response = await apiClient.get('/user/notifications')
  notifications.value = response.data?.notifications || []
}
async function UpdateReadStatus() {
  const response = await apiClient.put('/user/notifications/read', {
    notificationIds: notifications.value.map((notification) => notification.id),
  })
  notifications.value = response.data?.notifications || []
  isShowingNotificationsDropdown.value = false
}

function handleNotification(){
  isShowingNotificationsDropdown.value = !isShowingNotificationsDropdown.value
  if(isShowingNotificationsDropdown.value){
    RetrieveNotifications();
  }
  else{
    UpdateReadStatus();
  }
}
</script>
<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white text-gray-800 flex flex-col border-r border-gray-300 flex-shrink-0">
      <div class="p-4 bg-[rgb(189,6,4)] text-white shadow cursor-pointer" @click="activeView = 'dashboard'">
        <h2 class="text-xl font-semibold">BuyIt Seller Centre</h2>
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
        <div class="flex items-center gap-4 ml-auto">
          <div class="relative">
            <button
              class="hover:text-orange-200 transition-colors relative cursor-pointer"
              title="Notifications"
              @click="handleNotification()"
            >
              <Bell class="w-5 h-5" />
              <span
                class="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"
                v-if="notifications.length > 0"
              ></span>
            </button>
            <div
              v-if="isShowingNotificationsDropdown"
              class="absolute flex flex-col top-full right-0 mt-2 w-96 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 overflow-hidden transition-all duration-200 z-50"
            >
              <NotificationItem
                v-for="notification in notifications"
                :notification="notification"
                :key="notification.id"
              />
            </div>
          </div>

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
                Log Out
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
