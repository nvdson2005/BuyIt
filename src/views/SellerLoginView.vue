<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff, CircleX } from 'lucide-vue-next'
import apiClient from '@/api/client'
import { AxiosError } from 'axios'
import { notifyAsync, notify } from '@/utils/notify'
import BasicNavBar from '@/components/layout/BasicNavBar.vue'

const router = useRouter()
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const usernameError = ref(false)
const passwordError = ref(false)
const loginMode = ref<'password' | 'qr'>('password')
const qrCode = ref('')
const errorMessage = ref('')

onMounted(async () => {
  if (localStorage.getItem('username') && (await cookieStore.get('connect.sid'))) {
    router.push({ name: 'dashboard' })
  }
})

// Sinh mã QR ngẫu nhiên
watch(loginMode, (newMode) => {
  if (newMode === 'qr') {
    const randomId =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const qrData = `buyit-seller-login-${randomId}`
    qrCode.value = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
      qrData,
    )}`
  }
})

async function handleLogin() {
  errorMessage.value = ''
  usernameError.value = false
  passwordError.value = false

  if (!username.value) usernameError.value = true
  if (!password.value) passwordError.value = true

  if (usernameError.value || passwordError.value) return

  try {
    const response = await notifyAsync(
      apiClient.post('/login', {
        username: username.value,
        password: password.value,
        roleType: 'seller',
      }),
    )
    localStorage.setItem('username', response.data.user.username)
    localStorage.setItem('role', response.data.user.role)
    localStorage.setItem('id', response.data.user.id)
    notify('Login successful!', 'success')
    router.push({ name: 'dashboard' })
    console.log('Login successful:', response)
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        errorMessage.value = `Login failed: ${error.response.data.message || 'Unknown error'}`
        console.error('Login failed:', error.response.data)
      } else if (error.request) {
        errorMessage.value = 'Login failed: No response from server'
        console.error('Login failed: No response from server', error.request)
      } else {
        errorMessage.value = `Login failed: ${error.message}`
        console.error('Login failed:', error.message)
      }
    } else if (error instanceof Error) {
      errorMessage.value = `Login failed: ${error.message}`
      console.error('Login failed:', error.message)
    }
  }
}

function onSignupClick() {
  router.push({ name: 'signup' })
}

function onNavigateToLogin() {
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="relative w-full h-screen z-0">
    <BasicNavBar title="Seller Login" />
    <div class="absolute inset-0 -z-10 w-[65%] h-full">
      <img
        src="@/assets/images/hero-section.png"
        alt="Background"
        class="w-full h-full object-scale-down"
      />
    </div>
    <div class="w-[30%] bg-[var(--red)] shadow-2xl absolute rounded-2xl mx-4 top-1/4 right-0">
      <div class="w-full h-full flex flex-col items-center px-6 pt-8">
        <!-- Tabs for Login Mode -->
        <div class="w-full flex mb-6 border-b-2 border-gray-300 text-white h-10">
          <div class="flex-1 flex-col items-center">
            <button
              class="cursor-pointer px-4 h-full rounded"
              :class="loginMode === 'password' ? 'font-semibold' : ''"
              @click="loginMode = 'password'"
            >
              Login
            </button>
            <div
              v-if="loginMode === 'password'"
              :class="[
                'transition-all duration-200 ease-in-out w-full border-b-2 border-b-[var(--orange)]',
              ]"
            ></div>
          </div>
          <div class="flex-1 flex-col items-center">
            <button
              class="cursor-pointer px-4 h-full rounded"
              :class="loginMode === 'qr' ? 'font-semibold' : ''"
              @click="loginMode = 'qr'"
            >
              QR Login
            </button>
            <div
              v-if="loginMode === 'qr'"
              :class="[
                'transition-all duration-200 ease-in-out w-full border-b-2 border-b-[var(--orange)]',
              ]"
            ></div>
          </div>
          <div class="flex-1 flex-col items-center">
            <button class="cursor-pointer px-4 h-full rounded" @click="onSignupClick()">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <p
        v-if="errorMessage"
        class="flex justify-center ml-10 mr-10 px-4 py-4 bg-red-200 rounded border border-red-500 select-none outline-none focus:outline-none focus:ring-0"
      >
        <CircleX class="text-red-500 mr-4"></CircleX>
        {{ errorMessage }}
      </p>

      <!-- QR MODE -->
      <div v-if="loginMode === 'qr'" class="flex flex-col items-center justify-center py-8 px-6">
        <div class="bg-white border-4 border-gray-200 rounded-lg p-4 mb-4">
          <img v-if="qrCode" :src="qrCode" alt="QR Code" class="w-64 h-64" />
        </div>
        <h3 class="text-lg mb-2 text-white">Scan QR Code To Login</h3>
        <p class="text-sm text-white/80 text-center max-w-sm">
          Use the BuyIt app to scan the QR code
        </p>
      </div>

      <!-- PASSWORD MODE -->
      <form v-else @submit.prevent="handleLogin" class="px-6 pb-8 space-y-4">
        <!-- Username -->
        <div>
          <input
            v-model="username"
            type="text"
            class="w-full rounded-md bg-white/90 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Email/Phone/Username"
            :class="{ 'border-2 border-red-400': usernameError }"
          />
          <p v-if="usernameError" class="text-red-200 text-sm mt-1">
            Please enter this information
          </p>
        </div>

        <!-- Password -->
        <div class="relative flex flex-col">
          <div class="relative flex items-center">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full rounded-md bg-white/90 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white pr-10"
              placeholder="Password"
              :class="{ 'border-2 border-red-400': passwordError }"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-2 flex items-center justify-center text-gray-400 h-full"
            >
              <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
            </button>
          </div>
          <p v-if="passwordError" class="text-red-200 text-sm mt-1">
            Please enter this information
          </p>
        </div>

        <button
          type="submit"
          class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all w-full bg-white hover:bg-gray-100 text-[var(--red)] h-11 mt-2"
        >
          LOGIN
        </button>

        <div class="text-center text-sm">
          <a href="#" class="text-white hover:underline">Forgot password?</a>
        </div>

        <!-- Divider -->
        <div class="relative my-4">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-white/30"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-[var(--red)] px-2 text-white/80">OR</span>
          </div>
        </div>

        <!-- Social Buttons -->
        <div class="grid grid-cols-2 gap-4">
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 border border-white/30 bg-white/10 text-white hover:bg-white/20 active:bg-white/30"
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            Facebook
          </button>

          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 border border-white/30 bg-white/10 text-white hover:bg-white/20 active:bg-white/30"
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
        </div>

        <div class="text-center text-sm text-white/80 mt-4">
          New to BuyIt?
          <a href="#" class="text-white hover:underline font-semibold" @click="onSignupClick"
            >Sign Up</a
          >
        </div>

        <div class="text-center text-sm text-white/80 mt-2">
          <a href="#" class="text-white hover:underline" @click="onNavigateToLogin"
            >Back to customer login?</a
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
