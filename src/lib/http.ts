import axios from 'axios'
import { API_BASE_URL } from './env'
import { useAuthStore } from '@/stores/auth'

const http = axios.create({ baseURL: API_BASE_URL, timeout: 15000, withCredentials: true })

http.interceptors.request.use((config) => {
  const store = useAuthStore()
  if (store.accessToken) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${store.accessToken}`
  }
  return config
})

let isRefreshing = false
let pendingRequests: Array<() => void> = []

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const store = useAuthStore()

    if (error.response?.status === 401 && !originalRequest.__isRetryRequest) {
      if (isRefreshing) {
        await new Promise<void>((resolve) => pendingRequests.push(resolve))
      } else {
        isRefreshing = true
        try {
          await store.refreshTokens()
          pendingRequests.forEach((resolve) => resolve())
          pendingRequests = []
        } catch (err) {
          store.logout()
          pendingRequests = []
          isRefreshing = false
          return Promise.reject(err)
        } finally {
          isRefreshing = false
        }
      }

      originalRequest.__isRetryRequest = true
      originalRequest.headers = originalRequest.headers ?? {}
      originalRequest.headers.Authorization = `Bearer ${store.accessToken}`
      return http(originalRequest)
    }

    return Promise.reject(error)
  }
)

export { http }
