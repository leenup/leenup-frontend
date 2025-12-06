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
  token?: string
  refreshToken?: string
  user?: AuthUser
}

export type LoginResponse = {
  token?: string
  accessToken?: string
  refreshToken?: string
  user?: AuthUser
}

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
  is_leener?: boolean
  is_mentor?: boolean
}

export type UpdateProfilePayload = Partial<
  Pick<AuthUser, 'firstName' | 'lastName' | 'email' | 'phone' | 'birthDate'>
>

export type ChangePasswordPayload = {
  currentPassword: string
  newPassword: string
}

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

export async function refreshAuthToken() {
  const { data } = await http.post<AuthTokenResponse>(
    '/api/token/refresh',
    {},
    {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      withCredentials: true,
    }
  )
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

export async function fetchProfile() {
  const { data } = await http.get<AuthUser>(AUTH_ME_PATH)
  return data
}

export async function updateProfile(payload: UpdateProfilePayload) {
  const { data } = await http.patch<AuthUser>(AUTH_ME_PATH, payload)
  return data
}

export async function deleteAccount() {
  await http.delete(AUTH_ME_PATH)
}

export async function changePassword(payload: ChangePasswordPayload) {
  await http.post(AUTH_CHANGE_PASSWORD_PATH, payload)
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
