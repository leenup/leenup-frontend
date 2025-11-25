<template>
  <main class="min-h-screen bg-surface-bg text-primary-600">
    <div class="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-8">
      <header class="flex items-center justify-between">
        <button
          class="h-10 w-10 rounded-full border border-primary-200 text-primary-600 shadow-e-100 transition hover:bg-secondary-400"
          @click="goBack"
          aria-label="Revenir"
        >
          <span class="sr-only">Retour</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </header>

      <section class="grid items-center gap-6 md:grid-cols-[auto,1fr]">
        <IconCoucou class="h-20 w-20 text-support-orange" />
        <div class="rounded-400 bg-surface-panel px-4 py-3 text-left text-primary-600 shadow-e-100">
          A message which appears when a cursor is positioned over an icon, image, hyperlink, or other element.
        </div>
      </section>

      <section class="flex flex-col items-center gap-4">
        <h1 class="text-center font-sans h1 font-bold leading-tight">Lorem ipsum dolor sit amet !</h1>
        <div class="w-full max-w-3xl">
          <OnboardingCarousel :slides="slides" />
        </div>
      </section>

      <section class="grid gap-6 md:grid-cols-[1fr,auto] md:items-center">
        <div class="font-sans font-bold rounded-400 bg-surface-panel px-4 py-3 shadow-e-100">
          Tu peux être à la fois mentor ET apprenant !
        </div>
        <IconCoucou class="h-20 w-20 text-support-orange -scale-x-100" />
      </section>

      <section class="rounded-400 bg-primary-600 px-6 py-10 text-center text-surface-button shadow-e-300">
        <h3 class="text-2xl font-bold">Je deviens leener !</h3>
        <p class="mt-2 text-base text-surface-button/80">Choisis si tu veux d'abord apprendre ou enseigner</p>
        <div class="mt-8 flex flex-col gap-4">
          <button
            class="flex items-center justify-center gap-3 rounded-400 px-6 py-4 text-base font-semibold transition"
            :class="onboardingStore.role === 'learner'
              ? 'bg-cta-500 text-surface-button shadow-e-300'
              : 'bg-surface-panel text-primary-600 shadow-e-200 hover:bg-secondary-500'"
            :aria-pressed="onboardingStore.role === 'learner'"
            @click="selectRole('learner')"
          >
            <IconUser class="h-5 w-5" />
            Je veux apprendre
          </button>
          <button
            class="flex items-center justify-center gap-3 rounded-400 px-6 py-4 text-base font-semibold transition"
            :class="onboardingStore.role === 'mentor'
              ? 'bg-cta-500 text-surface-button shadow-e-300'
              : 'bg-surface-panel text-primary-600 shadow-e-200 hover:bg-secondary-500'"
            :aria-pressed="onboardingStore.role === 'mentor'"
            @click="selectRole('mentor')"
          >
            <IconUser class="h-5 w-5" />
            Je veux enseigner
          </button>
        </div>
      </section>

      <section class="grid gap-6 md:grid-cols-[auto,1fr] md:items-center">
        <IconCoucou class="h-20 w-20 text-support-orange" />
        <div class="rounded-400 bg-surface-panel px-4 py-3 text-primary-600 shadow-e-100">
          Savais-tu que 90% des leeners... etc
        </div>
      </section>

      <section class="flex justify-center pb-8">
        <button
          class="w-full max-w-md rounded-400 px-6 py-3 text-surface-button shadow-e-300 transition"
          :class="onboardingStore.role ? 'bg-cta-600 hover:bg-primary-700' : 'bg-secondary-500 text-primary-600 opacity-60 cursor-not-allowed'"
          :disabled="!onboardingStore.role"
          @click="startFlow"
        >
          Commencer
        </button>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel.vue'
import IconUser from '@/components/icons/IconHome.vue'
import IconCoucou from '@/components/icons/IconCoucou.vue'
import { useRouter } from 'vue-router'
import { useOnboardingStore } from '@/stores/onboarding'

const router = useRouter()
const onboardingStore = useOnboardingStore()
const goBack = () => router.back()
const selectRole = (role: 'learner' | 'mentor') => { onboardingStore.setRole(role) }
const startFlow = () => {
  if (onboardingStore.role === 'learner') {
    router.push({ name: 'onboarding-learner' })
  } else if (onboardingStore.role === 'mentor') {
    router.push({ name: 'onboarding-mentor' })
  }
}

const slides = [
  {
    title: 'Simple & Rapide',
    description: 'Que tu sois mentor ou apprenant, créé ton profil leener en moins de 5 minutes !',
    image: new URL('@/assets/onboarding/slide-1.png', import.meta.url).toString(),
  },
  {
    title: 'Découvre & progresse',
    description: 'Développes de nouvelles compétences et suis ta progression pas à pas !',
    image: new URL('@/assets/onboarding/slide-2.png', import.meta.url).toString(),
  },
  {
    title: 'Reçois & partages',
    description: 'Tu peux être à la fois un leener mentor et un leener apprenant, les 2 sont possible !',
    image: new URL('@/assets/onboarding/slide-3.png', import.meta.url).toString(),
  },
  {
    title: 'Et amuse toi !',
    description: "Pendant toute ta progression, gagne des cartes et débloques des crédits !",
    image: undefined,
  }
]
</script>
