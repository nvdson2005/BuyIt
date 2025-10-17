<script lang="ts" setup>
import { defineProps } from 'vue'
import { MoveRight } from 'lucide-vue-next'
defineProps({
  categoryName: {
    type: String,
    required: true,
    default: '',
  },
})
</script>
<template>
  <div class="w-full min-h-fit bg-white flex items-center justify-center border-b border-gray-300">
    <div class="w-4/5 flex items-center">
      <a class="my-2 text-blue-500" href="/">Home</a>
      <MoveRight class="w-6 h-6 mx-4 text-gray-400" />
      <h1 class="my-2">{{ categoryName }}</h1>
    </div>
  </div>
</template>
<style scoped></style>
