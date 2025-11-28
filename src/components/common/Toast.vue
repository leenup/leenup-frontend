<template>
  <transition name="toast-slide">
    <output
      v-if="visible"
      class="fixed bottom-4 right-4 z-50 min-w-[240px] max-w-sm rounded-300 px-4 py-3 shadow-e-300 text-white"
      :class="variantClass"
      aria-live="polite"
    >
      <p class="text-sm font-semibold">{{ message }}</p>
      <div class="mt-2 h-1 w-full rounded-full bg-white/30 overflow-hidden">
        <div
          :key="message + type"
          class="h-full bg-white progress-bar"
          :style="{ animationDuration: props.duration + 'ms' }"
        ></div>
      </div>
    </output>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect, watch } from 'vue'

const props = withDefaults(defineProps<{ message: string; type?: 'success' | 'error'; duration?: number }>(), {
  type: 'success',
  duration: 5000,
})

const visible = ref(true)
const startTime = ref(Date.now())

const variantClass = computed(() =>
  props.type === 'error'
    ? 'bg-red-600'
    : 'bg-green-600'
)

watchEffect((onInvalidate) => {
  visible.value = true
  startTime.value = Date.now()
  const timer = globalThis.setTimeout(() => { visible.value = false }, props.duration)
  onInvalidate(() => globalThis.clearTimeout(timer))
})

watch(() => props.message, () => {
  visible.value = true
  startTime.value = Date.now()
})
</script>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.25s ease;
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.progress-bar {
  width: 100%;
  animation-name: shrink;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>
