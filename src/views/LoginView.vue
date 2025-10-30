<script setup lang="ts">
import apiClient from '@/api/client'
import LoginForm from '@/components/layout/LoginForm.vue'
import { useRouter } from 'vue-router'
import BasicNavBar from '@/components/layout/BasicNavBar.vue'
import { onMounted } from 'vue'
const router = useRouter()
function onSignupClick() {
  router.push({ name: 'signup' })
}

async function onLoginClick(username: string, password: string) {
  try {
    const response = await apiClient
      .post('/login', {
        // Provide login credentials here
        username,
        password,
      })
      .finally(() => {
        localStorage.setItem('username', username)
        router.push({ name: 'home' })
      })
    console.log('Login successful:', response)
  } catch (error) {
    console.error('Login failed:', error)
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
      <LoginForm @login="onLoginClick" />
    </div>
  </div>
</template>
<style scoped></style>
