<script setup lang="ts">
import SearchButton from '../ui/SearchButton.vue'
import ShopButton from '../ui/ShopButton.vue'
import { useRouter } from 'vue-router'
import { CircleUserRound, Package, LogOut } from 'lucide-vue-next'
import { ref, type Ref, computed, onMounted } from 'vue'

const username = ref('')
const router = useRouter()
const isLoggedIn: Ref<boolean> = ref(true)
const loginStatus = computed(() => (isLoggedIn.value ? true : false))
const isShowingDropdown: Ref<boolean> = ref(false)
const navigateToLogin: () => void = () => {
  router.push('/login')
}
const navigateToSignup: () => void = () => {
  router.push('/signup')
}
const navigateToCart: () => void = () => {
  router.push('/cart')
}

const logOut: () => Promise<void> = async () => {
  isLoggedIn.value = false
  await cookieStore.delete('connect.sid')
  localStorage.removeItem('username')
  localStorage.removeItem('role')
  router.push('/login')
}

onMounted(() => {
  const storedUsername = localStorage.getItem('username')
  if (storedUsername) {
    isLoggedIn.value = true
    username.value = storedUsername
  } else {
    isLoggedIn.value = false
    username.value = ''
  }
})
</script>

<template>
  <nav>
    <div class="navbar-header">
      <div class="left-section">
        <p>Seller Center</p>
        <p class="divider">|</p>
        <p>Download</p>
        <p class="divider">|</p>
        <p>Follow Us</p>
      </div>
      <div class="right-section">
        <p>Notifications</p>
        <p class="divider">|</p>
        <p>Tiếng Việt</p>
        <div v-if="!loginStatus">
          <p class="divider">|</p>
          <p @click="navigateToSignup">Sign Up</p>
          <p class="divider">|</p>
          <p @click="navigateToLogin">Log In</p>
        </div>
        <div v-if="loginStatus" class="relative">
          <p class="divider">|</p>
          <p @mouseenter="isShowingDropdown = true" @mouseleave="isShowingDropdown = false">
            {{ username }}
          </p>
          <!-- Dropdown menu can be added here -->
          <div
            class="absolute top-4 right-0 w-50 bg-white text-black rounded-md shadow-lg mt-2 transition-all duration-200 z-10"
            :class="[
              isShowingDropdown
                ? 'block opacity-100 -translate-y-2'
                : 'hidden opacity-0 pointer-events-none translate-y-2',
            ]"
            @mouseenter="isShowingDropdown = true"
            @mouseleave="isShowingDropdown = false"
          >
            <div class="w-full h-full flex flex-col items-baseline-last">
              <div
                class="px-4 py-2 hover:text-orange-500 cursor-pointer flex items-center justify-between gap-2"
                @click="router.push('/profile')"
              >
                <CircleUserRound class="w-6 h-6" /> My Profile
              </div>
              <div
                class="px-4 py-2 hover:text-orange-500 cursor-pointer flex items-center justify-between gap-2"
                @click="router.push('/orders')"
              >
                <Package class="w-6 h-6" /> My Orders
              </div>
              <div
                class="px-4 py-2 hover:text-orange-500 cursor-pointer flex items-center justify-between gap-2"
                @click="logOut"
              >
                <LogOut class="w-6 h-6" /> Log Out
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar-header-with-search">
      <div class="logo-section" @click="router.push('/')">
        <img src="/src/assets/images/Logo.png" alt="Logo" style="width: 50px; height: 50px" />
        <h2 class="font-bold text-2xl">BuyIt</h2>
      </div>
      <div class="middle-section" style="flex-grow: 1">
        <div class="search-section" style="display: flex; align-items: center; flex-grow: 1">
          <input
            class="input-box"
            type="text"
            placeholder="Search for products, brands and more"
            style="width: 100%; height: 40px; border-radius: 5px; padding: 0 10px; font-size: 14px"
          />
          <div class="w-20 h-10">
            <SearchButton></SearchButton>
          </div>
        </div>
        <p style="font-size: 14px; margin-top: 3px; margin-bottom: 5px">
          Phone, Laptop, Tablet, Accessories
        </p>
      </div>
      <div @click="navigateToCart" class="h-full w-25 scale-125 flex items-center justify-center cursor-pointer">
        <ShopButton></ShopButton>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  /* height: 100%; */
  background-color: var(--red);
  color: white;
}

.navbar-header {
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 14px;
}
.divider {
  margin: 0 10px;
  color: var(--light-pink);
}
.navbar-header * {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-top: 5px;
}

.navbar-header-with-search {
  margin-top: 10px;
  margin-left: 10%;
  margin-right: 10%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.navbar-header-with-search .logo-section {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
  cursor: pointer;
}
</style>
