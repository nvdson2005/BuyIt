<script lang="ts" setup>
import NavBar from '@/components/layout/NavBar.vue'
import { User, Bell, Package, Ticket, Coins, Star } from 'lucide-vue-next'
import { ProfileOptions } from '@/utils/enum'
import { type ProfileDetail } from '@/utils/interface'
import { onMounted, ref, type Ref } from 'vue'
import apiClient from '@/api/client'
import type { AxiosResponse } from 'axios'
const chosenProfileOption: Ref<ProfileOptions> = ref(ProfileOptions.PROFILE)
const profile = ref<ProfileDetail | null>(null)
const editedProfile = ref<ProfileDetail>({
  username: '',
  name: '',
  email: '',
  phone: '',
  description: '',
})
onMounted(async () => {
  const result: AxiosResponse = await apiClient.get('/user/profile')
  const raw = result.data.user
  const userData = {
    username: raw.username ?? '',
    name: raw.name ?? '',
    email: raw.email ?? '',
    phoneNumber: raw.phone_number ?? '',
    description: raw.description ?? '',
  }
  profile.value = {
    username: userData['username'],
    name: userData['name'],
    email: userData['email'],
    phone: userData['phoneNumber'],
    description: userData['description'],
  }
  editedProfile.value = { ...profile.value }
  console.log('Profile data:', profile.value.username)
})
const isEditingProfile = ref(false)

const changeMode = (isEditing: boolean) => {
  if (isEditing) {
    if (profile.value) {
      editedProfile.value = { ...profile.value }
      isEditingProfile.value = true
    }
  } else {
    isEditingProfile.value = false
    editedProfile.value = { ...profile.value! }
  }
}
const handleSubmit = async (e: Event) => {
  e.preventDefault()
  const response = await apiClient.put('/user/profile/update', {
    username: editedProfile.value?.username,
    name: editedProfile.value?.name,
    email: editedProfile.value?.email,
    phone_number: editedProfile.value?.phone,
    description: editedProfile.value?.description,
  })
  if (response.status === 200) {
    console.log('Profile updated successfully')
    profile.value = { ...editedProfile.value! }
    isEditingProfile.value = false
  } else {
    console.error('Failed to update profile')
  }
}
</script>
<template>
  <NavBar />
  <div class="min-h-screen bg-[var(--light-pink)] flex justify-center py-10">
    <div class="flex gap-8 w-full max-w-4/5">
      <!-- Sidebar -->
      <aside class="flex-1 bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        <div class="flex items-center gap-4 pb-4 border-b">
          <div
            class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-4xl"
          >
            <User class="w-10 h-10" />
          </div>
          <div class="flex flex-col">
            <div class="font-semibold text-lg">{{ profile?.name }}</div>
            <div class="text-xs text-slate-500 flex items-center gap-1 cursor-pointer">
              Edit profile
            </div>
          </div>
        </div>
        <nav class="flex-1 pt-2">
          <ul class="flex flex-col gap-1 text-[15px]">
            <li
              class="flex items-center gap-2 px-2 py-2 text-blue-500 cursor-pointer hover:bg-blue-50 rounded"
            >
              <Bell class="w-5 h-5" />
              Notification
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 text-blue-500 cursor-pointer hover:bg-blue-50 rounded"
            >
              <User class="w-5 h-5" />
              My account
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 font-semibold cursor-pointer hover:bg-rose-50 rounded"
              :class="{
                'text-[var(--red)]': chosenProfileOption === ProfileOptions.PROFILE,
              }"
              @click="chosenProfileOption = ProfileOptions.PROFILE"
            >
              Profile
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 font-semibold cursor-pointer hover:bg-rose-50 rounded"
              :class="{
                'text-[var(--red)]': chosenProfileOption === ProfileOptions.BANK_CARDS,
              }"
              @click="chosenProfileOption = ProfileOptions.BANK_CARDS"
            >
              Bank Cards
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 font-semibold cursor-pointer hover:bg-rose-50 rounded"
              :class="{
                'text-[var(--red)]': chosenProfileOption === ProfileOptions.ADDRESSES,
              }"
              @click="chosenProfileOption = ProfileOptions.ADDRESSES"
            >
              Addresses
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 font-semibold cursor-pointer hover:bg-rose-50 rounded"
              :class="{
                'text-[var(--red)]': chosenProfileOption === ProfileOptions.CHANGE_PASSWORD,
              }"
              @click="chosenProfileOption = ProfileOptions.CHANGE_PASSWORD"
            >
              Change Password
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 font-semibold cursor-pointer hover:bg-rose-50 rounded"
              :class="{
                'text-[var(--red)]': chosenProfileOption === ProfileOptions.NOTIFICATIONS,
              }"
              @click="chosenProfileOption = ProfileOptions.NOTIFICATIONS"
            >
              Notifications Settings
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 font-semibold cursor-pointer hover:bg-rose-50 rounded"
              :class="{
                'text-[var(--red)]': chosenProfileOption === ProfileOptions.PRIVACY_SETTINGS,
              }"
              @click="chosenProfileOption = ProfileOptions.PRIVACY_SETTINGS"
            >
              Privacy Settings
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 font-semibold cursor-pointer hover:bg-rose-50 rounded"
              :class="{
                'text-[var(--red)]': chosenProfileOption === ProfileOptions.PERSONAL_INFO,
              }"
              @click="chosenProfileOption = ProfileOptions.PERSONAL_INFO"
            >
              Personal Information
            </li>

            <li
              class="flex items-center gap-2 px-2 py-2 text-blue-500 cursor-pointer hover:bg-blue-50 rounded"
            >
              <Package class="w-5 h-5" />
              Đơn Mua
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 text-blue-500 cursor-pointer hover:bg-blue-50 rounded"
            >
              <Ticket class="w-5 h-5" />
              Kho Voucher
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 text-blue-500 cursor-pointer hover:bg-blue-50 rounded"
            >
              <Coins class="w-5 h-5" />
              Xu BuyIt
            </li>
            <li
              class="flex items-center gap-2 px-2 py-2 text-rose-500 cursor-pointer hover:bg-rose-50 rounded"
            >
              <Star class="w-5 h-5" />
              Lễ Hội Thương Hiệu
              <span class="ml-2 bg-rose-500 text-white text-xs px-2 py-0.5 rounded">MỚI</span>
            </li>
          </ul>
        </nav>
        <div class="pt-4 border-t text-slate-500 cursor-pointer hover:text-rose-500">Đăng Xuất</div>
      </aside>

      <!-- Main profile content -->
      <section class="flex-3 bg-white rounded-xl shadow p-8 flex flex-col gap-6">
        <div class="flex items-center justify-between border-b pb-4">
          <div>
            <h2 class="text-xl font-semibold text-slate-800">My Profile</h2>
            <p class="text-sm text-slate-500 mt-1">
              Manage your profile information to secure your account
            </p>
          </div>
        </div>
        <div class="flex gap-8">
          <!-- Profile form -->
          <form class="flex-1 flex flex-col gap-4" @submit="handleSubmit">
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
                v-model="editedProfile.username"
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
                v-model="editedProfile.name"
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
                v-model="editedProfile.email"
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
                v-model="editedProfile.phone"
              />
            </div>
            <div class="flex flex-col gap-4">
              <label class="w-40 text-slate-600 font-medium">Description</label>
              <textarea
                rows="4"
                class="input-box w-full resize-none bg-slate-50"
                placeholder="Tell us about yourself"
                :disabled="!isEditingProfile"
                v-model="editedProfile.description"
              >
              </textarea>
            </div>
            <div class="flex items-center gap-4 mt-2">
              <button
                type="button"
                :class="
                  isEditingProfile
                    ? 'border px-6 py-2 rounded font-medium text-slate-700 hover:bg-gray-50'
                    : 'bg-[var(--red)] text-white px-6 py-2 rounded font-medium hover:bg-red-600'
                "
                @click="
                  () => {
                    changeMode(isEditingProfile ? false : true)
                  }
                "
              >
                {{ isEditingProfile ? 'Cancel' : 'Edit Profile' }}
              </button>
              <button
                type="submit"
                class="bg-[var(--red)] text-white px-6 py-2 rounded font-medium hover:bg-red-600"
                v-if="isEditingProfile"
              >
                Save Changes
              </button>
            </div>
          </form>
          <!-- Avatar section -->
          <div class="w-80 flex flex-col items-center border-l pl-8">
            <div
              class="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-6xl mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-28 h-28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <button
              class="border px-6 py-2 rounded font-medium text-slate-700 hover:bg-gray-50 mb-2"
            >
              Chọn Ảnh
            </button>
            <div class="text-xs text-slate-400 text-center">
              Dung lượng file tối đa 1 MB<br />
              Định dạng: .JPEG, .PNG
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
