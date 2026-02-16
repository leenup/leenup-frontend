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
          On est content de te revoir !
        </div>
      </section>

      <section class="text-center space-y-2">
        <h1 class="font-sans h2 font-bold">Connexion</h1>
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
          <PasswordField
            v-model="password"
            required
            placeholder="Mot de passe"
            autocomplete="current-password"
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
import PasswordField from '@/components/common/PasswordField.vue'
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

const translateError = (err: any) => {
  const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message
  if (!msg) return 'Une erreur est survenue. Merci de réessayer.'
  const normalized = msg.toLowerCase()
  if (normalized.includes('err_cert_authority_invalid') || normalized.includes('certificate')) {
    return 'Certificat HTTPS non approuvé. Accepte le certificat local puis réessaie.'
  }
  if (err?.code === 'ERR_NETWORK' || normalized.includes('network error')) {
    return 'Requête bloquée (CORS) ou serveur inaccessible. Vérifie la config.'
  }
  if (normalized.includes('expired') || normalized.includes('jwt')) return 'Votre session a expiré, merci de vous reconnecter.'
  if (normalized.includes('invalid') || normalized.includes('bad credentials')) return 'Identifiants incorrects. Vérifie ton email et ton mot de passe.'
  if (normalized.includes('unauthorized')) return 'Vous n’êtes pas autorisé. Merci de vous reconnecter.'
  return msg
}

const resolveDashboardRoute = () => {
  const user = authStore.user
  if (user?.is_mentor) return { name: 'dashboard-mentor' }
  return { name: 'dashboard-leener' }
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
    successMessage.value = 'Connexion reussie'
    redirectTimer = globalThis.setTimeout(() => {
      router.push(resolveDashboardRoute())
    }, 5000)
  } catch (err: any) {
    errorMessage.value = translateError(err)
  }
}
</script>
