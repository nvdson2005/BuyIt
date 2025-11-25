<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Upload, Link, X, Image } from 'lucide-vue-next';

// Props và emits
const props = defineProps<{
  modelValue?: string
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

// State
const activeTab = ref<'upload' | 'url'>('upload');
const imageUrl = ref(props.modelValue || '');
const isUploading = ref(false);
const showPreview = ref(false);

// Watch để cập nhật khi modelValue thay đổi từ bên ngoài
watch(() => props.modelValue, (newVal) => {
  imageUrl.value = newVal || '';
});

// Hàm upload ảnh từ máy tính
async function uploadImage(event: Event) {
  const fileInput = event.target as HTMLInputElement;

  if (!fileInput.files?.[0]) {
    return;
  }

  const file = fileInput.files[0];

  // Kiểm tra kích thước file
  if (file.size > 32 * 1024 * 1024) {
    alert('File quá lớn! Tối đa 32MB');
    return;
  }

  // Kiểm tra định dạng file
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    alert('Chỉ chấp nhận file ảnh: JPG, PNG, GIF, WEBP');
    return;
  }

  isUploading.value = true;

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('https://api.imgbb.com/1/upload?key=fb920d4cb9c40fe09dd1fa5112e985b9', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      imageUrl.value = data.data.url;
      emit('update:modelValue', data.data.url);
      showPreview.value = true;
    } else {
      alert(`❌ Lỗi: ${data.error.message}`);
    }
  } catch (error) {
    alert(`❌ Lỗi kết nối: ${error}`);
  } finally {
    isUploading.value = false;
    fileInput.value = '';
  }
}

// Hàm xử lý khi nhập URL
function handleUrlInput() {
  if (imageUrl.value) {
    // Validate URL cơ bản
    if (!imageUrl.value.startsWith('http')) {
      alert('URL không hợp lệ! Phải bắt đầu bằng http hoặc https');
      return;
    }
    emit('update:modelValue', imageUrl.value);
    showPreview.value = true;
  } else {
    emit('update:modelValue', '');
    showPreview.value = false;
  }
}

// Hàm xóa ảnh
function removeImage() {
  imageUrl.value = '';
  emit('update:modelValue', '');
  showPreview.value = false;
}

// Hàm trigger file input
function triggerFileInput() {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  fileInput?.click();
}
</script>

<template>

    <!-- Tab chuyển đổi -->
    <div class="flex border-b border-gray-200">
      <button
        @click="activeTab = 'upload'"
        :class="[
          'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer',
          activeTab === 'upload'
            ? 'border-primary text-primary'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        ]"
      >
        <Upload :size="16" />
        Tải từ máy
      </button>
      <button
        @click="activeTab = 'url'"
        :class="[
          'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer',
          activeTab === 'url'
            ? 'border-primary text-primary'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        ]"
      >
        <Link :size="16" />
        Nhập URL
      </button>
    </div>

    <!-- Nội dung theo tab -->
    <div class="min-h-[200px]">
      <!-- Tab Upload từ máy -->
      <div v-if="activeTab === 'upload'" class="space-y-4">
        <!-- Preview ảnh -->
        <div v-if="showPreview && imageUrl" class="text-center">
          <div class="relative inline-block">
            <img
              :src="imageUrl"
              alt="Preview"
              class="max-w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300"
            />
            <button
              @click="removeImage"
              class="absolute -top-2 -right-2 bg-red-400 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
            >
              <X :size="14" />
            </button>
          </div>
        </div>

        <!-- Ô upload -->
        <div
          v-else
          class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          @click="triggerFileInput"
        >
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            @change="uploadImage"
            class="hidden"
            :disabled="isUploading"
          />

          <Upload class="mx-auto text-gray-400 mb-3" :size="40" />

          <div v-if="isUploading">
            <p class="text-sm text-gray-600 font-medium">Đang upload ảnh...</p>
            <p class="text-xs text-gray-500 mt-1">Vui lòng chờ</p>
          </div>
          <div v-else>
            <p class="text-sm font-medium text-gray-700">Chọn ảnh từ máy tính</p>
            <p class="text-xs text-gray-500 mt-1">PNG, JPG, GIF, WEBP - Tối đa 32MB</p>
            <button
              type="button"
              class="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
            </button>
          </div>
        </div>
      </div>

      <!-- Tab Nhập URL -->
      <div v-if="activeTab === 'url'" class="space-y-4">
        <!-- Preview ảnh từ URL -->
        <div v-if="showPreview && imageUrl" class="text-center">
          <div class="relative inline-block">
            <img
              :src="imageUrl"
              alt="Preview"
              class="max-w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300"
              @error="showPreview = false"
            />
            <button
              @click="removeImage"
              class="absolute -top-2 -right-2 bg-red-400 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
            >
              <X :size="14" />
            </button>
          </div>
        </div>

        <!-- Input URL -->
        <div class="space-y-3">
          <div class="flex gap-2">
            <input
              v-model="imageUrl"
              @input="handleUrlInput"
              @keyup.enter="handleUrlInput"
              class="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-[3px] focus:ring-gray-300"
              placeholder="https://example.com/image.jpg"
              type="url"
            />
            <button
              @click="handleUrlInput"
              :disabled="!imageUrl"
              class="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Xác nhận
            </button>
          </div>
          <p class="text-xs text-gray-500">
            Nhập URL ảnh hợp lệ (bắt đầu bằng http:// hoặc https://)
          </p>
        </div>
      </div>
    </div>
</template>
