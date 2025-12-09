<script lang="ts" setup>
import { ref } from 'vue'
import { type ProfileDetail } from '@/utils/interface'
import { notify, notifyAsync } from '@/utils/notify'
import UploadImageButton from '../ui/UploadImageButton.vue'
import apiClient from '@/api/client'
import { AxiosError } from 'axios'
import CustomImage from '../ui/CustomImage.vue'
const props = defineProps<{
  profile: ProfileDetail | null
}>()
const emit = defineEmits(['onCancel'])
const profile = ref({ ...props.profile })
const isEditingProfile = ref(false)

async function handleUpdateProfile() {
  try {
    const response = await notifyAsync(
      apiClient.put('/user/profile', {
        username: profile.value?.username,
        name: profile.value?.name,
        email: profile.value?.email,
        phone_number: profile.value?.phone,
        description: profile.value?.description,
        image_url: profile.value?.image_url,
      }),
    )
    if (response.status === 200) {
      console.log('Profile updated successfully')
      notify('Profile updated successfully!', 'success')
    } else {
      console.error('Failed to update profile')
      notify('Failed to update profile', 'error')
    }
    emit('onCancel')
  } catch (error) {
    console.error('Error updating profile:', error)
    if (error instanceof AxiosError) {
      if (error.response) {
        notify(
          'Failed to update profile: ' + (error.response.data.message || 'Unknown error'),
          'error',
        )
      } else if (error.request) {
        notify('Failed to update profile: No response from server', 'error')
      } else {
        notify('Failed to update profile: ' + error.message, 'error')
      }
    } else if (error instanceof Error) {
      notify('Failed to update profile: ' + error.message, 'error')
    }
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black/20 flex items-center justify-center p-4">
    <div class="bg-white mt-20 rounded-lg w-full max-w-3xl p-6 max-h-[72vh] overflow-y-auto">
      <h2 class="text-lg font-semibold mb-4">Profile</h2>

      <div class="flex gap-8">
        <!-- Profile form -->
        <form class="flex-1 flex flex-col gap-4" @submit="handleUpdateProfile">
          <div class="flex items-center gap-4">
            <label class="w-40 text-slate-600 font-medium">Username</label>
            <input
              type="text"
              :disabled="!isEditingProfile"
              class="text-slate-800 font-semibold"
              :class="
                isEditingProfile
                  ? 'p-2 input-box w-80 bg-slate-50'
                  : 'p-2 bg-transparent border-0 w-80 focus:ring-0 focus:outline-none'
              "
              v-model="profile.username"
            />
          </div>
          <div class="flex items-center gap-4">
            <label class="w-40 text-slate-600 font-medium">Name</label>
            <input
              type="text"
              :disabled="!isEditingProfile"
              :class="
                isEditingProfile
                  ? 'p-2 input-box w-80 bg-slate-50'
                  : 'p-2 bg-transparent border-0 w-80 focus:ring-0 focus:outline-none'
              "
              v-model="profile.name"
            />
          </div>
          <div class="flex items-center gap-4">
            <label class="w-40 text-slate-600 font-medium">Email</label>
            <input
              type="email"
              :disabled="!isEditingProfile"
              :class="
                isEditingProfile
                  ? 'p-2 input-box w-80 bg-slate-50'
                  : 'p-2 bg-transparent border-0 w-80 focus:ring-0 focus:outline-none'
              "
              v-model="profile.email"
            />
          </div>
          <div class="flex items-center gap-4">
            <label class="w-40 text-slate-600 font-medium">Phone number</label>
            <input
              type="text"
              :disabled="!isEditingProfile"
              :class="
                isEditingProfile
                  ? 'p-2 input-box w-80 bg-slate-50'
                  : 'p-2 bg-transparent border-0 w-80 focus:ring-0 focus:outline-none'
              "
              v-model="profile.phone"
            />
          </div>
          <div class="flex flex-col gap-4">
            <label class="w-40 text-slate-600 font-medium">Description</label>
            <textarea
              rows="4"
              class="input-box w-full resize-none bg-slate-50"
              placeholder="Tell us about yourself"
              :disabled="!isEditingProfile"
              v-model="profile.description"
            >
            </textarea>
          </div>
          <div class="flex items-center gap-4 mt-2">
            <button
              type="button"
              :class="
                isEditingProfile
                  ? 'border px-6 py-2 rounded font-medium text-slate-700 hover:bg-gray-50'
                  : 'bg-(--red) text-white px-6 py-2 rounded font-medium hover:bg-red-600'
              "
              @click="isEditingProfile = !isEditingProfile"
            >
              {{ isEditingProfile ? 'Cancel' : 'Edit Profile' }}
            </button>
            <button
              type="submit"
              class="bg-(--red) text-white px-6 py-2 rounded font-medium hover:bg-red-600"
              v-if="isEditingProfile"
            >
              Save Changes
            </button>
          </div>
        </form>
        <div class="w-80 flex flex-col items-center border-l pl-8">
          <div class="text-lg font-semibold">Shop Avatar</div>
          <UploadImageButton
            v-if="isEditingProfile"
            v-model="profile.image_url"
          ></UploadImageButton>
          <CustomImage
            v-else
            :source="profile.image_url || ''"
            :alt="profile.name || 'Shop'"
            className="w-full h-32 object-cover rounded"
          ></CustomImage>
        </div>
      </div>
      <div class="flex justify-end">
        <button
          @click="$emit('onCancel')"
          class="px-6 py-2 rounded font-medium border border-gray-300 hover:bg-gray-100 cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  </div>
</template>
