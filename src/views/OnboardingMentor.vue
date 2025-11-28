<template>
  <main class="min-h-screen bg-surface-bg text-primary-600 px-6 py-10">
    <div class="mx-auto w-full max-w-3xl space-y-6">
      <header class="flex items-center gap-4">
        <BackButton />
        <ProgressBar :value="progress" />
      </header>

      <div class="w-full max-w-3xl rounded-400 bg-surface-panel px-8 py-10 shadow-e-200">
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-bold mb-2">Bienvenue mentor !</h1>
          <p class="text-primary-600">Partage ton expertise avec la communaute Leenup en creant ton profil.</p>
        </div>

        <form class="space-y-6" @submit.prevent="onSubmit">
          <div class="grid gap-4 md:grid-cols-2">
            <label class="text-left text-sm font-semibold text-primary-600">
              Prenom
              <input
                v-model="form.firstName"
                type="text"
                required
                class="mt-1 w-full rounded-300 border border-secondary-300 bg-white px-3 py-2 text-primary-600 shadow-e-100 focus:border-cta-500 focus:outline-none focus:ring-2 focus:ring-cta-200"
              />
            </label>
            <label class="text-left text-sm font-semibold text-primary-600">
              Nom
              <input
                v-model="form.lastName"
                type="text"
                required
                class="mt-1 w-full rounded-300 border border-secondary-300 bg-white px-3 py-2 text-primary-600 shadow-e-100 focus:border-cta-500 focus:outline-none focus:ring-2 focus:ring-cta-200"
              />
            </label>
          </div>

          <label class="block text-left text-sm font-semibold text-primary-600">
            Email
            <input
              v-model="form.email"
              type="email"
              required
              class="mt-1 w-full rounded-300 border border-secondary-300 bg-white px-3 py-2 text-primary-600 shadow-e-100 focus:border-cta-500 focus:outline-none focus:ring-2 focus:ring-cta-200"
            />
          </label>

          <div class="rounded-300 border border-secondary-300 bg-white p-4 shadow-e-100">
            <label class="block text-left text-sm font-semibold text-primary-600">
              Mot de passe
              <input
                v-model="form.password"
                type="password"
                required
                class="mt-1 w-full rounded-300 border border-secondary-300 bg-white px-3 py-2 text-primary-600 focus:border-cta-500 focus:outline-none focus:ring-2 focus:ring-cta-200"
                aria-describedby="password-help"
              />
            </label>
            <ul id="password-help" class="mt-3 space-y-1 text-sm">
              <li
                v-for="rule in passwordRules"
                :key="rule.label"
                class="flex items-center gap-2 transition-all duration-200"
                :class="rule.valid ? 'text-cta-500' : 'text-primary-600'"
              >
                <span
                  class="flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200"
                  :class="rule.valid ? 'bg-cta-500 text-surface-button' : 'bg-secondary-500 text-primary-600'"
                >
                  {{ rule.valid ? '✓' : '✗' }}
                </span>
                <span>{{ rule.label }}</span>
              </li>
            </ul>
          </div>

          <div class="flex items-start gap-3 rounded-300 bg-secondary-400 px-4 py-3 text-left">
            <input
              id="accept-terms"
              v-model="form.acceptTerms"
              type="checkbox"
              class="mt-1 h-5 w-5 rounded border-primary-300 text-cta-500 focus:ring-cta-200"
              required
            />
            <div class="text-sm text-primary-600">
              J'accepte les <a href="#" class="underline">CGU</a>, la <a href="#" class="underline">politique de confidentialite</a> et les <a href="#" class="underline">CGV</a>.
            </div>
          </div>

          <button
            type="submit"
            class="w-full rounded-400 px-6 py-3 text-base font-semibold text-surface-button shadow-e-300 transition"
            :class="canSubmit && !submitting ? 'bg-cta-600 hover:bg-primary-700' : 'bg-secondary-500 text-primary-600 opacity-60 cursor-not-allowed'"
            :disabled="!canSubmit || submitting"
          >
            {{ submitting ? 'Envoi...' : 'Continuer' }}
          </button>
        </form>
      </div>
    </div>
    <Toast v-if="errorMessage" :key="'err-' + errorMessage" :message="errorMessage" type="error" />
    <Toast v-if="successMessage" :key="'ok-' + successMessage" :message="successMessage" type="success" />
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BackButton from '@/components/common/BackButton.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import Toast from '@/components/common/Toast.vue'
import { useOnboardingRegistration } from '@/composables/useOnboardingRegistration'

const router = useRouter()
const progress = 0.25

const { form, passwordRules, canSubmit, submitting, successMessage, errorMessage, onSubmit } =
  useOnboardingRegistration({
    afterSuccess: (firstName) => {
      router.push({ name: 'theme', state: { firstName } })
    },
  })
</script>
