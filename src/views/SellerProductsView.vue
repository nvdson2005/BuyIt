<script setup lang="ts">
import {ref, watch, onMounted, computed } from "vue";
import { ChevronDown } from "lucide-vue-next";
// import Checkbox from "@/components/ui/Checkbox.vue";
import CustomImage from "@/components/ui/CustomImage.vue";
import { type SellerProductShow, type Subcategory } from "@/utils/interface";
import apiClient from "@/api/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/utils/Table";


const shopId = localStorage.getItem('id')

// Sản phẩm
const products = ref<SellerProductShow[]>([])
const subcategories = ref<Subcategory[]>([])
const sub_category_id = ref('')
const tabProducts = ref<SellerProductShow[]>([])
const tab = ref('all')

// Support
const keyword = ref("")
const showSubCategories = ref(false)
const selectedSubcategory = ref('Tìm theo ngành hàng con')
const active_products = computed(() => {
  return products.value.filter(p => p.is_active === true)
})

const inactive_products = computed(() => {
  return products.value.filter(p => p.is_active === false)
})

const soldout_products = computed(() => {
  return products.value.filter(p => p.stock_quantity === 0)
})


watch(tab, (tabChange) => {
  if(tabChange == 'all'){
    tabProducts.value = products.value
  }
  else if(tabChange == 'active'){
    tabProducts.value = active_products.value
  }
  else if(tabChange == 'soldout'){
    tabProducts.value = soldout_products.value
  }
  else if(tabChange == 'inactive'){
    tabProducts.value = inactive_products.value
  }
})

onMounted(async () => {
  try {
    const response = await apiClient.get(`/products/get-by-shopid/${shopId}`)
    const subcategory_res = await apiClient.get(`/category/subcategories/${shopId}`)
    products.value = response.data.products.map((p: SellerProductShow) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      rating: p.rating,
      price: p.price,
      sold_amount: p.sold_amount,
      stock_quantity: p.stock_quantity,
      image_url: p.image_url,
      is_active: p.is_active,
      sub_category_id: p.sub_category_id,
      sale_price: p.sale_price,
      is_onsale: p.is_onsale
    }))
    tabProducts.value = products.value
    subcategories.value = subcategory_res.data.subcategories
  } catch (err) {
    console.error('Getting data failed: ', err)
  }
})

async function filteredProducts() {
  if(sub_category_id.value){
    try {
      const response = await apiClient.get(`/products/subcategory/${sub_category_id.value}`)
      tabProducts.value = response.data.products

    } catch (err) {
      console.error('Getting subcategory failed: ', err)

    }
  }
  if (keyword.value.trim()) {
    tabProducts.value = tabProducts.value.filter(p =>
      p.name.toLowerCase().includes(keyword.value.toLowerCase())
    )
  }
  selectedSubcategory.value = 'Tìm theo ngành hàng con'
  sub_category_id.value = ''
  keyword.value = ''

}

function resetFilter(){
  tab.value = 'all'
  tabProducts.value = products.value
}
const selectSubcategory = async (subcategory: Subcategory) => {
  selectedSubcategory.value = subcategory.name
  sub_category_id.value = subcategory.id
  showSubCategories.value = false
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <!-- Tabs -->
      <div class="flex gap-4 border-b">
        <button class="py-3 px-4 text-gray-600 cursor-pointer"
          :class="[
          tab === 'all'
            ? 'border-b-2 border-red-500 text-red-500'
            : 'text-gray-600 hover:text-red-500'
          ]"
        @click="tab = 'all'">
          Tất cả ({{ products.length }})
        </button>
        <button class="py-3 px-4 text-gray-600 cursor-pointer"
        :class="[
          tab === 'active'
            ? 'border-b-2 border-red-500 text-red-500'
            : 'text-gray-600 hover:text-red-500'
          ]"
        @click="tab = 'active'">
          Đang hoạt động ({{ active_products.length }})
        </button>
        <button class="py-3 px-4 text-gray-600 cursor-pointer"
        :class="[
          tab === 'soldout'
            ? 'border-b-2 border-red-500 text-red-500'
            : 'text-gray-600 hover:text-red-500'
          ]"
        @click="tab = 'soldout'">Hết hàng ({{ soldout_products.length }})</button>
        <button class="py-3 px-4 text-gray-600 cursor-pointer"
        :class="[
          tab === 'inactive'
            ? 'border-b-2 border-red-500 text-red-500'
            : 'text-gray-600 hover:text-red-500'
          ]"
        @click="tab = 'inactive'">Ngừng bán ({{ inactive_products.length }})</button>
      </div>

      <div class="flex gap-2">
        <!-- <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer
        border border-gray-200 w-full h-10 justify-between
        bg-background text-foreground text-gray-700 hover:bg-gray-200">
          Công cụ xử lý hàng loạt
        </button> -->

        <button @click="$emit('add-new-product')" class="inline-flex text-white items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-200 bg-[#ee4d2d] hover:bg-[#d73211] cursor-pointer">
          + Thêm 1 sản phẩm mới
        </button>
      </div>
    </div>

    <!-- Bộ lọc -->
    <div class="grid grid-cols-2 gap-4 bg-white p-4 rounded-lg shadow-sm space-y-4">
        <input
          v-model="keyword"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Tìm kiếm Tên sản phẩm"
          />
          <div class="relative">
          <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-200 w-full h-10 justify-between bg-background text-foreground text-gray-700 hover:bg-gray-200 border-gray-300 cursor-pointer"
                  @click="showSubCategories = !showSubCategories"
                  >
              <span> {{ selectedSubcategory}}</span>
            <ChevronDown :size="16" />
          </button>
          <!-- Dropdown list -->
          <ul v-if="showSubCategories"
              class="absolute z-50 w-full border border-gray-200 rounded-md shadow bg-white mt-1">
            <li v-for="item in subcategories" :key="item.id"
                @click="selectSubcategory(item)"
                class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">
              {{ item.name }}
            </li>
          </ul>
          </div>
          <!-- <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-200 w-full h-10 justify-between bg-background text-foreground text-gray-700 hover:bg-gray-200 border-gray-300 cursor-pointer">
            Tìm theo Thương hiệu
            <ChevronDown :size="16" />
          </Button> -->


      <!-- <div class="grid grid-cols-2 gap-4">
        <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-200 w-full h-10 justify-between bg-background text-foreground text-gray-700 hover:bg-gray-200 border-gray-300 cursor-pointer">
          Tìm theo Chương Trình Shopee
          <ChevronDown :size="16" />
        </button>
        <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-200 w-full h-10 justify-between bg-background text-foreground text-gray-700 hover:bg-gray-200 border-gray-300 cursor-pointer">
          Tìm theo Loại đăng bán sản phẩm
          <ChevronDown :size="16" />
        </button>
      </div> -->

      <div class="flex justify-start gap-2">
        <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-white text-sm font-medium transition-all border border-gray-200 h-10 bg-[#ee4d2d] hover:bg-[#d73211] cursor-pointer"
                @click="filteredProducts">
          Áp dụng
        </button>
          <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-200 h-10 justify-between bg-background text-foreground text-gray-700 hover:bg-gray-200 cursor-pointer"
                  @click="resetFilter">
            Nhập Lại
          </button>
      </div>
    </div>

    <!-- Bảng sản phẩm -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-4 flex justify-between items-center">
        <p>{{ tabProducts.length }} Sản Phẩm</p>
        <div class="flex items-center gap-2">
          <!-- Pagination placeholder -->
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[25px]"></TableHead>
            <TableHead>Sản phẩm</TableHead>
            <TableHead>Doanh số</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Kho hàng</TableHead>
            <!-- <TableHead>Tồn kho "Gói Siêu Giao Nhanh"</TableHead> -->
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow
          class = "hover:bg-gray-100"
          v-for="product in tabProducts" :key="product.id">
            <TableCell></TableCell>
            <TableCell>
              <div class="flex gap-3">
                  <CustomImage
                    :src="product.image_url"
                    :alt="product.name"
                    class="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p class="font-medium">{{ product.name }}</p>
                    <p class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Ưu đãi độc quyền cho thành viên</p>
                  </div>
                </div>
              <!-- interface Product không có sku -->
              <!-- <div class="text-xs text-gray-500">{{ product.sku }}</div>  -->
            </TableCell>
            <TableCell>{{ product.sold_amount }}</TableCell>
            <TableCell>{{ product.price }}</TableCell>
            <TableCell>{{ product.stock_quantity }}</TableCell>
            <!-- <TableCell>-</TableCell> -->
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


