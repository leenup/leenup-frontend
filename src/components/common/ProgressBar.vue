<template>
  <div class="relative h-3 w-full rounded-full bg-secondary-200">
    <div
      class="h-full rounded-full bg-primary-600 transition-all duration-300"
      :style="{ width: clamped + '%' }"
      role="progressbar"
      :aria-valuenow="clamped"
      aria-valuemin="0"
      aria-valuemax="100"
    />
    <img
      :src="capIcon"
      alt=""
      class="absolute h-5 w-5 -translate-y-1/2 transition-all duration-300"
      :style="capStyle"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import capIcon from '@/assets/icons/common/icon-barre-progression.svg'

const props = defineProps<{ value: number }>()
const clamped = computed(() => {
  const v = Math.max(0, Math.min(props.value, 1))
  return Math.round(v * 100)
})

const capStyle = computed(() => ({
  left: `calc(${clamped.value}% )`,
  top: '50%',
  transform: 'translate(-50%, -50%)',
}))
</script>
