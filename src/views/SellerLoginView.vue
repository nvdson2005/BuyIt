<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, EyeOff } from 'lucide-vue-next'
import apiClient from '@/api/client'

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
    const response = await apiClient.post('/login', {
      username: username.value,
      password: password.value,
      roleType: 'seller',
    })
    localStorage.setItem('username', response.data.user.username)
    localStorage.setItem('role', response.data.user.role)
    localStorage.setItem('id', response.data.user.id)
    router.push({ name: 'dashboard' })
    console.log('Login successful:', response)
  } catch (error: any) {
    errorMessage.value = 'Login failed: ' + error?.response?.data?.message
    console.error('Login failed:', error)
  }
}

const onNavigateToHome = () => {
  router.push({ name: 'dashboard' })
}
const onNavigateToLogin = () => {
  router.push({ name: 'login' })
}

// Tạm thời đang tới signup chung của người dùng
// Không biết có cần tạo signup riêng cho người bán không
function onSignupClick() {
  router.push({ name: 'signup' })
}
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Header -->
    <header class="bg-white border-b">
      <div class="container mx-auto px-8 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button @click="onNavigateToHome" class="flex items-center gap-2 text-2xl text-red-600">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="text-[#ee4d2d]"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
            <span class="font-semibold">BuyIt</span>
          </button>
          <div class="border-l h-6"></div>
          <span class="text-xl">Kênh Người Bán</span>
        </div>
        <div class="ml-auto flex items-center gap-6">
          <a href="#" class="text-sm text-red-600 hover:underline" @click="onNavigateToLogin"
            >Quay lại đăng nhập khách hàng?</a
          >
          <a href="#" class="text-sm text-red-600 hover:underline">Bạn cần giúp đỡ?</a>
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="flex-1 flex items-center justify-center bg-gray-50">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <!-- Left -->
          <div class="text-center md:text-left">
            <h1 class="text-3xl text-red-600 mb-4">Bán hàng chuyên nghiệp</h1>
            <p class="text-gray-600 mb-8">
              Quản lý shop của bạn một cách hiệu quả hơn trên BuyIt - Kênh Người bán
            </p>
            <img
              src="https://deo.shopeemobile.com/shopee/shopee-buyeruserfetoc-live-sg/assets/9019759f347a781f.png"
              alt="Seller Illustration"
              class="max-w-xs mx-auto md:max-w-sm"
            />
          </div>

          <!-- Right -->
          <div class="bg-white rounded-lg shadow-lg p-8">
            <!-- Tabs -->
            <div class="mb-6">
              <div class="flex">
                <button
                  type="button"
                  class="px-4 py-3 border-b-2 transition-colors"
                  :class="
                    loginMode === 'password'
                      ? 'border-[#ee4d2d] text-[#ee4d2d]'
                      : 'border-transparent text-gray-600 hover:text-[#ee4d2d]'
                  "
                  @click="loginMode = 'password'"
                >
                  Đăng Nhập
                </button>
                <button
                  type="button"
                  class="px-4 py-3 border-b-2 ml-4 transition-colors"
                  :class="
                    loginMode === 'qr'
                      ? 'border-[#ee4d2d] text-[#ee4d2d]'
                      : 'border-transparent text-gray-600 hover:text-[#ee4d2d]'
                  "
                  @click="loginMode = 'qr'"
                >
                  Đăng Nhập Bằng QR
                </button>
              </div>
            </div>

            <!-- QR MODE -->
            <div v-if="loginMode === 'qr'" class="flex flex-col items-center justify-center py-8">
              <div class="bg-white border-4 border-gray-200 rounded-lg p-4 mb-4">
                <img v-if="qrCode" :src="qrCode" alt="QR Code" class="w-64 h-64" />
              </div>
              <h3 class="text-lg mb-2">Quét Mã QR Để Đăng Nhập</h3>
              <p class="text-sm text-gray-600 text-center max-w-sm">
                Sử dụng ứng dụng BuyIt để quét mã QR
              </p>
            </div>

            <!-- PASSWORD MODE -->
            <form v-else @submit.prevent="handleLogin" class="space-y-4">
              <!-- Username -->
              <div>
                <input
                  v-model="username"
                  type="text"
                  class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300"
                  placeholder="Email/Số điện thoại/Tên đăng nhập"
                  :class="{ 'border-red-500': usernameError }"
                />
                <p v-if="usernameError" class="text-red-500 text-sm mt-1">
                  Vui lòng nhập thông tin này
                </p>
              </div>

              <!-- Password -->
              <div class="relative flex flex-col">
                <div class="relative flex items-center">
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300 pr-10"
                    placeholder="Mật khẩu"
                    :class="{ 'border-red-500': passwordError }"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-2 flex items-center justify-center text-gray-400 h-full"
                  >
                    <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
                  </button>
                </div>
                <p v-if="passwordError" class="text-red-500 text-sm mt-1">
                  Vui lòng nhập thông tin này
                </p>
              </div>
              <button
                type="submit"
                class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all w-full bg-[#ee4d2d] hover:bg-[#d73211] text-white h-11 mt-2"
              >
                ĐĂNG NHẬP
              </button>

              <div class="text-center text-sm">
                <a href="#" class="text-blue-600 hover:underline">Quên mật khẩu</a>
              </div>

              <!-- Divider -->
              <div class="relative my-4">
                <div class="absolute inset-0 text-gray-200 flex items-center">
                  <div class="w-full border-t"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="bg-white px-2 text-gray-500">HOẶC</span>
                </div>
              </div>

              <!-- Social Buttons -->
              <div class="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200"
                >
                  <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#1877F2"
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                  Facebook
                </button>

                <button
                  type="button"
                  class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200"
                >
                  <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
              </div>

              <div class="text-center text-sm text-gray-600 mt-4">
                Bạn mới biết đến BuyIt?
                <a href="#" class="text-red-600 hover:underline" @click="onSignupClick">Đăng ký</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
