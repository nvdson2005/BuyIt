<script setup lang="ts">
import ProductCard from '../ui/ProductCard.vue'
</script>
<template>
  <div class="w-full h-full bg-white rounded-xl shadow-md overflow-auto shadow-gray-300">
    <h2 class="text-slate-800 text-xl p-4">EXPLORE TODAY</h2>
    <div class="w-full mt-4 grid grid-cols-5 gap-4 p-4">
      <ProductCard v-for="n in 10" :key="n" />
    </div>
  </div>
</template>
<style scoped></style>
