<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import IconContentButton from '../ui/IconContentButton.vue'
import { Zap, CreditCard, Gift, Sparkles, Globe, TicketPercent } from 'lucide-vue-next'
const quickLinks: Array<{ icon: FunctionalComponent; label: string; color: string }> = [
  { icon: Zap, label: 'Flash Sale', color: 'text-orange-500' },
  { icon: CreditCard, label: 'Pay', color: 'text-blue-500' },
  { icon: Gift, label: 'Reward', color: 'text-purple-500' },
  { icon: Sparkles, label: 'New Products', color: 'text-pink-500' },
  { icon: TicketPercent, label: 'Voucher', color: 'text-green-500' },
  { icon: Globe, label: 'Global', color: 'text-indigo-500' },
]
</script>
<template>
  <div
    class="w-full h-full bg-white rounded-xl shadow-md shadow-gray-300 grid grid-cols-6 px-4 py-4 gap-3"
  >
    <IconContentButton
      v-for="link in quickLinks"
      :key="link.label"
      :buttonContent="link.label"
      :iconColor="link.color"
      :navigateOnClick="
        () => {
          // console.log(link.label)
        }
      "
      :is-rounded-full="true"
    >
      <component :is="link.icon" />
    </IconContentButton>
    <!-- <IconContentButton buttonContent="Button 1" >
      <Zap />
    </IconContentButton>
    <IconContentButton buttonContent="Button 2">
      <CreditCard />
    </IconContentButton>
    <IconContentButton buttonContent="Button 3">
      <Gift />
    </IconContentButton>
    <IconContentButton buttonContent="Button 4">
      <Sparkles />
    </IconContentButton>
    <IconContentButton buttonContent="Button 5">
      <Tag />
    </IconContentButton>
    <IconContentButton buttonContent="Button 6">
      <Globe />
    </IconContentButton> -->
  </div>
</template>
<style scoped></style>
