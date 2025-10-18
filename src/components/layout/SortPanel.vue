<script lang="ts" setup>
import { ref, defineEmits } from 'vue'
import { SortOption, PriceFilterOption } from '@/utils/enum'
const currentSort = ref(SortOption.POPULAR)
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
          currentSort === SortOption.POPULAR
            ? 'bg-[var(--orange)] text-white'
            : 'text-slate-600 transition-colors duration-150 hover:bg-slate-300'
        "
        class="px-3 py-1 rounded-md border"
        @click="
          () => {
            handleSortChange(SortOption.POPULAR)
          }
        "
      >
        Popular
      </button>
      <button
        :class="
          currentSort === SortOption.NEWEST
            ? 'bg-[var(--orange)] text-white'
            : 'text-slate-600 transition-colors duration-150 hover:bg-slate-300'
        "
        class="px-3 py-1 rounded-md border"
        @click="
          () => {
            handleSortChange(SortOption.NEWEST)
          }
        "
      >
        Newest
      </button>
      <button
        :class="
          currentSort === SortOption.SELLING_FASTEST
            ? 'bg-[var(--orange)] text-white'
            : 'text-slate-600 transition-colors duration-150 hover:bg-slate-300'
        "
        class="px-3 py-1 rounded-md border"
        @click="
          () => {
            handleSortChange(SortOption.SELLING_FASTEST)
          }
        "
      >
        Selling Fastest
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
