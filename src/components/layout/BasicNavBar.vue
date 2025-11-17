<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  bgColor: {
    type: String,
    default: 'bg-[var(--red)]',
  },
  title: {
    type: String,
    default: 'Navigation Bar',
  },
  linkToHelp: {
    type: String,
    default: '/help',
  },
})

function navigateToHelp() {
  router.push(props.linkToHelp)
}

function navigateToHome() {
  router.push({ name: 'home' })
}

function navigateToSeller(){
  router.push({name:'sellerlog'})
}
</script>
<template>
  <div
    class="w-full fixed inset-0 max-h-fit py-4 px-10 flex items-center justify-between"
    :class="bgColor"
  >
    <div class="flex items-center">
      <div @click="navigateToHome" class="flex items-center cursor-pointer">
        <img src="@/assets/images/Logo.png" alt="Logo" class="h-10 w-10 ml-6" />
        <span class="ml-4 text-xl font-bold text-white">BuyIt</span>
      </div>
      <span class="ml-2 text-white">|</span>
      <span class="ml-6 text-white font-medium">{{ title }}</span>
    </div>
    <div class="ml-auto flex items-center gap-6">
      <button @click="navigateToSeller" class="hover:text-white hover:underline text-gray-200 cursor-pointer">
      Kênh người bán
      </button>
      <button @click="navigateToHelp" class="hover:text-white hover:underline text-gray-200 cursor-pointer">
        Need Support?
      </button>
    </div>
  </div>
</template>
<style scoped></style>
