<script lang='ts' setup>
defineProps({
  icon: Object,
  title: String,
  description: String,
  buttonText: String
});
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
    <div class="flex items-center gap-3 mb-4">
      <component :is="icon" class="w-6 h-6 text-red-500" />
      <h3 class="font-semibold">{{ title }}</h3>
    </div>

    <p class="text-sm text-gray-500 mb-6 flex-1">{{ description }}</p>

    <div class="text-right">
      <button
        class="
        inline-flex items-center justify-center gap-2 px-3 py-1 whitespace-nowrap rounded-md
                text-white font-medium transition-all cursor-pointer
                border border-gray-300
                bg-[#ee4d2d] text-gray-700
                hover:bg-[#d73211] hover:border-gray-400
                active:bg-gray-200
                mt-2"
                @click="$emit('actionClick')">
                {{ buttonText }}
            </button>
    </div>
  </div>
</template>


