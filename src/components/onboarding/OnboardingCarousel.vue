<template>
  <div
    class="relative w-full select-none"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @pointerleave="onPointerUp"
  >
    <div class="relative overflow-hidden rounded-300">
      <div class="flex transition-transform duration-300 ease-out" :style="{ transform: `translateX(-${current * 100}%)` }">
        <div v-for="(s, i) in slides" :key="i" class="min-w-full">
          <OnboardingSlide v-bind="s">
            <template #default>
              <div class="mt-4 flex items-center justify-center md:hidden">
                <ProgressDots :index="current" :total="slides.length" @select="goTo" />
              </div>
            </template>
          </OnboardingSlide>
        </div>
      </div>

      <!-- Desktop arrows -->
      <button
        class="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-secondary-500 text-primary-600 shadow-e-100 transition hover:bg-secondary-600 md:flex"
        :disabled="!canPrev"
        @click="prev"
        aria-label="Précédent"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button
        class="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-secondary-500 text-primary-600 shadow-e-100 transition hover:bg-secondary-600 md:flex"
        @click="next"
        aria-label="Suivant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <!-- Desktop progress below -->
    <div class="mt-5 hidden items-center justify-center md:flex">
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
