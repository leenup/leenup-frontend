<template>
  <article class="rounded-300 bg-primary-500 text-white shadow-e-300 border border-primary-400 p-5">
    <img v-if="image" :src="image" :alt="imageAlt || title" class="rounded-200 mb-4 w-full h-48 object-cover md:h-56" />
    <h3 class="text-[22px] md:text-2xl font-extrabold mb-2">{{ title }}</h3>
    <p class="opacity-90 leading-relaxed">{{ description }}</p>
    <div class="mt-4">
      <slot />
    </div>
  </article>
</template>
<script setup lang="ts">
defineProps<{ title: string; description: string; image?: string; imageAlt?: string }>()
</script>