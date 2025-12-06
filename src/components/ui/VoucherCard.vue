<script setup lang="ts">
  import apiClient from '@/api/client';
  import { notify, notifyAsync } from '@/utils/notify';
  import { ref } from 'vue';
const props = defineProps({
  id: {type: String, required: true},
  amount: {type: Number},
  minAmount: {type: Number},
  maxAmount: {type: Number},
  limit: {type: Number},
  discountType: {type: String},
  startDate: {type: Date},
  expiryDate:{type: Date},
  isClaimed: {type: Boolean}
})

const isClaimed = ref(props.isClaimed)

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


async function claimVoucher(){
  try {
      await notifyAsync(apiClient.post(`buyer/user-voucher`, {voucherId: props.id}));
      notify(`Claim voucher successfully!`, 'success')
      isClaimed.value = true
    } catch (err) {
      notify(`Claim voucher failed!`, 'error')
      console.error('Getting data failed: ', err)
    }
}

</script>
<template>
  <div class="w-[320px] bg-white border border-gray-300 rounded-lg shadow-sm flex overflow-hidden">

    <div class="bg-[var(--red)] text-white w-36 flex flex-col items-center justify-center p-4 relative">
      <p class="text-xl font-bold" v-if="props.discountType === 'fixed_amount'">{{ props.amount }}đ</p>
      <p class="text-2xl font-bold" v-else>{{ props.amount }}%</p>
      <p class="text-xs"></p>

      <div class="absolute right-0 top-0 bottom-0 w-3 bg-red-100 [mask-image:radial-gradient(circle_6px_at_0_50%,transparent_10px,black_11px)]">
      </div>
    </div>

    <!-- Right -->
    <div class="flex-1 p-4">
      <h3 class="font-semibold">Shop Voucher</h3>
      <p class="text-xs text-gray-500 mt-1">Min. Spend: {{ props.minAmount }}đ</p>
      <p class="text-xs text-gray-500">Expiry Date: {{ formatted(props.expiryDate || new Date) }} </p>
      <p class="text-xs text-gray-500" v-if="props.discountType === 'percentage'">Capped at: {{ props.maxAmount }}đ</p>

      <button
      :disabled="isClaimed"
      class="mt-3 px-3 py-1 bg-[var(--red)] text-white text-sm rounded hover:bg-red-500 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
      @click="claimVoucher">
        Claim
      </button>
    </div>
  </div>

</template>
<style scoped></style>
