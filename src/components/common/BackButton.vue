<template>
  <button
    class="flex h-10 w-10 items-center justify-center rounded-full border border-primary-600 text-primary-600 shadow-e-100 transition hover:bg-secondary-400"
    type="button"
    @click="onClick"
    :aria-label="ariaLabel"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = withDefaults(defineProps<{ ariaLabel?: string; to?: string }>(), {
  ariaLabel: 'Revenir',
  to: undefined,
})

const router = useRouter()
const onClick = () => {
  if (props.to) router.push(props.to)
  else router.back()
}
</script>
