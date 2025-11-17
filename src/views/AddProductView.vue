<script setup lang="ts">
import { ref} from 'vue'
import { Upload, Video, Info, PlusCircle, ChevronDown } from 'lucide-vue-next'
import FormSection from '@/components/layout/FormSection.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import RadioGroup from '@/components/ui/RadioGroup.vue'
// Product trong utils được tạo từ trước
import { Product } from '@/utils/interface'

// Lấy dữ liệu từ form điền cho interface Product
const productName = ref('')
const description = ref('')
const imageUrl = ref('')
const price = ref<number | null>(null)
const stockQuantity = ref<number | null>(null)

const checked = ref<boolean[]>([])
const radios = ref('no')
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


function handleSave() {
  if (!productName.value || price.value === null || stockQuantity.value === null) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc!')
    return
  }

  const newProduct: Product = {
    id: `NEW_${Date.now()}`,
    name: productName.value,
    description: description.value,
    image_url: imageUrl.value || '', // Cần xử lý backend phần line 95-101 để có ảnh
    price: price.value,
    sale_price: price.value,
    rating: 0,
    sold_amount: 0,
    stock_quantity: stockQuantity.value,
    shop_id: "abc", // Tạm thời
    sub_category_id: 1, // Tạm thời
  }

  // Gỉa lập: comment khi dùng api
  props.onSave(newProduct)

  // Nếu có backend:
  /*
  fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct)
  })
    .then(res => res.json())
    .then(data => console.log('Saved to DB:', data))
    .catch(err => console.error('Save failed', err))
  */
}
</script>


<template>
  <div class="space-y-6">
    <!-- 1. Thông tin cơ bản -->
    <FormSection title="Thông tin cơ bản" :required="true">
      <div class="space-y-6">
        <!-- Hình ảnh sản phẩm -->
        <div>
          <label class="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 flex items-center mb-2">
            Hình ảnh sản phẩm
            <Info :size="14" class="text-gray-400" />
          </label>

          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2">
              <p class="text-sm text-gray-600 mb-2">
                Hình ảnh tỷ lệ 1:1 và 3:4 (tối đa 9 ảnh)
              </p>
              <div class="border-2 border-gray-300 border-dashed rounded-lg p-6 text-center">
                <Upload class="mx-auto text-gray-400" :size="32" />
                <button
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                  text-sm font-medium transition-all cursor-pointer
                  text-primary underline-offset-4 hover:underline mt-2"
                >
                  Thêm hình ảnh
                </button>
              </div>
            </div>

            <div>
              <p class="text-sm text-gray-600 mb-2">Ảnh bìa (tỷ lệ 1:1)</p>
              <div
                class="border-2 border-gray-300 border-dashed rounded-lg p-6 text-center h-full flex flex-col justify-center"
              >
                <Upload class="mx-auto text-gray-400" :size="32" />
                <button
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                  text-sm font-medium transition-all cursor-pointer
                  text-primary underline-offset-4 hover:underline mt-2"
                >
                  Thêm ảnh bìa
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Video sản phẩm -->
        <div>
          <label class="text-sm font-medium">Video sản phẩm</label>
          <div class="border-2 border-gray-300 border-dashed rounded-lg p-6 text-center">
            <Video class="mx-auto text-gray-400" :size="32" />
            <button
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
              text-sm font-medium transition-all cursor-pointer
              text-primary underline-offset-4 hover:underline mt-2"
            >
              Thêm Video
            </button>
            <p class="text-xs text-gray-500 mt-2">
              Độ dài: 10s-60s, Định dạng: MP4, Kích thước: Tối đa 30Mb.
            </p>
          </div>
        </div>

        <!-- Tên sản phẩm -->
        <div>
          <label class="text-sm font-medium"
           for="product-name">
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

        <!-- Ngành hàng -->
        <div>
          <label class="text-sm font-medium"
          for="category">
            Ngành hàng <span class="text-red-500">*</span>
          </label>
          <button
              class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
              text-sm font-medium transition-all cursor-pointer
              border bg-background text-gray-400
              hover:text-gray-700 hover:bg-gray-100 w-full h-10 justify-start"
          >
            <span>Chọn ngành hàng</span> <ChevronDown :size="16" />
          </button>
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

          <div class="mt-2 text-right">
            <button
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap w-40 h-10 rounded-md
              text-sm font-medium transition-all cursor-pointer
              border bg-background text-gray-700 hover:bg-gray-100"
            >
              Tải lên hình ảnh (0/12)
            </button>
          </div>
        </div>
      </div>
    </FormSection>

    <!-- 2. Thông tin chi tiết -->
    <FormSection title="Thông tin chi tiết">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="text-sm font-medium">Thương hiệu</label>
          <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
              text-sm font-medium transition-all cursor-pointer
              border border-gray-200 w-full h-8 justify-between
              bg-background text-foreground
              text-gray-700
              hover:bg-gray-200 border-gray-300 ">
            <span>Vui lòng chọn</span> <ChevronDown :size="16" />
          </button>
        </div>
        <div>
          <label class="text-sm font-medium">Chất liệu</label>
          <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
              text-sm font-medium transition-all cursor-pointer
              border border-gray-200 w-full h-8 justify-between
              bg-background text-foreground
              text-gray-700
              hover:bg-gray-200 border-gray-300 ">
            <span>Vui lòng chọn</span> <ChevronDown :size="16" />
          </button>
        </div>
        <div>
          <label class="text-sm font-medium">Xuất xứ</label>
          <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
              text-sm font-medium transition-all cursor-pointer
              border border-gray-200 w-full h-8 justify-between
              bg-background text-foreground
              text-gray-700
              hover:bg-gray-200 border-gray-300 ">
            <span>Vui lòng chọn</span> <ChevronDown :size="16" />
          </button>
        </div>
      </div>
    </FormSection>

    <!-- 3. Thông tin bán hàng -->
    <FormSection title="Thông tin bán hàng">
      <div class="space-y-6">
        <div>
          <label class="text-sm font-medium">Phân loại hàng</label>
          <button class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
              text-sm font-medium transition-all cursor-pointer
              border border-gray-200 w-full h-10 justify-start mt-2
              bg-background text-foreground
              text-gray-700
              hover:bg-gray-200 border-gray-300 ">
            <PlusCircle :size="16" class="mr-2" /> Thêm nhóm phân loại
          </button>
        </div>
        <div>
          <label class="text-sm font-medium" for="price"
            >Giá <span class="text-red-500">*</span></label
          >
          <input
            id="price"
            v-model="price"
            type = "number"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập giá"
          />
        </div>
        <div>
          <label class="text-sm font-medium" for="stock"
            >Kho hàng <span class="text-red-500">*</span></label
          >
          <input
            id="stock"
            v-model="stockQuantity"
            type="number"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập số lượng"
          />
        </div>
        <div>
          <label class="text-sm font-medium">Mua nhiều giảm giá</label>
          <button class="inline-flex items-center justify-center px-3 py-2 whitespace-nowrap rounded-md
              text-sm font-medium transition-all cursor-pointer
              border border-gray-200 w-full h-10 justify-start mt-2
              bg-background text-foreground
              text-gray-700
              hover:bg-gray-200 border-gray-300 ">
            <PlusCircle :size="16" class="mr-2" /> Thêm khoảng giá
          </button>
        </div>
      </div>
    </FormSection>

    <!-- 4. Vận chuyển -->
    <FormSection title="Vận chuyển">
      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium" for="weight"
            >Cân nặng (sau khi đóng gói)
            <span class="text-red-500">*</span></label
          >
          <input
            id="weight"
            type="number"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="gram" />
        </div>
        <div>
          <label class="text-sm font-medium">Kích thước đóng gói (Tùy chọn)</label>
          <div class="flex gap-4 mt-2">
            <input
            type = "number"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Dài (cm)"
            />
            <input
              type = "number"
              class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
                focus:outline-none focus:ring-[3px] focus:ring-gray-300"
              placeholder="Rộng (cm)"
            />
            <input
              type = "number"
              class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
                focus:outline-none focus:ring-[3px] focus:ring-gray-300"
              placeholder="Cao (cm)"
            />
          </div>
        </div>
        <div>
          <label class="text-sm font-medium">Phí vận chuyển <span class="text-red-500">*</span></label>
          <div class="mt-2 border border-gray-200 rounded-lg p-4 space-y-2">
            <div class="flex items-center justify-between">
              <Checkbox v-model="checked[0]">
                Hoả tốc
              </Checkbox>

            </div>
            <div class="flex items-center justify-between">
              <Checkbox v-model="checked[1]">
                Nhanh
              </Checkbox>
            </div>
            <div class="flex items-center justify-between">
              <Checkbox v-model="checked[2]">
                Tiết kiệm
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
    </FormSection>


    <!-- 5. Thông tin khác -->
    <FormSection title="Thông tin khác">
      <div class="space-y-4">
        <div class="flex items-center gap-8">
          <label class="text-sm font-medium">Hàng Đặt Trước</label>
            <RadioGroup
              v-model="radios"
              :options="[
                { label: 'Không', value: 'no' },
                { label: 'Có', value: 'yes' }
              ]"
              direction="horizontal"
            />
        </div>
        <div>
          <label class="text-sm font-medium">Tình trạng</label>
          <button class="inline-flex items-center justify-center gap-2 px-3 py-2 whitespace-nowrap rounded-md
              text-sm font-medium transition-all cursor-pointer
              border border-gray-200 w-full h-10 justify-start mt-2
              bg-background text-foreground
              text-gray-700
              hover:bg-gray-200 border-gray-300 ">
            <span>Mới</span> <ChevronDown :size="16" />
          </button>
        </div>
        <div>
          <label class="text-sm font-medium" for="sku">SKU sản phẩm</label>
          <input
            id = "sku"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm
              focus:outline-none focus:ring-[3px] focus:ring-gray-300"
            placeholder="Nhập SKU"
          />
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
