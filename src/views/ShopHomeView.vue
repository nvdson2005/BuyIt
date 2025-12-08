<script lang="ts" setup>
import apiClient from '@/api/client'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Plus, Minus } from 'lucide-vue-next'
import { type Shop, type Product, type Voucher, type UserVoucher } from '@/utils/interface'
import ProductCard from '@/components/ui/ProductCard.vue'
import { Store, UserRoundPlus, Star } from 'lucide-vue-next'
import { notify, notifyAsync } from '@/utils/notify'
import NavBar from '@/components/layout/NavBar.vue'
import VoucherCard from '@/components/ui/VoucherCard.vue'
import LoadingScreen from '@/components/layout/LoadingScreen.vue'
const route = useRoute()
const shopId = route.params.id
const shop = ref<Shop>({
  id: '',
  name: '',
  description: '',
  rating: 0,
  followers: 0,
})
const products = ref<Product[]>([])
const vouchers = ref<Voucher[]>([])
const userVouchers = ref<UserVoucher[]>([])
const isFollowed = ref(false)
const isLoading = ref(true)

onMounted(async () => {
  try {
    // Execute all API calls in parallel using Promise.allSettled
    const results = await Promise.allSettled([
      apiClient.get(`/shop/get-detail/${shopId}`),
      apiClient.get(`/voucher/get-by-shopId/${shopId}`),
      apiClient.get(`/products/get-by-shopid/${shopId}`),
      apiClient.get(`/buyer/shop/${shopId}/is-following`),
      apiClient.get(`/buyer/user-vouchers`),
    ])

    // Process shop details
    if (results[0].status === 'fulfilled') {
      shop.value = results[0].value.data.shop
    } else {
      console.error('Failed to fetch shop details:', results[0].reason)
      notify('Failed to load shop information', 'error')
    }

    // Process vouchers
    if (results[1].status === 'fulfilled') {
      vouchers.value = results[1].value.data.vouchers.filter(
        (voucher: Voucher) => voucher.is_active === true,
      )
    } else {
      console.error('Failed to fetch vouchers:', results[1].reason)
    }

    // Process products
    if (results[2].status === 'fulfilled') {
      products.value = results[2].value.data.products
    } else {
      console.error('Failed to fetch products:', results[2].reason)
      notify('Failed to load products', 'error')
    }

    // Process follow status
    if (results[3].status === 'fulfilled') {
      isFollowed.value = results[3].value.data.isFollowing
    } else {
      console.error('Failed to fetch follow status:', results[3].reason)
    }

    // Process user vouchers
    if (results[4].status === 'fulfilled') {
      userVouchers.value = results[4].value.data.userVouchers
    } else {
      console.error('Failed to fetch user vouchers:', results[4].reason)
    }
  } catch (err) {
    console.error('Unexpected error while fetching data:', err)
    notify('Failed to load shop data', 'error')
  } finally {
    isLoading.value = false
  }
})

async function handleFollow() {
  try {
    await notifyAsync(apiClient.post(`buyer/shop/${shopId}/follow`))
    notify(`Follow ${shop.value?.name} successfully!`, 'success')
    shop.value.followers++
    isFollowed.value = true
  } catch (err) {
    notify(`Follow ${shop.value?.name} failed!`, 'error')
    console.error('Getting data failed: ', err)
  }
}
async function handleUnfollow() {
  try {
    await notifyAsync(apiClient.post(`buyer/shop/${shopId}/unfollow`))
    notify(`Unfollow ${shop.value?.name} successfully!`, 'success')
    shop.value.followers--
    isFollowed.value = false
  } catch (err) {
    notify(`Unfollow ${shop.value?.name} failed!`, 'error')
    console.error('Getting data failed: ', err)
  }
}
</script>

<template>
  <NavBar />
  <div v-if="!isLoading" class="min-h-screen bg-[var(--light-pink)] pb-12">
    <!-- Shop Header Section -->
    <div
      class="bg-gradient-to-br from-white via-[var(--pink)] to-white w-full py-12 border-b-2 border-[var(--pink)] shadow-lg"
    >
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <!-- Shop Info Card -->
          <div
            class="lg:col-span-2 bg-white rounded-2xl p-8 shadow-xl border-2 border-[var(--red)]/20 hover:shadow-2xl transition-shadow duration-300"
          >
            <div class="flex items-start justify-between mb-6">
              <div class="flex-1">
                <h1 class="text-3xl font-bold text-gray-900 mb-3">{{ shop?.name }}</h1>
                <p class="text-gray-600 leading-relaxed">
                  {{ shop?.description || 'Welcome to our shop!' }}
                </p>
              </div>
            </div>
            <div class="flex justify-end">
              <button
                v-if="!isFollowed"
                class="flex items-center gap-2 px-6 py-3 rounded-lg text-white bg-[var(--red)] hover:bg-red-700 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-semibold"
                @click="handleFollow()"
              >
                <Plus :size="18" class="shrink-0" />
                Follow Shop
              </button>
              <button
                v-else
                class="flex items-center gap-2 px-6 py-3 rounded-lg text-white bg-gray-600 hover:bg-gray-700 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-semibold"
                @click="handleUnfollow()"
              >
                <Minus :size="18" class="shrink-0" />
                Unfollow
              </button>
            </div>
          </div>

          <!-- Statistics Cards -->
          <div class="lg:col-span-1 space-y-4">
            <div
              class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200"
            >
              <div class="flex items-center gap-4">
                <div class="p-3 bg-[var(--pink)] rounded-lg">
                  <Store :size="24" class="text-[var(--red)]" />
                </div>
                <div>
                  <p class="text-sm text-gray-500 font-medium">Products</p>
                  <p class="text-2xl font-bold text-[var(--red)]">{{ products.length }}</p>
                </div>
              </div>
            </div>

            <div
              class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200"
            >
              <div class="flex items-center gap-4">
                <div class="p-3 bg-[var(--pink)] rounded-lg">
                  <UserRoundPlus :size="24" class="text-[var(--red)]" />
                </div>
                <div>
                  <p class="text-sm text-gray-500 font-medium">Followers</p>
                  <p class="text-2xl font-bold text-[var(--red)]">{{ shop?.followers }}</p>
                </div>
              </div>
            </div>

            <div
              class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200"
            >
              <div class="flex items-center gap-4">
                <div class="p-3 bg-[var(--pink)] rounded-lg">
                  <Star :size="24" class="text-[var(--red)] fill-[var(--orange)]" />
                </div>
                <div>
                  <p class="text-sm text-gray-500 font-medium">Rating</p>
                  <p class="text-2xl font-bold text-[var(--red)]">
                    {{ shop?.rating?.toFixed(1) || '0.0' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vouchers Section -->
    <div class="max-w-7xl mx-auto px-6 mt-12">
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div class="flex items-center gap-3 mb-8">
          <div class="h-1 w-12 bg-[var(--red)] rounded-full"></div>
          <h2 class="text-2xl font-bold text-gray-900">Available Vouchers</h2>
          <div class="flex-1 h-1 bg-gray-200 rounded-full"></div>
        </div>
        <div
          v-if="vouchers.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <VoucherCard
            v-for="voucher in vouchers"
            :key="voucher.voucher_id"
            :id="voucher.voucher_id"
            :amount="voucher.discount_amount"
            :minAmount="voucher.min_amount_to_apply"
            :maxAmount="voucher.max_discount_amount"
            :limit="voucher.usage_limit"
            :discountType="voucher.discount_type"
            :startDate="voucher.start_date"
            :expiryDate="voucher.expiry_date"
            :isClaimed="userVouchers.some((v) => v.voucher_id === voucher.voucher_id)"
          />
        </div>
        <div v-else class="text-center py-12">
          <p class="text-gray-500 text-lg">No vouchers available at the moment</p>
        </div>
      </div>
    </div>

    <!-- Products Section -->
    <div class="max-w-7xl mx-auto px-6 mt-12">
      <div class="flex items-center gap-3 mb-8">
        <div class="h-1 w-12 bg-[var(--red)] rounded-full"></div>
        <h2 class="text-2xl font-bold text-gray-900">Shop Products</h2>
        <div class="flex-1 h-1 bg-gray-200 rounded-full"></div>
        <span class="text-sm text-gray-500 font-medium">({{ products.length }} items)</span>
      </div>
      <div
        v-if="products.length > 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
      >
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
      <div v-else class="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
        <p class="text-gray-500 text-lg">No products available at the moment</p>
      </div>
    </div>
  </div>
  <LoadingScreen v-else />
</template>
