<script setup lang="ts">
import { useRouter } from 'vue-router'
import apiClient from '@/api/client'
import { notifyAsync, notify } from '@/utils/notify'
import AuthContainer from '@/components/layout/AuthContainer.vue'

const router = useRouter()

function onSignupClick(
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string,
  retypePassword: string,
  phoneNumber: string,
  role: 'buyer' | 'seller',
) {
  if (password !== retypePassword) {
    console.error('Passwords do not match')
    notify('Passwords do not match', 'error')
    return
  }
  notifyAsync(
    apiClient
      .post('/signup', {
        firstName,
        lastName,
        email,
        username,
        password,
        phoneNumber,
        role,
      })
      .then(() => {
        notify('Signup successful!', 'success')
        setTimeout(() => {
          router.push({ name: 'login' })
        }, 1000)
      })
      .catch((error) => {
        notify(`${error.response.data.message}`, 'error')
        console.error('Signup failed:', error.response.data.message)
      }),
  )
}
</script>

<template>
  <AuthContainer :is-seller="false" :initial-tab="'signup'" @signup="onSignupClick" />
</template>
<style scoped></style>
