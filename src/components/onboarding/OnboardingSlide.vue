<template>
  <article class="bg-primary-600 text-surface-button rounded-3xl p-6 flex flex-col items-center justify-between min-h-[50vh]">
    <div class="w-full flex-1 flex flex-col items-center justify-center gap-4">
      <img
        v-if="image"
        :src="image"
        :alt="imageAlt || title"
        class="rounded-200 w-full h-48 md:h-60 object-cover"
      />
      <div v-else class="flex h-48 w-full items-center justify-center rounded-300 bg-primary-700">
        {{ image }}
      </div>
    </div>
    <div class="w-full pt-4 text-center">
      <h3 class="font-sans text-2xl mb-2 text-surface-button">{{ title }}</h3>
      <p class="opacity-90 leading-relaxed font-sans typography-text text-surface-button">{{ description }}</p>
    </div>
    <slot />
  </article>
</template>
<script setup lang="ts">
defineProps<{ title: string; description: string; image?: string; imageAlt?: string }>()
</script>
