<script setup lang="ts">
import IconContentButton from '../ui/IconContentButton.vue'
import {
  Shirt,
  Smartphone,
  Tv,
  Laptop,
  Camera,
  Watch,
  ShoppingBag,
  Zap,
  Home,
  Baby,
  UtensilsCrossed,
  Sparkles,
  Droplet,
  Footprints,
  ShoppingBasket,
  Gift,
  Dumbbell,
  Bike,
} from 'lucide-vue-next'
import { type FunctionalComponent } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const categories: Array<{
  icon: FunctionalComponent
  label: string
  iconColor: string
  backgroundColor: string
}> = [
  {
    icon: Shirt,
    label: 'Thời Trang Nam',
    iconColor: 'text-blue-600',
    backgroundColor: 'bg-blue-50',
  },
  {
    icon: Smartphone,
    label: 'Điện Tử',
    iconColor: 'text-purple-600',
    backgroundColor: 'bg-purple-50',
  },
  {
    icon: Tv,
    label: 'TV & Thiết Bị',
    iconColor: 'text-indigo-600',
    backgroundColor: 'bg-indigo-50',
  },
  { icon: Laptop, label: 'Máy Tính', iconColor: 'text-gray-600', backgroundColor: 'bg-gray-50' },
  { icon: Camera, label: 'Máy Ảnh', iconColor: 'text-pink-600', backgroundColor: 'bg-pink-50' },
  { icon: Watch, label: 'Đồng Hồ', iconColor: 'text-amber-600', backgroundColor: 'bg-amber-50' },
  {
    icon: ShoppingBag,
    label: 'Thời Trang Nữ',
    iconColor: 'text-rose-600',
    backgroundColor: 'bg-rose-50',
  },
  { icon: Zap, label: 'Nhà Bếp', iconColor: 'text-orange-600', backgroundColor: 'bg-orange-50' },
  {
    icon: Home,
    label: 'Nhà Cửa & Đời Sống',
    iconColor: 'text-teal-600',
    backgroundColor: 'bg-teal-50',
  },
  {
    icon: Baby,
    label: 'Trẻ Em & Em Bé',
    iconColor: 'text-yellow-600',
    backgroundColor: 'bg-yellow-50',
  },
  {
    icon: UtensilsCrossed,
    label: 'Đồ Dùng Bếp',
    iconColor: 'text-red-600',
    backgroundColor: 'bg-red-50',
  },
  {
    icon: Sparkles,
    label: 'Làm Đẹp',
    iconColor: 'text-fuchsia-600',
    backgroundColor: 'bg-fuchsia-50',
  },
  {
    icon: Droplet,
    label: 'Mỹ Phẩm',
    iconColor: 'text-violet-600',
    backgroundColor: 'bg-violet-50',
  },
  {
    icon: Footprints,
    label: 'Giày Dép',
    iconColor: 'text-cyan-600',
    backgroundColor: 'bg-cyan-50',
  },
  {
    icon: ShoppingBasket,
    label: 'Túi Xách',
    iconColor: 'text-lime-600',
    backgroundColor: 'bg-lime-50',
  },
  {
    icon: Gift,
    label: 'Quà Tặng',
    iconColor: 'text-emerald-600',
    backgroundColor: 'bg-emerald-50',
  },
  { icon: Dumbbell, label: 'Thể Thao', iconColor: 'text-sky-600', backgroundColor: 'bg-sky-50' },
  { icon: Bike, label: 'Xe Cộ', iconColor: 'text-slate-600', backgroundColor: 'bg-slate-50' },
]
</script>
<template>
  <div class="w-full h-full bg-white rounded-xl shadow-md overflow-y-auto shadow-gray-300">
    <h2 class="text-slate-800 text-xl px-4 pt-4">DANH MỤC</h2>
    <div class="w-full grid grid-cols-9 gap-4 p-4">
      <IconContentButton
        v-for="category in categories"
        :key="category.label"
        :buttonContent="category.label"
        :iconColor="category.iconColor"
        :backgroundColor="category.backgroundColor"
        :navigateOnClick="
          () => {
            router.push('/category/' + category.label)
          }
        "
        :is-rounded-full="false"
      >
        <component :is="category.icon" />
      </IconContentButton>
    </div>
  </div>
</template>
<style scoped></style>
