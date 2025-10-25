<template>
  <div class="min-h-[100dvh] bg-surface-bg text-surface-fg flex flex-col">
    <a class="w-10 h-10" href="/">
      <IconHome class="w-20 h-20 text-primary-600 m-5" />
    </a>
    <header class="container max-w-5xl w-full px-4 md:px-6 py-4 flex flex-col items-center gap-4">
      <div class="flex items-center justify-center gap-6 w-1/2">
        <span class="text-sm hidden sm:inline">Développe ton perso</span>
        <IconTech class="w-20 h-20 text-primary-600"/>
        <span class="text-sm hidden sm:inline">Gagne des avantages</span>
      </div>
      <StepProgressBar :index="index" :total="slides.length" class="w-full" :step="index" />
    </header>
    

    <main class="container max-w-5xl w-full px-4 md:px-6 flex-1 flex items-stretch h-full">
      <div class="w-full flex-1">
        <div class="h-[calc(100dvh-160px)] md:h-[calc(100dvh-200px)]">
          <OnboardingCarousel :slides="slides"
            @change="(i:number)=> index = i"
            @finish="goToPresentation" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel.vue'
import StepProgressBar from '@/components/onboarding/StepProgressBar.vue'
import IconTech from '@/components/icons/IconTech.vue'
import IconHome from '@/components/icons/IconHome.vue'

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

const goToPresentation = () => {
  router.push({ name: 'presentation-mentorats' })
}
</script>