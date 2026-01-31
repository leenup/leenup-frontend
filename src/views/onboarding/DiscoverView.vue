<template>
  <main class="min-h-screen bg-primary-100 text-text-primary">
    <div class="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-8">
      <header class="flex items-center justify-start">
        <BackButton class="flex h-10 w-10 items-center justify-center rounded-full" />
      </header>

      <section class="flex items-center gap-4">
        <img src="@/assets/brand/icons/sourire.svg" alt="" class="h-30 w-auto flex-shrink-0" />
        <div class="rounded-400 bg-surface-panel px-4 py-3 text-left text-text-primary shadow-e-100">
          Bienvenue ! Je t'accompagne pas à pas pour créer ton profil leener
        </div>
      </section>

      <section class="flex flex-col items-center gap-4">
        <h1 class="text-center text-3xl font-extrabold leading-tight text-text-primary">Ta progression commence ici !</h1>
        <div class="w-full rounded-500 bg-secondary-50 p-6">
          <OnboardingCarousel :slides="slides" />
        </div>
      </section>

      <section class="flex items-center justify-end gap-4">
        <div class="rounded-400 bg-surface-panel px-4 py-3 text-text-primary shadow-e-100">
          Ici, tu peux <span class="font-extrabold">être mentor ET apprenant !</span>
        </div>
        <img src="@/assets/brand/icons/coucou-couronne.svg" alt="" class="h-30 w-auto flex-shrink-0" />
      </section>
    </div>

    <section class="bg-primary-600 px-6 py-10">
      <div class="mx-auto max-w-3xl text-center text-white">
        <h2 class="text-2xl font-bold">Je deviens leener !</h2>
        <p class="mt-2 text-base text-white/90">
          Choisis si tu veux d'abord <span class="font-extrabold">apprendre</span> ou <span class="font-extrabold">transmettre</span>
          (tu pourras toujours ajouter un rôle plus tard)
        </p>
        <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            class="flex w-full justify-center items-center gap-4 rounded-400 bg-white px-6 py-4 text-base font-semibold text-text-primary shadow-e-400 transition hover:shadow-e-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            @click="goToRegister('leener')"
          >
            <span class="flex h-10 w-10 items-center">
              <IconLeener class="h-8 w-auto text-primary-600" />
            </span>
            <span>Je veux apprendre</span>
          </button>
          <button
            class="flex w-full justify-center items-center gap-4 rounded-400 bg-white px-6 py-4 text-base font-semibold text-text-primary shadow-e-400 transition hover:shadow-e-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            @click="goToRegister('mentor')"
          >
            <span class="flex h-10 w-10 items-center">
              <IconMentor class="h-8 w-auto text-primary-600" />
            </span>
            <span>Je veux transmettre</span>
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel.vue'
import BackButton from '@/components/common/BackButton.vue'
import IconLeener from '@/components/icons/connectingViews/IconLeener.vue'
import IconMentor from '@/components/icons/connectingViews/IconMentor.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToRegister = (role: 'leener' | 'mentor') => {
  router.push({ name: 'register', params: { profile: role } })
}

const slides = [
  {
    title: 'Simple & rapide',
    description: 'Que tu sois mentor ou apprenant, crée ton profil leener en moins de 5 minutes !',
    image: new URL('@/assets/onboarding/slide-1.png', import.meta.url).toString(),
  },
  {
    title: 'Découvre & progresse',
    description: 'Développe de nouvelles compétences et suis ta progression pas à pas !',
    image: new URL('@/assets/onboarding/slide-2.png', import.meta.url).toString(),
  },
  {
    title: 'Reçois & partage',
    description: 'Tu peux être à la fois un leener mentor et un leener apprenant, les deux sont possibles !',
    image: new URL('@/assets/onboarding/slide-3.png', import.meta.url).toString(),
  },
  {
    title: 'Et amuse-toi !',
    description: "Pendant toute ta progression, gagne des cartes et débloque des crédits !",
    image: new URL('@/assets/onboarding/slide-4.png', import.meta.url).toString(),
  }
]
</script>
