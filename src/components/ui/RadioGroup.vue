<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string,
  options: { label: string; value: string }[],
  direction?: 'horizontal' | 'vertical'
}>()
const emit = defineEmits(['update:modelValue'])

const handleChange = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="radio-group" :class="props.direction">
    <label
      class="radio-option"
      v-for="opt in props.options"
      :key="opt.value"
    >
      <input
        type="radio"
        :value="opt.value"
        :checked="props.modelValue === opt.value"
        @change="handleChange(opt.value)"
      />
      <span class="radio-label">{{ opt.label }}</span>
    </label>
  </div>
</template>

<style scoped>
.radio-group {
  display: flex;
  gap: 20px;
}

.radio-group.horizontal {
  flex-direction: row;
}

.radio-group.vertical {
  flex-direction: column;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.radio-option input[type="radio"]:checked {
  accent-color: #dc2626;
}

input[type="radio"] {
  width: 16px;
  height: 16px;
}
</style>
