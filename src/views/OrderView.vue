<script lang="ts" setup>
import NavBar from '@/components/layout/NavBar.vue'
import { onMounted, ref } from 'vue'
import { type Ref } from 'vue'
import { OrderFilterOptions } from '@/utils/enum'
import { Search, Store, CalendarCheck2 } from 'lucide-vue-next'
import CustomImage from '@/components/ui/CustomImage.vue'
import apiClient from '@/api/client'
import { type BuyerOrder } from '@/utils/interface'
const selectedFilterOption: Ref<OrderFilterOptions> = ref(OrderFilterOptions.ALL)
const orders = ref<BuyerOrder[]>([])
const filteredOrders = ref<BuyerOrder[]>([])

onMounted(async () => {
  try {
    const response = await apiClient.get(`/buyer/orders`)
    orders.value = response.data.orders.map((o: BuyerOrder) => ({
      order_id: o.order_id,
      addr_id: o.addr_id,
      order_date: o.order_date,
      total_amount: o.total_amount,
      updated_at: o.updated_at,
      buyer_id: o.buyer_id,
      order_status: o.order_status,
      orderitem: o.orderitem,
    }))
    filteredOrders.value = orders.value
  } catch (err) {
    console.error('Getting orders failed:', err)
  }
})

function filterOrder(option: OrderFilterOptions) {
  if (option === OrderFilterOptions.ALL) {
    filteredOrders.value = orders.value
  } else if (option === OrderFilterOptions.PENDING) {
    filteredOrders.value = orders.value.filter(
      (o) => o.order_status === 'Pending' || o.order_status === 'Paid',
    )
  } else if (option === OrderFilterOptions.DELIVERING) {
    filteredOrders.value = orders.value.filter((o) => o.order_status === 'Delivering')
  } else if (option === OrderFilterOptions.DELIVERED) {
    filteredOrders.value = orders.value.filter((o) => o.order_status === 'Delivered')
  } else if (option === OrderFilterOptions.CANCELLED) {
    filteredOrders.value = orders.value.filter((o) => o.order_status === 'Cancelled')
  } else if (option === OrderFilterOptions.RETURN_REFUNDED) {
    filteredOrders.value = orders.value.filter((o) => o.order_status === 'Return')
  }
  selectedFilterOption.value = option
}
</script>
<template>
  <NavBar />
  <div class="min-h-screen bg-[var(--light-pink)] flex justify-center py-10">
    <div class="w-full max-w-6xl">
      <!-- Tabs -->
      <div class="flex border-b mb-4">
        <button
          class="px-6 py-4 text-base font-medium focus:outline-none cursor-pointer"
          :class="
            selectedFilterOption === OrderFilterOptions.ALL
              ? 'border-b-2 border-[var(--orange)] text-[var(--orange)]'
              : 'text-slate-600'
          "
          @click="filterOrder(OrderFilterOptions.ALL)"
        >
          {{ OrderFilterOptions.ALL }}
        </button>
        <button
          class="px-6 py-4 text-base font-medium focus:outline-none cursor-pointer"
          :class="
            selectedFilterOption === OrderFilterOptions.PENDING
              ? 'border-b-2 border-[var(--orange)] text-[var(--orange)]'
              : 'text-slate-600'
          "
          @click="filterOrder(OrderFilterOptions.PENDING)"
        >
          {{ OrderFilterOptions.PENDING }}
        </button>
        <button
          class="px-6 py-4 text-base font-medium focus:outline-none cursor-pointer"
          @click="filterOrder(OrderFilterOptions.DELIVERING)"
          :class="
            selectedFilterOption === OrderFilterOptions.DELIVERING
              ? 'border-b-2 border-[var(--orange)] text-[var(--orange)]'
              : 'text-slate-600'
          "
        >
          {{ OrderFilterOptions.DELIVERING }}
        </button>
        <button
          class="px-6 py-4 text-base font-medium focus:outline-none cursor-pointer"
          :class="
            selectedFilterOption === OrderFilterOptions.DELIVERED
              ? 'border-b-2 border-[var(--orange)] text-[var(--orange)]'
              : 'text-slate-600'
          "
          @click="filterOrder(OrderFilterOptions.DELIVERED)"
        >
          {{ OrderFilterOptions.DELIVERED }}
        </button>
        <button
          class="px-6 py-4 text-base font-medium focus:outline-none cursor-pointer"
          :class="
            selectedFilterOption === OrderFilterOptions.CANCELLED
              ? 'border-b-2 border-[var(--orange)] text-[var(--orange)]'
              : 'text-slate-600'
          "
          @click="filterOrder(OrderFilterOptions.CANCELLED)"
        >
          {{ OrderFilterOptions.CANCELLED }}
        </button>
        <button
          class="px-6 py-4 text-base font-medium focus:outline-none cursor-pointer"
          :class="
            selectedFilterOption === OrderFilterOptions.RETURN_REFUNDED
              ? 'border-b-2 border-[var(--orange)] text-[var(--orange)]'
              : 'text-slate-600'
          "
          @click="filterOrder(OrderFilterOptions.RETURN_REFUNDED)"
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
        <div v-for="o in filteredOrders" :key="o.order_id" class="bg-white rounded-xl shadow-xl">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 pt-4">
            <div class="flex items-center gap-2 font-medium text-slate-700">
              <Store class="w-5 h-5" />

              <!-- Shop name (nếu có OrderItem) -->
              <span>
                {{ o.orderitem[0]?.product.shop_name }}
              </span>

              <span class="ml-2 px-2 py-0.5 border border-rose-400 text-rose-500 text-xs rounded">
                Chat
              </span>
              <span class="ml-2 px-2 py-0.5 border border-slate-300 text-slate-600 text-xs rounded">
                Shop Details
              </span>
            </div>

            <div class="inline-flex items-center gap-2 text-green-600">
              <CalendarCheck2 />{{ o.order_status }}
            </div>
          </div>
          <div class="border-b border-gray-300">
            <!-- Order Items -->
            <div v-for="item in o.orderitem" :key="item.order_item_id" class="px-6 py-4 gap-4">
              <div class="flex gap-4">
                <CustomImage
                  :src="item.productVariant.image_url"
                  :alt="item.product.name || 'Product'"
                  class="w-20 h-20 object-cover rounded"
                />

                <div class="flex justify-between flex-1">
                  <div>
                    <div class="font-medium text-slate-800">
                      {{ item.product.name }}
                    </div>
                    <div class="text-xs text-slate-500 mt-1">
                      Phân loại: {{ item.productVariant?.name || 'N/A' }}
                    </div>
                    <div class="text-xs text-slate-500">x{{ item.quantity }}</div>
                  </div>
                  <div class="flex justify-end">
                    <div class="text-lg text-[#DC0E0E] font-semibold text-right">
                      ₫{{ item.productVariant.price }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Footer -->
          <div class="items-center justify-between px-6 py-4">
            <div class="flex justify-end gap-3">
              <span class="text-base text-slate-600">Tổng tiền:</span>
              <span class="text-xl font-bold text-[#DC0E0E]">₫{{ o.total_amount }}</span>
            </div>
            <div
              v-if="o.order_status === 'Delivered'"
              class="flex justify-end gap-4 mt-4 font-semibold text-sm"
            >
              <button
                class="w-32 px-4 py-2 border border-slate-300 rounded text-white bg-[var(--red)] hover:bg-red-600 cursor-pointer"
              >
                Rate
              </button>
              <button
                class="w-32 px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-gray-50 cursor-pointer"
              >
                Contact Seller
              </button>

              <button
                class="w-32 px-4 py-2 border border-slate-300 rounded text-slate-600 hover:bg-gray-50 cursor-pointer"
              >
                Buy Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
