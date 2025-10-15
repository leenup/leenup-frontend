<template>
  <div class="min-h-[100dvh] bg-surface-bg text-surface-fg">
    <div class="container max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 grid md:grid-cols-[1fr_minmax(380px,520px)] gap-10 items-center">
      <!-- Colonne gauche (pictos + barre progression) : masquée en mobile si souhaité -->
      <aside class="hidden md:flex flex-col gap-8">
        <img src="@/assets/brand/icons/iconTech.svg" alt="" class="h-16 opacity-80" />
        <StepProgressBar :step="index" :total="slides.length" />
        <img src="@/assets/brand/icons/iconJoyeux.svg" alt="" class="h-16 opacity-80" />
        <StepProgressBar :step="index" :total="slides.length" />
        <img src="@/assets/brand/icons/iconMusicien.svg" alt="" class="h-16 opacity-80" />
        <StepProgressBar :step="index" :total="slides.length" />
      </aside>

      <!-- Colonne droite : slider -->
      <main>
        <OnboardingCarousel :slides="slides" @finish="goSignup" @update:modelValue="index = $event" />
      </main>

      <!-- Mobile : petite barre en haut -->
      <div class="md:hidden col-span-2 mt-4">
        <StepProgressBar :step="index" :total="slides.length" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel.vue'
import StepProgressBar from '@/components/onboarding/StepProgressBar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const index = ref(0)

const slides = [
  {
    title: 'Parcours gamifié',
    description: 'Système de niveaux et progression, défis, monnaie virtuelle et classement de réputation !',
    image: new URL('@/assets/onboarding/slide-1.png', import.meta.url).toString(),
  },
  {
    title: 'Apprentissage gratuit',
    description: 'Profite de 7 jours gratuits pour découvrir nos leeneurs !',
    image: new URL('@/assets/onboarding/slide-2.png', import.meta.url).toString(),
  },
  {
    title: 'Recevoir & donner',
    description: 'Développer de nouvelles compétences : c’est à la portée de tout le monde !',
    image: new URL('@/assets/onboarding/slide-3.png', import.meta.url).toString(),
  },
]

const goSignup = () => router.push({ name: 'login' /* ou route d’inscription */ })
</script>