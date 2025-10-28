<script setup lang="ts">
import { ref, defineEmits, type Ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'

const emit = defineEmits<{
  login: [username: string, password: string]
}>()

const isShowPassword = ref(false)
const username: Ref<string, string> = ref('')
const password: Ref<string, string> = ref('')

const onChangeUsername = (event: Event) => {
  const target = event.target as HTMLInputElement
  username.value = target.value
}

const onChangePassword = (event: Event) => {
  const target = event.target as HTMLInputElement
  password.value = target.value
}

const handleLogin = () => {
  emit('login', username.value, password.value)
}
defineProps({
  backgroundColor: {
    type: String,
    default: 'var(--red)',
  },
})
</script>
<template>
  <div class="w-full h-full flex flex-col items-center px-6 py-8">
    <input
      type="text"
      placeholder="Username"
      class="input-box w-full mb-4 border border-gray-300"
      @change="onChangeUsername"
    />
    <div class="w-full relative mb-6">
      <input
        placeholder="Password"
        class="input-box w-full border border-gray-300"
        :type="isShowPassword ? 'text' : 'password'"
        @change="onChangePassword"
      />
      <div
        class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
        @click="isShowPassword = !isShowPassword"
      >
        <component :is="isShowPassword ? EyeOff : Eye" class="w-5 h-5 text-gray-500" />
      </div>
    </div>
    <button
      class="w-full bg-[var(--orange)] text-white py-2 rounded hover:bg-orange-600 transition-colors duration-200"
      @click="
        (e) => {
          e.preventDefault()
          handleLogin()
        }
      "
    >
      Login
    </button>
    <div class="w-full flex items-center gap-4 my-6">
      <div class="flex-1 h-px bg-gray-300"></div>
      <div class="text-white">OR</div>
      <div class="flex-1 h-px bg-gray-300"></div>
    </div>
    <div class="w-full grid grid-cols-2 gap-4">
      <Button
        type="button"
        class="h-12 text-white bg-[var(--orange)] hover:bg-orange-600 border-gray-300 flex items-center justify-center gap-4 border rounded-xl transition-colors duration-200"
      >
        <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="#1877F2"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </svg>
        Facebook
      </Button>
      <Button
        type="button"
        class="h-12 text-white bg-[var(--orange)] hover:bg-orange-600 border-gray-300 flex items-center justify-center gap-4 border rounded-xl transition-colors duration-200"
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
      </Button>
    </div>
    <a href="#" class="text-blue-200 hover:underline mt-4">Forgot your password?</a>
  </div>
</template>
<style scoped></style>
