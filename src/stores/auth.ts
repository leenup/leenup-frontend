import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  // --- state
    type User = { id: string | number; email: string; name?: string }
    type LoginResponse =
    | { token: string }
    | { accessToken: string; refreshToken?: string; user?: User }

    const user = ref<User | null>(null)
    const accessToken = ref<string | null>(null)
    const refreshToken = ref<string | null>(null)
    const loading = ref(false)

  // --- getters
  const isAuthenticated = computed(() => !!accessToken.value)

  // --- actions
  async function login(payload: { email: string; password: string }) {
    try {
      loading.value = true
      const { data } = await axios.post(
        import.meta.env.VITE_AUTH_LOGIN_PATH || '/auth/login',
        payload
      )

      // On adapte selon ta réponse backend (ici format générique)
      accessToken.value = data.accessToken || data.token
      refreshToken.value = data.refreshToken || null
      user.value = data.user || null

      // Persistance locale (optionnelle)
      localStorage.setItem('accessToken', accessToken.value!)
      if (refreshToken.value)
        localStorage.setItem('refreshToken', refreshToken.value!)
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  async function fetchProfile() {
    if (!accessToken.value) return
    const { data } = await axios.get(
      import.meta.env.VITE_AUTH_ME_PATH || '/users/me',
      {
        headers: { Authorization: `Bearer ${accessToken.value}` },
      }
    )
    user.value = data
  }

  return {
    user,
    accessToken,
    refreshToken,
    loading,
    isAuthenticated,
    login,
    logout,
    fetchProfile,
  }
})