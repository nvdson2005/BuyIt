<script setup lang="ts">
import { ref } from 'vue';
import VoucherTypeCard from '@/components/ui/VoucherTypeCard.vue';
import CreateVoucherView from './CreateVoucherView.vue';
const showCreateVoucher = ref(false)

const onCreateVoucher = () => {
  showCreateVoucher.value = true
}

function handleCancelCreateVoucher() {
  showCreateVoucher.value = false;
}
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

    <!-- nhóm khách hàng -->
    <div>
      <h3 class="font-semibold mb-3">Tập trung vào nhóm khách hàng mục tiêu hoặc kênh hiển thị Voucher</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VoucherTypeCard
          icon="UserPlus"
          title="Voucher Khách hàng mới"
          description="Voucher nhắm thu hút Khách hàng mới và Khách hàng tiềm năng"
          @actionClick="onCreateVoucher"
        />
        <VoucherTypeCard
          icon="Repeat"
          title="Voucher Khách hàng mua lại"
          description="Voucher nhắm thu hút Người mua ghé thăm và mua sắm nhiều hơn tại Shop"
          @actionClick="onCreateVoucher"
        />
        <VoucherTypeCard
          icon="Star"
          title="Voucher Shopee Live"
          description="Voucher độc quyền hiển thị và áp dụng cho các sản phẩm mua qua Livestream"
          @actionClick="onCreateVoucher"
        />
        <VoucherTypeCard
          icon="Video"
          title="Voucher Shopee Video"
          description="Voucher độc quyền hiển thị và áp dụng cho các sản phẩm mua qua Video của Shop"
          @actionClick="onCreateVoucher"

        />
      </div>
    </div>
  </div>
  <CreateVoucherView v-if="showCreateVoucher"
      @cancel="handleCancelCreateVoucher"
      @save="handleCancelCreateVoucher"/>

</template>
