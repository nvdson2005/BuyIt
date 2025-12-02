<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function navigateToCustomerService() {
  router.push('/customer-service')
}

function navigateToAbout() {
  router.push('/about')
}
</script>
<template>
  <div class="w-full bg-(--pure-light) border-t-slate-200 border flex flex-col items-center py-10">
    <div class="w-[80%] grid grid-cols-4 gap-4">
      <div>
        <div class="text-black mb-4 text-lg">Customer Service</div>
        <div class="text-slate-600 text-sm leading-8 flex flex-col items-baseline">
          <button class="basic-hyperlink" @click="navigateToCustomerService">Help Center</button>
          <button class="basic-hyperlink" @click="navigateToCustomerService">How to Buy</button>
          <button class="basic-hyperlink" @click="navigateToCustomerService">
            Shipping & Delivery
          </button>
          <button class="basic-hyperlink" @click="navigateToCustomerService">
            Return & Refunds
          </button>
          <button class="basic-hyperlink" @click="navigateToCustomerService">Contact Us</button>
        </div>
      </div>
      <div>
        <div class="text-black mb-4 text-lg">About Us</div>
        <div class="text-slate-600 text-sm leading-8 flex flex-col items-baseline">
          <button class="basic-hyperlink" @click="navigateToAbout">About Company</button>
          <button class="basic-hyperlink" @click="navigateToAbout">Careers</button>
          <button class="basic-hyperlink" @click="navigateToAbout">Press & News</button>
          <button class="basic-hyperlink" @click="navigateToAbout">Store Locations</button>
          <button class="basic-hyperlink" @click="navigateToAbout">Affiliate Program</button>
        </div>
      </div>
      <div>
        <div class="text-black mb-4 text-lg">Payment</div>
        <div class="text-slate-600 text-sm leading-8 flex flex-col items-baseline">
          <button class="basic-hyperlink">Payment Methods</button>
          <button class="basic-hyperlink">Gift Cards</button>
          <button class="basic-hyperlink">Promotions</button>
          <button class="basic-hyperlink">Coupons</button>
          <button class="basic-hyperlink">Rewards</button>
        </div>
      </div>
      <div>
        <div class="text-black mb-4 text-lg">Follow Us</div>
        <div class="text-slate-600 text-sm leading-8 flex flex-col items-baseline">
          <a href="https://www.facebook.com" class="basic-hyperlink" target="_blank">Facebook</a>
          <a href="https://x.com" class="basic-hyperlink" target="_blank">Twitter</a>
          <a href="https://www.instagram.com" class="basic-hyperlink" target="_blank">Instagram</a>
          <a href="https://www.linkedin.com" class="basic-hyperlink" target="_blank">LinkedIn</a>
          <a href="https://www.youtube.com" class="basic-hyperlink" target="_blank">YouTube</a>
        </div>
      </div>
    </div>
    <div class="text-slate-500 text-sm mt-10">&copy; 2025 BuyIt. All rights reserved.</div>
  </div>
</template>
<style scoped></style>
