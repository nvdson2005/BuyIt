<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Camera, X } from 'lucide-vue-next';

// Props và emits
const props = defineProps<{
  modelValue?: string
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

// State
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

    <!-- Nội dung theo tab -->
    <div>
        <div v-if="showPreview && imageUrl" class="text-center relative inline-block">
            <img
              :src="imageUrl"
              alt="Preview"
              class="max-w-full h-32 object-cover rounded-lg border border-gray-300"
            />
            <button
              @click="removeImage"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-[var(--red)] transition-colors cursor-pointer"
            >
              <X :size="14" />
            </button>
        </div>
        <div v-else>
          <button
            class="text-sm gap-2 px-3 py-2 text-[var(--red)] border border-[var(--red)] py-3 rounded hover:bg-gray-100 cursor-pointer"
            @click="triggerFileInput"
          >
            <div class="flex gap-2 font-semibold">
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                @change="uploadImage"
                class="hidden"
                :disabled="isUploading"
              />

              <Camera :size="20" />Add Photo
            </div>
            <p v-if="isUploading" class="text-sm text-gray-400">Image uploading...</p>
          </button>
        </div>
    </div>
</template>
