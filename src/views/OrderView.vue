<script lang="ts" setup>
import NavBar from '@/components/layout/NavBar.vue'
import { ref } from 'vue'
import { type Ref } from 'vue'
import { OrderFilterOptions } from '@/utils/enum'
import { Search, Store } from 'lucide-vue-next'
const selectedFilterOption: Ref<OrderFilterOptions> = ref(OrderFilterOptions.ALL)
</script>
<template>
  <NavBar />
  <div class="min-h-screen bg-[var(--light-pink)] flex justify-center py-10">
    <div class="w-full max-w-6xl">
      <!-- Tabs -->
      <div class="flex border-b mb-4">
        <button
          class="px-6 py-4 text-base font-medium focus:outline-none"
          :class="
            selectedFilterOption === OrderFilterOptions.ALL
              ? 'border-b-2 border-[var(--orange)] text-[var(--orange)]'
              : 'text-slate-600'
          "
          @click="selectedFilterOption = OrderFilterOptions.ALL"
        >
          {{ OrderFilterOptions.ALL }}
        </button>
        <button
          class="px-6 py-4 text-base font-medium focus:outline-none"
          :class="
            selectedFilterOption === OrderFilterOptions.PENDING
              ? 'border-b-2 border-[var(--orange)] text-[var(--orange)]'
              : 'text-slate-600'
          "
          @click="selectedFilterOption = OrderFilterOptions.PENDING"
        >
          {{ OrderFilterOptions.PENDING }}
        </button>
        <button
          class="px-6 py-4 text-base font-medium focus:outline-none"
          @click="selectedFilterOption = OrderFilterOptions.DELIVERING"
          :class="
            selectedFilterOption === OrderFilterOptions.DELIVERING
              ? 'border-b-2 border-[var(--orange)] text-[var(--orange)]'
              : 'text-slate-600'
          "
        >
          {{ OrderFilterOptions.DELIVERING }}
        </button>
        <button
          class="px-6 py-4 text-base font-medium focus:outline-none"
          :class="
            selectedFilterOption === OrderFilterOptions.DELIVERED
              ? 'border-b-2 border-[var(--orange)] text-[var(--orange)]'
              : 'text-slate-600'
          "
          @click="selectedFilterOption = OrderFilterOptions.DELIVERED"
        >
          {{ OrderFilterOptions.DELIVERED }}
        </button>
        <button
          class="px-6 py-4 text-base font-medium focus:outline-none"
          :class="
            selectedFilterOption === OrderFilterOptions.CANCELLED
              ? 'border-b-2 border-[var(--orange)] text-[var(--orange)]'
              : 'text-slate-600'
          "
          @click="selectedFilterOption = OrderFilterOptions.CANCELLED"
        >
          {{ OrderFilterOptions.CANCELLED }}
        </button>
        <button
          class="px-6 py-4 text-base font-medium focus:outline-none"
          :class="
            selectedFilterOption === OrderFilterOptions.RETURN_REFUNDED
              ? 'border-b-2 border-[var(--orange)] text-[var(--orange)]'
              : 'text-slate-600'
          "
          @click="selectedFilterOption = OrderFilterOptions.RETURN_REFUNDED"
        >
          {{ OrderFilterOptions.RETURN_REFUNDED }}
        </button>
      </div>
      <!-- Search bar -->
      <div class="mb-4">
        <div class="w-full bg-gray-100 rounded-lg flex items-center px-4 py-3 text-slate-400">
          <Search class="w-5 h-5 mr-3" />
          <input
            class="bg-transparent outline-none flex-1 text-slate-600"
            placeholder="Tìm kiếm theo Tên sản phẩm, Mã đơn hàng hoặc Tên cửa hàng"
          />
        </div>
      </div>
      <!-- Orders List -->
      <div class="space-y-6">
        <!-- Order Card 1 -->
        <div class="bg-white rounded-xl shadow-xl">
          <div class="flex items-center justify-between px-6 pt-4">
            <div class="flex items-center gap-2 font-medium text-slate-700">
              <Store class="w-5 h-5" />
              Cửa Hàng Chính Hãng
              <span class="ml-2 px-2 py-0.5 border border-rose-400 text-rose-500 text-xs rounded"
                >Chat</span
              >
              <span class="ml-2 px-2 py-0.5 border border-slate-300 text-slate-600 text-xs rounded"
                >Xem Shop</span
              >
            </div>
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-rose-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 6h18M8 6v12a2 2 0 002 2h4a2 2 0 002-2V6"
                />
              </svg>
              <span class="text-green-500 font-medium">Đã giao</span>
            </div>
          </div>
          <div class="px-6 py-4 flex gap-4 border-b">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80"
              alt="product"
              class="w-20 h-20 object-cover rounded"
            />
            <div class="flex flex-col justify-between flex-1">
              <div>
                <div class="font-medium text-slate-800">
                  Wireless Bluetooth Headphones - Premium Sound Quality
                </div>
                <div class="text-xs text-slate-500 mt-1">Phân loại: Black, Standard</div>
                <div class="text-xs text-slate-500">x1</div>
              </div>
              <button
                class="mt-2 px-4 py-1 border border-slate-300 rounded text-slate-600 text-sm hover:bg-gray-50"
              >
                Đánh Giá
              </button>
            </div>
            <div class="flex flex-col items-end justify-between">
              <div>
                <div class="text-xs text-slate-400 line-through text-right">₫1,558,800</div>
                <div class="text-lg text-rose-500 font-semibold text-right">₫1,299,000</div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between px-6 py-4">
            <div></div>
            <div class="flex items-center gap-3">
              <span class="text-base text-slate-600">Tổng tiền:</span>
              <span class="text-xl font-bold text-rose-500">₫1,299,000</span>
              <button
                class="px-5 py-2 border border-slate-300 rounded text-slate-700 font-medium hover:bg-gray-50"
              >
                Mua Lại
              </button>
              <button
                class="px-5 py-2 bg-rose-500 text-white rounded font-medium hover:bg-rose-600"
              >
                Liên Hệ Người Bán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
