<script setup lang="ts">
import '../assets/styles/Variables.css'
import NavBar from '@/components/layout/NavBar.vue'
import SlideNotification from '@/components/layout/SlideNotification.vue'
import MainPageCategoryPanel from '@/components/layout/MainPageCategoryPanel.vue'
import MainPageFlashSalePanel from '@/components/layout/MainPageFlashSalePanel.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import LoadingScreen from '@/components/layout/LoadingScreen.vue'
import apiClient from '@/api/client'
import { onMounted, ref } from 'vue'
import router from '@/router'
const isLoading = ref(true)
const username = ref('')
onMounted(async () => {
  const usernameLocalStorage = localStorage.getItem('username') || ''
  const role = localStorage.getItem('role')

  console.log('Username:', username)
  console.log('Role:', role)

  // Use localStorage as primary check since cookie might be httpOnly
  if (!usernameLocalStorage) {
    // check cookie as fallback, but don't rely on it
    const cookie = await cookieStore.get('token').catch(() => null)
    console.log('Cookie check (may be null if httpOnly):', cookie)

    if (!cookie) {
      router.push('/login')
      return
    }
  }

  if (role === 'shop') {
    router.push('/dashboard')
    return
  }

  username.value = usernameLocalStorage || ''
  if (username.value) {
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
    return
  } else {
    await RetrieveUsername()
    isLoading.value = false
  }
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

async function RetrieveUsername() {
  console.error('RetrieveUsername function is currently disabled.')
  try {
    const response = await apiClient.get('/user/profile')
    username.value = response.data.username
    localStorage.setItem('username', username.value)
  } catch (error) {
    console.error('Error retrieving username:', error)
  }
}
</script>

<template>
  <div v-if="isLoading == false" class="homeview">
    <div class="w-full">
      <NavBar />
    </div>
    <div class="w-[80%] h-72 my-6">
      <SlideNotification />
    </div>
    <!-- <div class="w-[80%] h-32 my-4">
      <MainPageHighlightPanel />
    </div> -->
    <div class="w-[80%] h-64 my-8">
      <MainPageCategoryPanel />
    </div>
    <div class="w-[80%] h-144 my-8">
      <MainPageFlashSalePanel />
    </div>
    <div class="w-full">
      <PageFooter />
    </div>
  </div>
  <div v-else>
    <LoadingScreen />
  </div>
</template>
<style scoped>
.homeview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--light-pink);
}
</style>
