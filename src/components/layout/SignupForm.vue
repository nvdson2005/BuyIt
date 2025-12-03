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
const errorMessage = ref({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  retypePassword: '',
  phoneNumber: '',
  chosenRole: '',
})
const emit = defineEmits<{
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

const handleSignup = () => {
  if (retypePassword.value === '') {
    errorMessage.value.retypePassword = 'Retype password is required'
  } else {
    errorMessage.value.retypePassword = ''
  }
  if (firstName.value === '') {
    errorMessage.value.firstName = 'First name is required'
  } else {
    errorMessage.value.firstName = ''
  }
  if (lastName.value === '') {
    errorMessage.value.lastName = 'Last name is required'
  } else {
    errorMessage.value.lastName = ''
  }
  if (email.value === '') {
    errorMessage.value.email = 'Email is required'
  } else {
    errorMessage.value.email = ''
  }
  if (username.value === '') {
    errorMessage.value.username = 'Username is required'
  } else {
    errorMessage.value.username = ''
  }
  if (password.value === '') {
    errorMessage.value.password = 'Password is required'
  } else {
    errorMessage.value.password = ''
  }
  if (phoneNumber.value === '') {
    errorMessage.value.phoneNumber = 'Phone number is required'
  } else {
    errorMessage.value.phoneNumber = ''
  }
  if (chosenRole.value === null) {
    errorMessage.value.chosenRole = 'Role is required'
  } else {
    errorMessage.value.chosenRole = ''
  }
  if (password.value != retypePassword.value) {
    errorMessage.value.retypePassword = 'Passwords do not match'
  } else {
    errorMessage.value.retypePassword = ''
  }
  if (
    errorMessage.value.firstName ||
    errorMessage.value.lastName ||
    errorMessage.value.email ||
    errorMessage.value.username ||
    errorMessage.value.password ||
    errorMessage.value.retypePassword ||
    errorMessage.value.phoneNumber ||
    errorMessage.value.chosenRole
  ) {
    return
  }
  emit(
    'signup',
    firstName.value,
    lastName.value,
    email.value,
    username.value,
    password.value,
    retypePassword.value,
    phoneNumber.value,
    chosenRole.value,
  )
}
defineProps({
  backgroundColor: {
    type: String,
    default: 'var(--red)',
  },
})

const chosenRole = ref<'buyer' | 'seller'>('buyer')
</script>
<template>
  <form
    class="w-full h-full flex flex-col items-center px-6 py-8"
    @submit="
      (e) => {
        e.preventDefault()
        handleSignup()
      }
    "
  >
    <div class="w-full flex flex-col items-start mb-4">
      <input
        type="text"
        placeholder="First Name"
        class="input-box w-full border border-gray-300"
        v-model="firstName"
        required
      />
      <p v-if="errorMessage.firstName" class="text-red-200 text-sm mt-1">
        {{ errorMessage.firstName }}
      </p>
    </div>
    <div class="w-full flex flex-col items-start mb-4">
      <input
        type="text"
        placeholder="Last Name"
        class="input-box w-full border border-gray-300"
        v-model="lastName"
        required
      />
      <p v-if="errorMessage.lastName" class="text-red-200 text-sm mt-1">
        {{ errorMessage.lastName }}
      </p>
    </div>
    <div class="w-full flex flex-col items-start mb-4">
      <input
        type="email"
        placeholder="Email"
        class="input-box w-full border border-gray-300"
        v-model="email"
        required
      />
      <p v-if="errorMessage.email" class="text-red-200 text-sm mt-1">{{ errorMessage.email }}</p>
    </div>
    <div class="w-full flex flex-col items-start mb-4">
      <input
        type="text"
        placeholder="Phone number"
        class="input-box w-full border border-gray-300"
        v-model="phoneNumber"
        required
      />
      <p v-if="errorMessage.phoneNumber" class="text-red-200 text-sm mt-1">
        {{ errorMessage.phoneNumber }}
      </p>
    </div>
    <div class="w-full flex flex-col items-start mb-4">
      <input
        type="text"
        placeholder="Username"
        class="input-box w-full border border-gray-300"
        v-model="username"
        required
      />
      <p v-if="errorMessage.username" class="text-red-200 text-sm mt-1">
        {{ errorMessage.username }}
      </p>
    </div>
    <div class="w-full flex flex-col items-start mb-4">
      <div class="w-full relative">
        <input
          placeholder="Password"
          class="input-box w-full border border-gray-300"
          :type="isShowPassword ? 'text' : 'password'"
          v-model="password"
          required
        />
        <div
          class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
          @click="isShowPassword = !isShowPassword"
        >
          <component :is="isShowPassword ? EyeOff : Eye" class="w-5 h-5 text-gray-500" />
        </div>
      </div>
      <p v-if="errorMessage.password" class="text-red-200 text-sm mt-1">
        {{ errorMessage.password }}
      </p>
    </div>
    <div class="w-full flex flex-col items-start mb-4">
      <input
        placeholder="Retype Password"
        class="input-box w-full border border-gray-300"
        :type="isShowPassword ? 'text' : 'password'"
        v-model="retypePassword"
        required
      />
      <p v-if="errorMessage.retypePassword" class="text-red-200 text-sm mt-1">
        {{ errorMessage.retypePassword }}
      </p>
    </div>
    <div class="w-full my-4 flex flex-col items-center text-white">
      <p class="text-white text-sm mb-2">You are</p>
      <div class="flex items-center gap-6 w-full">
        <button
          type="button"
          class="cursor-pointer px-4 py-2 h-full rounded w-full transition-colors duration-200"
          :class="chosenRole === 'buyer' ? 'bg-orange-600 font-bold' : 'bg-(--orange)'"
          @click="chosenRole = 'buyer'"
        >
          Buyer
        </button>
        <button
          type="button"
          class="cursor-pointer px-4 py-2 h-full rounded w-full transition-colors duration-200"
          :class="chosenRole === 'seller' ? 'bg-orange-600 font-bold' : 'bg-(--orange)'"
          @click="chosenRole = 'seller'"
        >
          Seller
        </button>
      </div>
      <p v-if="errorMessage.chosenRole" class="text-red-200 text-sm mt-1">
        {{ errorMessage.chosenRole }}
      </p>
    </div>
    <button
      type="submit"
      class="w-full bg-(--orange) text-white py-2 rounded hover:bg-orange-600 transition-colors duration-200"
    >
      Sign Up
    </button>
  </form>
</template>
<style scoped></style>
