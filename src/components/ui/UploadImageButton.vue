<script lang="ts" setup>
import { Camera, X } from 'lucide-vue-next'
import { notify } from '@/utils/notify'
import { ref } from 'vue'

const modelValue = defineModel<string>('imageUrl', {
  default: '',
})

const isUploading = ref(false)

// Upload image from computer
async function uploadImage(event: Event) {
  const fileInput = event.target as HTMLInputElement

  if (!fileInput.files?.[0]) {
    return
  }

  const file = fileInput.files[0]

  // Check image size
  if (file.size > 32 * 1024 * 1024) {
    notify('Image size is too large! Maximum 32MB', 'error')
    return
  }

  // Check image type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    notify('Only images are accepted: JPG, PNG, GIF, WEBP', 'error')
    return
  }

  isUploading.value = true

  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetch(
      'https://api.imgbb.com/1/upload?key=fb920d4cb9c40fe09dd1fa5112e985b9',
      {
        method: 'POST',
        body: formData,
      },
    )

    const data = await response.json()

    if (data.success) {
      modelValue.value = data.data.url
    } else {
      notify(`Error: ${data.error.message}`, 'error')
    }
  } catch (error) {
    notify(`Error: ${error}`, 'error')
  } finally {
    isUploading.value = false
    fileInput.value = ''
  }
}

// Remove image
function removeImage() {
  modelValue.value = ''
}

// Trigger file input
function triggerFileInput() {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement
  fileInput?.click()
}
</script>

<template>
  <!-- Content -->
  <div>
    <div v-if="modelValue" class="text-center relative inline-block">
      <img
        :src="modelValue"
        alt="Preview"
        class="max-w-full h-32 object-cover rounded-lg border border-gray-300"
      />
      <button
        @click="removeImage"
        class="absolute -top-2 -right-2 bg-(--red) text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-(--red) transition-colors cursor-pointer"
      >
        <X :size="14" />
      </button>
    </div>
    <div v-else>
      <button
        class="text-sm gap-2 px-3 text-(--red) border border-(--red) py-3 rounded hover:bg-gray-100 cursor-pointer"
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
