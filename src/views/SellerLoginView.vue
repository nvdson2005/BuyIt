<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CircleX } from 'lucide-vue-next'
import apiClient from '@/api/client'
import { AxiosError } from 'axios'
import { notify, notifyAsync } from '@/utils/notify'
import BasicNavBar from '@/components/layout/BasicNavBar.vue'
import LoginForm from '@/components/layout/LoginForm.vue'

const router = useRouter()
const errorMessage = ref('')

onMounted(async () => {
  if (localStorage.getItem('username') && (await cookieStore.get('connect.sid'))) {
    router.push({ name: 'dashboard' })
  }
})

async function onLoginClick(username: string, password: string) {
  errorMessage.value = ''
  try {
    const response = await notifyAsync(
      apiClient.post('/login', {
        username,
        password,
        roleType: 'seller',
      }),
    )
    localStorage.setItem('username', response.data.user.username)
    localStorage.setItem('role', response.data.user.role)
    localStorage.setItem('id', response.data.user.id)
    notify('Login successful!', 'success')
    // window.botpress.updateUser({
    //   data: {
    //     userId: response.data.user.id,
    //     role: response.data.user.role
    //   },
    // });
    // window.botpress.close();
    router.push({ name: 'dashboard' })
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        errorMessage.value = `Login failed: ${error.response.data.message || 'Unknown error'}`
        notify(errorMessage.value, 'error')
        console.error('Login failed:', error.response.data)
      } else if (error.request) {
        errorMessage.value = 'Login failed: No response from server'
        notify(errorMessage.value, 'error')
        console.error('Login failed: No response from server', error.request)
      } else {
        errorMessage.value = `Login failed: ${error.message}`
        notify(errorMessage.value, 'error')
        console.error('Login failed:', error.message)
      }
    } else if (error instanceof Error) {
      errorMessage.value = `Login failed: ${error.message}`
      notify(errorMessage.value, 'error')
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
        <!-- Tabs for Login/Sign Up -->
        <div class="w-full flex mb-6 border-b-2 border-gray-300 text-white h-10">
          <div class="flex-1 flex-col items-center">
            <button class="cursor-pointer px-4 h-full rounded font-semibold">Login</button>
            <div
              class="transition-all duration-200 ease-in-out w-full border-b-2 border-b-[var(--orange)]"
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

      <!-- Login Form -->
      <LoginForm @login="onLoginClick" />

      <!-- Seller-specific links -->
      <div class="w-full px-6 pb-4">
        <div class="text-center text-sm text-white/80 mt-2">
          <a href="#" class="text-white hover:underline" @click="onNavigateToLogin"
            >Back to customer login?</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
