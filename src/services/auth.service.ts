import { http } from '@/lib/http'
import {
  AUTH_CHANGE_PASSWORD_PATH,
  AUTH_EMAIL_URL,
  AUTH_GOOGLE_URL,
  AUTH_LOGIN_PATH,
  AUTH_ME_PATH,
  AUTH_REGISTER_PATH,
} from '@/lib/env'

export type AuthUser = {
  id: string | number
  firstName: string
  lastName: string
  email: string
  phone?: string | null
  birthDate?: string | null
  createdAt?: string
  updatedAt?: string
}

export type CredentialsPayload = { email: string; password: string }

export type AuthTokenResponse = {
  token: string
  refreshToken?: string
}

export type RefreshTokenPayload = { refreshToken: string }

export type LoginResponse =
  | { token: string; user?: AuthUser }
  | { accessToken: string; refreshToken?: string; user?: AuthUser }

export type RegisterPayload = {
  email: string
  plainPassword: string
  firstName: string
  lastName: string
  avatarUrl?: string
  bio?: string
  location?: string
  timezone?: string
  locale?: string
  // NOTE: Ajouter is_leener / is_mentor (booleens) dès que le backend les expose
}

export type UpdateProfilePayload = Partial<
  Pick<AuthUser, 'firstName' | 'lastName' | 'email' | 'phone' | 'birthDate'>
>

export type ChangePasswordPayload = {
  currentPassword: string
  newPassword: string
}

const authHeaders = (token: string) => ({ Authorization: `Bearer ${token}` })

export async function login(payload: CredentialsPayload) {
  const { data } = await http.post<LoginResponse>(AUTH_LOGIN_PATH, payload, { withCredentials: true })
  return data
}

export async function createAuthToken(payload: CredentialsPayload) {
  const { data } = await http.post<AuthTokenResponse>('/auth', payload, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    withCredentials: true,
  })
  return data
}

export async function refreshAuthToken(payload: RefreshTokenPayload) {
  const { data } = await http.post<AuthTokenResponse>('/api/token/refresh', payload, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    withCredentials: true,
  })
  return data
}

export async function register(payload: RegisterPayload) {
  const { data } = await http.post<AuthUser>(AUTH_REGISTER_PATH, payload, {
    headers: {
      'Content-Type': 'application/ld+json',
      Accept: 'application/ld+json',
    },
  })
  return data
}

export async function fetchProfile(token: string) {
  const { data } = await http.get<AuthUser>(AUTH_ME_PATH, {
    headers: authHeaders(token),
  })
  return data
}

export async function updateProfile(token: string, payload: UpdateProfilePayload) {
  const { data } = await http.patch<AuthUser>(AUTH_ME_PATH, payload, {
    headers: authHeaders(token),
  })
  return data
}

export async function deleteAccount(token: string) {
  await http.delete(AUTH_ME_PATH, { headers: authHeaders(token) })
}

export async function changePassword(token: string, payload: ChangePasswordPayload) {
  await http.post(AUTH_CHANGE_PASSWORD_PATH, payload, {
    headers: authHeaders(token),
  })
}

const resolveProviderUrl = (provider: 'email' | 'google') =>
  provider === 'email' ? AUTH_EMAIL_URL : AUTH_GOOGLE_URL

export function redirectToProvider(provider: 'email' | 'google') {
  const targetUrl = resolveProviderUrl(provider)
  globalThis.location.assign(targetUrl)
}

export const authProviders = {
  email: resolveProviderUrl('email'),
  google: resolveProviderUrl('google'),
} as const
