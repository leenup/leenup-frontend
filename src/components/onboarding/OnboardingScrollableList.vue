<template>
  <div class="rounded-400 bg-transparent">
    <div class="custom-scrollbar overflow-y-auto pr-2" :style="{ maxHeight }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ maxHeight?: string }>(), {
  maxHeight: '60vh',
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(47, 55, 91, 0.3);
  border-radius: 9999px;
}
</style>
