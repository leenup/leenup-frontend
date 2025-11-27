import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

vi.mock('@/services/auth.service', () => {
  return {
    createAuthToken: vi.fn().mockResolvedValue({ token: 'token-123', refreshToken: 'refresh-456' }),
    refreshAuthToken: vi.fn().mockResolvedValue({ token: 'token-789', refreshToken: 'refresh-000' }),
    login: vi.fn(),
    register: vi.fn(),
  }
})

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    sessionStorage.clear()
    vi.useFakeTimers()
    vi.restoreAllMocks()
  })

  it('authenticate stocke token et refreshToken dans le state et le storage (session)', async () => {
    const store = useAuthStore()

    await store.authenticate({ email: 'a@b.com', password: 'pass' })

    expect(store.accessToken).toBe('token-123')
    expect(store.refreshToken).toBe('refresh-456')
    expect(sessionStorage.getItem('refreshToken')).toBe('refresh-456')
    expect(sessionStorage.getItem('accessToken')).toBe('token-123')
  })

  it('refreshTokens remplace les tokens et met à jour le storage', async () => {
    const store = useAuthStore()
    store.accessToken = 'old-token'
    store.refreshToken = 'refresh-456'
    sessionStorage.setItem('refreshToken', 'refresh-456')

    await store.refreshTokens()

    expect(store.accessToken).toBe('token-789')
    expect(store.refreshToken).toBe('refresh-000')
    expect(sessionStorage.getItem('refreshToken')).toBe('refresh-000')
    expect(sessionStorage.getItem('accessToken')).toBe('token-789')
  })
})
