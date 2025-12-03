<script setup lang="ts">
import { defineModel, computed } from 'vue'
import type { Notification } from '@/utils/interface'
const notification = defineModel<Notification>('notification')
const isRead = computed(() => (notification.value ? notification.value.is_read : false))
</script>
<template>
  <div
    class="px-4 py-2 hover:bg-gray-100 transition-colors flex flex-col gap-3 text-left"
    :class="[!isRead ? 'bg-gray-200' : 'bg-gray-100', 'hover:bg-gray-100 transition-colors']"
    @click="notification!.is_read = true"
  >
    <div class="flex items-center justify-between">
      <span class="font-bold">{{ notification?.title }}</span>
      <span class="text-xs text-gray-500">{{
        new Date(notification!.created_at).toLocaleDateString()
      }}</span>
    </div>
    <div>
      <span class="text-sm text-gray-500">{{ notification?.body }}</span>
    </div>
  </div>
</template>
<style scoped></style>
