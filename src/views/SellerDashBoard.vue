<script setup lang="ts">
defineProps<{
  pending: number
  paid: number
  delivering: number
  delivered: number
  cancelled: number
  returned: number
  packing: number
}>()
</script>
<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">Order Statistics</h3>
        <a href="#" class="text-sm text-blue-600">See all</a>
      </div>
      <div class="grid grid-cols-4 gap-4 text-center">
        <div class="p-4 rounded-lg border border-gray-200 bg-orange-50">
          <div class="text-3xl font-bold text-orange-600">{{ pending }}</div>
          <div class="text-sm text-gray-600">Pending</div>
        </div>
        <div class="p-4 rounded-lg border border-gray-200 bg-blue-50">
          <div class="text-3xl font-bold text-blue-600">{{ paid }}</div>
          <div class="text-sm text-gray-600">Paid</div>
        </div>
        <div class="p-4 rounded-lg border border-gray-200 bg-amber-50">
          <div class="text-3xl font-bold text-amber-600">{{ packing }}</div>
          <div class="text-sm text-gray-600">Packing</div>
        </div>
        <div class="p-4 rounded-lg border border-gray-200 bg-indigo-50">
          <div class="text-3xl font-bold text-indigo-600">{{ delivering }}</div>
          <div class="text-sm text-gray-600">Delivering</div>
        </div>
        <div class="p-4 rounded-lg border border-gray-200 bg-green-50">
          <div class="text-3xl font-bold text-green-600">{{ delivered }}</div>
          <div class="text-sm text-gray-600">Delivered</div>
        </div>
        <div class="p-4 rounded-lg border border-gray-200 bg-red-50">
          <div class="text-3xl font-bold text-red-600">{{ cancelled }}</div>
          <div class="text-sm text-gray-600">Cancelled</div>
        </div>
        <div class="p-4 rounded-lg border border-gray-200 bg-purple-50">
          <div class="text-3xl font-bold text-purple-600">{{ returned }}</div>
          <div class="text-sm text-gray-600">Return</div>
        </div>
      </div>
    </div>
  </div>
</template>
