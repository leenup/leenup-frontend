<template>
  <article class="rounded-400 border border-secondary-200 bg-surface-panel shadow-e-200 flex min-h-[50vh] flex-col overflow-hidden">
    <div class="w-full">
      <img
        v-if="image"
        :src="image"
        :alt="imageAlt || title"
        class="w-full h-52 md:h-64 object-cover"
      />
      <div v-else class="flex h-52 md:h-64 w-full items-center justify-center bg-hero-gradient text-surface-button">
        <span class="text-sm font-semibold tracking-wide">Bientot</span>
      </div>
    </div>
    <div class="w-full flex-1 px-6 pb-6 pt-5 text-center">
      <h3 class="font-sans text-2xl font-extrabold mb-2">{{ title }}</h3>
      <p class="leading-relaxed font-sans">{{ description }}</p>
    </div>
    <slot />
  </article>
</template>
<script setup lang="ts">
defineProps<{ title: string; description: string; image?: string; imageAlt?: string }>()
</script>
