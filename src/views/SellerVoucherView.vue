<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VoucherTypeCard from '@/components/ui/VoucherTypeCard.vue';
import CreateVoucherView from './CreateVoucherView.vue';
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
const vouchers = ref([])
const loading = ref(true)
const errorMsg = ref("")
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
    vouchers.value = res.data.vouchers

  } catch (err:any) {
    errorMsg.value = err.message
  } finally {
    loading.value = false
  }
})
const formatted = (t) => {
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
      <h2 class="text-2xl font-semibold">Mã Giảm Giá Của Shop</h2>
      <button
        @click="onCreateVoucher"
        class="bg-[#ee4d2d] hover:bg-[#d73211] text-white px-4 py-2 rounded cursor-pointer"
      >
        Tạo Voucher Mới
      </button>
    </div>

    <!-- Chỉ số quan trọng -->
    <div class="grid grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow-sm text-center">
        <p class="text-gray-500 text-sm">Doanh Số</p>
        <p class="text-2xl font-bold">₫ 0</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm text-center">
        <p class="text-gray-500 text-sm">Đơn hàng</p>
        <p class="text-2xl font-bold">0</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm text-center">
        <p class="text-gray-500 text-sm">Tỉ lệ sử dụng</p>
        <p class="text-2xl font-bold">0.00%</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm text-center">
        <p class="text-gray-500 text-sm">Người mua</p>
        <p class="text-2xl font-bold">0</p>
      </div>
    </div>

    <!-- cải thiện chuyển đổi -->
    <div>
      <h3 class="font-semibold mb-3">Cải thiện tỷ lệ chuyển đổi</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VoucherTypeCard
          icon="Ticket"
          title="Voucher toàn Shop"
          description="Voucher áp dụng cho tất cả sản phẩm trong Shop của bạn"
          @actionClick="onCreateVoucher"
        />
        <VoucherTypeCard
          icon="ShoppingBag"
          title="Voucher sản phẩm"
          description="Voucher chỉ áp dụng cho những sản phẩm nhất định mà Shop chọn"
          @actionClick="onCreateVoucher"
        />
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6 space-y-6">
        <h3 class="text-lg font-semibold">Danh sách chương trình</h3>

      <Table>
          <TableHeader class="bg-gray-50">
            <TableRow>
              <TableHead>Loại voucher</TableHead>
              <TableHead>Mức giảm</TableHead>
              <TableHead>Thời gian bắt đầu</TableHead>
              <TableHead>Thời gian kết thúc</TableHead>
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
