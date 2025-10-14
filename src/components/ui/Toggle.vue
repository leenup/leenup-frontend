<template>
  <div class="inline-flex items-center gap-2 select-none">
    <input
      :id="uid"
      type="checkbox"
      class="peer sr-only"
      v-model="model"
      v-bind="$attrs"
    />
    <label :for="uid" class="relative inline-flex items-center cursor-pointer">
      <span
        class="h-6 w-10 rounded-200 bg-primary-200 peer-checked:bg-primary-600 transition-all block"
        aria-hidden="true"
      >
        <span class="absolute left-1 top-1 h-4 w-4 rounded-full bg-white peer-checked:translate-x-4 transition-transform"></span>
      </span>
      <span class="ml-2"><slot /></span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{ id?: string }>(), {})
const model = defineModel<boolean>({ default: false })
const uid = computed(() => props.id ?? `tgl-${Math.random().toString(36).slice(2, 9)}`)
</script>