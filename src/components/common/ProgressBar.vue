<template>
  <div class="h-3 w-full rounded-full bg-secondary-400">
    <div
      class="h-full rounded-full bg-cta-600 transition-all duration-300"
      :style="{ width: clamped + '%' }"
      role="progressbar"
      :aria-valuenow="clamped"
      aria-valuemin="0"
      aria-valuemax="100"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ value: number }>()
const clamped = computed(() => {
  const v = Math.max(0, Math.min(props.value, 1))
  return Math.round(v * 100)
})
</script>
