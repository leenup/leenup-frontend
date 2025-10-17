<template>
  <article class="bg-primary text-white rounded-3xl p-6 flex flex-col items-center justify-between min-h-[70vh]">
    <img v-if="image" :src="image" :alt="imageAlt || title"
         class="rounded-200 mb-4 w-full h-56 md:h-72 object-cover" />
    <div class="flex-1 flex flex-col w-full">
      <h3 class="text-2xl font-extrabold mb-2">{{ title }}</h3>
      <p class="opacity-90 leading-relaxed">{{ description }}</p>
    </div>
  </article>
</template>
<script setup lang="ts">
defineProps<{ title: string; description: string; image?: string; imageAlt?: string }>()
</script>