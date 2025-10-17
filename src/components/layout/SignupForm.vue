<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
const isShowPassword = ref(false)

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
      placeholder="First Name"
      class="input-box w-full mb-4 border border-gray-300"
    />
    <input
      type="text"
      placeholder="Last Name"
      class="input-box w-full mb-4 border border-gray-300"
    />
    <input type="text" placeholder="Email" class="input-box w-full mb-4 border border-gray-300" />
    <input
      type="text"
      placeholder="Username"
      class="input-box w-full mb-4 border border-gray-300"
    />
    <div class="w-full relative mb-4">
      <input
        placeholder="Password"
        class="input-box w-full border border-gray-300"
        :type="isShowPassword ? 'text' : 'password'"
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
    />
    <button
      class="w-full bg-[var(--orange)] text-white py-2 rounded hover:bg-orange-600 transition-colors duration-200"
    >
      Sign Up
    </button>
  </div>
</template>
<style scoped></style>
