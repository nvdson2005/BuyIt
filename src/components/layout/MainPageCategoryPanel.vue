<script setup lang="ts">
import IconContentButton from '../ui/IconContentButton.vue'
import {
  Shirt,
  Smartphone,
  BookOpen,
  Apple,
  ShoppingBag,
  Home,
  Baby,
  UtensilsCrossed,
  Sparkles,
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
    label: 'Men\'s Fashion',
    iconColor: 'text-blue-600',
    backgroundColor: 'bg-blue-50',
  },
  {
    icon: ShoppingBag,
    label: 'Women\'s Fashion',
    iconColor: 'text-rose-600',
    backgroundColor: 'bg-rose-50',
  },
  {
    icon: Smartphone,
    label: 'Electronics',
    iconColor: 'text-purple-600',
    backgroundColor: 'bg-purple-50',
  },
  { icon: BookOpen,
    label: 'Books & Media',
    iconColor: 'text-blue-800',
    backgroundColor: 'bg-blue-50' },
  {
    icon: Home,
    label: 'House & Life',
    iconColor: 'text-teal-600',
    backgroundColor: 'bg-teal-50',
  },
  {
    icon: Apple,
    label: 'Food & Groceries',
    iconColor: 'text-teal-600',
    backgroundColor: 'bg-teal-50',
  },
  {
    icon: Baby,
    label: 'Toys & Baby',
    iconColor: 'text-yellow-600',
    backgroundColor: 'bg-yellow-50',
  },
  {
    icon: UtensilsCrossed,
    label: 'Kitchen & Dining',
    iconColor: 'text-red-600',
    backgroundColor: 'bg-red-50',
  },
  {
    icon: Sparkles,
    label: 'Beauty & Personal Care',
    iconColor: 'text-fuchsia-600',
    backgroundColor: 'bg-fuchsia-50',
  },

  {
    icon: Gift,
    label: 'Gift',
    iconColor: 'text-emerald-600',
    backgroundColor: 'bg-emerald-50',
  },
  { icon: Dumbbell, label: 'Sport', iconColor: 'text-sky-600', backgroundColor: 'bg-sky-50' },
  { icon: Bike, label: 'Automotive', iconColor: 'text-slate-600', backgroundColor: 'bg-slate-50' },
]
</script>
<template>
  <div class="w-full h-full bg-white rounded-xl shadow-md overflow-y-auto shadow-gray-300">
    <h2 class="text-slate-800 text-xl px-4 pt-4">CATEGORY</h2>
    <div class="w-full grid grid-cols-6 gap-4 p-4">
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
