<template>
  <div class="w-full select-none" @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointercancel="onPointerUp" @pointerleave="onPointerUp">
    <div class="relative overflow-hidden">
      <div class="flex transition-transform duration-300 ease-out" :style="{ transform: `translateX(-${current * 100}%)` }">
        <div v-for="(s, i) in slides" :key="i" class="min-w-full px-1">
          <OnboardingSlide v-bind="s">
            <div class="flex items-center justify-center mt-2">
              <ProgressDots :index="current" :total="slides.length" @select="goTo" />
            </div>
          </OnboardingSlide>
        </div>
      </div>
    </div>

    <div class="mt-5 flex items-center justify-between">
      <Button variant="ghost" class="md:px-4" :disabled="!canPrev" @click="prev">Précédent</Button>
      <Button variant="white" class="md:px-6" v-if="current < slides.length - 1" @click="next">Suivant</Button>
      <Button variant="primary" class="md:px-6" v-else @click="$emit('finish')">Commencer</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import OnboardingSlide from './OnboardingSlide.vue'
import ProgressDots from './ProgressDots.vue'
import { useCarousel } from '@/composables/useCarousel'

type Slide = { title: string; description: string; image?: string; imageAlt?: string }
const props = defineProps<{ slides: Slide[] }>()
defineEmits<(e: 'finish') => void>()

const { current, next, prev, goTo, canPrev, onPointerDown, onPointerMove, onPointerUp } = useCarousel(props.slides.length)
</script>