<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/api/client'
import { AxiosError } from 'axios'
import { notify, notifyAsync } from '@/utils/notify'
import AuthContainer from '@/components/layout/AuthContainer.vue'

const router = useRouter()
const errorMessage = ref('')

onMounted(async () => {
  if (localStorage.getItem('username')) {
    router.push({ name: 'dashboard' })
  }
})

async function onLoginClick(username: string, password: string) {
  errorMessage.value = ''
  try {
    const response = await notifyAsync(
      apiClient.post('/login', {
        username,
        password,
        roleType: 'seller',
      }),
    )
    localStorage.setItem('username', response.data.user.username)
    localStorage.setItem('role', response.data.user.role)
    localStorage.setItem('id', response.data.user.id)
    notify('Login successful!', 'success')
    router.push({ name: 'dashboard' })
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        errorMessage.value = `Login failed: ${error.response.data.message || 'Unknown error'}`
        notify(errorMessage.value, 'error')
        console.error('Login failed:', error.response.data)
      } else if (error.request) {
        errorMessage.value = 'Login failed: No response from server'
        notify(errorMessage.value, 'error')
        console.error('Login failed: No response from server', error.request)
      } else {
        errorMessage.value = `Login failed: ${error.message}`
        notify(errorMessage.value, 'error')
        console.error('Login failed:', error.message)
      }
    } else if (error instanceof Error) {
      errorMessage.value = `Login failed: ${error.message}`
      notify(errorMessage.value, 'error')
      console.error('Login failed:', error.message)
    }
  }
}
</script>

<template>
  <AuthContainer
    :is-seller="true"
    :initial-tab="'login'"
    :error-message="errorMessage"
    :show-back-to-customer-login="true"
    @login="onLoginClick"
  />
</template>

<style scoped></style>
