<template>
  <div
    class="relative select-none"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @pointerleave="onPointerUp"
  >
    <div class="overflow-hidden rounded-400 border border-primary-900 bg-primary-900 text-surface-button">
      <div class="flex transition-transform duration-300 ease-out" :style="{ transform: `translateX(-${current * 100}%)` }">
        <div v-for="(slide, index) in slides" :key="index" class="min-w-full px-3 py-4">
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="theme in slide"
              :key="theme.id"
              type="button"
              class="flex h-28 flex-col items-center justify-center gap-3 rounded-300 border border-white/40 bg-transparent px-3 py-2 text-center transition hover:border-white"
              :class="isSelected(theme.id) ? 'bg-white/15' : ''"
              @click="emit('toggle', theme.id)"
            >
              <span
                class="flex h-12 w-12 items-center justify-center rounded-full border"
                :class="isSelected(theme.id) ? 'border-white text-white' : 'border-white/60 text-white/80'"
              >
                <IconTheme class="h-6 w-6" />
              </span>
              <span class="text-small font-semibold">{{ theme.title }}</span>
              <span v-if="isSelected(theme.id)" class="text-mini text-white/70">
                {{ selectionOrder(theme.id) }}/{{ props.maxSelection }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="hasControls"
      class="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-primary-900 shadow-e-100 transition hover:bg-white md:flex"
      @click="prev"
      aria-label="Precedent"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6" />
      </svg>
    </button>
    <button
      v-if="hasControls"
      class="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-primary-900 shadow-e-100 transition hover:bg-white md:flex"
      @click="next"
      aria-label="Suivant"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconTheme from '@/components/icons/IconHome.vue'
import { useCarousel } from '@/composables/useCarousel'

type ThemeItem = { id: number; title: string }

const props = withDefaults(
  defineProps<{
    themes: ThemeItem[]
    selected: number[]
    maxSelection: number
    chunkSize?: number
  }>(),
  { chunkSize: 3 }
)

const emit = defineEmits<{
  (e: 'toggle', theme: string): void
}>()

const slides = computed(() => {
  const size = Math.max(props.chunkSize, 1)
  const result: ThemeItem[][] = []
  for (let i = 0; i < props.themes.length; i += size) {
    result.push(props.themes.slice(i, i + size))
  }
  return result.length ? result : [props.themes.slice(0, size)]
})

const slideCount = slides.value.length || 1
const hasControls = slideCount > 1
const { current, next, prev, onPointerDown, onPointerMove, onPointerUp } = useCarousel(slideCount, { loop: hasControls })

const isSelected = (id: number) => props.selected.includes(id)
const selectionOrder = (id: number) => props.selected.indexOf(id) + 1
</script>
