<template>
  <header class="flex items-center gap-4">
    <button
      v-if="showBack"
      type="button"
      class="flex h-10 w-10 items-center justify-center rounded-full border border-primary-600 text-primary-600 shadow-e-100 transition hover:bg-secondary-400"
      aria-label="Revenir"
      @click="handleBack"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <ProgressBar :value="progress" class="flex-1" />
    <slot />
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ProgressBar from '@/components/common/ProgressBar.vue'

const props = withDefaults(defineProps<{ progress: number; showBack?: boolean; defaultBack?: boolean }>(), {
  showBack: true,
  defaultBack: true,
})

const emit = defineEmits<{ (e: 'back'): void }>()
const router = useRouter()

const handleBack = () => {
  emit('back')
  if (props.defaultBack) {
    router.back()
  }
}
</script>
