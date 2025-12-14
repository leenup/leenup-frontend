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
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="Mot de passe"
              class="w-full rounded-300 border border-secondary-300 bg-white px-4 py-3 pr-12 text-primary-600 shadow-e-100 focus:border-cta-500 focus:outline-none focus:ring-2 focus:ring-cta-200"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-3 flex items-center text-secondary-700 transition hover:text-primary-600"
              @click="showPassword = !showPassword"
              :aria-pressed="showPassword.toString()"
              :title="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
            >
              <component :is="showPassword ? IconEyeOff : IconEye" />
            </button>
          </div>
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
import IconEye from '@/components/icons/IconEye.vue'
import IconEyeOff from '@/components/icons/IconEyeOff.vue'
import { useAuthStore } from '@/stores/auth'
import Toast from '@/components/common/Toast.vue'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
let redirectTimer: ReturnType<typeof setTimeout> | undefined

const translateError = (msg?: string) => {
  if (!msg) return 'Une erreur est survenue. Merci de reessayer.'
  const normalized = msg.toLowerCase()
  if (normalized.includes('network')) return 'Connexion serveur impossible. Verifie ta connexion ou reessaye plus tard.'
  if (normalized.includes('expired') || normalized.includes('jwt')) return 'Votre session a expire, merci de vous reconnecter.'
  if (normalized.includes('invalid') || normalized.includes('bad credentials')) return 'Identifiants incorrects. Verifiez votre email et votre mot de passe.'
  if (normalized.includes('unauthorized')) return 'Vous netes pas autorise. Merci de vous reconnecter.'
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
    const apiMessage = err?.response?.data?.message || err?.response?.data?.error || err?.message
    errorMessage.value = translateError(apiMessage)
  }
}
</script>
