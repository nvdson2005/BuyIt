<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { type CartItem } from '@/utils/interface'
const { item } = defineProps<{
  item: CartItem
}>()
</script>
<template>
  <div
    class="w-full grid grid-cols-[40px_1.5fr_1fr_1fr_1fr_60px] gap-4 bg-white my-3 rounded-lg px-6 py-4 items-center shadow-sm"
  >
    <div>
      <input type="checkbox" v-model="item.checked" />
    </div>
    <div class="flex items-center gap-4">
      <img :src="item.image" alt="" class="w-20 h-20 object-cover rounded-md" />
      <span class="font-medium text-slate-800 text-base">{{ item.title }}</span>
    </div>
    <div>
      <div class="text-rose-600 font-semibold text-lg">{{ formatPrice(item.price) }}</div>
      <div v-if="item.oldPrice" class="text-xs text-slate-400 line-through">
        {{ formatPrice(item.oldPrice) }}
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button
        class="w-8 h-8 rounded border text-lg flex items-center justify-center"
        @click="decrease(item)"
      >
        -
      </button>
      <span class="w-8 text-center">{{ item.quantity }}</span>
      <button
        class="w-8 h-8 rounded border text-lg flex items-center justify-center"
        @click="increase(item)"
      >
        +
      </button>
    </div>
    <div class="text-rose-600 font-semibold text-lg">
      {{ formatPrice(item.price * item.quantity) }}
    </div>
    <div>
      <button @click="removeItem(item.id)" class="text-slate-400 hover:text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<style scoped></style>
