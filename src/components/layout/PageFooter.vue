<script setup lang="ts">
import { useRouter } from 'vue-router'
import 'primeicons/primeicons.css'
const router = useRouter()

function navigateToCustomerService() {
  router.push('/customer-service')
}

function navigateToAbout() {
  router.push('/about')
}

function navigateToPayment() {
  router.push('/payment')
}
</script>
<template>
  <div class="w-full bg-(--pure-light) border-t-slate-200 border flex flex-col items-center py-10">
    <div class="w-[80%] grid grid-cols-4 gap-4">
      <div>
        <div class="text-black mb-4 text-lg cursor-pointer" @click="navigateToCustomerService">
          Customer Service
        </div>
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
        <div class="text-black mb-4 text-lg cursor-pointer" @click="navigateToAbout">About Us</div>
        <div class="text-slate-600 text-sm leading-8 flex flex-col items-baseline">
          <button class="basic-hyperlink" @click="navigateToAbout">About Company</button>
          <button class="basic-hyperlink" @click="navigateToAbout">Careers</button>
          <button class="basic-hyperlink" @click="navigateToAbout">Press & News</button>
          <button class="basic-hyperlink" @click="navigateToAbout">Store Locations</button>
          <button class="basic-hyperlink" @click="navigateToAbout">Affiliate Program</button>
        </div>
      </div>
      <div>
        <div class="text-black mb-4 text-lg cursor-pointer" @click="navigateToPayment">Payment</div>
        <div class="text-slate-600 text-sm leading-8 flex flex-col items-baseline">
          <button class="basic-hyperlink" @click="navigateToPayment">Payment Methods</button>
          <button class="basic-hyperlink" @click="navigateToPayment">Gift Cards</button>
          <button class="basic-hyperlink" @click="navigateToPayment">Promotions</button>
          <button class="basic-hyperlink" @click="navigateToPayment">Coupons</button>
          <button class="basic-hyperlink" @click="navigateToPayment">Rewards</button>
        </div>
      </div>
      <div>
        <div class="text-black mb-4 text-lg">Follow Us</div>
        <div class="text-slate-600 text-sm leading-8 flex flex-col items-baseline">
          <a
            href="https://www.facebook.com"
            class="basic-hyperlink flex items-center gap-2"
            target="_blank"
            ><i class="pi pi-facebook"></i> Facebook</a
          >
          <a href="https://x.com" class="basic-hyperlink flex items-center gap-2" target="_blank"
            ><i class="pi pi-twitter"></i> Twitter</a
          >
          <a
            href="https://www.instagram.com"
            class="basic-hyperlink flex items-center gap-2"
            target="_blank"
            ><i class="pi pi-instagram"></i> Instagram</a
          >
          <a
            href="https://www.linkedin.com"
            class="basic-hyperlink flex items-center gap-2"
            target="_blank"
            ><i class="pi pi-linkedin"></i> LinkedIn</a
          >
          <a
            href="https://www.youtube.com"
            class="basic-hyperlink flex items-center gap-2"
            target="_blank"
            ><i class="pi pi-youtube"></i> YouTube</a
          >
        </div>
      </div>
    </div>
    <div class="text-slate-500 text-sm mt-10">&copy; 2025 BuyIt. All rights reserved.</div>
  </div>
</template>
<style scoped></style>
