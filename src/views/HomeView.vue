<template>
  <main class="flex min-h-screen flex-col items-center bg-surface-bg px-6 py-12 text-center text-primary-600">
    <AppBrand class="mb-12" />

    <div class="relative mb-8 flex h-64 w-64 items-center justify-center rounded-full bg-secondary-400 shadow-e-100">
      <img src="@/assets/brand/icons/homeApp.svg" alt="Illustration Leenup" class="h-56 w-56" />
    </div>

    <h2 class="font-sans h2 font-bold leading-snug text-primary-600">
      Lorem ipsum dolor sit amet,<br />
      lorem ipsum dolor sit amet.
    </h2>

    <div class="mt-10 flex w-full max-w-xs flex-col gap-4">
      <button
        class="font-sans button rounded-400 bg-cta-500 px-6 py-3 text-surface-button shadow-e-200 transition hover:bg-cta-600"
        @click="discover"
      >
        Découvrir
      </button>
      <button
        class="rounded-400 bg-secondary-500 px-6 py-3 text-primary-600 shadow-e-100 transition hover:bg-secondary-600"
        @click="login"
      >
        J’ai déjà un compte
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import AppBrand from '@/components/brand/AppBrand.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const discover = () => router.push({ name: 'onboarding' })
const login = () => router.push({ name: 'auth' })
</script>
