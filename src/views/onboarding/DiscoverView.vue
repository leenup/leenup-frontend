<template>
  <main class="min-h-screen text-primary-600">
    <div class="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-8">
      <header class="flex items-center justify-start">
        <BackButton />
      </header>

      <section class="flex items-start gap-4">
        <IconCoucou class="h-20 w-20 flex-shrink-0 text-secondary-600" />
        <div class="rounded-400 bg-surface-panel px-4 py-3 text-left text-primary-400 shadow-e-100">
          Bienvenue ! Moi c'est Léo, je t'accompagne pas à pas pour créer ton profil leener.
        </div>
      </section>

      <section class="flex flex-col items-center gap-4">
        <h1 class="text-center font-sans h1 font-bold leading-tight">Ta progression commence ici !</h1>
        <div class="w-full max-w-3xl">
          <OnboardingCarousel :slides="slides" />
        </div>
      </section>

      <section class="flex justify-end items-start gap-4">
        <div class="font-sans font-bold rounded-400 bg-surface-panel text-primary-400 px-4 py-3 shadow-e-100">
          <p>
            Ici tu peux, <span class="font-sans font-extrabold">être mentor ET apprenant</span>
          </p>
        </div>
        <IconCoucou class="h-20 w-20 flex-shrink-0 text-secondary-600 -scale-x-100" />
      </section>

      <section class="rounded-400 bg-surface-panel px-6 py-10 text-center text-primary-700 shadow-e-200 border border-secondary-200">
        <h3 class="text-2xl font-bold text-primary-800">Je deviens leener !</h3>
        <p class="mt-2 text-base text-primary-600">
          Choisis si tu veux d'abord <span class="font-sans font-extrabold">apprendre</span> ou <span class="font-sans font-extrabold">transmettre</span> (tu pourras toujours ajouter l'autre rôle plus tard)
        </p>
        <div class="mt-8 flex flex-col gap-4">
          <button
            class="flex items-center justify-center gap-3 rounded-400 border px-6 py-4 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
            :class="selectedRole === 'leener'
              ? 'bg-primary-600 text-surface-button border-primary-600 shadow-e-300'
              : 'bg-white text-primary-700 border-secondary-200 shadow-e-100 hover:border-primary-300 hover:bg-primary-50'"
            :aria-pressed="selectedRole === 'leener'"
            @click="selectRole('leener')"
          >
            <IconUser class="h-5 w-5" />
            Je veux apprendre
          </button>
          <button
            class="flex items-center justify-center gap-3 rounded-400 border px-6 py-4 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
            :class="selectedRole === 'mentor'
              ? 'bg-primary-600 text-surface-button border-primary-600 shadow-e-300'
              : 'bg-white text-primary-700 border-secondary-200 shadow-e-100 hover:border-primary-300 hover:bg-primary-50'"
            :aria-pressed="selectedRole === 'mentor'"
            @click="selectRole('mentor')"
          >
            <IconUser class="h-5 w-5" />
            Je veux transmettre
          </button>
        </div>
      </section>

      <section class="flex items-start gap-4">
        <IconCoucou class="h-20 w-20 flex-shrink-0 text-secondary-600" />
        <div class="rounded-400 bg-surface-panel px-4 py-3 text-primary-400 shadow-e-100">
          Savais-tu que 90% des leeners... etc
        </div>
      </section>

      <section class="flex justify-center pb-8">
        <button
          class="w-full max-w-md rounded-400 px-6 py-3 text-surface-button shadow-e-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
          :class="selectedRole ? 'bg-primary-600 hover:bg-primary-700' : 'bg-secondary-300 text-secondary-600 opacity-60 cursor-not-allowed border border-solid border-secondary-400'"
          :disabled="!selectedRole"
          @click="startFlow"
        >
          Je commence
        </button>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel.vue'
import IconUser from '@/components/icons/IconHome.vue'
import IconCoucou from '@/components/icons/IconCoucou.vue'
import BackButton from '@/components/common/BackButton.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedRole = ref<'leener' | 'mentor' | null>(null)

const selectRole = (role: 'leener' | 'mentor') => {
  selectedRole.value = role
}
const startFlow = () => {
  if (selectedRole.value === 'leener') {
    router.push({ name: 'register', params: { profile: 'leener' } })
  } else if (selectedRole.value === 'mentor') {
    router.push({ name: 'register', params: { profile: 'mentor' } })
  } else {
    router.push({ name: 'auth' })
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
