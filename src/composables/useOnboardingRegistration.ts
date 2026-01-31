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

type Profile = 'leener' | 'mentor'
type ApiProfile = 'student' | 'mentor'

type UseOnboardingRegistrationOptions = {
  profile: Profile
  afterSuccess: (firstName: string) => void
  buildPayload?: (form: OnboardingFormState) => RegisterPayload
}

const toApiProfile = (profile: Profile): ApiProfile => (profile === 'leener' ? 'student' : 'mentor')

const DEFAULT_PAYLOAD = (form: OnboardingFormState, profile: Profile): RegisterPayload => ({
  email: form.email,
  plainPassword: form.password,
  firstName: form.firstName,
  lastName: form.lastName,
  profiles: [toApiProfile(profile)],
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
    certError: isFrench
      ? 'Certificat HTTPS non approuvé. Accepte le certificat local puis réessaie.'
      : 'HTTPS certificate not trusted. Accept the local certificate then retry.',
    corsError: isFrench
      ? 'Requête bloquée (CORS). Vérifie que le backend autorise ' + `${globalThis.location.origin}.`
      : 'Request blocked (CORS). Check backend allows http://localhost:4000.',
    validationError: isFrench ? 'Champs invalides. Vérifie les informations saisies.' : 'Invalid fields. Check your input.',
    conflictError: isFrench ? 'Cet email est déjà utilisé.' : 'This email is already in use.',
    unauthorizedError: isFrench ? 'Accès non autorisé.' : 'Unauthorized access.',
    serverError: isFrench ? 'Erreur serveur. Réessaie plus tard.' : 'Server error. Try again later.',
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
    const response = (err as any)?.response
    const responseData = response?.data
    if (Array.isArray(responseData?.violations) && responseData.violations.length > 0) {
      const violation = responseData.violations[0]
      const translatedMessage = translateText(violation.message)
      if (translatedMessage) return translatedMessage
      return staticMessages.validationError
    }
    if (typeof responseData?.detail === 'string') return translateText(responseData.detail) ?? staticMessages.genericError
    if (typeof responseData?.message === 'string') return translateText(responseData.message) ?? staticMessages.genericError

    const message = (err as Error)?.message
    const code = (err as any)?.code
    const normalized = (message ?? '').toLowerCase()

    if (normalized.includes('err_cert_authority_invalid') || normalized.includes('certificate')) {
      return staticMessages.certError
    }
    if (code === 'ERR_NETWORK' || normalized.includes('network error')) {
      return staticMessages.corsError
    }
    if (response?.status === 422) return staticMessages.validationError
    if (response?.status === 409) return staticMessages.conflictError
    if (response?.status === 401) return staticMessages.unauthorizedError
    if (response?.status >= 500) return staticMessages.serverError

    return message || staticMessages.genericError
  }

  const onSubmit = async () => {
    if (!canSubmit.value || submitting.value) return

    submitting.value = true
    errorMessage.value = ''
    successMessage.value = ''
    clearTimer()

    try {
      const payloadBuilder = options.buildPayload ?? ((state: OnboardingFormState) => DEFAULT_PAYLOAD(state, options.profile))
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
