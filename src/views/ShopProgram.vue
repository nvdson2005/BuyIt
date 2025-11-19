<script lang="ts" setup>
import { ref } from "vue";
import { Percent, Briefcase, Gift } from "lucide-vue-next";
import PromoCard from "@/components/ui/PromoCard.vue";

import CreateProgramView from "./CreateProgramView.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/utils/Table.ts'
const showCreateProgram = ref(false)

const onCreateProgram = () => {
  showCreateProgram.value = true
}

const handleCancel = () => {
  showCreateProgram.value = false
}


const mockPrograms = ref([
  { id: 1, name: "test 1", type: "Mua Để Nhận Quà", items: [], status: "Đã kết thúc", time: "10/04/2024 13:00 - 10/04/2024 13:03" },
  { id: 2, name: "test 123", type: "Mua Để Nhận Quà", items: ["sample"], status: "Đã kết thúc", time: "10/04/2024 11:00 - 10/04/2024 12:00" }
]);

const formatTime = (t) => t.replace(" - ", "\n- \n");
</script>

<template>
  <div class="space-y-6" v-if="!showCreateProgram">
    <!-- Tạo khuyến mãi -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-xl font-semibold mb-2">Tạo Khuyến Mãi</h2>
      <p class="text-sm text-gray-500 mb-6">
        Thiết lập các chương trình khuyến mãi riêng của Shop để tăng Doanh số và cải thiện tỉ lệ chuyển đổi
        <a href="#" class="text-blue-600">Tìm hiểu thêm</a>
      </p>

      <div class="grid grid-cols-3 gap-6">
        <PromoCard
          :icon="Percent"
          title="Chương Trình Của Shop"
          description="Tạo Chương trình của Shop để thiết lập các chương trình giảm giá sản phẩm"
          buttonText="Tạo"
          @actionClick="onCreateProgram"
        />
        <PromoCard
          :icon="Briefcase"
          title="Combo Khuyến Mãi"
          description="Tạo Combo Khuyến Mãi để tăng giá trị đơn hàng trên mỗi Người mua"
          buttonText="Tạo"
        />
        <PromoCard
          :icon="Gift"
          title="Mua Kèm Deal Sốc"
          description="Tạo Mua Kèm Deal Sốc để tăng đơn hàng"
          buttonText="Tạo"
        />
      </div>
    </div>

    <!-- Danh sách -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="border-b border-gray-300 px-6 py-4">
        <div class="flex gap-8 text-sm font-medium text-gray-600">
          <button class="text-red-500 border-b-2 border-red-500 pb-2 -mb-4">Tất cả</button>
          <button class="hover:text-red-500 pb-4 -mb-4">Chương Trình Của Shop</button>
          <button class="hover:text-red-500 pb-4 -mb-4">Combo Khuyến Mãi</button>
          <button class="hover:text-red-500 pb-4 -mb-4">Mua Kèm Deal Sốc</button>
        </div>
      </div>

      <div class="p-6 space-y-6">
        <h3 class="text-lg font-semibold">Danh sách chương trình</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div class="flex items-center gap-6 w-full">
            <span class="text-sm text-gray-600">Tên chương trình</span>
            <input
            class="rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập tên chương trình"
          />
          </div>

          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600 w-full">Thời gian khuyến mãi</span>
            <input
            type="date"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"/>
            <span>-</span>
            <input
            type="date"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"/>
          </div>
        </div>
          <div class="flex gap-2 justify-end">
            <button
          class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                text-sm text-red-500 font-medium transition-all cursor-pointer
                border border-red-500
                bg-white text-gray-700
                hover:bg-red-50
                active:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-gray-300">
              Tìm
            </button>
            <button
              class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                    text-sm font-medium transition-all cursor-pointer
                    border border-gray-300
                    bg-white text-gray-700
                    hover:bg-gray-100 hover:border-gray-400
                    active:bg-gray-200
                    focus:outline-none focus:ring-2 focus:ring-gray-300">
              Nhập Lại
            </button>
          </div>


        <Table>
          <TableHeader class="bg-gray-50">
            <TableRow>
              <TableHead class="w-[100px]">Tất cả</TableHead>
              <TableHead>Loại khuyến mãi</TableHead>
              <TableHead>Sản phẩm</TableHead>
              <TableHead>Thời Gian</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow class='hover:bg-gray-100' v-for="program in mockPrograms" :key="program.id ">
              <TableCell>
                <div class="font-semibold">{{ program.name }}</div>
              </TableCell>

              <TableCell>{{ program.type }}</TableCell>

              <TableCell>
                <div v-if="program.items.length" class="flex gap-2">
                  <div
                    v-for="(item, index) in program.items"
                    :key="index"
                    class="w-10 h-10 bg-gray-100 rounded overflow-hidden relative"
                  >
                    <div class="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-1">50%</div>
                  </div>
                </div>
                <span v-else class="text-gray-500">Chưa có sản phẩm nào</span>
              </TableCell>

              <TableCell class="text-sm text-gray-600 whitespace-pre-line">
                {{ formatTime(program.time) }}
              </TableCell>

              <TableCell>
                <div class="flex flex-col gap-2 items-start">
                  <button class="text-blue-600 hover:underline text-sm">Chi tiết</button>
                  <button class="text-blue-600 hover:underline text-sm">Sao chép</button>
                  <button class="text-blue-600 hover:underline text-sm">Đơn hàng</button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
  <CreateProgramView
  @onCancel="handleCancel"
  @onSave="handleCancel"
  v-if="showCreateProgram" ></CreateProgramView>
</template>


