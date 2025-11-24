<script lang="ts" setup>
import apiClient from '@/api/client'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'
import PageFooter from '@/components/layout/PageFooter.vue'
import SortPanel from '@/components/layout/SortPanel.vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import { SortOption, PriceFilterOption } from '@/utils/enum'
import { Search, ChevronDown, ChevronUp, X } from 'lucide-vue-next'
import { type Product } from '@/utils/interface'
const route = useRoute()

// Search query from URL params
const searchQuery = ref((route.query.q as string) || '')

const sampleProducts = ref<Product[]>([])

// Filter states
const selectedCategories = ref<string[]>([])
const selectedBrands = ref<string[]>([])
const selectedRatings = ref<number[]>([])
const inStockOnly = ref(false)
const currentPriceFilter = ref(PriceFilterOption.ALL_PRICES)

// Expand/collapse states for filter sections
const categoriesExpanded = ref(true)
const brandsExpanded = ref(true)
const ratingsExpanded = ref(true)
const stockExpanded = ref(true)

// Get unique categories and brands
const availableCategories = computed(() => {
  const uniqueCategories = new Map<string, string>()
  sampleProducts.value.forEach((p) => {
    if (!uniqueCategories.has(p.sub_category_id)) {
      uniqueCategories.set(p.sub_category_id, p.sub_category_name || '')
    }
  })
  return Array.from(uniqueCategories, ([id, name]) => ({ id, name })).sort((a, b) =>
    a.name.localeCompare(b.name),
  )
})

const availableBrands = computed(() => {
  const uniqueBrands = new Map<string, string>()
  sampleProducts.value.forEach((p) => {
    if (!uniqueBrands.has(p.shop_id)) {
      uniqueBrands.set(p.shop_id, p.shop_name || '')
    }
  })
  return Array.from(uniqueBrands, ([id, name]) => ({ id, name })).sort((a, b) =>
    a.name.localeCompare(b.name),
  )
})

// Filtered products
const filteredProducts = computed(() => {
  let result = sampleProducts.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.sub_category_id.toLowerCase().includes(query) ||
        p.shop_id.toLowerCase().includes(query),
    )
  }

  // Filter by category
  if (selectedCategories.value.length > 0) {
    result = result.filter((p) => selectedCategories.value.includes(p.sub_category_id))
  }

  // Filter by brand
  if (selectedBrands.value.length > 0) {
    result = result.filter((p) => selectedBrands.value.includes(p.shop_id))
  }

  // Filter by rating
  if (selectedRatings.value.length > 0) {
    result = result.filter((p) => {
      const predicate = (prodRating: number, selectedRating: number): boolean | undefined => {
        if (selectedRating === 4) {
          return prodRating >= 4
        } else if (selectedRating === 3) {
          return prodRating >= 3 && prodRating < 4
        } else if (selectedRating === 2) {
          return prodRating >= 2 && prodRating < 3
        } else if (selectedRating === 1) {
          return prodRating >= 1 && prodRating < 2
        }
      }
      return selectedRatings.value.some((rating) => predicate(p.rating, rating))
    })
  }

  // Filter by stock
  if (inStockOnly.value) {
    result = result.filter((p) => p.stock_quantity)
  }

  // Filter by price range
  if (currentPriceFilter.value !== PriceFilterOption.ALL_PRICES) {
    switch (currentPriceFilter.value) {
      case PriceFilterOption.BELOW_5MIL:
        result = result.filter((p) => p.price < 50)
        break
      case PriceFilterOption.FROM_5MIL_TO_20MIL:
        result = result.filter((p) => p.price >= 50 && p.price < 200)
        break
      case PriceFilterOption.ABOVE_20MIL:
        result = result.filter((p) => p.price >= 200)
        break
    }
  }

  return result
})

// Sorting
const handleSortChange = (sortOption: SortOption) => {
  const products = [...filteredProducts.value]

  switch (sortOption) {
    case SortOption.MOST_SOLD:
      products.sort((a, b) => b.sold_amount - a.sold_amount)
      break
    case SortOption.MOST_RATED:
      products.sort((a, b) => b.rating - a.rating)
      break
    case SortOption.PRICE_LOW_TO_HIGH:
      products.sort((a, b) => a.price - b.price)
      break
    case SortOption.PRICE_HIGH_TO_LOW:
      products.sort((a, b) => b.price - a.price)
      break
  }

  sampleProducts.value = products
}

const handlePriceFilterChange = (priceFilter: PriceFilterOption) => {
  currentPriceFilter.value = priceFilter
}

// Clear all filters
const clearAllFilters = () => {
  selectedCategories.value = []
  selectedBrands.value = []
  selectedRatings.value = []
  inStockOnly.value = false
  currentPriceFilter.value = PriceFilterOption.ALL_PRICES
}

const activeFiltersCount = computed(() => {
  return (
    selectedCategories.value.length +
    selectedBrands.value.length +
    selectedRatings.value.length +
    (inStockOnly.value ? 1 : 0) +
    (currentPriceFilter.value !== PriceFilterOption.ALL_PRICES ? 1 : 0)
  )
})

// ON MOUNTED
// Set up page title and fetch products
function setUpPageTitle() {
  searchQuery.value = (route.query.query as string) || ''
  document.title = searchQuery.value
    ? `Search: ${searchQuery.value} - BuyIt`
    : 'Search Results - BuyIt'
}

async function fetchProducts() {
  try {
    const response = await apiClient.get('/products/search', {
      params: { query: searchQuery.value },
    })
    sampleProducts.value = response.data.products ?? []
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

// Update search query when route changes
onMounted(() => {
  setUpPageTitle()
  fetchProducts()
})
</script>

<template>
  <div class="w-full min-h-screen bg-(--light-pink) flex flex-col">
    <NavBar />

    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Search header -->
      <div class="mb-6">
        <div class="flex items-center gap-3 mb-2">
          <Search class="w-6 h-6 text-slate-500" />
          <h1 class="text-2xl font-semibold text-slate-800">
            Search Results
            <span v-if="searchQuery" class="text-slate-600"> for "{{ searchQuery }}"</span>
          </h1>
        </div>
        <p class="text-slate-600 ml-9">
          {{ filteredProducts.length }}
          {{ filteredProducts.length === 1 ? 'product' : 'products' }} found
        </p>
      </div>

      <div class="flex gap-6">
        <!-- Filters Sidebar -->
        <aside class="w-64 shrink-0">
          <div class="bg-white rounded-lg shadow-sm p-4 sticky top-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-slate-800">Filters</h2>
              <button
                v-if="activeFiltersCount > 0"
                @click="clearAllFilters"
                class="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <X class="w-4 h-4" />
                Clear all
              </button>
            </div>

            <!-- Active filters count badge -->
            <div v-if="activeFiltersCount > 0" class="mb-4 px-3 py-2 bg-blue-50 rounded-md">
              <span class="text-sm text-blue-700 font-medium">
                {{ activeFiltersCount }}
                {{ activeFiltersCount === 1 ? 'filter' : 'filters' }} active
              </span>
            </div>

            <!-- Categories Filter -->
            <div class="border-b pb-4 mb-4">
              <button
                @click="categoriesExpanded = !categoriesExpanded"
                class="w-full flex items-center justify-between mb-3 text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                <span>Categories</span>
                <ChevronDown v-if="categoriesExpanded" class="w-4 h-4" />
                <ChevronUp v-else class="w-4 h-4" />
              </button>
              <div v-show="categoriesExpanded" class="space-y-2">
                <label
                  v-for="category in availableCategories"
                  :key="category.id"
                  class="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    :value="category.id"
                    v-model="selectedCategories"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span class="text-sm text-slate-700">{{ category.name }}</span>
                </label>
              </div>
            </div>

            <!-- Brands Filter -->
            <div class="border-b pb-4 mb-4">
              <button
                @click="brandsExpanded = !brandsExpanded"
                class="w-full flex items-center justify-between mb-3 text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                <span>Brands</span>
                <ChevronDown v-if="brandsExpanded" class="w-4 h-4" />
                <ChevronUp v-else class="w-4 h-4" />
              </button>
              <div v-show="brandsExpanded" class="space-y-2">
                <label
                  v-for="brand in availableBrands"
                  :key="brand.id"
                  class="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    :value="brand.id"
                    v-model="selectedBrands"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span class="text-sm text-slate-700">{{ brand.name }}</span>
                </label>
              </div>
            </div>

            <!-- Rating Filter -->
            <div class="border-b pb-4 mb-4">
              <button
                @click="ratingsExpanded = !ratingsExpanded"
                class="w-full flex items-center justify-between mb-3 text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                <span>Rating</span>
                <ChevronDown v-if="ratingsExpanded" class="w-4 h-4" />
                <ChevronUp v-else class="w-4 h-4" />
              </button>
              <div v-show="ratingsExpanded" class="space-y-2">
                <label
                  v-for="rating in [4, 3, 2, 1]"
                  :key="rating"
                  class="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    :value="rating"
                    v-model="selectedRatings"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span class="text-sm text-slate-700 flex items-center gap-1">
                    {{ rating }}-{{ rating + 1 }} ⭐
                  </span>
                </label>
              </div>
            </div>

            <!-- Stock Filter -->
            <div class="pb-4">
              <button
                @click="stockExpanded = !stockExpanded"
                class="w-full flex items-center justify-between mb-3 text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                <span>Availability</span>
                <ChevronDown v-if="stockExpanded" class="w-4 h-4" />
                <ChevronUp v-else class="w-4 h-4" />
              </button>
              <div v-show="stockExpanded">
                <Checkbox v-model="inStockOnly">
                  <span class="text-sm text-slate-700">In Stock Only</span>
                </Checkbox>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1">
          <!-- Sort Panel -->
          <div class="mb-6">
            <SortPanel
              @sort-changed="handleSortChange"
              @price-filter-changed="handlePriceFilterChange"
            />
          </div>

          <!-- Products Grid -->
          <div v-if="filteredProducts.length > 0" class="bg-white rounded-lg shadow-sm p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <ProductCard
                v-for="product in filteredProducts"
                :key="product.id"
                :id="product.id"
                :name="product.name"
                :description="product.description"
                :price="product.price"
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

          <!-- No Results -->
          <div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
            <Search class="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 class="text-xl font-semibold text-slate-800 mb-2">No products found</h3>
            <p class="text-slate-600 mb-6">Try adjusting your filters or search terms</p>
            <button
              @click="clearAllFilters"
              class="px-6 py-2 bg-(--red) text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </main>
      </div>
    </div>

    <PageFooter />
  </div>
</template>

<style scoped>
/* Custom scrollbar for filter sidebar */
aside {
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
}

aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
