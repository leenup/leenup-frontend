import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const mocks = vi.hoisted(() => ({
  createAuthToken: vi.fn().mockResolvedValue({}),
  refreshAuthToken: vi.fn().mockResolvedValue({}),
  fetchProfile: vi.fn().mockResolvedValue({
    id: 1,
    email: 'a@b.com',
    firstName: 'John',
    lastName: 'Doe',
  }),
  login: vi.fn(),
  register: vi.fn(),
  deleteAccount: vi.fn(),
  updateProfile: vi.fn(),
  changePassword: vi.fn(),
}))

vi.mock('@/services/auth.service', () => mocks)

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  it('authenticate s\'appuie sur les cookies HttpOnly et récupère le profil', async () => {
    const store = useAuthStore()

    await store.authenticate({ email: 'a@b.com', password: 'pass' })

    expect(mocks.createAuthToken).toHaveBeenCalledWith({ email: 'a@b.com', password: 'pass' })
    expect(mocks.fetchProfile).toHaveBeenCalledTimes(1)
    expect(store.user?.email).toBe('a@b.com')
    expect(store.sessionChecked).toBe(true)
  })

  it('refreshTokens appelle le backend sans dépendre d\'un refresh token lisible côté client', async () => {
    const store = useAuthStore()

    await store.refreshTokens()

    expect(mocks.refreshAuthToken).toHaveBeenCalledTimes(1)
  })

  it('logout nettoie le state et marque la session vérifiée', () => {
    const store = useAuthStore()
    store.user = { id: 1, email: 'a@b.com', firstName: 'John', lastName: 'Doe' }
    store.sessionChecked = false

    store.logout()

    expect(store.user).toBeNull()
    expect(store.sessionChecked).toBe(true)
  })

  it('ensureSession évite les appels redondants à fetchProfile', async () => {
    const store = useAuthStore()

    await store.ensureSession()
    await store.ensureSession()

    expect(mocks.fetchProfile).toHaveBeenCalledTimes(1)
    expect(store.sessionChecked).toBe(true)
  })
})
