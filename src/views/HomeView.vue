<template>
  <main class="flex min-h-dvh flex-col items-center justify-center bg-surface-bg px-6 py-8 text-center text-text-primary">
    <img src="@/assets/brand/logo/Logo.svg" alt="Leenup" class="h-12 md:h-16" />

    <div class="mt-6 flex w-full max-w-2xl items-end justify-between">
      <div class="flex flex-col items-center gap-2">
        <img src="@/assets/icons/common/sourire.png" alt="Humeur sourire" class="h-20 w-auto md:h-24" />
        <h1 class="text-3xl font-bold md:text-4xl">Apprends.</h1>
      </div>
      <div class="flex flex-col items-center gap-2">
        <img src="@/assets/icons/common/content.png" alt="Humeur content" class="h-24 w-auto md:h-28" />
        <h1 class="font-bold text-3xl md:text-4xl">Mentore.</h1>
      </div>
      <div class="flex flex-col items-center gap-2">
        <img src="@/assets/icons/common/joyeux.png" alt="Humeur joyeux" class="h-20 w-auto md:h-24" />
        <h1 class="text-3xl font-bold md:text-4xl">Progresse.</h1>
      </div>
    </div>

    <p class="mt-3 max-w-xs text-sm text-text-muted md:max-w-sm">
      Rejoins les Leeners et échange des compétences entre pairs, simplement.
    </p>

    <div class="mt-8 flex w-full max-w-sm flex-col gap-4">
      <button
        class="rounded-400 bg-primary-600 px-8 py-4 text-lg font-semibold text-surface-button shadow-e-200 transition hover:bg-primary-700 w-full md:py-3"
        @click="discover"
      >
        Je découvre
      </button>
      <button
        class="rounded-400 border border-neutral-200 bg-white px-8 py-4 text-lg font-semibold text-text-muted shadow-e-100 transition hover:border-primary-200 w-full md:py-3"
        @click="login"
      >
        J'ai déjà un compte
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const discover = () => router.push({ name: 'discover' })
const login = () => router.push({ name: 'auth' })
</script>
