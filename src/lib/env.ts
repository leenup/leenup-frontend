import { z } from 'zod'

const Schema = z.object({
  VITE_API_BASE_URL: z.string().url().default('http://localhost:3000'),
  VITE_AUTH_LOGIN_PATH: z.string().default('/auth/login'),
  VITE_AUTH_ME_PATH: z.string().default('/me'),
  VITE_AUTH_EMAIL_PATH: z.string().default('/auth/login/email'),
  VITE_AUTH_GOOGLE_PATH: z.string().default('/auth/login/google'),
  VITE_AUTH_REGISTER_PATH: z.string().default('/register'),
  VITE_AUTH_CHANGE_PASSWORD_PATH: z.string().default('/me/change-password'),
})

const toAbsoluteUrl = (pathOrUrl: string, baseUrl: string) => {
  try {
    return new URL(pathOrUrl, baseUrl).toString()
  } catch {
    return pathOrUrl
  }
}

export const env = Schema.parse(import.meta.env)

export const API_BASE_URL = env.VITE_API_BASE_URL
export const AUTH_LOGIN_PATH = env.VITE_AUTH_LOGIN_PATH
export const AUTH_ME_PATH = env.VITE_AUTH_ME_PATH
export const AUTH_EMAIL_URL = toAbsoluteUrl(env.VITE_AUTH_EMAIL_PATH, API_BASE_URL)
export const AUTH_GOOGLE_URL = toAbsoluteUrl(env.VITE_AUTH_GOOGLE_PATH, API_BASE_URL)
export const AUTH_REGISTER_PATH = env.VITE_AUTH_REGISTER_PATH
export const AUTH_CHANGE_PASSWORD_PATH = env.VITE_AUTH_CHANGE_PASSWORD_PATH
