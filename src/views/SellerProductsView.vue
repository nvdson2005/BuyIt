<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { ChevronDown } from "lucide-vue-next";
import Checkbox from "@/components/ui/Checkbox.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/utils/Table";
import type { AllProductsViewProps } from "@/utils/interface";
/*
===============================================================================
================= GIẢ LẬP: CẦN ĐỔI THÀNH DỮ LIỆU TỪ DATABASE ==================
===============================================================================
 */
// đẩy thông tin từ trang AddProductView sau khi đã bấm "Xác nhận"
const props = defineProps<AllProductsViewProps>();

// Tính toán số lượng sản phẩm đang hoạt động
const activeProductsCount = computed(() => props.products.length);

const { products, onAddNewProduct } = props;
/*
=====================================================
================= KẾT THÚC GIẢ LẬP ==================
=====================================================
 */

// Khi có API: xác định lại products

// Không cần thay đổi
const checked_all = ref(false)
// Tạo một biến tạm thời cho tab SellerProducts có selected cho checkbox
const tabProducts = ref(products.map(p => ({
  ...p,
  selected: false
})))


watch(() => checked_all.value, (value) => {
  tabProducts.value.forEach((p) => {
   p.selected = value
  })
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <!-- Tabs -->
      <div class="flex gap-4 border-b">
        <button class="py-3 px-4 border-b-2 border-red-500 text-red-500">
          Tất cả ({{ products.length }})
        </button>
        <button class="py-3 px-4 text-gray-600">
          Đang hoạt động ({{ activeProductsCount }})
        </button>
        <button class="py-3 px-4 text-gray-600">Vi phạm (0)</button>
        <button class="py-3 px-4 text-gray-600">Chờ duyệt bởi Shopee (0)</button>
        <button class="py-3 px-4 text-gray-600">Chưa được đăng (0)</button>
      </div>

      <div class="flex gap-2">
        <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer
        border border-gray-200 w-full h-10 justify-between
        bg-background text-foreground text-gray-700 hover:bg-gray-200">
          Công cụ xử lý hàng loạt
        </button>
        <button @click="onAddNewProduct" class="inline-flex text-white items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-200 bg-[#ee4d2d] hover:bg-[#d73211] cursor-pointer">
          + Thêm 1 sản phẩm mới
        </button>
      </div>
    </div>

    <!-- Bộ lọc -->
    <div class="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <input
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Tìm kiếm Tên sản phẩm, SKU sản phẩm, SKU phân loại, Mã sản phẩm"
          />
        <div class="grid grid-cols-2 gap-4">
          <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-200 w-full h-10 justify-between bg-background text-foreground text-gray-700 hover:bg-gray-200 border-gray-300 cursor-pointer">
            Tìm theo Ngành hàng
            <ChevronDown :size="16" />
          </button>
          <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-200 w-full h-10 justify-between bg-background text-foreground text-gray-700 hover:bg-gray-200 border-gray-300 cursor-pointer">
            Tìm theo Thương hiệu
            <ChevronDown :size="16" />
          </Button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-200 w-full h-10 justify-between bg-background text-foreground text-gray-700 hover:bg-gray-200 border-gray-300 cursor-pointer">
          Tìm theo Chương Trình Shopee
          <ChevronDown :size="16" />
        </button>
        <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-200 w-full h-10 justify-between bg-background text-foreground text-gray-700 hover:bg-gray-200 border-gray-300 cursor-pointer">
          Tìm theo Loại đăng bán sản phẩm
          <ChevronDown :size="16" />
        </button>
      </div>

      <div class="flex justify-start gap-2">
        <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-white text-sm font-medium transition-all border border-gray-200 h-10 bg-[#ee4d2d] hover:bg-[#d73211] cursor-pointer">
          Áp dụng
        </button>
          <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-200 h-10 justify-between bg-background text-foreground text-gray-700 hover:bg-gray-200 cursor-pointer">
            Nhập Lại
          </button>
      </div>
    </div>

    <!-- Bảng sản phẩm -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-4 flex justify-between items-center">
        <p>{{ products.length }} Sản Phẩm</p>
        <div class="flex items-center gap-2">
          <!-- Pagination placeholder -->
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[50px]"><Checkbox v-model="checked_all"/></TableHead>
            <TableHead>Tên sản phẩm</TableHead>
            <TableHead>Doanh số</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Kho hàng</TableHead>
            <TableHead>Tồn kho "Gói Siêu Giao Nhanh"</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow
          class = "hover:bg-gray-200"
          v-for="product in tabProducts" :key="product.id">
            <TableCell><Checkbox v-model="product.selected" /></TableCell>
            <TableCell>
              <div class="font-medium">{{ product.name }}</div>
              <!-- interface Product không có sku -->
              <!-- <div class="text-xs text-gray-500">{{ product.sku }}</div>  -->
              <span
                class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
              >
                Ưu đãi độc quyền cho thành viên
              </span>
            </TableCell>
            <TableCell>{{ product.sold_amount }}</TableCell>
            <TableCell>{{ product.price }}</TableCell>
            <TableCell>{{ product.stock_quantity }}</TableCell>
            <TableCell>-</TableCell>
            <TableCell>
              <div class="flex flex-col items-start">
                <button class="inline-flex items-center gap-2 rounded-md text-sm text-red-600 transition-all focus-visible:ring-[3px] text-primary underline-offset-4 hover:underline p-0 h-auto cursor-pointer">
                  Cập nhật
                </button>
                <button class="inline-flex items-center gap-2 rounded-md text-sm text-red-600 transition-all focus-visible:ring-[3px] text-primary underline-offset-4 hover:underline p-0 h-auto cursor-pointer">
                  Quảng cáo
                </button>
                <button class="inline-flex items-center gap-2 rounded-md text-sm text-red-600 transition-all focus-visible:ring-[3px] text-primary underline-offset-4 hover:underline p-0 h-auto cursor-pointer">
                  Xem thêm
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>


