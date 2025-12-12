<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(async () => {
  document.title = 'BuyIt'
  if (!localStorage.getItem('username')) {
    router.push('/login')
  }
})
</script>

<template>
  <router-view />
</template>

<style scoped></style>
