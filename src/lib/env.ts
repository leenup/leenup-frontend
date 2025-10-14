import { z } from 'zod'
const Schema = z.object({ VITE_API_BASE_URL: z.string().url().default('http://localhost:3000') })
export const env = Schema.parse(import.meta.env)
export const API_BASE_URL = env.VITE_API_BASE_URL