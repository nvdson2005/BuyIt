<script setup lang="ts">
import { ref, onMounted} from 'vue'
import FormSection from '@/components/layout/FormSection.vue'
import apiClient from '@/api/client'
import { PlusCircle, ChevronDown } from 'lucide-vue-next'
import UploadImage from '@/components/ui/UploadImage.vue'
import { notify, notifyAsync } from '@/utils/notify';
import { type SellerProduct, type Category, type Subcategory } from '@/utils/interface'
// Lấy dữ liệu từ form điền cho interface Product
const newProduct = ref<SellerProduct>({
  id: '',
  name: '',
  description: '',
  rating: 5,
  price: 0,
  sold_amount: 0,
  stock_quantity: 0,
  image_url: '',
  is_active: true,
  sub_category_id: '',
  sale_price: 0,
  is_onsale: false,
  variants:
  [{
    variant_id: '',
    product_id: '',
    name: '',
    price: 0,
    stock_quantity: 0,
    image_url: ''
  }]
})
const category_id = ref('')

// Variables support for fetching data
const categories = ref<Category[]>([])
const subcategories = ref<Subcategory[]>([])
const newSubcategory = ref('')


// Variables support for button and input
const showCategories = ref(false)
const showSubcategories = ref(false)
const selectedCategory = ref('Choose Category')
const selectedSubcategory = ref('Choose Subcategory')
const addNewSubcategory = ref(false)


const emit = defineEmits(['cancel'])


// Fetch data for categories
onMounted(async () => {
  try {
    const categories_res = await apiClient.get(`/category/fetch`)
    categories.value = categories_res.data.categories
    console.log('Fetched categories details:', categories.value)


  } catch (err) {
    console.error("Get category failed: ", err)
  }
})

const selectCategory = async (category: Category) => {
  selectedCategory.value = category.name
  category_id.value = category.category_id
  showCategories.value = false

  fetch_subcategory(category)
}

async function fetch_subcategory(category: Category){
  try {
    const sub_res = await apiClient.get(`/category/fetch_subcategory/${category.category_id}`)
    subcategories.value = sub_res.data.subcategories
    console.log("Subcategories:", subcategories.value)

    selectedSubcategory.value = "Choose Subcategory"
  } catch (err) {
    console.error("Error fetch sub:", err)
  }
}

const selectSubcategories = (subcategory: Subcategory) => {
  selectedSubcategory.value = subcategory.name
  newProduct.value.sub_category_id = subcategory.id
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
    newProduct.value.sub_category_id = addedSubcategory.sub_category_id;

    // Reset input + dropdown
    newSubcategory.value = '';
    addNewSubcategory.value = false;
    showSubcategories.value = false;
    console.log("Response from backend:", response.data);
  } catch (error) {
    console.error('Subcategory insertion failed:', error);
  }
}


function addVariant() {
  newProduct.value.variants.push({
    variant_id: '',
    product_id: '',
    name: '',
    price: 0,
    stock_quantity: 0,
    image_url: ''
  })
}

function removeVariant(index: number) {
  newProduct.value.variants.splice(index, 1)
}


async function handleSave() {
  if (!newProduct.value.name || !newProduct.value.price || !newProduct.value.stock_quantity|| !newProduct.value.sub_category_id) {
    alert('Please enter all obligated fields!')
    return
  }
  const shop_id = localStorage.getItem('id')
  try {
    const response = await apiClient.post('/products/insert_product', {
      shop_id: shop_id,
      name: newProduct.value.name,
      description: newProduct.value.description,
      price: newProduct.value.price,
      stock_quantity: newProduct.value.stock_quantity,
      image_url: newProduct.value.image_url,
      sub_category_id: newProduct.value.sub_category_id
    });

    const prod_id = response.data.product.id;

    alert(newProduct.value.variants)
    await notifyAsync(
      apiClient.post('/products/insert_variants', {
      product_id: prod_id,
      variants: newProduct.value.variants
    })
  );

    notify("Add new product successfully!", 'success');
    newProduct.value = {
      id: '',
      name: '',
      description: '',
      rating: 5,
      price: 0,
      sold_amount: 0,
      stock_quantity: 0,
      image_url: '',
      is_active: true,
      sub_category_id: '',
      sale_price: 0,
      is_onsale: false,
      variants:
      [{
        variant_id: '',
        product_id: '',
        name: '',
        price: 0,
        stock_quantity: 0,
        image_url: ''
      }]
    }

    category_id.value = ''
    selectedCategory.value = 'Choose Category'
    selectedSubcategory.value = 'Cnoose Subcategory'
    emit('cancel')
  } catch (error) {
    notify("Add new product failed!", 'error');

    console.error('Subcategory insertion failed:', error);
  }
}
</script>


<template>
  <div class="space-y-6">
    <!-- 1. Thông tin cơ bản -->
    <FormSection title="Basic Information" :required="true">
      <div class="space-y-6">


        <!-- Tên sản phẩm -->
        <div>
          <label class="text-sm font-medium">
            Product Name <span class="text-red-500">*</span>
          </label>
          <input
            id="product-name"
            v-model="newProduct.name"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Enter Product Name"
          />
        </div>

        <!-- Hình ảnh sản phẩm -->
        <div>

          <label class="text-sm font-medium">
            Product Image
          </label>
          <UploadImage v-model="newProduct.image_url"></UploadImage>
        </div>
        <!-- Gía hiển thị -->
         <div>
          <label class="text-sm font-medium">
            Display Price <span class="text-red-500">*</span>
          </label>
          <input
            type="number"
            v-model="newProduct.price"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập giá hiển thị của sản phẩm"
          />
        </div>

        <div>
          <label class="text-sm font-medium">
            Stock <span class="text-red-500">*</span>
          </label>
          <input
            type="number"
            v-model="newProduct.stock_quantity"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập số lượng sản phẩm có"
          />
        </div>
        <!-- Ngành hàng -->
        <div class="relative">
          <label class="text-sm font-medium"
                for="category">
            Category <span class="text-red-500">*</span>
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
            Subcategory <span class="text-red-500">*</span>
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
            <li v-for="item in subcategories" :key="item.id"
                @click="selectSubcategories(item)"
                class="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">
              {{ item.name }}
            </li>
            <button @click="addNewSubcategory= !addNewSubcategory" class="inline-flex gap-2 px-3 py-2 w-full px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm">
              <PlusCircle :size="16" /> Add New Subcategory
            </button>
            <div v-if="addNewSubcategory">
              <input
              v-model="newSubcategory"
              class="w-50 rounded-md bg-gray-100 mr-4 px-3 py-2 ml-4 mb-4 text-sm
                focus:outline-none focus:ring-[3px] focus:ring-gray-300"
              placeholder="New Subcategory"
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
          >Save
            </button>
          </div>
          </ul>
        </div>
        <!-- Mô tả -->
        <div>
          <label class="text-sm font-medium"
          for="description">
            Product Description <span class="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            v-model="newProduct.description"
            class="w-full h-30 rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Enter product description"
            rows="5"
          ></textarea>
        </div>
      </div>
    </FormSection>

    <!-- 3. Thông tin bán hàng -->
    <FormSection title="Selling Information">
      <div class="space-y-6">

        <div>
          <label class="text-sm font-medium">Variants</label>
          <button
            @click="addVariant"
            class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
                  text-sm font-medium transition-all cursor-pointer
                  border border-gray-200 w-full h-10 justify-start mt-2
                  bg-background text-foreground hover:bg-gray-200 ">
            <PlusCircle :size="16" class="mr-2" /> Add New Variant
          </button>
        </div>

        <!-- Render các form biến thể -->
        <div v-for="(variant, index) in newProduct.variants" :key="index" class="border border-gray-200 rounded-md p-4 space-y-4">

          <div>
            <label class="text-sm font-medium">Name</label>
            <input
              v-model="variant.name"
              class="w-full rounded-md bg-gray-100 px-3 py-2 mb-2 text-sm
                focus:outline-none focus:ring-[3px] focus:ring-gray-300"
              placeholder="Example: Red, Size M"
            />
          </div>
          <div>
            <label class="text-sm font-medium">Image</label>
            <UploadImage v-model="variant.image_url"></UploadImage>
          </div>

          <div>
            <label class="text-sm font-medium">Price</label>
            <input
              v-model="variant.price"
              type="number"
              class="w-full rounded-md bg-gray-100 px-3 py-2 mb-2 text-sm
                focus:outline-none focus:ring-[3px] focus:ring-gray-300"
              placeholder="Enter Variant Price"
            />
          </div>

          <div>
            <label class="text-sm font-medium">Stock</label>
            <input
              v-model="variant.stock_quantity"
              type="number"
              class="w-full rounded-md bg-gray-100 px-3 py-2 mb-2 text-sm
                focus:outline-none focus:ring-[3px] focus:ring-gray-300"
              placeholder="Enter quantity"
            />
          </div>
          <div class="flex justify-end">
            <button
              class="text-red-500 text-sm underline cursor-pointer"
              @click="removeVariant(index)">
              Delete
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
          @click="$emit('cancel')">
          Cancel
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
      >Save</button>
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
