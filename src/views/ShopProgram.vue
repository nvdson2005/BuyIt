<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Percent, Briefcase, Gift } from "lucide-vue-next";
import PromoCard from "@/components/ui/PromoCard.vue";
import apiClient from "@/api/client";
import CreateProgramView from "./CreateProgramView.vue";
import { type SellerProductShow } from "@/utils/interface";
import CustomImage from "@/components/ui/CustomImage.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/utils/Table.ts'

const products = ref<SellerProductShow[]>([])
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
      is_onsale: p.is_onsale,
      status_op: ''
    }))
    onsale_products.value = products.value.filter((p:SellerProductShow) => p.is_onsale === true)
    tabProducts.value = onsale_products.value
  } catch (err) {
    console.error("Getting products failed: ", err)
  }
})

function filteredProducts() {
  if (keyword.value.trim()) {
    tabProducts.value = tabProducts.value.filter(p =>
      p.name.toLowerCase().includes(keyword.value.toLowerCase())
    )
  }
  keyword.value = ''
}

function resetFilter(){
  keyword.value = ''
  tabProducts.value = onsale_products.value
}

const handleOnsaleProducts = (value:SellerProductShow[]) => {
  tabProducts.value = value
};
</script>

<template>
  <div class="space-y-6" v-if="!showCreateProgram">
    <!-- Tạo khuyến mãi -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-xl font-semibold mb-2">Create New Promotion</h2>
      <p class="text-sm text-gray-500 mb-6">
        Set up exclusive Shop promotions to boost Sales and improve Conversion Rate.
        <a href="#" class="text-blue-600">Learn More</a>
      </p>

      <div class="grid grid-cols-3 gap-6">
        <PromoCard
          :icon="Percent"
          title="Shop Program"
          description="Create new Shop Program for setting up Shop promotions"
          buttonText="Create"
          @actionClick="onCreateProgram"
        />
        <PromoCard
          :icon="Briefcase"
          title="Promotion Combo"
          description="Create Promotion Combo for orders revenue increase"
          buttonText="Create"
          @actionClick="onCreateProgram"

        />
        <PromoCard
          :icon="Gift"
          title="Buy With Shock Deal"
          description="Create Buy With Shock Deal for orders increase"
          buttonText="Create"
          @actionClick="onCreateProgram"

        />
      </div>
    </div>

    <!-- Danh sách -->
    <div class="bg-white rounded-lg shadow-sm">

      <div class="p-6 space-y-6">
        <h3 class="text-lg font-semibold">Promotion List</h3>
          <div class="flex items-center gap-6 w-full">
            <span class="text-sm text-gray-600">Product Name</span>
            <input
            v-model="keyword"
            class="rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Enter product name..."
          />

           <button
          class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                text-sm text-red-500 font-medium transition-all cursor-pointer
                border border-red-500
                hover:bg-red-50
                active:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-gray-300"
                @click="filteredProducts">
              Find
            </button>
             <button class="inline-flex items-center px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border border-gray-300 h-10 justify-between bg-background text-foreground text-gray-700 hover:bg-gray-200 cursor-pointer"
                  @click="resetFilter">
                  Reset
              </button>
            </div>
        <div class="border border-gray-200 rounded-lg mt-4">
        <Table>
          <TableHeader class="bg-gray-50">
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Original Price</TableHead>

              <TableHead>Discounted Price</TableHead>
              <!-- <TableHead>Giảm giá</TableHead> -->
              <TableHead>Stock</TableHead>
              <!-- <TableHead>Giới hạn đặt hàng</TableHead> -->
              <TableHead>Operations</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow class='w-full hover:bg-gray-100' v-for="product in tabProducts" :key="product.id">
              <TableCell>
                <div class="flex gap-2 items-center">
                  <CustomImage :src="product.image_url" class="w-15 h-15 object-cover rounded"></CustomImage>
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
                <button class="inline-flex items-center gap-2 rounded-md text-sm text-blue-600 transition-all focus-visible:ring-[3px] text-primary underline-offset-4 hover:underline p-0 h-auto cursor-pointer"
                  @click="showCreateProgram = true">
                  Details
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
  v-if="showCreateProgram" ></CreateProgramView>
</template>


