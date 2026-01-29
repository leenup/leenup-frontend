<template>
  <main class="flex min-h-dvh flex-col items-center bg-surface-bg px-6 py-6 text-center text-primary-600">
    <AppBrand class="mb-5 scale-100 md:scale-95" />

    <div class="relative mb-5 flex h-60 w-60 items-center justify-center rounded-full bg-secondary-400 shadow-e-100 md:h-64 md:w-64">
      <img src="@/assets/brand/icons/homeApp.svg" alt="Illustration Leenup" class="h-40 w-40 md:h-48 md:w-48" />
    </div>

    <h2 class="font-sans h2 font-bold leading-tight text-primary-600">
      Apprends, mentore<br />
      Progresse.
    </h2>
    <blockquote class="relative mt-6 w-full max-w-md font-sans text-[15px] leading-snug text-primary-600 italic pl-4 border-l-4 border-primary-400">
    Rejoins les Leeners et échange des compétences entre pairs, simplement.
  </blockquote>

    <div class="mt-6 flex w-full max-w-sm flex-col gap-4">
      <button
        class="font-sans button rounded-400 bg-primary-600 px-8 py-4 text-lg text-surface-button shadow-e-200 transition hover:bg-primary-700 w-full md:py-3"
        @click="discover"
      >
        Je découvre Leenup
      </button>
      <button
        class="rounded-400 bg-secondary-400 px-8 py-4 text-lg text-surface-button shadow-e-100 transition hover:bg-secondary-500 w-full md:py-3"
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
const discover = () => router.push({ name: 'discover' })
const login = () => router.push({ name: 'auth' })
</script>
