<script setup lang="ts">
import { ref } from 'vue'
import { EyeOff, Eye } from 'lucide-vue-next'
const isShowPassword = ref<boolean>(false)
const model = defineModel()
</script>
<template>
  <div class="w-full relative mb-8 mt-6">
    <input
      autocomplete="on"
      placeholder="Password"
      class="input-box w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-[3px] focus:ring-gray-300"
      :type="isShowPassword ? 'text' : 'password'"
      v-model="model"
    />
    <div
      class="absolute top-5 right-3 -translate-y-1/2 cursor-pointer"
      @click="isShowPassword = !isShowPassword"
    >
      <component :is="isShowPassword ? EyeOff : Eye" class="w-5 h-5 text-gray-500" />
    </div>
  </div>
</template>
