<script lang="ts" setup>

  import {ref } from 'vue';
  import {type BuyerOrder, type Review} from '@/utils/interface';
  import CustomImage from '../ui/CustomImage.vue';
  import UploadImageButton from '../ui/UploadImageButton.vue';
  import { Star } from 'lucide-vue-next';
  import apiClient from '@/api/client';
  const props = defineProps<{
    order: BuyerOrder
  }>()
  const emit = defineEmits(['onCancel', 'onSave'])
  const buyerId = localStorage.getItem('id')
  const rateError = ref(false)
  const reviews = ref<Review[]>(props.order.orderitems.map(item => ({
    id: '',
    product_id: item.prod_id,
    product_variant_id: item.prod_var_id,
    buyer_id: buyerId ?? '',
    rating: 0,
    comment: '',
    created_at: '',
    image_url: '',
  })));
  async function handleSaveReview(){
    if(reviews.value.filter(r => r.rating === 0).length){
      rateError.value = true
    }
    else{
      try {
        await apiClient.post(`/buyer/order/${props.order.order_id}/reviews`, {
          reviews: reviews.value
        });
        emit('onSave')

      } catch (error) {
        console.error('Adding reviews failed:', error);
      }
    }
  }
</script>

<template>
  <div class="fixed inset-0 bg-black/20 flex items-center justify-center p-4">
  <div
    class="bg-white mt-20 rounded-lg w-full max-w-2xl p-6
           max-h-[72vh] overflow-y-auto"
  >
    <h2 class="text-lg font-semibold mb-4">Rate Product</h2>

    <div class="space-y-6">
      <div
        v-for="(item, index) in order.orderitems"
        :key="item.order_item_id"
        class="pb-4 border-b border-gray-300 last:border-none"
      >
        <!-- ITEM ROW -->
        <div class="flex items-start gap-4">
          <CustomImage
            :src="item.productVariant.image_url"
            :alt="item.product.name"
            class="w-24 h-24 object-cover rounded"
          />

          <!-- Product Info -->
          <div class="flex flex-col justify-center">
            <div class="font-medium text-slate-800 text-base">
              {{ item.product.name }}
            </div>
            <div class="text-xs text-slate-500 mt-1">
              Phân loại: {{ item.productVariant?.name || "N/A" }}
            </div>
          </div>
        </div>
        <div class="flex mt-4 gap-2">
          <p class="text-sm font-medium">Chất lượng: </p>
          <button class="cursor-pointer">
            <Star
              :class="reviews[index]!.rating >= 1? 'text-yellow-400' : 'text-gray-300'"
              fill="currentColor"
              @click="reviews[index]!.rating = 1"/>
          </button>
          <button class="cursor-pointer">
            <Star
              :class="reviews[index]!.rating >= 2? 'text-yellow-400' : 'text-gray-300'"
              fill="currentColor"
              @click="reviews[index]!.rating = 2"/>
          </button>
          <button class="cursor-pointer">
            <Star
              :class="reviews[index]!.rating >= 3? 'text-yellow-400' : 'text-gray-300'"
              fill="currentColor"
              @click="reviews[index]!.rating = 3"/>
          </button>
          <button class="cursor-pointer">
            <Star
              :class="reviews[index]!.rating >= 4? 'text-yellow-400' : 'text-gray-300'"
              fill="currentColor"
              @click="reviews[index]!.rating = 4"/>
          </button>
          <button class="cursor-pointer">
            <Star
              :class="reviews[index]!.rating === 5? 'text-yellow-400' : 'text-gray-300'"
              fill="currentColor"
              @click="reviews[index]!.rating = 5"/>
          </button>
        </div>
        <!-- Comment Box -->
        <div class="mt-3">
          <label class="text-sm font-medium" for="description">Comment</label>
          <textarea
            v-model="reviews[index]!.comment"
            id="comment"
            class="w-full rounded-md bg-gray-100 px-3 py-2 text-sm mt-1
                   focus:outline-none focus:ring-[3px] focus:ring-gray-300
                   min-h-[100px] max-h-[180px] overflow-y-auto"
            placeholder="Share more thoughts on the product to help other buyer."
            rows="5"
          ></textarea>
        </div>
        <UploadImageButton v-model="reviews[index]!.image_url"></UploadImageButton>
      </div>
    </div>
    <p v-if="rateError" class="text-sm text-red-600 mb-2">Please rate products before confirm!</p>

    <div class="flex gap-6 ">
      <button class="flex-1 text-sm font-semibold border border-gray-300 py-3 rounded hover:bg-gray-100 cursor-pointer" @click="$emit('onCancel')">Cancel</button>
      <button class="flex-1 bg-[var(--red)] text-sm font-semibold text-white py-3 rounded hover:bg-red-600 cursor-pointer" @click="handleSaveReview">
        Confirm
      </button>
    </div>
  </div>
</div>

</template>
