<script setup lang="ts">
import SearchButton from '../ui/SearchButton.vue'
import ShopButton from '../ui/ShopButton.vue'
import { useRouter } from 'vue-router'
import { CircleUserRound, Package, LogOut, Bell, ChevronDown, Globe } from 'lucide-vue-next'
import { ref, type Ref, computed, onMounted, watch } from 'vue'
import apiClient from '@/api/client'
import type { Notification } from '@/utils/interface'
import NotificationItem from '../ui/NotificationItem.vue'
const username = ref('')
const router = useRouter()
const isLoggedIn: Ref<boolean> = ref(true)
const loginStatus = computed(() => (isLoggedIn.value ? true : false))
const isShowingDropdown: Ref<boolean> = ref(false)
const searchQuery = ref('')
const isShowingNotificationsDropdown: Ref<boolean> = ref(false)
const notifications = ref<Notification[]>([])
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
const navigateToLogin: () => void = () => {
  router.push('/login')
}
const navigateToSignup: () => void = () => {
  router.push('/signup')
}
const navigateToCart: () => void = () => {
  router.push('/cart')
}
const navigateToHome: () => void = () => {
  router.push('/')
}
const navigateToSeller: () => void = () => {
  router.push('/sellerlog')
}

const logOut: () => Promise<void> = async () => {
  isLoggedIn.value = false
  localStorage.removeItem('username')
  localStorage.removeItem('role')
  localStorage.removeItem('id')
  router.push('/login')
  await cookieStore.delete('connect.sid')
}

const handleSearch = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && searchQuery.value.trim()) {
    router.push({ name: 'search', query: { query: searchQuery.value.trim() } })
  }
}

// onUnmounted(() => {
//   UpdateReadStatus().catch((error) => {
//     console.error('Error updating read status:', error)
//   })
// })

onMounted(() => {
  const storedUsername = localStorage.getItem('username')
  if (storedUsername) {
    isLoggedIn.value = true
    username.value = storedUsername
    RetrieveNotifications()
  } else {
    isLoggedIn.value = false
    username.value = ''
  }
})

// Close dropdown when clicking outside
watch(isShowingDropdown, (value) => {
  if (value) {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.user-dropdown')) {
        isShowingDropdown.value = false
        document.removeEventListener('click', handleClickOutside)
      }
    }
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)
  }
})

function handleNotification() {
  isShowingNotificationsDropdown.value = !isShowingNotificationsDropdown.value
  if (isShowingNotificationsDropdown.value) {
    RetrieveNotifications()
  } else {
    UpdateReadStatus()
  }
}
</script>

<template>
  <nav class="w-full bg-(--red) text-white shadow-md sticky top-0 z-50">
    <!-- Top Bar -->
    <div class="w-full max-w-7xl mx-auto px-4 lg:px-8">
      <div class="flex items-center justify-between h-10 text-sm">
        <!-- Left Section - Removed non-interactive items -->
        <div class="hidden md:flex items-center gap-4">
          <button
            @click="navigateToSeller"
            class="hover:text-orange-200 transition-colors flex items-center gap-1"
          >
            <span>Seller Center</span>
          </button>
        </div>

        <!-- Right Section -->
        <div class="flex items-center gap-4 ml-auto">
          <!-- Notifications (if logged in) -->
          <div class="relative">
            <button
              v-if="loginStatus"
              class="hover:text-orange-200 transition-colors relative cursor-pointer"
              title="Notifications"
              @click="handleNotification"
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
          <!-- Language Selector -->
          <button
            class="hover:text-orange-200 transition-colors flex items-center gap-1"
            title="Language"
          >
            <Globe class="w-4 h-4" />
            <span class="hidden sm:inline cursor-pointer">English</span>
          </button>

          <!-- Auth Buttons or User Menu -->
          <div v-if="!loginStatus" class="flex items-center gap-2">
            <span class="text-white/70">|</span>
            <button @click="navigateToSignup" class="hover:text-orange-200 transition-colors px-2">
              Sign Up
            </button>
            <span class="text-white/70">|</span>
            <button @click="navigateToLogin" class="hover:text-orange-200 transition-colors px-2">
              Log In
            </button>
          </div>

          <!-- User Dropdown -->
          <div v-if="loginStatus" class="relative user-dropdown">
            <button
              @click="isShowingDropdown = !isShowingDropdown"
              class="flex items-center gap-1 hover:text-orange-200 transition-colors px-2"
            >
              <span class="hidden sm:inline cursor-pointer">{{ username }}</span>
              <ChevronDown
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': isShowingDropdown }"
              />
            </button>
            <div
              v-if="isShowingDropdown"
              class="absolute top-full right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 overflow-hidden transition-all duration-200 z-50"
            >
              <div class="py-1">
                <button
                  @click="
                    () => {
                      router.push('/profile')
                      isShowingDropdown = false
                    }
                  "
                  class="w-full px-4 py-2 hover:bg-gray-100 transition-colors flex items-center gap-3 text-left cursor-pointer"
                >
                  <CircleUserRound class="w-5 h-5 text-gray-600" />
                  <span>My Profile</span>
                </button>
                <button
                  @click="
                    () => {
                      router.push('/orders')
                      isShowingDropdown = false
                    }
                  "
                  class="w-full px-4 py-2 hover:bg-gray-100 transition-colors flex items-center gap-3 text-left cursor-pointer"
                >
                  <Package class="w-5 h-5 text-gray-600" />
                  <span>My Orders</span>
                </button>
                <div class="border-t border-gray-200 my-1"></div>
                <button
                  @click="
                    () => {
                      isShowingDropdown = false
                      logOut()
                    }
                  "
                  class="w-full px-4 py-2 hover:bg-red-50 transition-colors flex items-center gap-3 text-left text-red-600 cursor-pointer"
                >
                  <LogOut class="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navbar with Search -->
    <div class="w-full max-w-7xl mx-auto px-4 lg:px-8 py-3">
      <div class="flex items-center justify-between gap-4">
        <!-- Logo -->
        <button
          @click="navigateToHome"
          class="flex items-center gap-3 hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
        >
          <img
            src="/src/assets/images/Logo.png"
            alt="BuyIt Logo"
            class="w-12 h-12 object-contain"
          />
          <h2 class="font-bold text-2xl hidden sm:block">BuyIt</h2>
        </button>

        <!-- Search Section -->
        <div class="flex-1 max-w-2xl mx-4">
          <div class="flex items-center gap-0 bg-white rounded-lg overflow-hidden shadow-sm">
            <input
              v-model="searchQuery"
              @keyup="handleSearch"
              type="text"
              placeholder="Search for products, brands and more"
              class="flex-1 h-12 px-4 text-gray-800 focus:outline-none text-sm"
            />
            <div class="w-16 h-12 shrink-0">
              <SearchButton v-model="searchQuery" />
            </div>
          </div>
        </div>

        <!-- Cart Button -->
        <button
          @click="navigateToCart"
          class="relative flex items-center justify-center w-12 h-12 hover:bg-white/10 rounded-lg transition-colors shrink-0 cursor-pointer"
          title="Shopping Cart"
        >
          <ShopButton />
          <span
            v-if="false"
            class="absolute -top-1 -right-1 bg-orange-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
          >
            0
          </span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.user-dropdown {
  z-index: 1000;
}
</style>
