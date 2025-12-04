<script lang="ts" setup>

  import { defineProps, defineEmits, ref, onMounted } from 'vue';
  import {type ProductVariant, type SellerProductShow} from '@/utils/interface';
  import UploadImage from '../ui/UploadImage.vue';
  import apiClient from '@/api/client';
  import { notify, notifyAsync } from '@/utils/notify';

  const props = defineProps<{
    product: SellerProductShow
  }>()
  const emit = defineEmits(['onCancel'])
  const product = ref<SellerProductShow>(props.product)
  const variants = ref<ProductVariant[]>()
  const showVariants = ref(false)
  async function handleUpdateProduct(){
    try {
      await notifyAsync(
        apiClient.put(`/shop/update-product/${product.value.id}`, {
        productName: product.value.name,
        description: product.value.description,
        price: product.value.price,
        subCategoryId: product.value.sub_category_id,
        stockQuantity: product.value.stock_quantity,
        isActive: product.value.is_active,
        imageurl: product.value.image_url,
      })
    );
    notify(`Update product ${product.value.name} successfully!`, 'success')
    emit('onCancel')
    } catch (error) {
      notify(`Update product ${product.value.name} failed!`, 'error')

      console.error('Update product failed:', error);
    }
  }

  onMounted(async () => {
    try {
      const res = await apiClient.get(`/shop/product/${product.value.id}/variants`);
      variants.value = res.data.variants.map((v: ProductVariant) => ({ ...v }))

    } catch (error) {
      console.error('Update product failed:', error);
    }
  })

  async function handleUpdateVariant(variant: ProductVariant){
    try {
      await notifyAsync(
        apiClient.put(`/shop/update-product-variant/${variant.variant_id}`, {
        variantName: variant.name,
        price: variant.price,
        stockQuantity: variant.stock_quantity,
        imageUrl: variant.image_url,
      })
    );
      notify(`Update variant ${variant.name} successfully!`, 'success')
    } catch (error) {
      notify(`Update variant ${variant.name} failed!`, 'error')

      console.error('Update product failed:', error);
    }
  }

</script>
<template>
    <div class="fixed inset-0 bg-black/20 flex items-center justify-center p-4">
  <div
    class="bg-white rounded-lg w-full max-w-2xl p-6
           max-h-[72vh] overflow-y-auto"
  >
    <h2 class="text-lg font-semibold mb-4">Product Details</h2>

    <div class="space-y-6">
      <div>
          <label class="text-sm font-medium">
            Tên sản phẩm
          </label>
          <input
            id="product-name"
            v-model="product.name"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập tên sản phẩm (Thương hiệu + Loại + Thông số)"
          />
        </div>
      <div class="pb-4 border-b border-gray-300 last:border-none">
        <UploadImage v-model="product.image_url"></UploadImage>
      </div>
      <div>
          <label class="text-sm font-medium"
          for="description">
            Mô tả sản phẩm
          </label>
          <textarea
            id="description"
            v-model="product.description"
            class="w-full h-30 rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập mô tả chi tiết về sản phẩm..."
            rows="5"
          ></textarea>
        </div>
      <div>
          <label class="text-sm font-medium">
            Giá hiển thị
          </label>
          <input
            type="number"
            v-model="product.price"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập giá hiển thị của sản phẩm"
          />
        </div>

        <div>
          <label class="text-sm font-medium">
            Kho hàng
          </label>
          <input
            type="number"
            v-model="product.stock_quantity"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập số lượng sản phẩm có"
          />
        </div>
    </div>

    <div v-if="showVariants" class="mt-6" >
      <h3 class="text-lg font-semibold mb-4">Variants</h3>
      <div v-for="v in variants" :key="v.variant_id" class="border border-gray-200 rounded-md p-4 space-y-4 mb-2">
        <div>
            <label class="text-sm font-medium">Name</label>
            <input
              v-model="v.name"
              class="w-full rounded-md bg-gray-100 px-3 py-2 mb-2 text-sm
                focus:outline-none focus:ring-[3px] focus:ring-gray-300"
              placeholder="Example: Red, Size M"
            />
          </div>
          <div>
            <label class="text-sm font-medium">Image</label>
            <UploadImage v-model="v.image_url"></UploadImage>
          </div>

          <div>
            <label class="text-sm font-medium">Price</label>
            <input
              v-model="v.price"
              type="number"
              class="w-full rounded-md bg-gray-100 px-3 py-2 mb-2 text-sm
                focus:outline-none focus:ring-[3px] focus:ring-gray-300"
              placeholder="Enter Variant Price"
            />
          </div>

          <div>
            <label class="text-sm font-medium">Stock</label>
            <input
              v-model="v.stock_quantity"
              type="number"
              class="w-full rounded-md bg-gray-100 px-3 py-2 mb-2 text-sm
                focus:outline-none focus:ring-[3px] focus:ring-gray-300"
              placeholder="Enter quantity"
            />
          </div>
          <div class="flex justify-end">
          <button class="bg-[var(--red)] text-sm font-semibold text-white px-3 py-2 rounded hover:bg-red-600 cursor-pointer" @click="handleUpdateVariant(v)">
            Update
          </button>
          </div>
      </div>
    </div>
    <div v-if="showVariants === false"
    class="flex justify-center mt-4 text-sm text-[var(--red)] hover:underline cursor-pointer"
    @click="showVariants = true">
      Show All Variants
    </div>
    <div v-else
    class="flex justify-center mt-4 text-sm text-[var(--red)] hover:underline cursor-pointer"
    @click="showVariants = false">
      Collapse
    </div>
    <div class="flex gap-6 mt-6">
      <button class="flex-1 text-sm font-semibold border border-gray-300 py-3 rounded hover:bg-gray-100 cursor-pointer" @click="$emit('onCancel')">Cancel</button>
      <button class="flex-1 bg-[var(--red)] text-sm font-semibold text-white py-3 rounded hover:bg-red-600 cursor-pointer" @click="handleUpdateProduct">
        Confirm
      </button>
    </div>
  </div>
</div>

</template>
