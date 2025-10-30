<script lang="ts" setup>
import { ref, defineEmits } from 'vue'
import { SortOption, PriceFilterOption } from '@/utils/enum'
const currentSort = ref(SortOption.MOST_SOLD)
const currentPriceFilter = ref(PriceFilterOption.ALL_PRICES)

const emits = defineEmits<{
  (e: 'sort-changed', sortOption: SortOption): void
  (e: 'price-filter-changed', priceFilter: PriceFilterOption): void
}>()

const handleFilterPriceChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  if (!target) {
    console.error('No target found in event')
    return
  }
  const newFilter = target.value as PriceFilterOption
  if (!newFilter) {
    console.error('No price filter option selected')
    return
  }
  if (!Object.values(PriceFilterOption).includes(target.value as PriceFilterOption)) {
    console.error('Invalid price filter option selected')
    return
  }
  currentPriceFilter.value = newFilter
  emits('price-filter-changed', newFilter)
}

const handleSortChange = (newSort: SortOption) => {
  currentSort.value = newSort
  emits('sort-changed', newSort)
}
</script>
<template>
  <div
    class="w-full h-full bg-white/60 rounded-lg p-4 flex items-center justify-between gap-4 shadow-sm"
  >
    <div class="flex items-center gap-3 flex-wrap">
      <span class="text-sm text-slate-500">Sort in:</span>
      <button
        :class="
          currentSort === SortOption.MOST_SOLD
            ? 'bg-[var(--orange)] text-white'
            : 'text-slate-600 transition-colors duration-150 hover:bg-slate-300'
        "
        class="px-3 py-1 rounded-md border"
        @click="
          () => {
            handleSortChange(SortOption.MOST_SOLD)
          }
        "
      >
        Most Sold
      </button>
      <button
        :class="
          currentSort === SortOption.MOST_RATED
            ? 'bg-[var(--orange)] text-white'
            : 'text-slate-600 transition-colors duration-150 hover:bg-slate-300'
        "
        class="px-3 py-1 rounded-md border"
        @click="
          () => {
            handleSortChange(SortOption.MOST_RATED)
          }
        "
      >
        Most Rated
      </button>
      <button
        :class="
          currentSort === SortOption.PRICE_LOW_TO_HIGH
            ? 'bg-[var(--orange)] text-white'
            : 'text-slate-600 transition-colors duration-150 hover:bg-slate-300'
        "
        class="px-3 py-1 rounded-md border"
        @click="
          () => {
            handleSortChange(SortOption.PRICE_LOW_TO_HIGH)
          }
        "
      >
        Price: Low to High
      </button>
      <button
        :class="
          currentSort === SortOption.PRICE_HIGH_TO_LOW
            ? 'bg-[var(--orange)] text-white'
            : 'text-slate-600 transition-colors duration-150 hover:bg-slate-300'
        "
        class="px-3 py-1 rounded-md border"
        @click="
          () => {
            handleSortChange(SortOption.PRICE_HIGH_TO_LOW)
          }
        "
      >
        Price: High to Low
      </button>
    </div>

    <div class="flex items-center gap-3">
      <select
        class="p-3 rounded-xl text-sm"
        @change="
          (e) => {
            handleFilterPriceChange(e)
          }
        "
      >
        <option>{{ PriceFilterOption.ALL_PRICES }}</option>
        <option>{{ PriceFilterOption.BELOW_5MIL }}</option>
        <option>{{ PriceFilterOption.FROM_5MIL_TO_20MIL }}</option>
        <option>{{ PriceFilterOption.ABOVE_20MIL }}</option>
      </select>
    </div>
  </div>
</template>
<style scoped></style>
