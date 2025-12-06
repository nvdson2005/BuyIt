<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type UserVoucher } from '@/utils/interface';
import apiClient from '@/api/client';

const props = defineProps<{
  modelValue: UserVoucher | null;
  vouchers: UserVoucher[] | null;
}>();
const userVouchers = ref<UserVoucher>()
const emit = defineEmits(["update:modelValue"]);

function selectVoucher(voucher: UserVoucher) {
  emit("update:modelValue", voucher);
}

function clearVoucher() {
  emit("update:modelValue", null);
}


onMounted(async () => {
  try {
    const uservoucher_response = await apiClient.get(`/buyer/user-vouchers`)
    userVouchers.value = uservoucher_response.data.userVouchers
  } catch (err) {
    console.error('Getting data failed:', err)
  }
})

const formatted = (t: Date) => {
  const date = new Date(t);
  const str = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: false
  }).format(date);
    return str;
};
</script>

<template>
  <div class="flex gap-6">
    <div v-for="voucher in vouchers" :key="voucher.id"
    class="w-[320px] bg-white border border-gray-300 rounded-lg shadow-sm flex overflow-hidden cursor-pointer"
        :class="voucher.id === modelValue?.id ? 'ring-3 ring-gray-200' : ''"
        @click="selectVoucher(voucher)"

    >

    <div class="bg-[var(--red)] text-white w-36 flex flex-col items-center justify-center p-4 relative"
        :class="voucher.id === modelValue?.id ? 'bg-red-600' : ''">
      <p class="text-xl font-bold" v-if="voucher.discount_type === 'fixed_amount'">{{ voucher.discount_amount }}đ</p>
      <p class="text-2xl font-bold" v-else>{{ voucher.discount_amount }}%</p>
      <p class="text-xs"></p>

      <div class="absolute right-0 top-0 bottom-0 w-3 bg-red-100 [mask-image:radial-gradient(circle_6px_at_0_50%,transparent_10px,black_11px)]">
      </div>
    </div>

    <!-- Right -->
    <div class="flex-1 p-4">
      <h3 class="font-semibold">Voucher</h3>
      <p class="text-xs text-gray-500 mt-1">Min. Spend: {{ voucher.min_amount_to_apply }}đ</p>
      <p class="text-xs text-gray-500">Expiry Date: {{ formatted(voucher.expiry_date || new Date) }} </p>
      <p class="text-xs text-gray-500" v-if="voucher.discount_type === 'percentage'">Capped at: {{ voucher.max_discount_amount }}đ</p>
    </div>
  </div>
  </div>
  <div class="flex justify-end">
  <button
    class="mt-3 px-3 py-2 bg-[var(--red)] text-white text-sm rounded hover:bg-red-500 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
    @click="clearVoucher">
      Clear Voucher
  </button>
  </div>
</template>


