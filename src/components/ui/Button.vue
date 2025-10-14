<template>
  <button
    class="inline-flex items-center justify-center rounded-200 px-4 py-2 btn-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400 disabled:opacity-50"
    :class="variantClasses"
    v-bind="$attrs"
  ><slot /></button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{ variant?: 'primary'|'secondary'|'ghost'|'white' }>(),{ variant:'primary' })
const variantClasses = computed(() => ({
  'bg-primary-500 text-white hover:bg-primary-600 active:shadow-pressed-primary': props.variant==='primary',
  'bg-secondary-500 text-white hover:bg-secondary-600': props.variant==='secondary',
  'bg-white text-primary-600 border border-primary-200 hover:bg-primary-50': props.variant==='white',
  'bg-transparent text-primary-600 hover:bg-primary-100': props.variant==='ghost',
}))
</script>