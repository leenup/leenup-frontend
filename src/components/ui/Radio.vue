<template>
  <div class="inline-flex items-center gap-2 select-none">
    <input
      :id="uid"
      type="radio"
      class="h-4 w-4 rounded-full border-primary-300 text-primary-600 focus:ring-secondary-200"
      :name="name"
      :value="value"
      v-model="model"
      v-bind="$attrs"
    />
    <label class="cursor-pointer" :for="uid"><slot /></label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ id?: string; name: string; value: string | number }>(), {})
const model = defineModel<string | number>()
const uid = computed(() => props.id ?? `rad-${Math.random().toString(36).slice(2, 9)}`)
</script>