<script setup lang="ts">
import { ref, type Ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  type Notification,
  type ProfileDetail,
  type SellerOrder,
  type SellerOrderItem,
} from '@/utils/interface'
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
import { type AxiosResponse } from 'axios'
import CustomImage from '@/components/ui/CustomImage.vue'
import ShopInformation from '@/components/layout/ShopInformation.vue'
const router = useRouter()
const activeView = ref('dashboard')
const isUserMenuOpen = ref(false)
const isLoading = ref(true)
const username = ref('')
const isLoggedIn = ref(true)
const isShowingNotificationsDropdown: Ref<boolean> = ref(false)
const notifications = ref<Notification[]>([])
const orders = ref<SellerOrder[]>([])
const shopId = localStorage.getItem('id')
const profile = ref<ProfileDetail | null>(null)
const editingInfo = ref(false)
const sidebarNav = {
  'Order Management': ['All Orders', 'Order Handover'],
  'Product Management': ['All Products', 'Add New Product'],
  'Marketing Centre': ['Marketing Centre', 'Shop Promotions', 'Shop Vouchers'],
  'Customer Service': ['Review Management'],
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

function handleProfile() {
  isUserMenuOpen.value = false
  editingInfo.value = true
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
  localStorage.removeItem('username')
  localStorage.removeItem('role')
  localStorage.removeItem('id')
  router.push('/sellerlog')
}

onMounted(async () => {
  const usernameLocalStorage = localStorage.getItem('username') || ''
  const role = localStorage.getItem('role')
  console.log('Username:', usernameLocalStorage)
  console.log('Role:', role)
  if (!usernameLocalStorage) {
    router.push('/sellerlogin')
  } else if (role === 'buyer') {
    router.push('/home')
  } else {
    username.value = usernameLocalStorage
    RetrieveNotifications()
    const result: AxiosResponse = await apiClient.get(`user/profile`)
    const raw = result.data.user
    profile.value = {
      username: raw.username ?? '',
      name: raw.name ?? '',
      email: raw.email ?? '',
      phone: raw.phone_number ?? '',
      description: raw.description ?? '',
      image_url: raw.image_url ?? '',
    }
    if (activeView.value === 'dashboard') {
      await retrieveOrders()
    }
    isLoading.value = false
  }
})

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

function handleNotification() {
  isShowingNotificationsDropdown.value = !isShowingNotificationsDropdown.value
  if (!isShowingNotificationsDropdown.value) {
    UpdateReadStatus()
  }
  // if (isShowingNotificationsDropdown.value) {
  //   RetrieveNotifications()
  // } else {
  //   UpdateReadStatus()
  // }
}

async function retrieveOrders() {
  if (!shopId) return
  try {
    const res = await apiClient.get(`/shop/orders/${shopId}`)
    const orderItems: SellerOrderItem[] = res.data.orderItems.map((item: SellerOrderItem) => ({
      order_id: item.order_id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      product_name: item.product_name,
      variant_name: item.variant_name,
      image_url: item.image_url,
      order_item_id: item.order_item_id,
      quantity: item.quantity,
      total_amount: item.total_amount,
      order_status: item.order_status,
      order_date: item.order_date,
      carrier_id: item.carrier_id,
      carrier_name: item.carrier_name,
      shipment_id: item.shipment_id,
      ship_status: item.ship_status,
      actual_deliver_date: item.actual_deliver_date,
    }))

    const groupedOrders: Record<string, SellerOrder> = {}
    orderItems.forEach((item) => {
      if (!groupedOrders[item.order_id]) {
        groupedOrders[item.order_id] = {
          order_id: item.order_id,
          order_status: item.order_status,
          order_date: item.order_date,
          actual_deliver_date: item.actual_deliver_date,
          ship_status: item.ship_status,
          carrier_name: item.carrier_name,
          order_items: [],
          selected: false,
        }
      }
      if (groupedOrders[item.order_id] && item.order_id) {
        groupedOrders[item.order_id]?.order_items?.push(item)
      }
    })

    orders.value = Object.values(groupedOrders)
  } catch (err) {
    console.error('Get orders failed: ', err)
  }
}

const orderStatistics = computed(() => {
  return {
    pending: orders.value.filter((o) => o.order_status === 'Pending').length,
    paid: orders.value.filter((o) => o.order_status === 'Paid').length,
    packing: orders.value.filter((o) => o.order_status === 'Packing').length,
    delivering: orders.value.filter((o) => o.order_status === 'Delivering').length,
    delivered: orders.value.filter((o) => o.order_status === 'Delivered').length,
    cancelled: orders.value.filter((o) => o.order_status === 'Cancelled').length,
    returned: orders.value.filter((o) => o.order_status === 'Return').length,
  }
})

// Fetch orders when dashboard is displayed
watch(activeView, (newView) => {
  if (newView === 'dashboard') {
    retrieveOrders()
  }
})
</script>
<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white text-gray-800 flex flex-col border-r border-gray-300 shrink-0">
      <div
        class="p-4 bg-[rgb(189,6,4)] text-white shadow cursor-pointer"
        @click="activeView = 'dashboard'"
      >
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
      <header class="bg-[rgb(189,6,4)] text-white p-4 flex items-center justify-between shrink-0">
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
                v-if="notifications.some((notification) => !notification.is_read)"
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
              <div
                v-if="!profile?.image_url"
                class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-4xl cursor-pointer"
              ></div>
              <CustomImage
                v-else
                :source="profile.image_url"
                :alt="profile?.username"
                className="w-8 h-8 object-cover rounded-full cursor-pointer"
              ></CustomImage>
              <span class="text-sm cursor-pointer">{{ username }}</span>
            </button>

            <!-- Dropdown -->
            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50"
            >
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
              >
                Log Out
              </button>
              <button
                @click="handleProfile"
                class="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </header>
      <main class="flex-1 p-6 overflow-y-auto">
        <component
          :is="currentView"
          v-bind="activeView === 'dashboard' ? orderStatistics : {}"
          @add-new-product="() => (activeView = 'add-product')"
          @cancel="() => (activeView = 'all-products')"
          @save="handleAddProduct"
          @voucher="() => (activeView = 'voucher')"
          @program="() => (activeView = 'program')"
          @update:status="RetrieveNotifications"
        />
      </main>
    </div>
  </div>
  <ShopInformation
    v-if="editingInfo"
    :profile="profile"
    @onCancel="editingInfo = false"
    @onSave="
      (profileUsername, profileNewImageUrl) => {
        profile!.username = profileUsername
        profile!.image_url = profileNewImageUrl
        username = profileUsername
      }
    "
  ></ShopInformation>
</template>
<style scoped></style>
