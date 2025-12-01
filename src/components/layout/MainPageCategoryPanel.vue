<script setup lang="ts">
import IconContentButton from '../ui/IconContentButton.vue'
import {
  Smartphone,
  Shirt,
  ShoppingBag,
  Home,
  Sparkles,
  Dumbbell,
  Baby,
  Heart,
  Book,
  Car,
  PawPrint,
  UtensilsCrossed,
  Watch,
  Apple,
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
    icon: Smartphone,
    label: 'Electronics',
    iconColor: 'text-purple-600',
    backgroundColor: 'bg-purple-50',
  },
  {
    icon: Shirt,
    label: "Men's Fashion",
    iconColor: 'text-blue-600',
    backgroundColor: 'bg-blue-50',
  },
  {
    icon: ShoppingBag,
    label: "Women's Fashion",
    iconColor: 'text-rose-600',
    backgroundColor: 'bg-rose-50',
  },
  {
    icon: Home,
    label: 'Home & Living',
    iconColor: 'text-teal-600',
    backgroundColor: 'bg-teal-50',
  },
  {
    icon: UtensilsCrossed,
    label: 'Kitchen & Dining',
    iconColor: 'text-orange-600',
    backgroundColor: 'bg-orange-50',
  },
  {
    icon: Sparkles,
    label: 'Beauty & Personal Care',
    iconColor: 'text-fuchsia-600',
    backgroundColor: 'bg-fuchsia-50',
  },
  {
    icon: Dumbbell,
    label: 'Sports & Outdoors',
    iconColor: 'text-green-600',
    backgroundColor: 'bg-green-50',
  },
  {
    icon: Baby,
    label: 'Toys & Baby',
    iconColor: 'text-yellow-600',
    backgroundColor: 'bg-yellow-50',
  },
  {
    icon: Heart,
    label: 'Health & Wellness',
    iconColor: 'text-red-600',
    backgroundColor: 'bg-red-50',
  },
  {
    icon: Book,
    label: 'Books & Media',
    iconColor: 'text-indigo-600',
    backgroundColor: 'bg-indigo-50',
  },
  {
    icon: Car,
    label: 'Automotive',
    iconColor: 'text-slate-600',
    backgroundColor: 'bg-slate-50',
  },
  {
    icon: PawPrint,
    label: 'Pet Supplies',
    iconColor: 'text-amber-600',
    backgroundColor: 'bg-amber-50',
  },
  {
    icon: Watch,
    label: 'Jewelry & Watches',
    iconColor: 'text-cyan-600',
    backgroundColor: 'bg-cyan-50',
  },
  {
    icon: Apple,
    label: 'Food & Groceries',
    iconColor: 'text-emerald-600',
    backgroundColor: 'bg-emerald-50',
  },
]
</script>
<template>
  <div class="w-full h-full bg-white rounded-xl shadow-md overflow-y-auto shadow-gray-300">
    <h2 class="text-slate-800 text-xl px-4 pt-4">CATEGORIES</h2>
    <div class="w-full grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-4 p-4">
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
