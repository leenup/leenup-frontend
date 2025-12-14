import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  changePassword as changePasswordRequest,
  createAuthToken,
  refreshAuthToken,
  deleteAccount as deleteAccountRequest,
  fetchProfile as fetchProfileRequest,
  login as loginRequest,
  logout as logoutRequest,
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

  const user = ref<User | null>(null)
  const loading = ref(false)
  const sessionChecked = ref(false)

  // --- getters
  const isAuthenticated = computed(() => !!user.value)

  // --- actions
  const markSignedOut = () => {
    user.value = null
    sessionChecked.value = true
  }

  const handleAuthSuccess = async (data: { user?: AuthUser } | undefined) => {
    if (data?.user) {
      user.value = data.user
      sessionChecked.value = true
      return data.user
    }
    return fetchProfile()
  }

  async function login(payload: CredentialsPayload) {
    try {
      loading.value = true
      const data = await loginRequest(payload)
      return await handleAuthSuccess(data)
    } finally {
      loading.value = false
    }
  }

  async function authenticate(payload: CredentialsPayload) {
    try {
      loading.value = true
      const data = await createAuthToken(payload)
      return await handleAuthSuccess(data)
    } finally {
      loading.value = false
    }
  }

  async function refreshTokens() {
    try {
      await refreshAuthToken()
    } catch (error) {
      markSignedOut()
      throw error
    }
  }

  async function logout() {
    try {
      await logoutRequest()
    } catch {
      // noop: even if backend unreachable we clear local session
    } finally {
      markSignedOut()
    }
  }

  async function fetchProfile() {
    try {
      const profile = await fetchProfileRequest()
      user.value = profile
      sessionChecked.value = true
      return profile
    } catch (error) {
      markSignedOut()
      throw error
    }
  }

  const registerUser = (payload: RegisterPayload) => registerRequest(payload)

  async function updateProfile(payload: UpdateProfilePayload) {
    const updated = await updateProfileRequest(payload)
    user.value = updated
    return updated
  }

  async function deleteAccount() {
    await deleteAccountRequest()
    markSignedOut()
  }

  async function changePassword(payload: ChangePasswordPayload) {
    await changePasswordRequest(payload)
  }

  async function ensureSession() {
    if (sessionChecked.value) return
    try {
      await fetchProfile()
    } catch {
      // noop: fetchProfile already normalizes state/sessionChecked
    }
  }
  return {
    user,
    loading,
    sessionChecked,
    isAuthenticated,
    login,
    authenticate,
    refreshTokens,
    logout,
    fetchProfile,
    ensureSession,
    registerUser,
    updateProfile,
    deleteAccount,
    changePassword,
  }
})
