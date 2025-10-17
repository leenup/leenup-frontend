<template>
  <div class="md:min-h-[80vh] flex flex-col md:flex-row">
    <!-- GAUCHE : Hero + branding, AVEC GRADIENT DIRECT -->
    <section
      class="hidden md:flex md:relative md:flex-1 md:items-center md:justify-center min-h-screen relative flex-1 justify-center px-6 py-12 md:px-16
             text-white bg-gradient-to-br from-[#29235C] via-[#4D63FF] to-[#8793ff]"
    >
      <div class="w-full max-w-xl flex flex-col justify-between">
        <AppBrand class="mb-8" />
        <div>
          <h1 class="leading-tight mb-4 text-[clamp(28px,4vw,44px)] font-extrabold">
          l’avenir au collectif
          </h1>
          <p class="opacity-90 max-w-prose">
            Une solution complète co-construite avec nos utilisateurs.
          </p>

          <!-- badges / logos (facultatif) -->
          <div class="mt-10 flex items-center gap-6 opacity-90">
            <!-- Exemple placeholder: -->
            <div class="flex items-center gap-2">
              <span class="i">★ ★ ★ ★ ★</span>
              <span class="text-sm">4,8/5</span>
            </div>
            <img src="@/assets/brand/logo/Logo.png" alt="Leenup" class="h-6 opacity-90" />
          </div>
        </div>
      </div>
    </section>

    <!-- DROITE : CTA / Connexions -->
    <section
      class="flex-1 flex flex-col items-center justify-center bg-white px-6 py-12 md:px-16"
    >
      <div class="w-full max-w-xl text-center md:text-left">
        <AppBrand class="mb-10 md:hidden" />

        <SocialButtons />

        <DividerText>ou</DividerText>

        <div class="flex justify-center mt-6">
          <LinkArrow @click="discover">Je découvre Leenup</LinkArrow>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import AppBrand from '@/components/brand/AppBrand.vue'
import SocialButtons from '@/components/auth/SocialButtons.vue'
import DividerText from '@/components/common/DividerText.vue'
import LinkArrow from '@/components/common/LinkArrow.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const discover = () => router.push({ name: 'onboarding' })
</script>