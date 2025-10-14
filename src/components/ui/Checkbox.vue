<template>
  <div class="inline-flex items-center gap-2 select-none">
    <input
      :id="uid"
      type="checkbox"
      class="h-4 w-4 rounded-100 border-primary-300 text-primary-600 focus:ring-secondary-200 cursor-pointer"
      v-model="model"
      v-bind="$attrs"
    />
    <label class="cursor-pointer" :for="uid"><slot /></label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ id?: string }>(), {})
const model = defineModel<boolean>({ default: false })
const uid = computed(() => props.id ?? `chk-${Math.random().toString(36).slice(2, 9)}`)
</script>