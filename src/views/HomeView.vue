<template>
  <main class="flex min-h-screen flex-col items-center bg-surface-bg px-6 py-12 text-center text-primary-600">
    <AppBrand class="mb-12" />

    <div class="relative mb-8 flex h-80 w-80 items-center justify-center rounded-full bg-secondary-400 shadow-e-100">
      <img src="@/assets/brand/icons/homeApp.svg" alt="Illustration Leenup" class="h-60 w-60" />
    </div>

    <h2 class="font-sans h2 font-bold leading-tight text-primary-600">
      Apprends, mentore<br />
      Progresse.
    </h2>
    <blockquote class="relative mt-10 w-full max-w-md font-sans text-lg leading-snug text-primary-600 italic pl-6 border-l-4 border-cta-500">
    Rejoins les Leeners et échange des compétences entre pairs, simplement.
  </blockquote>

    <div class="mt-10 flex w-full max-w-sm flex-col gap-4">
      <button
        class="font-sans button rounded-400 bg-cta-500 px-8 py-4 text-lg text-surface-button shadow-e-200 transition hover:bg-cta-600 w-full"
        @click="discover"
      >
        Je découvre Leenup
      </button>
      <button
        class="rounded-400 bg-secondary-500 px-8 py-4 text-lg text-primary-600 shadow-e-100 transition hover:bg-secondary-600 w-full"
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
