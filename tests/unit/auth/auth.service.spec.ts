import { describe, it, expect, beforeEach, beforeAll, afterAll, vi } from 'vitest'

vi.mock('@/lib/env', () => ({
  AUTH_LOGIN_PATH: '/auth/login',
  AUTH_ME_PATH: '/me',
  AUTH_REGISTER_PATH: '/register',
  AUTH_CHANGE_PASSWORD_PATH: '/me/change-password',
  AUTH_EMAIL_URL: 'https://localhost/auth/login/email',
  AUTH_GOOGLE_URL: 'https://localhost/auth/login/google',
}))

const httpSpies = vi.hoisted(() => ({
  post: vi.fn(),
  get: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
}))

vi.mock('@/lib/http', () => ({ http: httpSpies }))

import {
  authProviders,
  changePassword,
  createAuthToken,
  deleteAccount,
  fetchProfile,
  login,
  logout,
  redirectToProvider,
  refreshAuthToken,
  register,
  updateProfile,
} from '@/services/auth.service'

describe('auth.service', () => {
  const originalLocation = globalThis.location

  beforeAll(() => {
    Object.defineProperty(globalThis, 'location', {
      writable: true,
      value: { ...originalLocation, assign: vi.fn() },
    })
  })

  afterAll(() => {
    Object.defineProperty(globalThis, 'location', { value: originalLocation })
  })

  beforeEach(() => {
    httpSpies.post.mockReset()
    httpSpies.get.mockReset()
    httpSpies.patch.mockReset()
    httpSpies.delete.mockReset()
  })

  it('login envoie les credentials avec les cookies', async () => {
    const payload = { email: 'john@example.com', password: 'secret' }
    const response = { user: { id: 1, email: payload.email } }
    httpSpies.post.mockResolvedValueOnce({ data: response })

    const result = await login(payload)

    expect(httpSpies.post).toHaveBeenCalledWith('/auth/login', payload, { withCredentials: true })
    expect(result).toEqual(response)
  })

  it('createAuthToken cible /auth avec les bons headers', async () => {
    httpSpies.post.mockResolvedValueOnce({ data: {} })
    const payload = { email: 'john@example.com', password: 'secret' }

    await createAuthToken(payload)

    expect(httpSpies.post).toHaveBeenCalledWith(
      '/auth',
      payload,
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        withCredentials: true,
      })
    )
  })

  it('refreshAuthToken poste sur /auth/refresh', async () => {
    httpSpies.post.mockResolvedValueOnce({ data: {} })

    await refreshAuthToken()

    expect(httpSpies.post).toHaveBeenCalledWith('/auth/refresh', {})
  })

  it('register appelle POST /register avec les bons headers', async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      plainPassword: 'secret',
    }
    const user = { id: 1, email: payload.email }
    httpSpies.post.mockResolvedValueOnce({ data: user })

    const result = await register(payload)

    expect(httpSpies.post).toHaveBeenCalledWith(
      '/register',
      payload,
      expect.objectContaining({
        headers: { 'Content-Type': 'application/ld+json', Accept: 'application/ld+json' },
      })
    )
    expect(result).toEqual(user)
  })

  it('fetchProfile recupere le profil courant', async () => {
    const profile = { id: 1, email: 'john@example.com' }
    httpSpies.get.mockResolvedValueOnce({ data: profile })

    const result = await fetchProfile()

    expect(httpSpies.get).toHaveBeenCalledWith('/me')
    expect(result).toEqual(profile)
  })

  it('updateProfile patch /me', async () => {
    const updated = { id: 1, firstName: 'Johnny' }
    httpSpies.patch.mockResolvedValueOnce({ data: updated })

    const result = await updateProfile({ firstName: 'Johnny' })

    expect(httpSpies.patch).toHaveBeenCalledWith('/me', { firstName: 'Johnny' })
    expect(result).toEqual(updated)
  })

  it('deleteAccount supprime /me', async () => {
    httpSpies.delete.mockResolvedValueOnce(undefined)

    await deleteAccount()

    expect(httpSpies.delete).toHaveBeenCalledWith('/me')
  })

  it('changePassword poste la charge utile', async () => {
    const payload = { currentPassword: 'old', newPassword: 'new' }
    httpSpies.post.mockResolvedValueOnce({ data: null })

    await changePassword(payload)

    expect(httpSpies.post).toHaveBeenCalledWith('/me/change-password', payload)
  })

  it('logout appelle POST /auth/logout', async () => {
    httpSpies.post.mockResolvedValueOnce({ data: null })

    await logout()

    expect(httpSpies.post).toHaveBeenCalledWith('/auth/logout', {})
  })

  it('redirectToProvider redirige vers les bons endpoints', () => {
    const assignSpy = vi.spyOn(globalThis.location, 'assign')

    redirectToProvider('google')
    redirectToProvider('email')

    expect(assignSpy).toHaveBeenNthCalledWith(1, 'https://localhost/auth/login/google')
    expect(assignSpy).toHaveBeenNthCalledWith(2, 'https://localhost/auth/login/email')
  })

  it('expose les URLs des providers', () => {
    expect(authProviders).toEqual({
      google: 'https://localhost/auth/login/google',
      email: 'https://localhost/auth/login/email',
    })
  })
})
