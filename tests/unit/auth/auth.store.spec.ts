import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const serviceMocks = vi.hoisted(() => ({
  createAuthToken: vi.fn(),
  refreshAuthToken: vi.fn(),
  fetchProfile: vi.fn(),
  login: vi.fn(),
  register: vi.fn(),
  deleteAccount: vi.fn(),
  updateProfile: vi.fn(),
  changePassword: vi.fn(),
  logout: vi.fn(),
}))

vi.mock('@/services/auth.service', () => serviceMocks)

const user = { id: 1, email: 'a@b.com', firstName: 'John', lastName: 'Doe' }

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    Object.values(serviceMocks).forEach((spy) => spy.mockReset())
    serviceMocks.fetchProfile.mockResolvedValue(user)
    serviceMocks.login.mockResolvedValue({ user })
    serviceMocks.createAuthToken.mockResolvedValue({})
    serviceMocks.refreshAuthToken.mockResolvedValue({})
    serviceMocks.updateProfile.mockResolvedValue({ ...user, firstName: 'Jane' })
    serviceMocks.logout.mockResolvedValue(undefined)
  })

  it('login persiste l\'utilisateur renvoye par le backend', async () => {
    const store = useAuthStore()
    const credentials = { email: 'a@b.com', password: 'pass' }

    const result = await store.login(credentials)

    expect(serviceMocks.login).toHaveBeenCalledWith(credentials)
    expect(result).toEqual(user)
    expect(store.user).toEqual(user)
    expect(store.sessionChecked).toBe(true)
  })

  it('login recupere le profil si la reponse ne contient pas user', async () => {
    serviceMocks.login.mockResolvedValueOnce({})
    const store = useAuthStore()

    await store.login({ email: 'a@b.com', password: 'pass' })

    expect(serviceMocks.fetchProfile).toHaveBeenCalledTimes(1)
    expect(store.user).toEqual(user)
  })

  it('authenticate passe par createAuthToken puis fetchProfile', async () => {
    const store = useAuthStore()

    await store.authenticate({ email: 'a@b.com', password: 'pass' })

    expect(serviceMocks.createAuthToken).toHaveBeenCalled()
    expect(serviceMocks.fetchProfile).toHaveBeenCalledTimes(1)
    expect(store.user).toEqual(user)
  })

  it('refreshTokens appelle simplement refreshAuthToken', async () => {
    const store = useAuthStore()

    await store.refreshTokens()

    expect(serviceMocks.refreshAuthToken).toHaveBeenCalledTimes(1)
  })

  it('refreshTokens nettoie la session si le refresh echoue', async () => {
    const store = useAuthStore()
    serviceMocks.refreshAuthToken.mockRejectedValueOnce(new Error('expired'))
    store.user = { ...user }

    await expect(store.refreshTokens()).rejects.toThrow('expired')
    expect(store.user).toBeNull()
    expect(store.sessionChecked).toBe(true)
  })

  it('logout vide le state et marque la session verifiee', async () => {
    const store = useAuthStore()
    store.user = { ...user }
    store.sessionChecked = false

    await store.logout()

    expect(serviceMocks.logout).toHaveBeenCalledTimes(1)
    expect(store.user).toBeNull()
    expect(store.sessionChecked).toBe(true)
  })

  it('fetchProfile stocke l\'utilisateur et marque la session', async () => {
    const store = useAuthStore()

    const profile = await store.fetchProfile()

    expect(serviceMocks.fetchProfile).toHaveBeenCalledTimes(1)
    expect(profile).toEqual(user)
    expect(store.user).toEqual(user)
    expect(store.sessionChecked).toBe(true)
  })

  it('fetchProfile nettoie le state en cas d\'erreur', async () => {
    serviceMocks.fetchProfile.mockRejectedValueOnce(new Error('unauthorized'))
    const store = useAuthStore()
    store.user = { ...user }

    await expect(store.fetchProfile()).rejects.toThrow('unauthorized')
    expect(store.user).toBeNull()
    expect(store.sessionChecked).toBe(true)
  })

  it('ensureSession ne refait pas l\'appel si deja verifie', async () => {
    const store = useAuthStore()
    store.sessionChecked = true

    await store.ensureSession()

    expect(serviceMocks.fetchProfile).not.toHaveBeenCalled()
  })

  it('ensureSession recupere le profil quand necessaire', async () => {
    const store = useAuthStore()
    store.sessionChecked = false

    await store.ensureSession()

    expect(serviceMocks.fetchProfile).toHaveBeenCalledTimes(1)
    expect(store.user).toEqual(user)
  })

  it('updateProfile synchronise le state', async () => {
    const store = useAuthStore()

    const updated = await store.updateProfile({ firstName: 'Jane' })

    expect(serviceMocks.updateProfile).toHaveBeenCalledWith({ firstName: 'Jane' })
    expect(updated.firstName).toBe('Jane')
    expect(store.user?.firstName).toBe('Jane')
  })

  it('deleteAccount appelle l\'API et vide le store', async () => {
    const store = useAuthStore()
    store.user = { ...user }

    await store.deleteAccount()

    expect(serviceMocks.deleteAccount).toHaveBeenCalledTimes(1)
    expect(store.user).toBeNull()
    expect(store.sessionChecked).toBe(true)
  })

  it('changePassword delegue a l\'API', async () => {
    const store = useAuthStore()
    const payload = { currentPassword: 'old', newPassword: 'new' }

    await store.changePassword(payload)

    expect(serviceMocks.changePassword).toHaveBeenCalledWith(payload)
  })

  it('registerUser renvoie directement la promesse de service', async () => {
    const store = useAuthStore()
    const payload = { email: 'a@b.com', plainPassword: 'p', firstName: 'John', lastName: 'Doe' }
    serviceMocks.register.mockResolvedValueOnce({ id: 42 })

    const response = await store.registerUser(payload)

    expect(serviceMocks.register).toHaveBeenCalledWith(payload)
    expect(response).toEqual({ id: 42 })
  })
})
