<template>
  <div class="h-2 rounded-100 bg-white/70 overflow-hidden" role="progressbar" :aria-valuenow="value" aria-valuemin="0" :aria-valuemax="100">
    <div class="h-full bg-accent-orange-500" :style="{ width: pct }"></div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ step: number; total: number }>()
const pct = `${Math.round(((props.step + 1) / props.total) * 100)}%`
const value = Math.round(((props.step + 1) / props.total) * 100)
</script>