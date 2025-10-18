<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
const emits = defineEmits<{
  (e: 'click', brandName: string): void
}>()
function onClicking() {
  emits('click', props.brandName)
}
const props = defineProps({
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
})
</script>
<template>
  <div
    class="w-full h-full min-h-fit min-w-fit flex flex-col items-center px-6 py-8 rounded-xl border border-gray-200 hover:border-[var(--orange)] transition-colors duration-200"
    @click="onClicking()"
  >
    <img :src="imgUrl" alt="Brand Logo" class="w-24 h-24 mb-4" />
    <span class="text-lg font-medium text-slate-700">{{ brandName }}</span>
  </div>
</template>
<style scoped></style>
