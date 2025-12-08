<script setup lang="ts">
import apiClient from '@/api/client'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { AxiosError } from 'axios'
import { notifyAsync, notify } from '@/utils/notify'
import AuthContainer from '@/components/layout/AuthContainer.vue'

const router = useRouter()
const errorMessage = ref('')

async function onLoginClick(username: string, password: string) {
  errorMessage.value = ''
  try {
    const response = await notifyAsync(
      apiClient.post('/login', {
        username,
        password,
        roleType: 'buyer',
      }),
    )
    localStorage.setItem('username', username)
    localStorage.setItem('role', response.data.user.role)
    localStorage.setItem('id', response.data.user.id)
    notify('Login successful!', 'success')
    router.push({ name: 'home' })
    console.log('Redirecting to home')
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        errorMessage.value = `Login failed: ${error.response.data.message || 'Unknown error'}`
        console.error('Login failed:', error.response.data)
      } else if (error.request) {
        errorMessage.value = 'Login failed: No response from server'
        console.error('Login failed: No response from server', error.request)
      } else {
        errorMessage.value = `Login failed: ${error.message}`
        console.error('Login failed:', error.message)
      }
    } else if (error instanceof Error) {
      errorMessage.value = `Login failed: ${error.message}`
      console.error('Login failed:', error.message)
    }
  }
}

onMounted(async () => {
  if (localStorage.getItem('username')) {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <AuthContainer
    :is-seller="false"
    :initial-tab="'login'"
    :error-message="errorMessage"
    @login="onLoginClick"
  />
</template>
<style scoped></style>
