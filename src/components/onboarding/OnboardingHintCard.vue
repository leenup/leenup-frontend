<template>
  <section class="flex items-center gap-4 rounded-400 bg-surface-panel px-4 py-3 text-primary-600 shadow-e-100">
    <IconCoucou class="h-16 w-16 flex-shrink-0 text-primary-600" />
    <p class="text-small font-semibold leading-snug">
      <slot />
    </p>
  </section>
</template>

<script setup lang="ts">
import IconCoucou from '@/components/icons/IconCoucou.vue'
</script>
