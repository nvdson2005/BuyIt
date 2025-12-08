<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { CircleX } from 'lucide-vue-next'
import BasicNavBar from '@/components/layout/BasicNavBar.vue'
import LoginForm from '@/components/layout/LoginForm.vue'
import SignupForm from '@/components/layout/SignupForm.vue'

const props = defineProps<{
  isSeller?: boolean
  initialTab?: 'login' | 'signup'
  errorMessage?: string
  showBackToCustomerLogin?: boolean
}>()

const emit = defineEmits<{
  login: [username: string, password: string]
  signup: [
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    retypePassword: string,
    phoneNumber: string,
    role: 'buyer' | 'seller',
  ]
}>()

const router = useRouter()
const route = useRoute()
const activeTab = ref<'login' | 'signup'>(props.initialTab || 'login')

// Sync activeTab with route
watch(
  () => route.name,
  (routeName) => {
    if (routeName === 'signup') {
      activeTab.value = 'signup'
    } else if (routeName === 'login' || routeName === 'sellerlog') {
      activeTab.value = 'login'
    }
  },
  { immediate: true },
)

const navBarTitle = computed(() => {
  if (props.isSeller) {
    return activeTab.value === 'login' ? 'Seller Login' : 'Seller Sign Up'
  }
  return activeTab.value === 'login' ? 'Buyer Login' : 'Buyer Sign Up'
})

function switchToLogin() {
  if (props.isSeller) {
    router.push({ name: 'sellerlog' })
  } else {
    router.push({ name: 'login' })
  }
}

function switchToSignup() {
  router.push({ name: 'signup' })
}

function onNavigateToLogin() {
  router.push({ name: 'login' })
}

function handleLogin(username: string, password: string) {
  emit('login', username, password)
}

function handleSignup(
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string,
  retypePassword: string,
  phoneNumber: string,
  role: 'buyer' | 'seller',
) {
  emit('signup', firstName, lastName, email, username, password, retypePassword, phoneNumber, role)
}
</script>

<template>
  <div class="relative w-full h-screen z-0">
    <BasicNavBar :title="navBarTitle" :isSeller="isSeller" />
    <div class="absolute inset-0 -z-10 w-[65%] h-full">
      <img
        src="@/assets/images/hero-section.png"
        alt="Background"
        class="w-full h-full object-scale-down"
      />
    </div>
    <div
      class="w-[30%] bg-[var(--red)] shadow-2xl absolute rounded-2xl mx-4 top-1/4 right-0"
      :class="{ 'top-1/6': activeTab === 'signup' }"
    >
      <div class="w-full h-full flex flex-col items-center px-6 pt-8">
        <!-- Tabs for Login/Sign Up -->
        <div class="w-full flex mb-6 text-white h-10">
          <div class="flex-1 flex-col items-center">
            <button
              class="cursor-pointer px-4 h-full rounded transition-colors"
              :class="activeTab === 'login' ? 'font-semibold' : ''"
              @click="switchToLogin()"
            >
              Login
            </button>
            <div
              v-if="activeTab === 'login'"
              class="transition-all duration-200 ease-in-out w-full border-b-2 border-b-[var(--pure-light)]"
            ></div>
          </div>
          <div class="flex-1 flex-col items-center">
            <button
              class="cursor-pointer px-4 h-full rounded transition-colors"
              :class="activeTab === 'signup' ? 'font-semibold' : ''"
              @click="switchToSignup()"
            >
              Sign Up
            </button>
            <div
              v-if="activeTab === 'signup'"
              class="transition-all duration-200 ease-in-out w-full border-b-2 border-b-[var(--pure-light)]"
            ></div>
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

      <!-- Forms -->
      <LoginForm v-if="activeTab === 'login'" @login="handleLogin" />
      <SignupForm v-else @signup="handleSignup" />

      <!-- Seller-specific links -->
      <div v-if="showBackToCustomerLogin && activeTab === 'login'" class="w-full px-6 pb-4">
        <div class="text-center text-sm text-white/80 mt-2">
          <a href="#" class="text-white hover:underline" @click.prevent="onNavigateToLogin"
            >Back to customer login?</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

