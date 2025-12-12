<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
      role="dialog"
      aria-modal="true"
    >
      <div class="w-full max-w-md rounded-400 bg-white p-6 shadow-e-300">
        <h2 class="text-h3 text-primary-900">{{ title }}</h2>
        <p v-if="description" class="mt-2 text-small text-primary-700">
          {{ description }}
        </p>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="w-full rounded-300 border border-secondary-500 px-4 py-2 text-sm font-semibold text-primary-700 transition hover:bg-secondary-100 sm:w-auto"
            @click="handleCancel"
          >
            {{ cancelLabel }}
          </button>
          <button
            type="button"
            class="w-full rounded-300 bg-primary-900 px-4 py-2 text-sm font-semibold text-surface-button shadow-e-200 transition hover:bg-primary-800 sm:w-auto"
            @click="handleConfirm"
          >
            {{ confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
    description?: string
    confirmLabel?: string
    cancelLabel?: string
  }>(),
  {
    confirmLabel: 'Confirmer',
    cancelLabel: 'Annuler',
  }
)

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const handleConfirm = () => {
  emit('confirm')
  emit('update:open', false)
}

const handleCancel = () => {
  emit('cancel')
  emit('update:open', false)
}

</script>
