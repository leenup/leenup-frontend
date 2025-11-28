<template>
  <div class="flex items-center gap-2">
    <button
      v-for="(_, i) in total"
      :key="i"
      type="button"
      class="h-2 w-2 rounded-full transition-all"
      :class="i === index ? 'bg-primary-600 w-3' : 'bg-primary-300'"
      @click="$emit('select', i)"
      :aria-label="`Aller au slide ${i+1}`"
    />
  </div>
</template>
<script setup lang="ts">
defineProps<{ index: number; total: number }>()
defineEmits<{ select: [index: number] }>()
</script>