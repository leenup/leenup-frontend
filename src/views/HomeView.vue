<template>
  <main class="flex min-h-dvh flex-col items-center justify-center px-6 py-8 text-center text-text-primary">
    <img src="@/assets/brand/logo/Logo.svg" alt="Leenup" class="h-[clamp(3rem,6vw,4rem)]" />

    <div class="mt-6 flex w-full max-w-[min(42rem,92vw)] items-end justify-between">
      <div class="flex flex-col items-center gap-2">
        <img src="@/assets/brand/icons/sourire.svg" alt="Apprends" class="h-[clamp(4rem,9vw,7rem)] w-auto" />
        <h2 class="text-[clamp(1.5rem,4vw,2.25rem)] font-bold">Apprends.</h2>
      </div>
      <div class="flex flex-col items-center gap-2">
        <img src="@/assets/brand/icons/content-etoile.svg" alt="Mentore" class="h-[clamp(4.5rem,10vw,8rem)] w-auto" />
        <h2 class="text-[clamp(1.5rem,4vw,2.25rem)] font-bold">Mentore.</h2>
      </div>
      <div class="flex flex-col items-center gap-2">
        <img src="@/assets/brand/icons/sourire-couronne.svg" alt="Progresse" class="h-[clamp(4rem,9vw,7rem)] w-auto" />
        <h2 class="text-[clamp(1.5rem,4vw,2.25rem)] font-bold">Progresse.</h2>
      </div>
    </div>

    <p class="mt-4 max-w-[min(28rem,84vw)] text-[clamp(0.9rem,2.4vw,1rem)] text-text-muted">
      Rejoins les Leeners et échange des compétences entre pairs, simplement.
    </p>

    <div class="mt-8 flex w-full max-w-[min(24rem,90vw)] flex-col gap-4">
      <button
        class="rounded-400 bg-primary-600 px-8 py-[clamp(0.75rem,2.6vw,1rem)] text-[clamp(1rem,3.2vw,1.125rem)] font-semibold text-surface-button shadow-e-200 transition hover:bg-primary-700 w-full"
        @click="discover"
      >
        Je découvre
      </button>
      <button
        class="rounded-400 border border-neutral-200 bg-white px-8 py-[clamp(0.75rem,2.6vw,1rem)] text-[clamp(1rem,3.2vw,1.125rem)] font-semibold text-text-muted shadow-e-100 transition hover:border-primary-200 w-full"
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
