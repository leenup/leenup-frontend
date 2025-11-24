<template>
  <article class="bg-support-blue text-white rounded-3xl p-6 flex flex-col items-center justify-between min-h-[65vh]">
    <img v-if="image" :src="image" :alt="imageAlt || title"
         class="rounded-200 mb-4 w-full h-56 md:h-72 object-cover" />
    <div class="flex-1 flex flex-col w-full">
      <h3 class="font-sans text-2xl mb-2">{{ title }}</h3>
      <p class="opacity-90 leading-relaxed font-sans typography-text">{{ description }}</p>
    </div>
  </article>
</template>
<script setup lang="ts">
defineProps<{ title: string; description: string; image?: string; imageAlt?: string }>()
</script>
