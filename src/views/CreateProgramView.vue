<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import apiClient from '@/api/client'
import CustomImage from '@/components/ui/CustomImage.vue'
import { Plus, Save, Trash } from 'lucide-vue-next'
import { type SellerProductShow } from '@/utils/interface'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/utils/Table.ts'

const emit = defineEmits(['onsale_change', 'onSave', 'onCancel'])
const products = ref<SellerProductShow[]>([])
const selectedProduct = ref('')

const other_products = computed(() => {
  return products.value.filter((p) => p.is_onsale === false)
})

const onsale_products = computed(() => {
  return products.value.filter((p) => p.is_onsale === true)
})

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
      status_op: '',
    }))
  } catch (err) {
    console.error('Getting products failed: ', err)
  }
})

const showProductSelector = ref(false)

async function handleConfirmProduct() {
  try {
    await apiClient.patch(`/products/update_onsale/${selectedProduct.value}`)
    const product = products.value.find((p) => p.id === selectedProduct.value)
    if (product) {
      product.is_onsale = true
    }
    selectedProduct.value = ''
  } catch (err) {
    console.error('Update onsale product failed: ', err)
  }
  showProductSelector.value = false
  emit('onsale_change', onsale_products.value)
}

async function handleSaveChange(product_id: string, sale_price: number) {
  // Xử lý cập nhật sale_price
  try {
    await apiClient.patch(`/products/update_saleprice/${product_id}/${sale_price}`)
    const product = products.value.find((p) => p.id === product_id)
    if (product) {
      product.sale_price = sale_price
    }
  } catch (err) {
    console.error('Update product sale price failed: ', err)
  }
  emit('onsale_change', onsale_products.value)
}

async function handleDelete(product_id: string, price: number) {
  // Xử lý xoá
  try {
    await apiClient.patch(`/products/update_saleprice/${product_id}/${price}`)
    await apiClient.patch(`/products/update_onsale/${product_id}`)
    const product = products.value.find((p) => p.id === product_id)
    if (product) {
      product.is_onsale = false
      product.sale_price = price
    }
  } catch (err) {
    console.error('Delete promotion failed: ', err)
  }
  emit('onsale_change', onsale_products.value)
}
</script>

<template>
  <div class="space-y-6 pb-20">
    <h2 class="text-2xl font-semibold">Create New Promotion</h2>

    <!-- Thông tin cơ bản -->
    <!-- <div class="bg-white p-6 rounded-lg shadow-sm space-y-6">
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
    </div> -->

    <!-- Sản phẩm khuyến mãi -->
    <div class="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h3 class="font-semibold text-lg border-b pb-4">Onsale Products</h3>
      <p class="text-sm text-gray-500">
        Add products to the promotion and set up the promotional price.
      </p>

      <button
        class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md text-sm text-red-500 font-medium transition-all cursor-pointer border border-red-500 bg-white text-gray-700 hover:bg-red-50 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        @click="showProductSelector = !showProductSelector"
      >
        <Plus class="mr-2" :size="16" /> Add Product
      </button>

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
            <TableRow
              class="w-full hover:bg-gray-100"
              v-for="product in onsale_products"
              :key="product.id"
            >
              <TableCell>
                <div class="flex gap-2 items-center">
                  <CustomImage
                    :source="product.image_url"
                    :alt="product.name"
                    className="w-15 h-15 object-cover rounded"
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
                  <input
                    v-model="product.sale_price"
                    class="w-24 h-8 rounded-md border-gray-200 bg-gray-200 text-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300"
                  />
                </div>
              </TableCell>

              <!-- <TableCell>
                <div class="text-sm text-gray-600">
                  Hoặc <span class="font-bold">15%</span> GIẢM
                </div>
              </TableCell> -->

              <TableCell>{{ product.stock_quantity }}</TableCell>

              <TableCell>
                <div class="flex item-center">
                  <button
                    class="items-center gap-2 mr-2 rounded-md text-sm text-red-500 transition-all hover:ring-[3px] ring-red-200 hover:bg-red-200 h-auto cursor-pointer"
                    @click="handleSaveChange(product.id, product.sale_price)"
                  >
                    <Save :size="24" />
                  </button>
                  <button
                    class="items-center gap-2 rounded-md text-sm text-red-600 transition-all hover:ring-[3px] ring-red-200 hover:bg-red-200 h-auto cursor-pointer"
                    @click="handleDelete(product.id, product.price)"
                  >
                    <Trash :size="24" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <div
      v-if="showProductSelector"
      class="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h2 class="text-lg font-semibold mb-4">My Products</h2>

        <!-- LIST EXISTING ADDRESSES -->
        <div class="space-y-4 mb-4 max-h-64 overflow-y-auto pr-2">
          <div
            v-for="product in other_products"
            :key="product.id"
            class="p-3 border rounded cursor-pointer hover:border-[#ee4d2d]"
            :class="{ 'border-[#ee4d2d] bg-red-50': selectedProduct === product.id }"
            @click="selectedProduct = product.id"
          >
            <div class="flex items-center gap-2 mb-1">
              <CustomImage
                :source="product.image_url"
                :alt="product.name"
                className="w-15 h-15 object-cover rounded"
              />
              <strong>{{ product.name }}</strong>
              <span class="text-gray-400">|</span>
              <span>{{ product.price }}đ</span>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button
            class="flex-1 text-sm border border-gray-300 py-2 rounded cursor-pointer"
            @click="showProductSelector = false"
          >
            Cancel
          </button>
          <button
            class="flex-1 bg-[#ee4d2d] text-sm text-white py-2 rounded hover:bg-gray-500 cursor-pointer"
            @click="handleConfirmProduct"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
    <!-- Footer actions -->
    <div class="flex justify-end gap-4 pb-6">
      <button
        class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 mt-2"
        @click="$emit('onCancel')"
      >
        Cancel
      </button>

      <button
        class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md text-white font-medium transition-all cursor-pointer border border-gray-300 bg-[#ee4d2d] text-gray-700 hover:bg-[#d73211] hover:border-gray-400 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 mt-2"
        @click="$emit('onSave')"
      >
        Save
      </button>
    </div>
  </div>
</template>
