<template>
  <main class="min-h-screen bg-surface-bg text-primary-600">
    <div class="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-12 text-center">
      <h1 class="text-3xl font-bold">Je deviens leener !</h1>
      <p class="text-base text-primary-600">Choisis si tu veux d'abord apprendre ou enseigner</p>

      <div class="flex flex-col gap-4">
        <button
          class="flex items-center justify-center gap-3 rounded-400 px-6 py-4 text-base font-semibold transition"
          :class="store.role === 'leener'
            ? 'bg-cta-500 text-surface-button shadow-e-300'
            : 'bg-surface-panel text-primary-600 shadow-e-200 hover:bg-secondary-500'"
          :aria-pressed="store.role === 'leener'"
          @click="choose('leener')"
        >
          <IconUser class="h-5 w-5" />
          Je veux apprendre
        </button>
        <button
          class="flex items-center justify-center gap-3 rounded-400 px-6 py-4 text-base font-semibold transition"
          :class="store.role === 'mentor'
            ? 'bg-cta-500 text-surface-button shadow-e-300'
            : 'bg-surface-panel text-primary-600 shadow-e-200 hover:bg-secondary-500'"
          :aria-pressed="store.role === 'mentor'"
          @click="choose('mentor')"
        >
          <IconUser class="h-5 w-5" />
          Je veux enseigner
        </button>
      </div>

      <button
        class="mt-4 w-full rounded-400 px-6 py-3 text-base font-semibold transition"
        :class="store.role
          ? 'bg-cta-500 text-surface-button shadow-e-300 hover:bg-cta-600'
          : 'bg-secondary-500 text-primary-600 opacity-60 cursor-not-allowed'"
        :disabled="!store.role"
        @click="goNext"
      >
        Commencer
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import IconUser from '@/components/icons/IconHome.vue'
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboarding'

const router = useRouter()
const store = useOnboardingStore()

const choose = (role: 'leener' | 'mentor') => {
  store.setRole(role)
}

const goNext = () => {
  if (!store.role) return
  router.push({ name: 'onboarding-start' })
}
</script>
