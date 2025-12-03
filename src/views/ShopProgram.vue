<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Percent, Briefcase, Gift } from 'lucide-vue-next'
import PromoCard from '@/components/ui/PromoCard.vue'
import apiClient from '@/api/client'
import CreateProgramView from './CreateProgramView.vue'
import CustomImage from '@/components/ui/CustomImage.vue'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/utils/Table.ts'
import type { SellerProductShow } from '@/utils/interface'

const onsale_products = ref<SellerProductShow[]>([])
const tabProducts = ref<SellerProductShow[]>([])
const keyword = ref('')
const showCreateProgram = ref(false)

const onCreateProgram = () => {
  showCreateProgram.value = true
}

const handleCancel = () => {
  showCreateProgram.value = false
}

onMounted(async () => {
  const shopId = localStorage.getItem('id')
  try {
    const response = await apiClient.get(`/products/get-by-shopid/${shopId}`)
    onsale_products.value = response.data.products.filter(
      (p: SellerProductShow) => p.is_onsale === true,
    )
    tabProducts.value = onsale_products.value
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert(err.message)
    } else {
      alert('An unknown error occurred')
    }
  }
})

function filteredProducts() {
  if (keyword.value.trim()) {
    tabProducts.value = tabProducts.value.filter((p: SellerProductShow) =>
      p.name.toLowerCase().includes(keyword.value.toLowerCase()),
    )
  }
  keyword.value = ''
}

function resetFilter() {
  keyword.value = ''
  tabProducts.value = onsale_products.value
}

const handleOnsaleProducts = (value: SellerProductShow[]) => {
  console.log(value)
  tabProducts.value = value
}
</script>

<template>
  <div class="space-y-6" v-if="!showCreateProgram">
    <!-- Tạo khuyến mãi -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-xl font-semibold mb-2">Tạo Khuyến Mãi</h2>
      <p class="text-sm text-gray-500 mb-6">
        Thiết lập các chương trình khuyến mãi riêng của Shop để tăng Doanh số và cải thiện tỉ lệ
        chuyển đổi
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
          @actionClick="onCreateProgram"
        />
        <PromoCard
          :icon="Gift"
          title="Mua Kèm Deal Sốc"
          description="Tạo Mua Kèm Deal Sốc để tăng đơn hàng"
          buttonText="Tạo"
          @actionClick="onCreateProgram"
        />
      </div>
    </div>

    <!-- Danh sách -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6 space-y-6">
        <h3 class="text-lg font-semibold">Danh sách khuyến mãi</h3>
        <div class="flex items-center gap-6 w-full">
          <span class="text-sm text-gray-600">Tên sản phẩm</span>
          <input
            v-model="keyword"
            class="rounded-md bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập tên sản phẩm"
          />

          <button
            class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md text-sm text-red-500 font-medium transition-all cursor-pointer border border-red-500 hover:bg-red-50 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            @click="filteredProducts"
          >
            Tìm
          </button>
          <button
            class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-300 h-10 justify-between bg-background text-foreground text-gray-700 hover:bg-gray-200 cursor-pointer"
            @click="resetFilter"
          >
            Nhập Lại
          </button>
        </div>
        <div class="border border-gray-200 rounded-lg mt-4">
          <Table>
            <TableHeader class="bg-gray-50">
              <TableRow>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Giá gốc</TableHead>

                <TableHead>Giá sau giảm</TableHead>
                <!-- <TableHead>Giảm giá</TableHead> -->
                <TableHead>Kho hàng</TableHead>
                <!-- <TableHead>Giới hạn đặt hàng</TableHead> -->
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow
                class="w-full hover:bg-gray-100"
                v-for="product in tabProducts"
                :key="product.id"
              >
                <TableCell>
                  <div class="flex gap-2 items-center">
                    <CustomImage
                      :src="product.image_url"
                      class="w-15 h-15 object-cover rounded"
                    ></CustomImage>
                    <div>
                      <div class="w-full font-medium whitespace-normal">{{ product.name }}</div>
                      <div class="text-xs text-gray-500">đ{{ product.price }}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-1">
                    <span>₫</span>
                    <div>{{ product.price }}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-1">
                    <span>₫</span>
                    <div>{{ product.sale_price }}</div>
                  </div>
                </TableCell>

                <!-- <TableCell>
                <div class="text-sm text-gray-600">
                  Hoặc <span class="font-bold">15%</span> GIẢM
                </div>
              </TableCell> -->

                <TableCell>{{ product.stock_quantity }}</TableCell>

                <TableCell>
                  <div class="flex flex-col items-start">
                    <button
                      class="inline-flex items-center gap-2 rounded-md text-sm text-blue-600 transition-all focus-visible:ring-[3px] text-primary underline-offset-4 hover:underline p-0 h-auto cursor-pointer"
                      @click="showCreateProgram = true"
                    >
                      Chi tiết
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  </div>
  <CreateProgramView
    @onCancel="handleCancel"
    @onSave="handleCancel"
    @onsale_change="handleOnsaleProducts"
    v-if="showCreateProgram"
  ></CreateProgramView>
</template>
