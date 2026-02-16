<template>
  <div
    class="relative w-full select-none"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @pointerleave="onPointerUp"
  >
    <div class="relative overflow-hidden rounded-400">
      <div class="flex transition-transform duration-300 ease-out" :style="{ transform: `translateX(-${current * 100}%)` }">
        <div v-for="(s, i) in slides" :key="i" class="min-w-full">
          <OnboardingSlide v-bind="s" />
        </div>
      </div>

      <!-- Desktop arrows -->
      <button
        class="absolute left-0 top-52 md:top-64 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary-200 bg-white text-primary-700 shadow-e-100 transition hover:border-primary-200 hover:text-primary-800 md:flex disabled:opacity-40 disabled:hover:border-secondary-200"
        :disabled="!canPrev"
        @click="prev"
        aria-label="Précédent"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button
        class="absolute right-0 top-52 md:top-64 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary-200 bg-white text-primary-700 shadow-e-100 transition hover:border-primary-200 hover:text-primary-800 md:flex"
        @click="next"
        aria-label="Suivant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <!-- Desktop progress below -->
    <div class="mt-5 flex items-center justify-center">
      <ProgressDots :index="current" :total="slides.length" @select="goTo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OnboardingSlide from './OnboardingSlide.vue'
import ProgressDots from './ProgressDots.vue'
import { useCarousel } from '@/composables/useCarousel'

type Slide = { title: string; description: string; image?: string; imageAlt?: string }
const props = defineProps<{ slides: Slide[] }>()

const { current, next, prev, goTo, canPrev, onPointerDown, onPointerMove, onPointerUp } = useCarousel(props.slides.length, { loop: true })
</script>
