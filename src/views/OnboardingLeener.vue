<template>
  <main class="min-h-screen bg-surface-bg text-primary-600 px-6 py-10">
    <div class="mx-auto w-full max-w-3xl space-y-6">
      <header class="flex items-center gap-4">
        <BackButton />
        <ProgressBar :value="progress" />
      </header>

      <div class="w-full max-w-3xl rounded-400 bg-surface-panel px-8 py-10 shadow-e-200">
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-bold mb-2">Bienvenue apprenant !</h1>
          <p class="text-primary-600">Crée ton profil pour rejoindre la communauté Leenup.</p>
        </div>

        <form class="space-y-6" @submit.prevent="onSubmit">
          <div class="grid gap-4 md:grid-cols-2">
            <label class="text-left text-sm font-semibold text-primary-600">
              Prénom
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
                  {{ rule.valid ? '✓' : '•' }}
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
              <!-- TODO: Remplacer les # par les liens CGU/Politique/CGV réels -->
              J’accepte les <a href="#" class="underline">CGU</a>, la <a href="#" class="underline">politique de confidentialité</a> et les <a href="#" class="underline">CGV</a>.
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
  </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import BackButton from '@/components/common/BackButton.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import { register } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth'
import { useOnboardingStore } from '@/stores/onboarding'

const router = useRouter()
const progress = 0.25
const authStore = useAuthStore()
const onboardingStore = useOnboardingStore()
const submitting = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  acceptTerms: false,
})

const passwordRules = computed(() => {
  const value = form.password
  return [
    { label: '8 caractères minimum', valid: value.length >= 8 },
    { label: '1 majuscule', valid: /[A-Z]/.test(value) },
    { label: '1 minuscule', valid: /[a-z]/.test(value) },
    { label: '1 chiffre', valid: /\d/.test(value) },
    { label: '1 caractère spécial', valid: /[^A-Za-z0-9]/.test(value) },
  ]
})

const canSubmit = computed(() =>
  form.firstName.trim().length > 0 &&
  form.lastName.trim().length > 0 &&
  form.email.trim().length > 0 &&
  form.acceptTerms &&
  passwordRules.value.every((r) => r.valid)
)

const onSubmit = () => {
  if (!canSubmit.value || submitting.value) return
  submitting.value = true
  const payload = {
    email: form.email,
    plainPassword: form.password,
    firstName: form.firstName,
    lastName: form.lastName,
    avatarUrl: '',
    bio: '',
    location: '',
    timezone: 'Europe/Paris',
    locale: 'fr',
    // NOTE: Lorsque le backend exposera les colonnes, envoyer les flags ci-dessous
    // is_leener: onboardingStore.role === 'leener',
    // is_mentor: onboardingStore.role === 'mentor',
  }

  register(payload)
    .then(async (user) => {
      const firstnameFromDb = (user as any)?.firstName || form.firstName
      await authStore.authenticate({ email: form.email, password: form.password })
      router.push({ name: 'theme', state: { firstName: firstnameFromDb } })
    })
    .catch((error) => {
      console.error('Registration failed', error)
    })
    .finally(() => { submitting.value = false })
}
</script>
