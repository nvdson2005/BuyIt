<script lang="ts" setup>
import { Check } from 'lucide-vue-next'
import { defineProps, defineEmits, computed } from 'vue'

// Dùng v-model
const props = defineProps({
  modelValue: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

const isChecked = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<template>
  <label
    class="inline-flex items-center gap-2 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed"
  >

    <span
      class="relative inline-flex items-center justify-center size-4 border rounded border-2 border-red-700
             bg-white transition-all"
    >
      <input
        v-model="isChecked"
        type="checkbox"
        class="absolute inset-0 opacity-0 cursor-pointer peer"
      />
      <Check
        class="text-primary text-red-600 opacity-0 peer-checked:opacity-100 transition-opacity"
      />
    </span>

    <slot />

  </label>
</template>
