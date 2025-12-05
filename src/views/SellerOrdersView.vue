<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
// import Checkbox from '@/components/ui/Checkbox.vue'
import CustomImage from '@/components/ui/CustomImage.vue'
import { type SellerOrder, type SellerOrderItem } from '@/utils/interface'
import apiClient from '@/api/client'
import { notify, notifyAsync } from '@/utils/notify';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/utils/Table.ts'

const checked_all = ref(false)
const isOpen = ref(true)
const shopId = localStorage.getItem('id')
const orders = ref<SellerOrder[]>([])
const orderItems = ref<SellerOrderItem[]>([])

// for filter
const start_date = ref<Date | null>(null)
const end_date = ref<Date | null>(null)
const carriers = computed(() => {
  return [...new Set(orders.value.map((o) => o.carrier_name))]
})
const showCarrier = ref(false)
const selectedCarrier = ref('Chọn đơn vị vận chuyển')

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}

const tabs = [
  'All',
  'Pending',
  'Packing',
  'Shipped',
  'Delivered',
  'Cancelled',
]

const activeTab = ref('All')
const filteredOrders = ref<SellerOrder[]>([])
const statusColors: Record<string, string> = {
  Pending: 'text-orange-600',
  Packing: 'text-orange-400',
  Shipped: 'text-blue-400',
  Delivered: 'text-green-500',
  Cancelled: 'text-red-500',
}

watch(activeTab, () => {
  if (activeTab.value === 'All') {
    filteredOrders.value = orders.value
  } else {
    filteredOrders.value = orders.value.filter((o) => o.order_status === activeTab.value)
  }
})

watch(
  () => checked_all.value,
  (value) => {
    filteredOrders.value.forEach((o) => {
      o.selected = value
    })
  },
)

onMounted(async () => {
  try {
    const res = await apiClient.get(`/shop/orders/${shopId}`)
    orderItems.value = res.data.orderItems.map((item: SellerOrderItem) => ({
      order_id: item.order_id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      product_name: item.product_name,
      variant_name: item.variant_name,
      image_url: item.image_url,
      order_item_id: item.order_item_id,
      quantity: item.quantity,
      total_amount: item.total_amount,
      order_status: item.order_status,
      order_date: item.order_date,
      carrier_id: item.carrier_id,
      carrier_name: item.carrier_name,
      shipment_id: item.shipment_id,
      ship_status: item.ship_status,
      actual_deliver_date: item.actual_deliver_date,
    }))
    const groupedOrders: Record<string, SellerOrder> = {}

    orderItems.value.forEach((item) => {
      if (!groupedOrders[item.order_id]) {
        groupedOrders[item.order_id] = {
          order_id: item.order_id,
          order_status: item.order_status,
          order_date: item.order_date,
          actual_deliver_date: item.actual_deliver_date,
          ship_status: item.ship_status,
          carrier_name: item.carrier_name,
          order_items: [],
          selected: false,
        }
      }
      if (groupedOrders[item.order_id] && item.order_id) {
        groupedOrders[item.order_id]?.order_items?.push(item)
      }
    })

    orders.value = Object.values(groupedOrders)
    filteredOrders.value = orders.value
  } catch (err) {
    console.error('Get category failed: ', err)
    // alert('An unknown error occurred')
  }
})

const formatted = (t: Date | null) => {
  if (t === null) {
    return '___'
  }
  const date = new Date(t)
  const str = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
  return str
}

function filter() {
  if (start_date.value && end_date.value) {
    const start = new Date(start_date.value)
    const end = new Date(end_date.value)

    filteredOrders.value = filteredOrders.value.filter(
      (o) => new Date(o.order_date) >= start && new Date(o.order_date) <= end,
    )
  }
  if (carriers.value.includes(selectedCarrier.value)) {
    filteredOrders.value = filteredOrders.value.filter(
      (o) => o.carrier_name === selectedCarrier.value,
    )
  }
}

function resetFilter() {
  filteredOrders.value = orders.value
  activeTab.value = 'Tất cả'
  start_date.value = null
  end_date.value = null
  selectedCarrier.value = 'Chọn đơn vị vận chuyển'
}

function selectCarrier(carrier: string) {
  selectedCarrier.value = carrier
  showCarrier.value = false
}

function changeTab(status: string){
  activeTab.value = status
}

function showOperation(status: string){
  if(status === 'Pending'){
    return 'Confirm Order';
  }
  else if(status === 'Packing'){
    return 'Packed and Shipped';
  }
  else if(status === 'Shipped'){
    return 'Confirm Buyer Receipt';
  }
}

async function updateStatus(order: SellerOrder){
  const nextStatus = ref('');
  if(order.order_status === 'Pending'){
    nextStatus.value = 'Packing';
  }
  else if(order.order_status === 'Packing'){
    nextStatus.value = 'Shipped';
  }
  else if(order.order_status === 'Shipped'){
    nextStatus.value = 'Delivered';

  }
  else if(order.order_status === 'Delivered'){
    nextStatus.value = 'Cancelled';
  }
  else if(order.order_status === 'Cancelled'){
    nextStatus.value = 'Return';
  }
  try {
    await notifyAsync(
      apiClient.patch(`/shop/order/${order.order_id}/status`, {
      status: nextStatus.value
    })
    );
    order.order_status = nextStatus.value
    notify(`Update status of order to ${nextStatus.value} successfully!`, 'success')
    activeTab.value = 'All'
  } catch (error) {
    notify(`Update status of order to ${nextStatus.value} failed!`, 'error')

    console.error('Update product failed:', error);
  }
}

</script>
<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Orders Management</h2>
      <div class="flex items-center gap-2">
        <button
          class="inline-flex items-center gap-2 mr-4 rounded-md text-sm font-medium transition-all focus-visible:ring-[3px] text-primary underline-offset-4 hover:underline text-blue-600 cursor-pointer"
        >
          Order not found?
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2 border-b overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        class="py-3 px-4 text-sm whitespace-nowrap cursor-pointer"
        :class="[
          activeTab === tab
            ? 'border-b-2 border-red-500 text-red-500'
            : 'text-gray-600 hover:text-red-500',
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Bộ lọc -->
    <div id="accordion-card" data-accordion="collapse">
      <h2 id="accordion-card-heading-1">
        <button
          type="button"
          class="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm space-y-3 rounded-md w-full h-15 p-5 font-medium shadow-xs border border-gray-200 hover:bg-gray-100"
          :class="{
            '[&[aria-expanded=true]]:rounded-b-none [&[aria-expanded=true]]:shadow-none': isOpen,
          }"
          @click="toggleAccordion"
          :aria-expanded="isOpen"
          aria-controls="accordion-card-body-1"
        >
          <span>Filter</span>
          <svg
            class="w-5 h-5 shrink-0 transition-transform duration-200 cursor-pointer"
            :class="{ 'rotate-180': isOpen }"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m5 15 7-7 7 7"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-card-body-1"
        class="transition-all duration-300 overflow-hidden"
        :class="isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'"
      >
        <div class="bg-white p-4 shadow-sm space-y-3">
          <!-- Bộ lọc ngày -->
          <div class="grid grid-cols-2 gap-6">
            <div class="flex items-center gap-6">
              <label class="text-sm font-semibold whitespace-nowrap">Order Date</label>

              <div class="flex items-center gap-2">
                <input
                  type="date"
                  v-model="start_date"
                  class="w-32 h-10 rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300 cursor-pointer"
                  placeholder="Từ ngày"
                />
                <span>-</span>
                <input
                  type="date"
                  v-model="end_date"
                  class="w-32 h10 rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300 cursor-pointer"
                  placeholder="Đến ngày"
                />
              </div>
            </div>

            <!-- Đơn vị vận chuyển -->
            <div class="flex items-center gap-6">
              <label class="text-sm font-semibold whitespace-nowrap">Shipping Carrier</label>
              <div class="relative">
                <button
                  class="inline-flex items-center px-3 py-2 rounded-md border border-gray-300 text-sm font-medium cursor-pointer transition-all w-full h-10 justify-between bg-white text-gray-700 hover:bg-gray-200"
                  @click="showCarrier = !showCarrier"
                >
                  {{ selectedCarrier }}
                  <ChevronDown :size="16" />
                </button>
                <ul
                  v-if="showCarrier"
                  class="absolute z-50 w-full border border-gray-200 rounded-md shadow bg-white mt-1 max-h-10 overflow-y-auto"
                >
                  <li
                    v-for="carrier in carriers"
                    :key="carrier"
                    @click="selectCarrier(carrier)"
                    class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {{ carrier }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button
              class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-white text-sm font-medium transition-all border border-gray-200 h-10 bg-[#ee4d2d] hover:bg-[#d73211] cursor-pointer"
              @click="filter"
            >
              Filter
            </button>
            <button
              class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-200 h-10 justify-between bg-background text-foreground text-gray-700 hover:bg-gray-200 cursor-pointer"
              @click="resetFilter"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bảng -->
    <div class="bg-white rounded-lg shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <!-- <TableHead class="w-[50px]" v-if="activeTab !== 'All' && activeTab !== 'Delivered'"><Checkbox v-model="checked_all"></Checkbox></TableHead> -->
            <TableHead>Product</TableHead>
            <TableHead>Order Revenue </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Shipping Carrier</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Delivery Date</TableHead>
            <TableHead>Operation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="filteredOrders.length > 0">
            <TableRow v-for="order in filteredOrders" :key="order.order_id" class="align-top">
              <!-- <TableCell v-if="activeTab !== 'All' && activeTab !== 'Delivered'"><Checkbox v-model="order.selected"></Checkbox></TableCell> -->
              <TableCell>
                <div
                  v-for="item in order.order_items"
                  :key="item.order_item_id"
                  class="flex gap-3 mb-2"
                >
                  <CustomImage
                    :src="item.image_url"
                    :alt="item.product_name"
                    class="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p class="font-medium">{{ item.product_name }}</p>
                    <p class="text-sm text-gray-500">{{ item.variant_name }}</p>
                    <p class="text-sm text-gray-500">x{{ item.quantity }}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>0</TableCell>
              <TableCell>
                <span :class="statusColors[order.order_status]">
                  {{ order.order_status }}
                </span>
              </TableCell>
              <TableCell>{{ order.carrier_name }}</TableCell>
              <TableCell>{{ formatted(order.order_date) }}</TableCell>
              <TableCell>{{ formatted(order.actual_deliver_date) }}</TableCell>
              <TableCell>
                <button v-if="activeTab === 'All'"
                  class="inline-flex items-center gap-2 rounded-md text-sm font-medium transition-all focus-visible:ring-[3px] text-primary underline-offset-4 hover:underline text-[var(--red)] cursor-pointer"
                  @click="changeTab(order.order_status)"
                >
                  Details
                </button>
                <div v-else-if="activeTab === 'Cancelled' || activeTab === 'Delivered'"
                  class="inline-flex items-center gap-2 text-sm text-gray-500 transition-all text-primary"
                >
                  No operation
                </div>

                <button v-else class="bg-[var(--red)] text-sm font-semibold text-white px-3 py-2 rounded hover:bg-red-600 cursor-pointer active:bg-red-200" @click="updateStatus(order)">
                  {{ showOperation(order.order_status) }}
                </button>
              </TableCell>
            </TableRow>
          </template>

          <template v-else>
            <TableRow>
              <TableCell colspan="8" class="text-center text-gray-500 py-10">
                There are no recent orders.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
