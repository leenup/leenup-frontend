<template>
  <main class="min-h-screen bg-surface-bg text-primary-600 px-6 py-10">
    <div class="mx-auto w-full max-w-3xl space-y-6">
      <header class="flex items-center gap-4">
        <BackButton />
        <ProgressBar :value="progress" />
      </header>

      <section class="grid items-start gap-6 md:grid-cols-[auto,1fr]">
        <IconCoucou class="h-20 w-20 text-primary-600" />
        <div class="relative rounded-400 bg-surface-panel px-4 py-3 text-primary-600 shadow-e-100">
          <p>Dis-nous quels sujets t'intéressent, {{ firstName || 'leener' }}.<br />Tu as jusqu'à 5 choix possibles.</p>
        </div>
      </section>

      <section class="space-y-6">
        <h1 class="text-3xl font-bold text-primary-600">Thèmes</h1>
        <div v-for="category in categories" :key="category.id" class="space-y-3">
          <h2 class="text-lg font-semibold text-primary-600">{{ category.label }}</h2>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <button
              v-for="item in category.items"
              :key="item.id"
              class="flex aspect-square flex-col items-center justify-center rounded-300 bg-primary-600 text-surface-button shadow-e-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 7h16v10H4z" />
                <circle cx="8" cy="11" r="1.5" />
                <path d="M13 12l2-2 3 4" />
              </svg>
              <span class="mt-2 text-sm font-semibold">{{ item.label }}</span>
            </button>
          </div>
        </div>
      </section>

      <div class="flex justify-center pt-4">
        <button class="w-full max-w-md rounded-400 bg-cta-600 px-6 py-3 text-surface-button shadow-e-300 transition hover:bg-primary-700">
          Suivant
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BackButton from '@/components/common/BackButton.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import IconCoucou from '@/components/icons/IconCoucou.vue'

const route = useRoute()
const firstName = computed(() => {
  const value = (history.state as { firstName?: string })?.firstName
  return value ?? ''
})
const progress = 0.66

const categories = [
  {
    id: 'cat1',
    label: 'Catégorie 1',
    items: [
      { id: 'c1-1', label: 'Photo' },
      { id: 'c1-2', label: 'Photo' },
      { id: 'c1-3', label: 'Photo' },
    ],
  },
  {
    id: 'cat2',
    label: 'Catégorie 2',
    items: [
      { id: 'c2-1', label: 'Photo' },
      { id: 'c2-2', label: 'Photo' },
      { id: 'c2-3', label: 'Photo' },
    ],
  },
  {
    id: 'cat3',
    label: 'Catégorie 3',
    items: [
      { id: 'c3-1', label: 'Photo' },
      { id: 'c3-2', label: 'Photo' },
      { id: 'c3-3', label: 'Photo' },
    ],
  },
]
</script>
