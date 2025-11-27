<template>
  <main class="min-h-screen bg-surface-bg text-primary-600 px-6 py-10">
    <div class="mx-auto max-w-5xl space-y-4">
      <h1 class="text-3xl font-bold">{{ greeting }} {{ firstName || 'leener' }} !</h1>
      <p class="text-base text-primary-600">Bienvenue sur ton espace personnel. Cette page sera complétée avec les widgets et informations du tableau de bord.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useGreeting } from '@/composables/useGreeting'

const authStore = useAuthStore()
const firstName = computed(() => authStore.user?.firstName ?? '')
const { greeting } = useGreeting()

onMounted(() => {
  if (!authStore.user) {
    authStore.fetchProfile().catch(() => {})
  }
})
</script>
