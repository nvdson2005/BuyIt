<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
const isShowPassword = ref(false)
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const username = ref('')
const password = ref('')
const retypePassword = ref('')
const phoneNumber = ref('')
const emit = defineEmits<{
  signup: [
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    retypePassword: string,
    phoneNumber: string,
    role: 'Buyer' | 'Seller',
  ]
}>()
defineProps({
  backgroundColor: {
    type: String,
    default: 'var(--red)',
  },
})

const chosenRole = ref<'buyer' | 'shop' | null>(null)
</script>
<template>
  <div class="w-full h-full flex flex-col items-center px-6 py-8">
    <input
      type="text"
      placeholder="First Name"
      class="input-box w-full mb-4 border border-gray-300"
      v-model="firstName"
    />
    <input
      type="text"
      placeholder="Last Name"
      class="input-box w-full mb-4 border border-gray-300"
      v-model="lastName"
    />
    <input
      type="text"
      placeholder="Email"
      class="input-box w-full mb-4 border border-gray-300"
      v-model="email"
    />
    <input
      type="text"
      placeholder="Phone number"
      class="input-box w-full mb-4 border border-gray-300"
      v-model="phoneNumber"
    />
    <input
      type="text"
      placeholder="Username"
      class="input-box w-full mb-4 border border-gray-300"
      v-model="username"
    />
    <div class="w-full relative mb-4">
      <input
        placeholder="Password"
        class="input-box w-full border border-gray-300"
        :type="isShowPassword ? 'text' : 'password'"
        v-model="password"
      />
      <div
        class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
        @click="isShowPassword = !isShowPassword"
      >
        <component :is="isShowPassword ? EyeOff : Eye" class="w-5 h-5 text-gray-500" />
      </div>
    </div>
    <input
      placeholder="Retype Password"
      class="input-box w-full mb-6 border border-gray-300"
      :type="isShowPassword ? 'text' : 'password'"
      v-model="retypePassword"
    />
    <div class="w-full my-4 flex flex-col items-center text-white gap-4">
      <p>You are</p>
      <div class="flex items-center gap-6 w-full">
        <button
          class="cursor-pointer px-4 py-2 h-full rounded w-full transition-colors duration-200"
          :class="chosenRole === 'buyer' ? 'bg-orange-600' : 'bg-[var(--orange)]'"
          @click="chosenRole = 'buyer'"
        >
          Buyer
        </button>
        <button
          class="cursor-pointer px-4 py-2 h-full rounded w-full transition-colors duration-200"
          :class="chosenRole === 'shop' ? 'bg-orange-600' : 'bg-[var(--orange)]'"
          @click="chosenRole = 'shop'"
        >
          Seller
        </button>
      </div>
    </div>
    <button
      class="w-full bg-[var(--orange)] text-white py-2 rounded hover:bg-orange-600 transition-colors duration-200"
      @click="
        emit(
          'signup',
          firstName,
          lastName,
          email,
          username,
          password,
          retypePassword,
          phoneNumber,
          chosenRole!,
        )
      "
    >
      Sign Up
    </button>
  </div>
</template>
<style scoped></style>
