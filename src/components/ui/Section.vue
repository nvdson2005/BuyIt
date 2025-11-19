<script lang="ts" setup>
defineProps({
  title: String
});
</script>

<template>
  <div>
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm">
      <slot></slot>
    </div>
  </div>
</template>


