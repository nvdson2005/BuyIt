<script setup lang="ts">
import { useRouter } from 'vue-router'
import SignupForm from '@/components/layout/SignupForm.vue'
import BasicNavBar from '@/components/layout/BasicNavBar.vue'
import apiClient from '@/api/client'
const router = useRouter()

function onLoginClick() {
  router.push({ name: 'login' })
}

function onSignupClick(
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string,
  retypePassword: string,
  phoneNumber: string,
  role: 'Buyer' | 'Seller',
) {
  if (password !== retypePassword) {
    console.error('Passwords do not match')
    return
  }
  apiClient
    .post('/signup', {
      firstName,
      lastName,
      email,
      username,
      password,
      phoneNumber,
      role,
    })
    .then((response) => {
      console.log('Signup successful:', response.data)
      router.push({ name: 'login' })
    })
    .catch((error) => {
      console.error('Signup failed:', error)
    })
}
</script>

<template>
  <div class="relative w-full h-screen z-0">
    <BasicNavBar title="Sign Up" />
    <div class="absolute inset-0 -z-10 w-[65%] h-full">
      <img
        src="@/assets/images/hero-section.png"
        alt="Background"
        class="w-full h-full object-scale-down"
      />
    </div>
    <div class="w-[30%] bg-[var(--red)] shadow-2xl absolute rounded-2xl mx-4 top-1/6 right-0">
      <div class="w-full h-full flex flex-col items-center px-6 pt-8">
        <div class="w-full flex mb-6 border-b-2 border-gray-300 text-white h-10">
          <div class="flex-1 flex-col items-center">
            <button class="cursor-pointer px-4 h-full rounded" @click="onLoginClick()">
              Login
            </button>
          </div>
          <div class="flex-2 flex-col items-center">
            <button class="cursor-pointer px-4 h-full rounded">Sign Up</button>
            <div
              :class="[
                'transition-all duration-200 ease-in-out w-full border-b-2 border-b-[var(--orange)]',
              ]"
            ></div>
          </div>
        </div>
      </div>
      <SignupForm @signup="onSignupClick" />
    </div>
  </div>
</template>
<style scoped></style>
