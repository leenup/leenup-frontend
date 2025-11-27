import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  changePassword as changePasswordRequest,
  createAuthToken,
  deleteAccount as deleteAccountRequest,
  fetchProfile as fetchProfileRequest,
  login as loginRequest,
  register as registerRequest,
  updateProfile as updateProfileRequest,
  type AuthUser,
  type ChangePasswordPayload,
  type CredentialsPayload,
  type RegisterPayload,
  type UpdateProfilePayload,
} from '@/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  // --- state
  type User = AuthUser

  const storage = typeof window === 'undefined' ? null : window.localStorage

  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(storage?.getItem('accessToken') ?? sessionStorage.getItem('accessToken'))
  const refreshToken = ref<string | null>(storage?.getItem('refreshToken') ?? sessionStorage.getItem('refreshToken'))
  const loading = ref(false)

  // --- getters
  const isAuthenticated = computed(() => !!accessToken.value)

  // --- actions
  const persist = (key: string, value: string | null) => {
    if (typeof window === 'undefined') return
    if (value === null) {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    } else {
      localStorage.setItem(key, value)
      sessionStorage.setItem(key, value)
    }
  }

  const ensureToken = () => {
    if (!accessToken.value) throw new Error('Missing access token')
    return accessToken.value
  }

  async function login(payload: CredentialsPayload) {
    try {
      loading.value = true
      const data = await loginRequest(payload)

      const normalizedAccessToken =
        'accessToken' in data ? data.accessToken : data.token
      accessToken.value = normalizedAccessToken ?? null

      const normalizedRefreshToken =
        'refreshToken' in data ? data.refreshToken ?? null : null
      refreshToken.value = normalizedRefreshToken

      user.value = data.user ?? null

      persist('accessToken', accessToken.value)
      persist('refreshToken', refreshToken.value)
    } finally {
      loading.value = false
    }
  }

  async function authenticate(payload: CredentialsPayload) {
    const tokens = await createAuthToken(payload)
    accessToken.value = tokens.token
    refreshToken.value = tokens.refreshToken ?? null
    persist('accessToken', accessToken.value)
    persist('refreshToken', refreshToken.value)
  }

  async function logout() {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    persist('accessToken', null)
    persist('refreshToken', null)
  }

  async function fetchProfile() {
    if (!accessToken.value) return
    const profile = await fetchProfileRequest(accessToken.value)
    user.value = profile
  }

  async function registerUser(payload: RegisterPayload) {
    return registerRequest(payload)
  }

  async function updateProfile(payload: UpdateProfilePayload) {
    const token = ensureToken()
    const updated = await updateProfileRequest(token, payload)
    user.value = updated
    return updated
  }

  async function deleteAccount() {
    const token = ensureToken()
    await deleteAccountRequest(token)
    logout()
  }

  async function changePassword(payload: ChangePasswordPayload) {
    const token = ensureToken()
    await changePasswordRequest(token, payload)
  }
  return {
    user,
    accessToken,
    refreshToken,
    loading,
    isAuthenticated,
    login,
    authenticate,
    logout,
    fetchProfile,
    registerUser,
    updateProfile,
    deleteAccount,
    changePassword,
  }
})
