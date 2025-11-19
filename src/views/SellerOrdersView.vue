<script setup lang="ts">
import { ref, watch } from 'vue'
import {ChevronDown} from 'lucide-vue-next'
import Checkbox from '@/components/ui/Checkbox.vue'
import CustomImage from '@/components/ui/CustomImage.vue'


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/utils/Table.ts'



const checked_all = ref(false)
const isOpen = ref(true)

const toggleAccordion = () => {
  isOpen.value = !isOpen.value
}
// Mock dữ liệu
const mockOrders = [
  {
    id: 'ORDER001',
    productName: 'Tai nghe Bluetooth Pro',
    productImage:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    quantity: 1,
    price: '₫1,250,000',
    status: 'Chờ xác nhận',
    statusColor: 'text-orange-500',
    carrier: 'Chưa xác định',
    createdTime: '24/11/2023 09:30',
    deliveryDate: '-',
    selected: false
  },
  {
    id: 'ORDER002',
    productName: 'Đồng hồ thông minh Gen 5',
    productImage:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    quantity: 1,
    price: '₫7,300,000',
    status: 'Đã giao cho ĐVVC',
    statusColor: 'text-green-600',
    carrier: 'VNPost Tiết kiệm',
    createdTime: '23/11/2023 17:20',
    deliveryDate: '28/11/2023 23:00',
    selected: false

  },
  {
    id: 'ORDER003',
    productName: 'Bàn phím cơ không dây',
    productImage:
      'https://images.unsplash.com/photo-1618384887924-c9b5f5833238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    quantity: 1,
    price: '₫2,100,000',
    status: 'Đang giao',
    statusColor: 'text-blue-500',
    carrier: 'Giao Hàng Nhanh',
    createdTime: '23/11/2023 11:45',
    deliveryDate: '26/11/2023 23:00',
    selected: false

  },
  {
    id: 'ORDER004',
    productName: 'Chuột công thái học Ergonomic',
    productImage:
      'https://images.unsplash.com/photo-1615663245615-5654a7c06124?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    quantity: 1,
    price: '₫950,000',
    status: 'Đã hủy',
    statusColor: 'text-red-500',
    carrier: 'VNPost Tiết kiệm',
    createdTime: '22/11/2023 10:03',
    deliveryDate: '27/11/2023 23:00',
    selected: false

  }
]

const tabs = [
  'Tất cả',
  'Chờ xác nhận',
  'Chuẩn bị hàng',
  'Đang giao',
  'Chờ lấy hàng',
  'Đã giao cho ĐVVC',
  'Hết hàng',
  'Đã hủy'
]

const activeTab = ref('Tất cả')
const filteredOrders = ref(mockOrders)

watch(activeTab, () => {
  if (activeTab.value === 'Tất cả') {
    filteredOrders.value = mockOrders
  } else {
    filteredOrders.value = mockOrders.filter(
      (o) => o.status === activeTab.value
    )
  }
})

watch(() => checked_all.value, (value) => {
  filteredOrders.value.forEach((o) => {
    o.selected = value
  })
})

</script>

<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Quản lý đơn hàng</h2>
      <div class="flex items-center gap-2">
        <button class="inline-flex items-center gap-2 rounded-md text-sm font-medium transition-all focus-visible:ring-[3px] text-primary underline-offset-4 hover:underline text-blue-600 cursor-pointer"
          >Không tìm thấy đơn hàng?</button
        >
        <button class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                text-sm font-medium transition-all duration-200 cursor-pointer
                border border-gray-300
                bg-white text-gray-700
                hover:bg-gray-100 hover:border-gray-400
                active:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-gray-300
                mt-2">
          Thêm đơn hàng
        </button>
        <button class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                text-sm font-medium transition-all duration-200 cursor-pointer
                border border-gray-300
                text-white
                active:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-gray-300
                mt-2
                bg-[#ee4d2d] hover:bg-[#d73211]"
          >Chuẩn bị đơn hàng loạt</button
        >
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
            : 'text-gray-600 hover:text-red-500'
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
        :class="{ '[&[aria-expanded=true]]:rounded-b-none [&[aria-expanded=true]]:shadow-none': isOpen }"
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
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/>
        </svg>
      </button>
    </h2>
    <div
      id="accordion-card-body-1"
      class="transition-all duration-300 overflow-hidden"
      :class="isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="bg-white p-4 shadow-sm space-y-3">
        <!-- Nội dung filter của bạn -->
        <div class="grid grid-cols-4 gap-4">
          <input
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="ID Đơn hàng"
          />
          <input
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Tên sản phẩm"
          />
          <input
            type="date"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300 cursor-pointer"
            placeholder="Ngày tạo đơn"
          />
          <div class="flex items-center gap-2">
            <input
              type="date"
              class="w-32 rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300 cursor-pointer"
              placeholder="Từ ngày"
            />
            <span>-</span>
            <input
              type="date"
              class="w-32 rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300 cursor-pointer"
              placeholder="Đến ngày"
            />
          </div>
        </div>

        <div class="grid grid-cols-4 gap-4">
          <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-200 w-full h-8 justify-between bg-background text-foreground text-gray-700 hover:bg-gray-200 border-gray-300 cursor-pointer">
            Tên Shop <ChevronDown :size="16" />
          </button>
          <button class="inline-flex items-center  px-3 py-2 whitespace-nowrap rounded-md
                text-sm font-medium transition-all cursor-pointer
                border border-gray-200 w-full h-8 justify-between
                bg-background text-foreground
                text-gray-700
                hover:bg-gray-200 border-gray-300 ">
            Đơn vị vận chuyển <ChevronDown :size="16"
          /></button>
          <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md
                text-sm font-medium transition-all cursor-pointer
                border border-gray-200 w-full h-8 justify-between
                bg-background text-foreground
                text-gray-700
                hover:bg-gray-200 border-gray-300 ">
            Phương thức thanh toán <ChevronDown :size="16"
          /></button>
          <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md
                text-sm font-medium transition-all cursor-pointer
                border border-gray-200 w-full h-8 justify-between
                bg-background text-foreground
                text-gray-700
                hover:bg-gray-200 border-gray-300 ">
            Chưa/Đã in <ChevronDown :size="16"
          /></button>
        </div>
      </div>
    </div>
  </div>

    <!-- Bảng -->
    <div class="bg-white rounded-lg shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[50px]"><Checkbox v-model="checked_all"></Checkbox></TableHead>
            <TableHead>Sản phẩm</TableHead>
            <TableHead>Doanh thu đơn hàng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Đơn vị vận chuyển</TableHead>
            <TableHead>Thời gian tạo</TableHead>
            <TableHead>Ngày giao hàng</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="filteredOrders.length > 0">
            <TableRow
              v-for="order in filteredOrders"
              :key="order.id"
              class="align-top"
            >
              <TableCell><Checkbox v-model="order.selected"></Checkbox></TableCell>
              <TableCell>
                <div class="flex gap-3">
                  <CustomImage
                    :src="order.productImage"
                    :alt="order.productName"
                    class="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p class="font-medium">{{ order.productName }}</p>
                    <p class="text-sm text-gray-500">x{{ order.quantity }}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{{ order.price }}</TableCell>
              <TableCell>
                <span :class="order.statusColor">{{ order.status }}</span>
              </TableCell>
              <TableCell>{{ order.carrier }}</TableCell>
              <TableCell>{{ order.createdTime }}</TableCell>
              <TableCell>{{ order.deliveryDate }}</TableCell>
              <TableCell>
                <button class="inline-flex items-center gap-2 rounded-md text-sm font-medium transition-all focus-visible:ring-[3px] text-primary underline-offset-4 hover:underline text-blue-600"
                  >Xem chi tiết</button
                >
              </TableCell>
            </TableRow>
          </template>

          <template v-else>
            <TableRow>
              <TableCell
                colspan="8"
                class="text-center text-gray-500 py-10"
              >
                Không có đơn hàng nào.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
