<script lang="ts" setup>
import NavBar from '@/components/layout/NavBar.vue'
import { User, Bell, Package, Ticket, Coins, Star } from 'lucide-vue-next'
import { ProfileOptions } from '@/utils/enum'
import { ref, type Ref } from 'vue'
const chosenProfileOption: Ref<ProfileOptions> = ref(ProfileOptions.PROFILE)
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
            <div class="font-semibold text-lg">User1</div>
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
            <h2 class="text-xl font-semibold text-slate-800">Hồ Sơ Của Tôi</h2>
            <p class="text-sm text-slate-500 mt-1">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          </div>
        </div>
        <div class="flex gap-8">
          <!-- Profile form -->
          <form class="flex-1 flex flex-col gap-4">
            <div class="flex items-center gap-4">
              <label class="w-40 text-slate-600 font-medium">Tên đăng nhập</label>
              <span class="text-slate-800 font-semibold">User1</span>
              <span class="text-xs text-slate-400"
                >(Tên đăng nhập chỉ có thể thay đổi một lần.)</span
              >
            </div>
            <div class="flex items-center gap-4">
              <label class="w-40 text-slate-600 font-medium">Tên</label>
              <input type="text" value="PHUONG" class="input-box w-80" />
            </div>
            <div class="flex items-center gap-4">
              <label class="w-40 text-slate-600 font-medium">Email</label>
              <span class="text-slate-800">ph*********@hcmut.edu.vn</span>
              <a href="#" class="text-blue-500 text-sm ml-2">Thay đổi</a>
            </div>
            <div class="flex items-center gap-4">
              <label class="w-40 text-slate-600 font-medium">Số điện thoại</label>
              <a href="#" class="text-blue-500 text-sm">Thêm</a>
            </div>
            <div class="flex items-center gap-4">
              <label class="w-40 text-slate-600 font-medium">Giới tính</label>
              <label class="flex items-center gap-1">
                <input type="radio" name="gender" checked class="accent-blue-500" />
                Nam
              </label>
              <label class="flex items-center gap-1">
                <input type="radio" name="gender" class="accent-blue-500" />
                Nữ
              </label>
              <label class="flex items-center gap-1">
                <input type="radio" name="gender" class="accent-blue-500" />
                Khác
              </label>
            </div>
            <div class="flex items-center gap-4">
              <label class="w-40 text-slate-600 font-medium">Ngày sinh</label>
              <select class="input-box w-24">
                <option>Ngày</option>
              </select>
              <select class="input-box w-24">
                <option>Tháng</option>
              </select>
              <select class="input-box w-24">
                <option>Năm</option>
              </select>
            </div>
            <div class="flex items-center gap-4 mt-2">
              <label class="w-40"></label>
              <button
                type="submit"
                class="bg-rose-500 text-white px-8 py-2 rounded font-semibold hover:bg-rose-600 transition"
                v-on:submit="$event.preventDefault()"
              >
                Lưu
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
