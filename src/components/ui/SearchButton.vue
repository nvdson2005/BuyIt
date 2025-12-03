<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { defineModel } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const modelValue = defineModel<string>({
  type: String,
  required: true,
})

const performSearch = async () => {
  // console.log('Searching for:', modelValue.value)
  if (modelValue.value && modelValue.value.trim() !== '') {
    await router.push({ name: 'search', query: { query: modelValue.value.trim() } })
  }
}
</script>
<template>
  <button
    class="w-full h-full bg-(--orange) cursor-pointer"
    @click="performSearch"
    @keydown.enter="performSearch"
  >
    <Search class="inline-block mr-1" />
  </button>
</template>
<style scoped></style>
