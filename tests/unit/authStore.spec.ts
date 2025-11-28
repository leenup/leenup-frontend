import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const mocks = vi.hoisted(() => ({
  createAuthToken: vi.fn().mockResolvedValue({ token: 'token-123', refreshToken: 'refresh-456' }),
  refreshAuthToken: vi.fn().mockResolvedValue({ token: 'token-789', refreshToken: 'refresh-000' }),
  login: vi.fn(),
  register: vi.fn(),
}))

vi.mock('@/services/auth.service', () => mocks)

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    sessionStorage.clear()
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  it('authenticate stocke token et refreshToken en mémoire uniquement', async () => {
    const store = useAuthStore()

    await store.authenticate({ email: 'a@b.com', password: 'pass' })

    expect(store.accessToken).toBe('token-123')
    expect(store.refreshToken).toBe('refresh-456')
    expect(sessionStorage.getItem('refreshToken')).toBeNull()
    expect(sessionStorage.getItem('accessToken')).toBeNull()
    expect(mocks.createAuthToken).toHaveBeenCalledWith({ email: 'a@b.com', password: 'pass' })
  })

  it('refreshTokens remplace les tokens et met à jour le storage', async () => {
    const store = useAuthStore()
    store.accessToken = 'old-token'
    store.refreshToken = 'refresh-456'
    await store.refreshTokens()

    expect(store.accessToken).toBe('token-789')
    expect(store.refreshToken).toBe('refresh-000')
    expect(sessionStorage.getItem('refreshToken')).toBeNull()
    expect(sessionStorage.getItem('accessToken')).toBeNull()
    expect(mocks.refreshAuthToken).toHaveBeenCalledWith({ refreshToken: 'refresh-456' })
  })

  it('logout nettoie le state', () => {
    const store = useAuthStore()
    store.accessToken = 'token-123'
    store.refreshToken = 'refresh-456'
    // @ts-expect-error test
    store.user = { id: 1, email: 'a@b.com', firstName: 'John', lastName: 'Doe' }

    store.logout()

    expect(store.accessToken).toBeNull()
    expect(store.refreshToken).toBeNull()
    expect(store.user).toBeNull()
  })

  it('authenticate propage les erreurs sans altérer le state', async () => {
    const store = useAuthStore()
    mocks.createAuthToken.mockRejectedValueOnce(new Error('Bad credentials'))

    await expect(store.authenticate({ email: 'a@b.com', password: 'wrong' })).rejects.toThrow('Bad credentials')
    expect(store.accessToken).toBeNull()
    expect(store.refreshToken).toBeNull()
  })
})
