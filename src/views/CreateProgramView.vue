<script lang='ts' setup>
import { ref, defineEmits } from "vue";
import { Plus, Trash2 } from "lucide-vue-next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/utils/Table.ts'
import CustomImage from "@/components/ui/CustomImage.vue";
const emit = defineEmits(["onCancel", "onSave"]);
// Mẫu dữ liệu
const mockSaleProduct = ref([
  {
    id: 1,
    name: "Bút lông bảng Hoshi Thiên Long WB-025/HS - Công nghệ Nhật Bản",
    image: "https://product.hstatic.net/1000230347/product/artboard_1_copy_f944014ac3974259801d9e46d3ee4840.jpg",
    price: 10725,
    saled_price: 0,
    limit: 0,
    isActive: false
  },
  {
    id: 2,
    name: "Combo 20 Bút gel Quick Dry Thiên Long GEL-040",
    image: "https://product.hstatic.net/1000230347/product/artboard_11_copy_1dc2800a2fdf4cf48ccb4b900a3348fc.jpg",
    price: 116000,
    saled_price: 0,
    limit: 0,
    isActive: false
  },
  {
    id: 3,
    name: 'Bút dạ quang Thiên Long HL-020 - Công nghệ Free-ink system mực ra đều liên tục',
    image: "https://cdn.hstatic.net/products/1000230347/artboard_3_copy_1144ee9290c642ab9ad6bd121e6ce576.jpg",
    price: 11250,
    saled_price: 0,
    limit: 0,
    isActive: false

  },
]);

// Dữ liệu
const programName = ref("");
const startDate = ref("");
const endDate = ref("");
const showProductSelector = ref(false);

const handleAddProduct = () => {
  showProductSelector.value = true;
};
const handleDelete = () => {
  // Xử lý xoá

};

const confirmSave = () => {
  // Xử lý lưu dữ liệu backend

  // Quay lại màn hình program
  emit('onSave')
};
</script>

<template>
  <div class="space-y-6 pb-20">
    <h2 class="text-2xl font-semibold">Tạo Chương Trình Mới</h2>

    <!-- Thông tin cơ bản -->
    <div class="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h3 class="font-semibold text-lg border-b pb-4">Thông tin cơ bản</h3>

      <div class="grid grid-cols-4 items-center gap-4">
        <label class="flex items-center gap-2 text-sm text-right leading-none font-medium flex items-center mb-2 pt-2">
          Tên chương trình khuyến mãi
        </label>
        <div class="col-span-3">
          <input
            v-model="programName"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Tên chương trình sẽ không được hiển thị với người mua"
            maxlength="'150'"/>
          <p class="text-xs text-gray-400 mt-1 text-right">
            {{ programName.length }}/150
          </p>
        </div>
      </div>

      <div class="grid grid-cols-4 items-center gap-4">
        <label class="flex items-center gap-2 text-sm text-right leading-none font-medium flex items-center mb-2 pt-2">
          Thời gian khuyến mãi
        </label>
        <div class="col-span-3 flex items-center gap-2">
          <input
            type = "datetime-local"
            v-model="startDate"
            class="w-full rounded-md border-gray-200 bg-gray-100 text-gray-900 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"/>
          <span class="text-white">-</span>
          <input
            type = "datetime-local"
            v-model="endDate"
            class="w-full rounded-md border-gray-200 bg-gray-100 text-gray-900 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"/>
        </div>
      </div>
    </div>

    <!-- Sản phẩm khuyến mãi -->
    <div class="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h3 class="font-semibold text-lg border-b pb-4">Sản phẩm khuyến mãi</h3>
      <p class="text-sm text-gray-500">
        Thêm sản phẩm vào chương trình khuyến mãi và thiết lập giá khuyến mãi.
      </p>

      <button
          class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                text-sm text-red-500 font-medium transition-all cursor-pointer
                border border-red-500
                bg-white text-gray-700
                hover:bg-red-50
                active:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-gray-300"
                @click="handleAddProduct"
                >
        <Plus class="mr-2" :size="16" /> Thêm sản phẩm
      </button>

      <div class="border border-gray-200 rounded-lg mt-4">
        <Table>
          <TableHeader class="bg-gray-50">
            <TableRow>
              <TableHead>Tên sản phẩm | Giá gốc</TableHead>
              <TableHead>Giá sau giảm</TableHead>
              <TableHead>Giảm giá</TableHead>
              <TableHead>Kho hàng</TableHead>
              <TableHead>Giới hạn đặt hàng</TableHead>
              <TableHead>Bật / Tắt</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow class='w-full hover:bg-gray-100' v-for="product in mockSaleProduct" :key="product.id">
              <TableCell>
                <div class="flex gap-2 items-center">
                  <CustomImage :src="product.image" class="w-15 h-15 object-cover rounded border"></CustomImage>
                  <div>
                    <div class="w-full font-medium whitespace-normal">{{ product.name }}</div>
                    <div class="text-xs text-gray-500">đ{{ product.price }}</div>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div class="flex items-center gap-1">
                  <span>₫</span>
                  <input
                    v-model="product.saled_price"
                    class=" w-24 h-8 rounded-md border-gray-200 bg-gray-200 text-gray-900 px-3 py-2 text-sm
                      focus:outline-none focus:ring-[3px] focus:ring-gray-300"/>
                </div>
              </TableCell>

              <TableCell>
                <div class="text-sm text-gray-600">
                  Hoặc <span class="font-bold">15%</span> GIẢM
                </div>
              </TableCell>

              <TableCell>15</TableCell>

              <TableCell>
                <input
                    v-model="product.limit"
                    class="w-full rounded-md border-gray-200 bg-gray-200 text-gray-900 px-3 py-2 text-sm
                      focus:outline-none focus:ring-[3px] focus:ring-gray-300"/>
              </TableCell>

              <TableCell>
                <div class="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                  <!-- <span class="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span> -->
                  <div
                    @click="product.isActive = !product.isActive"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer select-none outline-none focus:outline-none focus:ring-0"
                    :class="product.isActive ? 'bg-green-500' : 'bg-gray-300'"
                  >
                    <span
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                      :class="product.isActive ? 'translate-x-6' : 'translate-x-1'"
                    />
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <button
                class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all text-gray-400
                focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer
                hover:bg-gray-200 hover:text-black"
                @click="handleDelete">
                  <Trash2 :size="16" />
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>

    <!-- Footer actions -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-4 shadow-lg z-50 pr-10"
    >
      <button class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                text-sm font-medium transition-all cursor-pointer
                border border-gray-300
                bg-white text-gray-700
                hover:bg-gray-100 hover:border-gray-400
                active:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-gray-300
                mt-2"
                @click="$emit('onCancel')">
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
                @click="confirmSave">
          Xác nhận
      </button>
    </div>
  </div>
</template>

