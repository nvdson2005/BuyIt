<script setup lang="ts">
import { ref, onMounted} from 'vue'
import FormSection from '@/components/layout/FormSection.vue'
import apiClient from '@/api/client'
import { PlusCircle, ChevronDown } from 'lucide-vue-next'
import UploadImage from '@/components/ui/UploadImage.vue'
// Lấy dữ liệu từ form điền cho interface Product
const productName = ref('')
const description = ref('')
const imageUrl = ref('')
const price = ref<number | null>(null)
const stockQuantity = ref<number | null>(null)
const sub_category_id = ref(null)
const category_id = ref(null)
const variants = ref([
  { name: '', image_url: '', price: 0, stock: 0 }
])

// Variables support for fetching data
const categories = ref([])
const subcategories = ref([])
const newSubcategory = ref('')


// Variables support for button and input
const showCategories = ref(false)
const showSubcategories = ref(false)
const selectedCategory = ref('Chọn ngành hàng')
const selectedSubcategory = ref('Chọn phân loại hàng')
const addNewSubcategory = ref(false)

const props = defineProps({
  onCancel: {
    type: Function,
    default: () => console.log('Cancel clicked')
  },
  onSave: {
    type: Function,
    default: (newProduct: any) => console.log('Saved', newProduct)
  },
})
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleCancel = (event: MouseEvent) => {
  emit('click', event)
  props.onCancel()
}


// Fetch data for categories
onMounted(async () => {
  try {
    const categories_res = await apiClient.get(`/category/fetch`)
    categories.value = categories_res.data.categories
    console.log('Fetched categories details:', categories.value)


  } catch (err:any) {
    alert(err.message)
  }
})
const selectCategory = async (category) => {
  selectedCategory.value = category.name
  category_id.value = category.category_id
  showCategories.value = false

  fetch_subcategory(category)
}

async function fetch_subcategory(category){
  try {
    const sub_res = await apiClient.get(`/category/fetch_subcategory/${category.category_id}`)
    subcategories.value = sub_res.data.subcategories
    console.log("Subcategories:", subcategories.value)

    selectedSubcategory.value = "Chọn phân loại hàng"
  } catch (err: any) {
    console.error("Error fetch sub:", err.message)
  }
}

const selectSubcategories = (subcategory) => {
  selectedSubcategory.value = subcategory.name
  sub_category_id.value = subcategory.sub_category_id
  showSubcategories.value = false
  addNewSubcategory.value = false
}

async function handleAddSubcategory() {
  if (!newSubcategory.value || !category_id.value) return;

  try {
    const response = await apiClient.post('/category/insert_subcategory', {
      name: newSubcategory.value,
      category_id: category_id.value
    });

    const addedSubcategory = response.data.subcategory;

    // Thêm vào danh sách
    subcategories.value.push(addedSubcategory);

    // Cập nhật state hiển thị và id
    selectedSubcategory.value = addedSubcategory.name;
    sub_category_id.value = addedSubcategory.sub_category_id;

    // Reset input + dropdown
    newSubcategory.value = '';
    addNewSubcategory.value = false;
    showSubcategories.value = false;
    console.log("Response from backend:", response.data);
  } catch (error: any) {
    console.error('Subcategory insertion failed:', error);
  }
}


function addVariant() {
  variants.value.push({ name: '', image_url: '', price: 0, stock: 0 })
}

function removeVariant(index: number) {
  variants.value.splice(index, 1)
}


async function handleSave() {
  if (!productName.value || price.value === null || stockQuantity.value === null || !sub_category_id.value) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc!')
    return
  }
  const shop_id = localStorage.getItem('id')
  try {
    const response = await apiClient.post('/products/insert_product', {
      shop_id: shop_id,
      name: productName.value,
      description: description.value,
      price: price.value,
      stock_quantity: stockQuantity.value,
      image_url: imageUrl.value,
      sub_category_id: sub_category_id.value
    });

    const prod_id = response.data.product.id;
    productName.value = ''
    description.value = ''
    imageUrl.value = ''
    price.value = <number | null>(null)
    stockQuantity.value = <number | null>(null)
    sub_category_id.value = null
    category_id.value = null

    const variant_res = await apiClient.post('/products/insert_variants', {
      product_id: prod_id,
      variants: variants.value
    });

    variants.value = [
      { name: '', image_url: '', price: 0, stock: 0 }
    ]
    console.log("Variant Response:", variant_res.data);
  } catch (error: any) {
    console.error('Subcategory insertion failed:', error);
  }
}
</script>


<template>
  <div class="space-y-6">
    <!-- 1. Thông tin cơ bản -->
    <FormSection title="Thông tin cơ bản" :required="true">
      <div class="space-y-6">


        <!-- Tên sản phẩm -->
        <div>
          <label class="text-sm font-medium">
            Tên sản phẩm <span class="text-red-500">*</span>
          </label>
          <input
            id="product-name"
            v-model="productName"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập tên sản phẩm (Thương hiệu + Loại + Thông số)"
          />
        </div>

        <!-- Hình ảnh sản phẩm -->
        <div>

          <label class="text-sm font-medium">
            Hình ảnh sản phẩm
          </label>
          <UploadImage v-model="imageUrl"></UploadImage>
        </div>
        <!-- Gía hiển thị -->
         <div>
          <label class="text-sm font-medium">
            Giá hiển thị <span class="text-red-500">*</span>
          </label>
          <input
            type="number"
            v-model="price"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập giá hiển thị của sản phẩm"
          />
        </div>

        <div>
          <label class="text-sm font-medium">
            Kho hàng <span class="text-red-500">*</span>
          </label>
          <input
            type="number"
            v-model="stockQuantity"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập số lượng sản phẩm có"
          />
        </div>
        <!-- Ngành hàng -->
        <div class="relative">
          <label class="text-sm font-medium"
                for="category">
            Ngành hàng <span class="text-red-500">*</span>
          </label>

          <button
            @click="showCategories = !showCategories"
            class="inline-flex items-center justify-between gap-2 px-3 py-2 whitespace-nowrap rounded-md
                    text-sm font-medium transition-all cursor-pointer
                    border border-gray-200 bg-background
                    hover:text-gray-400 hover:bg-gray-100 w-full h-10"
          >
            <span>{{ selectedCategory }}</span>
            <ChevronDown :size="16" />
          </button>

          <!-- Dropdown list -->
          <ul v-if="showCategories"
              class="absolute z-50 w-full border border-gray-200 rounded-md shadow bg-white mt-1">
            <li v-for="item in categories" :key="item.category_id"
                @click="selectCategory(item)"
                class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="relative">
          <label class="text-sm font-medium"
                for="category">
            Ngành hàng con <span class="text-red-500">*</span>
          </label>

          <button
            @click="showSubcategories = !showSubcategories"
            class="inline-flex items-center justify-between gap-2 px-3 py-2 whitespace-nowrap rounded-md
                    text-sm font-medium transition-all cursor-pointer
                    border border-gray-200 bg-background
                    hover:text-gray-400 hover:bg-gray-100 w-full h-10"
          >
            <span>{{ selectedSubcategory }}</span>
            <ChevronDown :size="16" />
          </button>

          <!-- Dropdown list -->
          <ul v-if="showSubcategories"
              class="absolute z-50 w-full border border-gray-200 rounded-md shadow bg-white mt-1">
            <li v-for="item in subcategories" :key="item.sub_category_id"
                @click="selectSubcategories(item)"
                class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">
              {{ item.name }}
            </li>
            <button @click="addNewSubcategory= !addNewSubcategory" class="inline-flex gap-2 px-3 py-2 w-full px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">
              <PlusCircle :size="16" /> Thêm nhóm phân loại
            </button>
            <div v-if="addNewSubcategory">
              <input
              v-model="newSubcategory"
              class="w-50 rounded-md bg-gray-100 mr-4 px-3 py-2 ml-4 mb-4 text-sm
                focus:outline-none focus:ring-[3px] focus:ring-gray-300"
              placeholder="Nhóm phân loại hàng mới"
            />
              <button
              class="
              inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                      text-white font-medium transition-all cursor-pointer
                      border border-gray-300
                      bg-[#ee4d2d] text-gray-700
                      hover:bg-[#d73211] hover:border-gray-400
                      active:bg-gray-200
                      focus:outline-none focus:ring-2 focus:ring-gray-300
                      "
              @click="handleAddSubcategory"
          >Thêm
            </button>
          </div>
          </ul>
        </div>
        <!-- Mô tả -->
        <div>
          <label class="text-sm font-medium"
          for="description">
            Mô tả sản phẩm <span class="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            v-model="description"
            class="w-full h-30 rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập mô tả chi tiết về sản phẩm..."
            rows="8"
          ></textarea>
        </div>
      </div>
    </FormSection>

    <!-- 3. Thông tin bán hàng -->
    <FormSection title="Thông tin bán hàng">
      <div class="space-y-6">

        <div>
          <label class="text-sm font-medium">Phân loại hàng</label>
          <button
            @click="addVariant"
            class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                  text-sm font-medium transition-all cursor-pointer
                  border border-gray-200 w-full h-10 justify-start mt-2
                  bg-background text-foreground hover:bg-gray-200 ">
            <PlusCircle :size="16" class="mr-2" /> Thêm nhóm phân loại
          </button>
        </div>

        <!-- Render các form biến thể -->
        <div v-for="(variant, index) in variants" :key="index" class="border border-gray-200 rounded-md p-4 space-y-4">

          <div>
            <label class="text-sm font-medium">Nhóm phân loại</label>
            <input
              v-model="variant.name"
              class="w-full rounded-md bg-gray-100 px-3 py-2 mb-2 text-sm
                focus:outline-none focus:ring-[3px] focus:ring-gray-300"
              placeholder="VD: Màu đỏ, Size M"
            />
          </div>
          <div>
            <label class="text-sm font-medium">Hình ảnh</label>
            <UploadImage v-model="variant.image_url"></UploadImage>
          </div>

          <div>
            <label class="text-sm font-medium">Giá</label>
            <input
              v-model="variant.price"
              type="number"
              class="w-full rounded-md bg-gray-100 px-3 py-2 mb-2 text-sm
                focus:outline-none focus:ring-[3px] focus:ring-gray-300"
              placeholder="Nhập giá"
            />
          </div>

          <div>
            <label class="text-sm font-medium">Kho hàng</label>
            <input
              v-model="variant.stock"
              type="number"
              class="w-full rounded-md bg-gray-100 px-3 py-2 mb-2 text-sm
                focus:outline-none focus:ring-[3px] focus:ring-gray-300"
              placeholder="Nhập số lượng"
            />
          </div>
          <div class="flex justify-end">
            <button
              class="text-red-500 text-sm underline cursor-pointer"
              @click="removeVariant(index)">
              Xóa
            </button>
          </div>
        </div>

      </div>
    </FormSection>

    <!-- Nút hành động -->
    <div
      class="flex justify-end gap-4 p-4 sticky bottom-0 bg-gray-100/80 backdrop-blur-sm"
    >
      <button
          class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                text-sm font-medium transition-all cursor-pointer
                border border-gray-300
                bg-white text-gray-700
                hover:bg-gray-100 hover:border-gray-400
                active:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-gray-300
                mt-2"
          @click="handleCancel">
          Hủy
        </button>
      <button
          class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                text-sm font-medium transition-all cursor-pointer
                border border-gray-300
                bg-white text-gray-700
                hover:bg-gray-100 hover:border-gray-400
                active:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-gray-300
                mt-2"
                @click="handleSave">
                Lưu & Ẩn
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
        @click="handleSave"
      >Lưu & Hiển thị</button>
    </div>
  </div>
</template>


<style scoped>
.radio-group {
  display: flex;
  gap: 20px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;
}



.radio-option input[type="radio"]:checked {
  accent-color: #dc2626;
}


input[type="radio"] {
  width: 16px;
  height: 16px;
}

</style>
