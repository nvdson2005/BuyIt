<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps({
  brandName: {
    type: String,
    required: true,
    default: 'Brand Name',
  },
  imgUrl: {
    type: String,
    required: false,
    default: '@/assets/images/BrandPlaceholder.png',
  },
  directUrl: {
    type: String,
    required: false,
    default: '#',
  },
})
</script>
<template>
  <div class="w-full h-full flex flex-col items-center px-6 py-8" @click="router.push(directUrl)">
    <img :src="imgUrl" alt="Brand Logo" class="w-24 h-24 mb-4" />
    <span class="text-lg font-medium text-slate-700">{{ brandName }}</span>
  </div>
</template>
<style scoped></style>
