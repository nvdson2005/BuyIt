<script setup lang="ts">
import { ref } from "vue";
import RadioGroup from "@/components/ui/RadioGroup.vue";
import { HelpCircle } from "lucide-vue-next";

const emit = defineEmits(["cancel", "save"]);

// States
const voucherEvent = ref('')
const voucherType = ref("shop");
const discountType = ref("amount"); // Kiểu giảm: amount (giảm trên giá), percentage (giảm phần trăm)
const discountCapType = ref("limited");
const displayType = ref("show-all");
const amount = ref(0) // giảm bao nhiêu: 10%, 10000,..
const maxAmount = ref(0) // giảm tối đa
const minSpend = ref(0) // Đơn hàng tối thiểu
const quantity = ref(0) // Số lượng voucher
const userLimit = ref(0) // Số lượng tối đa 1 người có thể sử dụng


function handleSave() {
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
              v-model="voucherType"
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
            v-model="voucherEvent"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Siêu Sale 15.02"/>
          <p class="text-xs text-gray-500 mt-1">
            Tên Voucher sẽ không được hiển thị cho Người mua
          </p>
        </div>
      </div>

      <div class="bg-orange-500 text-white p-4 rounded-lg">
        <div class="font-semibold mb-2">Thiết lập Thời gian sử dụng mã</div>

        <div class="flex gap-4 items-center">
          <div class="flex-1">
            <label class="flex items-center gap-2 text-sm text-white leading-none font-medium flex items-center mb-2 block">
              Thời gian sử dụng mã
            </label>

            <div class="flex items-center gap-2">
              <input
                type = "datetime-local"
                class="w-full rounded-md bg-white text-gray-900 px-3 py-2 text-sm
                  focus:outline-none focus:ring-[3px] focus:ring-gray-300"/>
              <span class="text-white">-</span>
              <input
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
          Loại Giảm giá
        </label>
        <RadioGroup
          v-model="discountType"
          :options="[
            { label: 'Giảm giá', value: 'amount' },
            { label: 'Giảm phần trăm', value: 'percentage' }
          ]"
          direction="vertical"
            />
      </div>

      <div class="grid grid-cols-[250px_1fr] items-start gap-10">
        <label class="flex items-center gap-2 text-sm leading-none font-medium flex items-center mb-2 pt-2">
          Mức giảm
        </label>

        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <input
            v-model="amount"
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
            v-model="maxAmount"
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
            v-model="minSpend"
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
            v-model="quantity"
            type="number"
            class="w-48 rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="50"/>
          <p class="text-xs text-gray-500 mt-1">
            Tổng số Mã giảm giá có thể sử dụng
          </p>
        </div>
      </div>

    <div className="grid grid-cols-[250px_1fr] items-center gap-10">
      <div className="flex items-center gap-2">
          <label class="flex items-center gap-2 text-sm leading-none font-medium flex items-center mb-2"
              for="user-litmit">Lượt sử dụng tối đa/Người mua</label>
          <HelpCircle class="w-4 h-4 text-gray-400" />
      </div>
      <input
            id = "user-limit"
            v-model="userLimit"
            type="number"
            class="w-48 rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="1"/>
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <h3 className="font-semibold text-lg">Hiển thị mã giảm giá và các sản phẩm áp dụng</h3>

        <div className="grid grid-cols-[250px_1fr] items-start gap-10">
          <label class="flex items-center gap-2 text-sm leading-none font-medium flex items-center mb-2 pt-2">
            Thiết lập hiển thị
          </label>
            <div className="space-y-3">
              <RadioGroup
                v-model="displayType"
                :options="[
                  { label: 'Hiển thị nhiều nơi', value: 'show-all' },
                  { label: 'Chỉ sẽ thông qua mã Voucher', value: 'voucher-code' }
                ]"
                direction="vertical"
              />
            </div>
        </div>

        <div className="grid grid-cols-[250px_1fr] items-start gap-10">
            <label class="flex items-center gap-2 text-sm leading-none font-medium flex items-center mb-2 pt-2">
              Sản phẩm được áp dụng
            </label>
            <div className="space-y-2">
                <div className="flex gap-2">
                  <button
                    class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                    text-sm font-medium transition-all
                    border border-gray-300
                    bg-white text-gray-700
                    hover:bg-gray-100 hover:border-gray-400
                    active:bg-gray-200
                    mt-2">
                Tất cả sản phẩm
              </button>
            </div>
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
