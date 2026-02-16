<template>
  <div class="relative">
    <input
      :value="modelValue"
      :type="showPassword ? 'text' : 'password'"
      class="w-full pr-12"
      v-bind="$attrs"
      @input="onInput"
    />
    <button
      type="button"
      class="absolute inset-y-0 right-3 flex items-center text-secondary-700 transition hover:text-primary-600"
      :aria-pressed="showPassword"
      :title="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
      @click="showPassword = !showPassword"
    >
      <component :is="showPassword ? IconEyeOff : IconEye" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconEye from '@/components/icons/IconEye.vue'
import IconEyeOff from '@/components/icons/IconEyeOff.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const showPassword = ref(false)

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
