<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormSection',
  props: {
    title: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <h3 class="text-lg font-semibold mb-6 border-b border-gray-200 pb-4">
      {{ title }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </h3>
    <slot></slot>
  </div>
</template>
