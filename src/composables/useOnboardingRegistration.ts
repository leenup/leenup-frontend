import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import { register as registerRequest, type RegisterPayload } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth'

type OnboardingFormState = {
  firstName: string
  lastName: string
  email: string
  password: string
  acceptTerms: boolean
}

type UseOnboardingRegistrationOptions = {
  afterSuccess: (firstName: string) => void
  buildPayload?: (form: OnboardingFormState) => RegisterPayload
}

const DEFAULT_PAYLOAD = (form: OnboardingFormState): RegisterPayload => ({
  email: form.email,
  plainPassword: form.password,
  firstName: form.firstName,
  lastName: form.lastName,
  avatarUrl: '',
  bio: '',
  location: '',
  timezone: 'Europe/Paris',
  locale: 'fr',
})

export function useOnboardingRegistration(options: UseOnboardingRegistrationOptions) {
  const authStore = useAuthStore()
  const locale = typeof navigator === 'undefined' ? 'fr' : navigator.language?.toLowerCase()
  const isFrench = locale?.startsWith('fr')

  const staticMessages = {
    success: isFrench ? 'Bienvenue dans la team Leenup !' : 'Welcome to the Leenup team!',
    genericError: isFrench ? 'Une erreur est survenue. Merci de réessayer.' : 'Something went wrong. Please try again.',
    networkError: isFrench
      ? 'Connexion serveur impossible. Vérifie ta connexion ou réessaie plus tard.'
      : 'Unable to reach the server. Check your connection or try again later.',
  }

  const messageDictionary: Record<string, string> = {
    'This email is already in use': 'Cet email est déjà utilisé',
    'email: This email is already in use': 'Cet email est déjà utilisé',
  }

  const translateText = (message?: string) => {
    if (!message) return undefined
    if (!isFrench) return message
    return messageDictionary[message] ?? message
  }

  const form = reactive<OnboardingFormState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    acceptTerms: false,
  })

  const submitting = ref(false)
  const successMessage = ref('')
  const errorMessage = ref('')
  let redirectTimer: ReturnType<typeof setTimeout> | null = null

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

  const canSubmit = computed(
    () =>
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      form.email.trim().length > 0 &&
      form.acceptTerms &&
      passwordRules.value.every((rule) => rule.valid)
  )

  const clearTimer = () => {
    if (redirectTimer) {
      globalThis.clearTimeout(redirectTimer)
      redirectTimer = null
    }
  }

  const formatErrorMessage = (err: unknown) => {
    const responseData = (err as any)?.response?.data
    if (Array.isArray(responseData?.violations) && responseData.violations.length > 0) {
      const violation = responseData.violations[0]
      const translatedMessage = translateText(violation.message)
      if (translatedMessage) return translatedMessage
    }
    if (typeof responseData?.detail === 'string') return translateText(responseData.detail) ?? staticMessages.genericError
    if (typeof responseData?.message === 'string') return translateText(responseData.message) ?? staticMessages.genericError
    const message = (err as Error)?.message
    if (message?.toLowerCase().includes('network')) {
      return staticMessages.networkError
    }
    return message || staticMessages.genericError
  }

  const onSubmit = async () => {
    if (!canSubmit.value || submitting.value) return

    submitting.value = true
    errorMessage.value = ''
    successMessage.value = ''
    clearTimer()

    try {
      const payloadBuilder = options.buildPayload ?? DEFAULT_PAYLOAD
      const user = await registerRequest(payloadBuilder(form))
      await authStore.authenticate({ email: form.email, password: form.password })
      const firstNameFromDb = (user as any)?.firstName ?? form.firstName
      successMessage.value = staticMessages.success
      redirectTimer = globalThis.setTimeout(() => {
        options.afterSuccess(firstNameFromDb)
        redirectTimer = null
      }, 5000)
    } catch (err) {
      errorMessage.value = formatErrorMessage(err)
    } finally {
      submitting.value = false
    }
  }

  onBeforeUnmount(() => {
    clearTimer()
  })

  return {
    form,
    passwordRules,
    canSubmit,
    submitting,
    successMessage,
    errorMessage,
    onSubmit,
  }
}
