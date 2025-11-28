import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest'

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
  login,
  register,
  fetchProfile,
  updateProfile,
  deleteAccount,
  changePassword,
  redirectToProvider,
  authProviders,
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

  it('login envoie les credentials à la bonne route', async () => {
    const payload = { email: 'john@example.com', password: 'secret' }
    const response = { accessToken: 'foo', refreshToken: 'bar' }
    httpSpies.post.mockResolvedValueOnce({ data: response })

    const result = await login(payload)

    expect(httpSpies.post).toHaveBeenCalledWith('/auth/login', payload)
    expect(result).toEqual(response)
  })

  it('register appelle POST /register avec le payload', async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      plainPassword: 'secret',
    }
    const user = { id: 1, email: payload.email, firstName: 'John', lastName: 'Doe' }
    httpSpies.post.mockResolvedValueOnce({ data: user })

    const result = await register(payload)

    expect(httpSpies.post).toHaveBeenCalledWith('/register', payload)
    expect(result).toEqual(user)
  })

  it('fetchProfile envoie le header Authorization', async () => {
    const profile = { id: 1, email: 'john@example.com', firstName: 'John', lastName: 'Doe' }
    httpSpies.get.mockResolvedValueOnce({ data: profile })

    const result = await fetchProfile('token-123')

    expect(httpSpies.get).toHaveBeenCalledWith('/me', {
      headers: { Authorization: 'Bearer token-123' },
    })
    expect(result).toEqual(profile)
  })

  it('updateProfile patch /me et retourne le profil mis à jour', async () => {
    const updated = {
      id: 1,
      email: 'john@example.com',
      firstName: 'Johnny',
      lastName: 'Doe',
    }
    httpSpies.patch.mockResolvedValueOnce({ data: updated })

    const result = await updateProfile('token-123', { firstName: 'Johnny' })

    expect(httpSpies.patch).toHaveBeenCalledWith('/me', { firstName: 'Johnny' }, {
      headers: { Authorization: 'Bearer token-123' },
    })
    expect(result).toEqual(updated)
  })

  it('deleteAccount supprime /me avec le token', async () => {
    httpSpies.delete.mockResolvedValueOnce(undefined)

    await deleteAccount('token-123')

    expect(httpSpies.delete).toHaveBeenCalledWith('/me', {
      headers: { Authorization: 'Bearer token-123' },
    })
  })

  it('changePassword envoie la requête vers /me/change-password', async () => {
    const payload = { currentPassword: 'old', newPassword: 'new' }
    httpSpies.post.mockResolvedValueOnce({ data: null })

    await changePassword('token-abc', payload)

    expect(httpSpies.post).toHaveBeenCalledWith('/me/change-password', payload, {
      headers: { Authorization: 'Bearer token-abc' },
    })
  })

  it('redirectToProvider redirige vers les URLs configurées', () => {
    const assignSpy = vi.spyOn(globalThis.location, 'assign')

    redirectToProvider('google')
    redirectToProvider('email')

    expect(assignSpy).toHaveBeenNthCalledWith(
      1,
      'https://localhost/auth/login/google'
    )
    expect(assignSpy).toHaveBeenNthCalledWith(
      2,
      'https://localhost/auth/login/email'
    )
  })

  it('expose les URLs des providers', () => {
    expect(authProviders).toEqual({
      google: 'https://localhost/auth/login/google',
      email: 'https://localhost/auth/login/email',
    })
  })
})
