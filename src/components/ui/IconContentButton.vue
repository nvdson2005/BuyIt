<script setup lang="ts">
import { defineProps, ref } from 'vue'
const isHovering = ref(false)
defineProps({
  buttonContent: {
    type: String,
    required: true,
    default: 'Button',
  },
  navigateOnClick: {
    type: Function,
    required: true,
    default: () => {
      console.log('Button clicked')
    },
  },
  iconColor: {
    type: String,
    required: false,
    default: 'text-black',
  },
  backgroundColor: {
    type: String,
    required: false,
    default: 'bg-gray-100',
  },
  isRoundedFull: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>
<template>
  <div
    class="cursor-pointer w-full h-fit flex-col gap-2 rounded-md flex items-center justify-center bg-white hover:bg-slate-50 transition-colors duration-300"
    @click="navigateOnClick()"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div
      :class="[
        iconColor,
        isRoundedFull ? 'rounded-full' : 'rounded-md',
        backgroundColor,
        isHovering ? 'scale-110' : 'scale-100',
        'transition-transform duration-300',
      ]"
      class="p-3 flex items-center justify-center"
    >
      <slot />
    </div>
    <p class="mt-1 text-sm font-medium text-gray-700 text-center">{{ buttonContent }}</p>
  </div>
</template>
<style scoped></style>
