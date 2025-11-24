<template>
  <main class="flex min-h-screen flex-col items-center bg-surface-white px-6 py-12 text-center text-primary-600">
    <AppBrand class="mb-12" />

    <div class="relative mb-5 flex items-center justify-center">
      <img src="@/assets/brand/icons/homeApp.svg" alt="Illustration Leenup" class="h-60 w-60" />
    </div>

    <h2 class="font-sans font-bold leading-snug">
      Lorem ipsum dolor sit amet,<br />
      lorem ipsum dolor sit amet.
    </h2>

    <div class="mt-10 flex w-full max-w-xs flex-col gap-4">
      <button
        class="rounded-400 bg-primary-600 px-6 py-3 text-surface-white shadow-e-200 transition hover:bg-primary-700"
        @click="discover"
      >
        Découvrir
      </button>
      <button
        class="rounded-400 bg-primary-50 px-6 py-3 text-primary-600 shadow-e-100 transition hover:bg-primary-100"
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
const login = () => router.push({ name: 'home' })
</script>
