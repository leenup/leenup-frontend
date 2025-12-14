import axios, { type AxiosRequestConfig } from 'axios'
import { API_BASE_URL } from './env'
import { useAuthStore } from '@/stores/auth'

const http = axios.create({ baseURL: API_BASE_URL, timeout: 15000, withCredentials: true })

const CSRF_COOKIE_NAME = 'XSRF-TOKEN'
const needsCsrf = (config: AxiosRequestConfig) => {
  const method = (config.method ?? 'get').toLowerCase()
  return ['post', 'put', 'patch', 'delete'].includes(method)
}

const readCsrfToken = () => {
  if (typeof document === 'undefined') return null
  const cookie = document.cookie
  if (!cookie) return null
  const cookies = cookie.split(';').map((chunk) => chunk.trim())
  for (const entry of cookies) {
    if (entry.startsWith(`${CSRF_COOKIE_NAME}=`)) {
      return decodeURIComponent(entry.substring(CSRF_COOKIE_NAME.length + 1))
    }
  }
  return null
}

http.interceptors.request.use((config) => {
  if (needsCsrf(config)) {
    const token = readCsrfToken()
    if (token) {
      config.headers = config.headers ?? {}
      config.headers['X-XSRF-TOKEN'] = token
    }
  }
  config.withCredentials = true
  return config
})

let isRefreshing = false
let pendingRequests: Array<() => void> = []

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config ?? {}
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
          pendingRequests = []
          await store.logout()
          isRefreshing = false
          return Promise.reject(err)
        } finally {
          isRefreshing = false
        }
      }

      originalRequest.__isRetryRequest = true
      return http(originalRequest)
    }

    return Promise.reject(error)
  }
)

export { http, readCsrfToken }
