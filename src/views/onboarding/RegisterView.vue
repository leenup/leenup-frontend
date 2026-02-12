<template>
  <main class="min-h-screen bg-surface-bg text-primary-600 px-6 py-10">
    <div class="mx-auto w-full max-w-3xl space-y-6">
      <OnboardingStepHeader :progress="progress" />

      <div class="w-full max-w-3xl rounded-400 bg-surface-panel px-8 py-10 shadow-e-200 border border-secondary-200">
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-bold mb-2 text-primary-800">{{ title }}</h1>
          <p class="text-primary-600">{{ subtitle }}</p>
        </div>

        <form class="space-y-6" @submit.prevent="onSubmit">
          <div class="grid gap-4 md:grid-cols-2">
            <label class="text-left text-sm font-semibold text-primary-700">
              Prenom
              <input
                v-model="form.firstName"
                type="text"
                required
                class="mt-1 w-full rounded-300 border border-secondary-200 bg-white px-3 py-2 text-primary-700 shadow-e-100 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
            </label>
            <label class="text-left text-sm font-semibold text-primary-700">
              Nom
              <input
                v-model="form.lastName"
                type="text"
                required
                class="mt-1 w-full rounded-300 border border-secondary-200 bg-white px-3 py-2 text-primary-700 shadow-e-100 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
            </label>
          </div>

          <label class="block text-left text-sm font-semibold text-primary-700">
            Email
            <input
              v-model="form.email"
              type="email"
              required
              class="mt-1 w-full rounded-300 border border-secondary-200 bg-white px-3 py-2 text-primary-700 shadow-e-100 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </label>

          <div class="rounded-300 border border-secondary-200 bg-white p-4 shadow-e-100">
            <label class="block text-left text-sm font-semibold text-primary-700">
              Mot de passe
              <PasswordField
                v-model="form.password"
                required
                class="mt-1 w-full rounded-300 border border-secondary-200 bg-white px-3 py-2 text-primary-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                aria-describedby="password-help"
                autocomplete="new-password"
              />
            </label>
            <ul id="password-help" class="mt-3 space-y-1 text-sm">
              <li
                v-for="rule in passwordRules"
                :key="rule.label"
                class="flex items-center gap-2 transition-all duration-200"
                :class="rule.valid ? 'text-primary-700' : 'text-secondary-700'"
              >
                <span
                  class="flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200"
                  :class="rule.valid ? 'bg-primary-600 text-surface-button' : 'bg-secondary-200 text-secondary-700'"
                  aria-hidden="true"
                >
                  <svg
                    v-if="rule.valid"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-3 w-3"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span v-else class="text-[10px] leading-none">--</span>
                </span>
                <span>{{ rule.label }}</span>
              </li>
            </ul>
          </div>

          <div class="rounded-300 bg-surface-muted px-4 py-3 text-left border border-secondary-200">
            <label class="flex items-center gap-3 text-sm text-secondary-700 cursor-pointer">
              <span class="relative flex h-5 w-5 items-center justify-center">
                <input
                  id="accept-terms"
                  v-model="form.acceptTerms"
                  type="checkbox"
                  class="peer absolute h-5 w-5 cursor-pointer opacity-0"
                  required
                />
                <span
                  class="h-5 w-5 rounded border border-secondary-300 bg-white shadow-e-100 transition peer-checked:border-primary-600 peer-checked:bg-primary-600 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-200 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-muted"
                ></span>
                <svg
                  class="pointer-events-none absolute h-3 w-3 text-white opacity-0 transition peer-checked:opacity-100"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span>
              J'accepte les <a href="#" class="underline">CGU</a>, la <a href="#" class="underline">politique de confidentialite</a> et les
              <a href="#" class="underline">CGV</a>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            class="w-full rounded-400 px-6 py-3 text-base font-semibold text-surface-button shadow-e-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200"
            :class="canSubmit && !submitting ? 'bg-primary-600 hover:bg-primary-700' : 'bg-secondary-200 text-secondary-600 opacity-60 cursor-not-allowed border border-secondary-300'"
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
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import OnboardingStepHeader from '@/components/onboarding/OnboardingStepHeader.vue'
import PasswordField from '@/components/common/PasswordField.vue'
import Toast from '@/components/common/Toast.vue'
import { useOnboardingRegistration } from '@/composables/useOnboardingRegistration'

type Profile = 'leener' | 'mentor'

const props = defineProps<{ profile: Profile }>()
const router = useRouter()
const progress = 0.15

const isMentor = computed(() => props.profile === 'mentor')
const title = computed(() => (isMentor.value ? 'Bienvenue mentor !' : 'Bienvenue apprenant !'))
const subtitle = computed(() =>
  isMentor.value ? "Partage ton expertise avec la communaute Leenup en creant ton profil." : 'Cree ton profil pour rejoindre la communaute Leenup.'
)

const { form, passwordRules, canSubmit, submitting, successMessage, errorMessage, onSubmit } = useOnboardingRegistration({
  profile: props.profile,
  afterSuccess: () => {
    router.push({ name: isMentor.value ? 'mentor-onboarding' : 'leener-onboarding' })
  },
})
</script>
