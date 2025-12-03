<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VoucherTypeCard from '@/components/ui/VoucherTypeCard.vue';
import CreateVoucherView from './CreateVoucherView.vue';
import {type Voucher } from '@/utils/interface';
import apiClient from '@/api/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/utils/Table.ts'

const showCreateVoucher = ref(false)
const vouchers = ref<Voucher[]>([])
const onCreateVoucher = () => {
  showCreateVoucher.value = true
}

function handleCancelCreateVoucher() {
  showCreateVoucher.value = false;
}

onMounted(async () => {
  try {
    const shopId = localStorage.getItem('id')
    const res = await apiClient.get(`/voucher/get-by-shopId/${shopId}`)
    vouchers.value = res.data.vouchers.map((v: Voucher) => ({
      voucher_id: v.voucher_id,
      shop_id: shopId,
      code: v.code,
      description: v.description,
      discount_amount: v.discount_amount,
      min_amount_to_apply: v.min_amount_to_apply,
      max_discount_amount: v.max_discount_amount,
      usage_limit: v.usage_limit,
      discount_type: v.discount_type,
      applicable_scope: v.applicable_scope,
      program_name: v.program_name,
      start_date: v.start_date,
      expiry_date: v.expiry_date,
      is_active: v.is_active
    }))
  } catch (err) {
    console.log('Getting data failed: ',err)
  }
})
const formatted = (t: Date) => {
  const date = new Date(t);
  const str = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(date);
    return str;
};
</script>

<template>
  <div class="space-y-6" v-if="!showCreateVoucher">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Shop Voucher</h2>
      <button
        @click="onCreateVoucher"
        class="bg-[#ee4d2d] hover:bg-[#d73211] text-white px-4 py-2 rounded cursor-pointer"
      >
        Create New Voucher
      </button>
    </div>

    <!-- Chỉ số quan trọng -->
    <div class="grid grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow-sm text-center">
        <p class="text-gray-500 text-sm">Revenue</p>
        <p class="text-2xl font-bold">₫ 0</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm text-center">
        <p class="text-gray-500 text-sm">Orders</p>
        <p class="text-2xl font-bold">0</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm text-center">
        <p class="text-gray-500 text-sm">Usage Percentage</p>
        <p class="text-2xl font-bold">0.00%</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm text-center">
        <p class="text-gray-500 text-sm">Buyers</p>
        <p class="text-2xl font-bold">0</p>
      </div>
    </div>

    <!-- cải thiện chuyển đổi -->
    <div>
      <h3 class="font-semibold mb-3">Voucher Type</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VoucherTypeCard
          icon="Ticket"
          title="Shop Voucher"
          description="The voucher is applicable to all your Shop products."
          @actionClick="onCreateVoucher"
        />
        <VoucherTypeCard
          icon="ShoppingBag"
          title="Product Voucher"
          description="The voucher is only applicable to specific products selected by the Shop."
          @actionClick="onCreateVoucher"
        />
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6 space-y-6">
        <h3 class="text-lg font-semibold">Vouchers List</h3>

      <Table>
          <TableHeader class="bg-gray-50">
            <TableRow>
              <TableHead>Voucher Type</TableHead>
              <TableHead>Voucher Value</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow class='hover:bg-gray-100' v-for="voucher in vouchers" :key="voucher.voucher_id ">
              <TableCell>
                {{ voucher.discount_type }}
              </TableCell>

              <TableCell>{{ voucher.discount_amount }}</TableCell>

              <TableCell>
                {{ formatted(voucher.start_date) }}
              </TableCell>

              <TableCell class="text-sm text-gray-600 whitespace-pre-line">
                {{ formatted(voucher.expiry_date) }}
              </TableCell>

            </TableRow>
          </TableBody>
        </Table>
      </div>
      </div>
  </div>
  <CreateVoucherView v-if="showCreateVoucher"
      @cancel="handleCancelCreateVoucher"
      @save="handleCancelCreateVoucher"/>

</template>
