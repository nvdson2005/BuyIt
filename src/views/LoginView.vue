<script setup lang="ts">
import apiClient from '@/api/client'
import LoginForm from '@/components/layout/LoginForm.vue'
import { useRouter } from 'vue-router'
import BasicNavBar from '@/components/layout/BasicNavBar.vue'
import { onMounted, ref } from 'vue'
import { CircleX } from 'lucide-vue-next'
import { AxiosError } from 'axios'
const router = useRouter()

const errorMessage = ref('')

function onSignupClick() {
  router.push({ name: 'signup' })
}

async function onLoginClick(username: string, password: string) {
  errorMessage.value = '' // reset lỗi mỗi lần login
  try {
    const response = await apiClient.post('/login', {
      username,
      password,
      roleType: 'buyer',
    })
    localStorage.setItem('username', username)
    localStorage.setItem('role', response.data.user.role)

    router.push({ name: 'home' })

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

onMounted(async () => {
  if (localStorage.getItem('username') && (await cookieStore.get('connect.sid'))) {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <div class="relative w-full h-screen z-0">
    <BasicNavBar title="Login" />
    <div class="absolute inset-0 -z-10 w-[65%] h-full">
      <img
        src="@/assets/images/hero-section.png"
        alt="Background"
        class="w-full h-full object-scale-down"
      />
    </div>
    <div class="w-[30%] bg-[var(--red)] shadow-2xl absolute rounded-2xl mx-4 top-1/4 right-0">
      <div class="w-full h-full flex flex-col items-center px-6 pt-8">
        <div class="w-full flex mb-6 border-b-2 border-gray-300 text-white h-10">
          <div class="flex-1 flex-col items-center">
            <button class="cursor-pointer px-4 h-full rounded">Login</button>
            <div
              :class="[
                'transition-all duration-200 ease-in-out w-full border-b-2 border-b-[var(--orange)]',
              ]"
            ></div>
          </div>
          <div class="flex-2 flex-col items-center">
            <button class="cursor-pointer px-4 h-full rounded" @click="onSignupClick()">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <p
        v-if="errorMessage"
        class="flex justify-center ml-10 mr-10 px-4 py-4 bg-red-200 rounded border border-red-500 select-none outline-none focus:outline-none focus:ring-0"
      >
        <CircleX class="text-red-500 mr-4"></CircleX>
        {{ errorMessage }}
      </p>
      <LoginForm @login="onLoginClick" />
    </div>
  </div>
</template>
<style scoped></style>
