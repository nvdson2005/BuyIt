<script lang="ts" setup>
import apiClient from '@/api/client';
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router';
import { Plus, Minus } from 'lucide-vue-next';
import { type Shop, type Product, type Voucher, type UserVoucher } from '@/utils/interface';
import ProductCard from '@/components/ui/ProductCard.vue';
import { Store, UserRoundPlus, Star } from 'lucide-vue-next';
import { notify, notifyAsync } from '@/utils/notify';
import NavBar from '@/components/layout/NavBar.vue';
import VoucherCard from '@/components/ui/VoucherCard.vue';
const route = useRoute()
const shopId = route.params.id
const shop = ref<Shop>({
  id: '',
  name: '',
  description: '',
  rating: 0,
  followers: 0
})
const products = ref<Product[]>([])
const vouchers = ref<Voucher[]>([])
const userVouchers = ref<UserVoucher[]>([])
const isFollowed = ref(false)
  onMounted(async () => {
    try {
      const shop_response = await apiClient.get(`/shop/get-detail/${shopId}`)
      const voucher_response = await apiClient.get(`/voucher/get-by-shopId/${shopId}`)
      const products_response = await apiClient.get(`/products/get-by-shopid/${shopId}`)
      const follow_response = await apiClient.get(`/buyer/shop/${shopId}/is-following`)
      const uservoucher_response = await apiClient.get(`/buyer/user-vouchers`)
      shop.value = shop_response.data.shop
      vouchers.value = voucher_response.data.vouchers.filter((voucher:Voucher) => voucher.is_active === true)
      products.value = products_response.data.products
      isFollowed.value = follow_response.data.isFollowing
      userVouchers.value = uservoucher_response.data.userVouchers
    } catch (err) {
      console.error('Getting data failed: ', err)
    }
  })

  async function handleFollow(){
    try {
      await notifyAsync(apiClient.post(`buyer/shop/${shopId}/follow`));
      notify(`Follow ${shop.value?.name} successfully!`, 'success')
      shop.value.followers++;
      isFollowed.value = true;
    } catch (err) {
      notify(`Follow ${shop.value?.name} failed!`, 'error')
      console.error('Getting data failed: ', err)
    }
  }
  async function handleUnfollow(){
    try {
      await notifyAsync(apiClient.post(`buyer/shop/${shopId}/unfollow`));
      notify(`Unfollow ${shop.value?.name} successfully!`, 'success')
      shop.value.followers--;
      isFollowed.value = false;
    } catch (err) {
      notify(`Unfollow ${shop.value?.name} failed!`, 'error')
      console.error('Getting data failed: ', err)
    }
  }
</script>

<template>
  <NavBar />
  <div class="min-h-screen bg-[var(--light-pink)]">

  <div class="bg-white w-full py-8 border-b border-gray-300 mb-6 shadow-md">

    <div class="grid grid-cols-2 gap-20 mt-10 mx-auto max-w-240">

      <div class="flex flex-col px-3 py-2 rounded border border-red-500 shadow-md">
        <div class="text-medium font-semibold">
          {{ shop?.name }}
        </div>

        <p class="text-sm text-gray-500 mb-4">{{ shop?.description }}</p>

        <div class="flex justify-end">
          <button
            v-if="!isFollowed"
            class="flex items-center px-2 py-1 gap-2 border border-slate-300 rounded text-white bg-[var(--red)] hover:bg-red-600 cursor-pointer"
            @click="handleFollow()"
          >
            <Plus :size="16" class="shrink-0"/>
            Follow
          </button>
          <button
            v-else
            class="flex items-center px-2 py-1 gap-2 border border-slate-300 rounded text-white bg-[var(--red)] hover:bg-red-600 cursor-pointer"
            @click="handleUnfollow()"
          >
            <Minus :size="12" class="shrink-0"/>
            Unfollow
          </button>
        </div>
      </div>

      <div class="flex-1 text-sm">
        <div class="flex items-center mb-4 gap-2">
          <div class="flex gap-4">
            <Store :size="20"/> Products:
          </div>
          <span class="text-red-500">{{ products.length }}</span>
        </div>
        <div class="flex items-center mb-4 gap-2">
          <div class="flex gap-4">
            <UserRoundPlus :size="20"/> Followers:
          </div>
           <span class="text-red-500">{{ shop?.followers }}</span>
        </div>
        <div class="flex items-center mb-4 gap-2">
          <div class="flex gap-4">
            <Star :size="20"/>Rating:
          </div>
          <span class="text-red-500">{{ shop?.rating }}</span>
        </div>
      </div>

    </div>

  </div>
  <div class="mx-auto w-[80%] bg-white px-6 w-30 py-8 border-b border-gray-300 mb-6 shadow-md">
    <h2 class="text-lg font-semibold mb-4">VOUCHER</h2>
    <div class="grid grid-cols-3 gap-6">
    <VoucherCard
      v-for="voucher in vouchers" :key="voucher.voucher_id"
      :id="voucher.voucher_id"
      :amount="voucher.discount_amount"
      :minAmount="voucher.min_amount_to_apply"
      :maxAmount="voucher.max_discount_amount"
      :limit="voucher.usage_limit"
      :discountType="voucher.discount_type"
      :startDate="voucher.start_date"
      :expiryDate="voucher.expiry_date"
      :isClaimed="userVouchers.some(v => v.voucher_id === voucher.voucher_id)"
    />
    </div>
  </div>
  <div class="mx-auto w-[80%]">
    <h2 class="text-lg px-6 mb-4 font-semibold">PRODUCT</h2>
    <div class="grid grid-cols-6 gap-6">
      <ProductCard
        v-for="product in products"
        :id="product.id"
        :key="product.id"
        :name="product.name"
        :description="product.description"
        :price="product.sale_price"
        :originalPrice="product.price"
        :rating="product.rating"
        :soldAmount="product.sold_amount"
        :imageUrl="product.image_url"
        :isSale="product.sale_price < product.price"
        :discountPercentage="
          Math.round(((product.price - product.sale_price) / product.price) * 100)
        "
      />
    </div>
  </div>
</div>

</template>
