<script setup lang="ts">
import { Ticket, ShoppingBag, UserPlus, Repeat, Star, Video } from 'lucide-vue-next'

defineProps<{
  icon: string
  title: string
  description: string
}>()

const icons: Record<string, typeof Ticket> = {
  Ticket,
  ShoppingBag,
  UserPlus,
  Repeat,
  Star,
  Video,
}
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-300 flex items-start gap-4">
    <component :is="icons[icon] || Ticket" class="w-8 h-8 text-red-500 mt-1 shrink-0" />

    <div class="flex-1">
      <h4 class="font-semibold">{{ title }}</h4>
      <p class="text-sm text-gray-500 mb-2">{{ description }}</p>

      <button
        class="p-0 h-auto text-red-500 hover:underline cursor-pointer"
        @click="$emit('actionClick')"
      >
        Create Voucher &gt;
      </button>
    </div>
  </div>
</template>
