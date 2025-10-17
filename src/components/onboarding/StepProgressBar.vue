<template>
  <div class="relative h-2 rounded-full bg-accent-orange-200 overflow-hidden" role="progressbar" aria-valuenow="value" aria-valuemin="0" aria-valuemax="100">
    <div
      class="absolute left-0 top-0 h-full bg-accent-orange-500 transition-all duration-300 ease-in-out rounded-full"
      :style="{ width: pct }"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ step: number; total: number }>()
const pct = `${Math.round(((props.step + 1) / props.total) * 100)}%`
const value = Math.round(((props.step + 1) / props.total) * 100)
</script>