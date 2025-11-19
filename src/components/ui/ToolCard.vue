<script lang="ts" setup>
defineProps({
  icon: Object,
  title: String,
  description: String,
  tag: String
});

</script>
<template>
  <button @click="$emit('click')" class="text-left p-4 flex items-start gap-4 hover:bg-gray-50 rounded-lg w-full cursor-pointer">
    <div class="bg-blue-100 text-blue-600 p-3 rounded-full">
      <component :is="icon" :size="24" />
    </div>
    <div class="flex-1">
      <h4 class="font-semibold flex items-center gap-2">
        {{ title }}
        <span v-if="tag" class="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">{{ tag }}</span>
      </h4>
      <p class="text-sm text-gray-500">{{ description }}</p>
    </div>
  </button>
</template>

