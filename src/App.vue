<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  document.title = 'BuyIt'
  if (!((await cookieStore.get('connect.sid')) || !localStorage.getItem('username'))) {
    router.push({ name: 'login' })
  }
})
</script>

<template>
  <router-view />
</template>

<style scoped></style>
