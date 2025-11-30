<script setup lang="ts">
import { ref } from "vue";
import RadioGroup from "@/components/ui/RadioGroup.vue";
import apiClient from "@/api/client";
import { type Voucher } from "@/utils/interface";
const emit = defineEmits(["cancel", "save"]);

const voucher = ref<Voucher>({
  voucher_id: '',
  shop_id: localStorage.getItem('id'),
  code: '',
  description: '',
  discount_amount: 0,
  min_amount_to_apply: 0,
  max_discount_amount: 0,
  usage_limit: 0,
  discount_type: 'fixed_amount',
  applicable_scope: 'shop',
  program_name: '',
  start_date: new Date,
  expiry_date: new Date,
  is_active: true
})

// States
const discountCapType = ref("limited");


async function handleSave() {
  if (!voucher.value.applicable_scope || !voucher.value.discount_amount || !voucher.value.usage_limit) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc!')
    return
  }
  try {
    await apiClient.post('/voucher/insert_voucher', {
      shop_id: voucher.value.shop_id,
      description: voucher.value.description,
      discount_amount: voucher.value.discount_amount,
      min_amount_to_apply: voucher.value.min_amount_to_apply,
      start_date: voucher.value.start_date,
      expiry_date: voucher.value.expiry_date,
      max_discount_amount: voucher.value.max_discount_amount,
      usage_limit: voucher.value.usage_limit,
      discount_type: voucher.value.discount_type,
      applicable_scope: voucher.value.applicable_scope,
      program_name: voucher.value.program_name
    });

    // alert("Thêm voucher thành công!");
  } catch (error) {
    console.error('Voucher insertion failed:', error);
  }
  emit("save");

}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold">Tạo mã giảm giá mới</h2>

    <!-- Thông tin cơ bản -->
    <div class="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h3 class="font-semibold text-lg">Thông tin cơ bản</h3>

      <div class="grid grid-cols-[250px_1fr] items-start gap-10">
        <label class="flex items-center gap-2 text-sm leading-none font-medium flex items-center mb-2 pt-2">Loại mã</Label>

        <RadioGroup
              v-model="voucher.applicable_scope"
              :options="[
                { label: 'Voucher toàn shop', value: 'shop' }
              ]"
              direction="vertical"
            />
      </div>

      <div class="grid grid-cols-[250px_1fr] gap-10 items-center">
        <label class="flex items-center gap-2 text-sm leading-none font-medium flex items-center mb-2"
            for="program-name">
          Tên chương trình giảm giá
        </label>
        <div>
          <input
            id = "program-name"
            v-model="voucher.program_name"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Siêu Sale 15.02"/>
          <p class="text-xs text-gray-500 mt-1">
            Tên Voucher sẽ không được hiển thị cho Người mua
          </p>
        </div>
      </div>
      <div class="grid grid-cols-[250px_1fr] gap-10 items-center">
        <label class="flex items-center gap-2 text-sm leading-none font-medium flex items-center mb-2"
            for="program-name">
          Mô tả
        </label>
        <div>
          <input
            v-model="voucher.description"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Mô tả ngắn gọn"/>
        </div>
      </div>

      <div class="bg-[var(--red)] text-white p-4 rounded-lg">
        <div class="font-semibold mb-2">Thiết lập Thời gian sử dụng mã</div>

        <div class="flex gap-4 items-center">
          <div class="flex-1">
            <label class="flex items-center gap-2 text-sm text-white leading-none font-medium flex items-center mb-2 block">
              Thời gian sử dụng mã
            </label>

            <div class="flex items-center gap-2">
              <input
                v-model="voucher.start_date"
                type = "datetime-local"
                class="w-full rounded-md bg-white text-gray-900 px-3 py-2 text-sm
                  focus:outline-none focus:ring-[3px] focus:ring-gray-300"/>
              <span class="text-white">-</span>
              <input
                v-model="voucher.expiry_date"
                type = "datetime-local"
                class="w-full rounded-md bg-white text-gray-900 px-3 py-2 text-sm
                  focus:outline-none focus:ring-[3px] focus:ring-gray-300"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Thiết lập mã giảm giá -->
    <div class="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h3 class="font-semibold text-lg">Thiết lập mã giảm giá</h3>

      <div class="grid grid-cols-[250px_1fr] items-start gap-10">
        <label class="flex items-center gap-2 text-sm leading-none font-medium flex items-center mb-2 pt-2">
          Loại Giảm giá <span class="text-red-500">*</span>
        </label>
        <RadioGroup
          v-model="voucher.discount_type"
          :options="[
            { label: 'Giảm giá', value: 'fixed_amount' },
            { label: 'Giảm phần trăm', value: 'percentage' }
          ]"
          direction="vertical"
            />
      </div>

      <div class="grid grid-cols-[250px_1fr] items-start gap-10">
        <label class="flex items-center gap-2 text-sm leading-none font-medium flex items-center mb-2 pt-2">
          Mức giảm <span class="text-red-500">*</span>
        </label>

        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <input
            v-model="voucher.discount_amount"
            type="number"
            class="w-32 rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="10"/>
            <span class="text-sm">GIẢM</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-[250px_1fr] gap-10">
        <label class="flex items-center gap-2 text-sm leading-none font-medium flex items-center ">Mức giảm tối đa</Label>

        <div class="space-y-2">
          <RadioGroup
          v-model="discountCapType"
          :options="[
            { label: 'Giới hạn', value: 'limited' },
            { label: 'Không giới hạn', value: 'unlimited' }
          ]"
          direction="vertical"
            />

          <div v-if="discountCapType === 'limited'" class="flex gap-2">
            <span>₫</span>
            <input
            v-model="voucher.max_discount_amount"
            type="number"
            class="w-32 rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="50000"/>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-[250px_1fr] gap-10 items-center">
        <label class="flex items-center gap-2 text-sm leading-none font-medium flex items-center mb-2"
              for="min-order-value">
          Giá trị đơn hàng tối thiểu
        </label>
        <div class="flex gap-2">
          <span>₫</span>
          <input
            id = "min-order-value"
            v-model="voucher.min_amount_to_apply"
            type="number"
            class="w-48 rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="200000"/>
        </div>
      </div>

      <div class="grid grid-cols-[250px_1fr] gap-10 items-center">
        <label class="flex items-center gap-2 text-sm leading-none font-medium flex items-center mb-2"
              for="total-usage">
          Tổng lượt sử dụng tối đa
        </label>
        <div>
          <input
            id = "total-usage"
            v-model="voucher.usage_limit"
            type="number"
            class="w-48 rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="50"/>
          <p class="text-xs text-gray-500 mt-1">
            Tổng số Mã giảm giá có thể sử dụng
          </p>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-4 pb-6">
      <button
          class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                text-sm font-medium transition-all cursor-pointer
                border border-gray-300
                bg-white text-gray-700
                hover:bg-gray-100 hover:border-gray-400
                active:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-gray-300
                mt-2"
          @click="$emit('cancel')">
          Hủy
        </button>

        <button
        class="
        inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                text-white font-medium transition-all cursor-pointer
                border border-gray-300
                bg-[#ee4d2d] text-gray-700
                hover:bg-[#d73211] hover:border-gray-400
                active:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-gray-300
                mt-2"
        @click="handleSave"
      >Xác nhận</button>
    </div>
  </div>
</template>
