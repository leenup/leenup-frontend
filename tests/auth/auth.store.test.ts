import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

const serviceMocks = vi.hoisted(() => ({
  login: vi.fn(),
  register: vi.fn(),
  fetchProfile: vi.fn(),
  updateProfile: vi.fn(),
  deleteAccount: vi.fn(),
  changePassword: vi.fn(),
}))

vi.mock('@/services/auth.service', () => serviceMocks)

import { useAuthStore } from '@/stores/auth'

const baseUser = {
  id: 1,
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
}

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    serviceMocks.login.mockReset()
    serviceMocks.register.mockReset()
    serviceMocks.fetchProfile.mockReset()
    serviceMocks.updateProfile.mockReset()
    serviceMocks.deleteAccount.mockReset()
    serviceMocks.changePassword.mockReset()
    globalThis.localStorage.clear()
  })

  it('login stocke les tokens et le user', async () => {
    serviceMocks.login.mockResolvedValueOnce({
      accessToken: 'token',
      refreshToken: 'refresh',
      user: baseUser,
    })
    const store = useAuthStore()

    await store.login({ email: 'john@example.com', password: 'secret' })

    expect(store.accessToken).toBe('token')
    expect(store.refreshToken).toBe('refresh')
    expect(store.user).toEqual(baseUser)
    expect(globalThis.localStorage.getItem('accessToken')).toBe('token')
    expect(globalThis.localStorage.getItem('refreshToken')).toBe('refresh')
  })

  it('fetchProfile met à jour le user lorsque le token est présent', async () => {
    serviceMocks.fetchProfile.mockResolvedValueOnce({ ...baseUser, firstName: 'Johnny' })
    const store = useAuthStore()
    store.$patch({ accessToken: 'token' })

    await store.fetchProfile()

    expect(serviceMocks.fetchProfile).toHaveBeenCalledWith('token')
    expect(store.user?.firstName).toBe('Johnny')
  })

  it('registerUser délègue à register et retourne la réponse', async () => {
    serviceMocks.register.mockResolvedValueOnce(baseUser)
    const store = useAuthStore()
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      plainPassword: 'secret',
    }

    const result = await store.registerUser(payload)

    expect(serviceMocks.register).toHaveBeenCalledWith(payload)
    expect(result).toEqual(baseUser)
  })

  it('updateProfile nécessite un token et met à jour le store', async () => {
    serviceMocks.updateProfile.mockResolvedValueOnce({ ...baseUser, firstName: 'Jane' })
    const store = useAuthStore()
    store.$patch({ accessToken: 'token', user: baseUser })

    const result = await store.updateProfile({ firstName: 'Jane' })

    expect(serviceMocks.updateProfile).toHaveBeenCalledWith('token', { firstName: 'Jane' })
    expect(store.user?.firstName).toBe('Jane')
    expect(result.firstName).toBe('Jane')
  })

  it('deleteAccount supprime le compte puis nettoie le state', async () => {
    serviceMocks.deleteAccount.mockResolvedValueOnce(undefined)
    const store = useAuthStore()
    store.$patch({ accessToken: 'token', refreshToken: 'refresh', user: baseUser })

    await store.deleteAccount()

    expect(serviceMocks.deleteAccount).toHaveBeenCalledWith('token')
    expect(store.accessToken).toBeNull()
    expect(store.refreshToken).toBeNull()
    expect(store.user).toBeNull()
  })

  it('changePassword exige un token', async () => {
    serviceMocks.changePassword.mockResolvedValueOnce(undefined)
    const store = useAuthStore()
    store.$patch({ accessToken: 'token' })
    const payload = { currentPassword: 'old', newPassword: 'new' }

    await store.changePassword(payload)

    expect(serviceMocks.changePassword).toHaveBeenCalledWith('token', payload)
  })

  it('changePassword rejette si aucun token n’est présent', async () => {
    const store = useAuthStore()
    const payload = { currentPassword: 'old', newPassword: 'new' }

    await expect(store.changePassword(payload)).rejects.toThrow('Missing access token')
  })
})
