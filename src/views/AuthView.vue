<template>
  <main class="min-h-screen bg-surface-bg text-primary-600 px-6 py-10">
    <div class="mx-auto w-full max-w-3xl space-y-6">
      <header class="flex items-center gap-4">
        <BackButton />
        <ProgressBar :value="0.8" />
      </header>

      <section class="grid items-start gap-4 md:grid-cols-[auto,1fr]">
        <IconCoucou class="h-20 w-20 text-primary-600" />
        <div class="font-sans text rounded-400 bg-surface-panel px-4 py-3 text-primary-600 shadow-e-100">
          Un dernier clic et on part à l'aventure ensemble !
        </div>
      </section>

      <section class="text-center space-y-2">
        <h1 class="font-sans h2 font-bold">Lorem ipsum</h1>
        <p class="font-sans h3 text-primary-600">Lorem ipsum dolor sit amet, lorem ipsum.</p>
      </section>

      <form class="space-y-4" @submit.prevent="onSubmit">
        <div class="space-y-2">
          <input
            v-model="email"
            type="email"
            required
            placeholder="monadresse@mail.com"
            class="w-full rounded-300 border border-secondary-300 bg-white px-4 py-3 text-primary-600 shadow-e-100 focus:border-cta-500 focus:outline-none focus:ring-2 focus:ring-cta-200"
          />
          <input
            v-model="password"
            type="password"
            required
            placeholder="Mot de passe"
            class="w-full rounded-300 border border-secondary-300 bg-white px-4 py-3 text-primary-600 shadow-e-100 focus:border-cta-500 focus:outline-none focus:ring-2 focus:ring-cta-200"
          />
        </div>

        <button
          type="submit"
          class="flex w-full items-center justify-center gap-3 rounded-400 bg-primary-600 px-6 py-3 text-base font-semibold text-surface-button shadow-e-300 transition hover:bg-primary-700"
        >
          <IconUser class="h-5 w-5" />
          Connexion avec e-mail
        </button>

        <button
          type="button"
          class="flex w-full items-center justify-center gap-3 rounded-400 bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-e-200 transition hover:bg-secondary-500"
        >
          <img src="@/assets/brand/icons/google.svg" alt="Google" class="h-5 w-5" />
          Connexion avec Google
        </button>
      </form>
    </div>
    <Toast v-if="errorMessage" :key="'err-' + errorMessage" :message="errorMessage" type="error" />
    <Toast v-if="successMessage" :key="'ok-' + successMessage" :message="successMessage" type="success" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BackButton from '@/components/common/BackButton.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import IconCoucou from '@/components/icons/IconCoucou.vue'
import IconUser from '@/components/icons/IconHome.vue'
import { useAuthStore } from '@/stores/auth'
import Toast from '@/components/common/Toast.vue'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
let redirectTimer: ReturnType<typeof setTimeout> | undefined

const translateError = (msg?: string) => {
  if (!msg) return 'Une erreur est survenue. Merci de réessayer.'
  const normalized = msg.toLowerCase()
  if (normalized.includes('network')) return 'Connexion serveur impossible. Vérifie ta connexion ou réessaie plus tard.'
  if (normalized.includes('expired') || normalized.includes('jwt')) return 'Votre session a expiré, merci de vous reconnecter.'
  if (normalized.includes('invalid') || normalized.includes('bad credentials')) return 'Identifiants incorrects. Vérifiez votre email et votre mot de passe.'
  if (normalized.includes('unauthorized')) return 'Vous n’êtes pas autorisé. Merci de vous reconnecter.'
  return msg
}

const onSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  if (redirectTimer) {
    globalThis.clearTimeout(redirectTimer)
    redirectTimer = undefined
  }
  try {
    await authStore.authenticate({ email: email.value, password: password.value })
    await authStore.fetchProfile()
    successMessage.value = 'Connexion réussie'
    redirectTimer = globalThis.setTimeout(() => {
      // NOTE: router vers dashboard mentor si is_mentor true
      router.push({ name: 'dashboard-leener' })
    }, 5000)
  } catch (err: any) {
    const apiMessage = err?.response?.data?.message || err?.response?.data?.error || err?.message
    errorMessage.value = translateError(apiMessage)
  }
}
</script>
