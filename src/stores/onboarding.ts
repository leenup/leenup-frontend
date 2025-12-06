import { defineStore } from 'pinia'
import { ref } from 'vue'

export type OnboardingRole = 'leener' | 'mentor' | null

const ROLE_STORAGE_KEY = 'onboarding_role'
const LEENER_OBJECTIVES_KEY = 'onboarding_leener_objectives'
const LEENER_THEMES_KEY = 'onboarding_leener_themes'

const getStorage = () => {
  if (typeof window === 'undefined') return { session: null, local: null }
  try {
    return { session: window.sessionStorage, local: window.localStorage }
  } catch {
    return { session: null, local: null }
  }
}

export const useOnboardingStore = defineStore('onboarding', () => {
  const role = ref<OnboardingRole>(null)

  const persistRole = (value: OnboardingRole) => {
    const { session, local } = getStorage()
    if (session) {
      if (value) {
        session.setItem(ROLE_STORAGE_KEY, value)
      } else {
        session.removeItem(ROLE_STORAGE_KEY)
      }
    }
    if (local) {
      local.removeItem(ROLE_STORAGE_KEY)
    }
  }

  const setRole = (value: Exclude<OnboardingRole, null>) => {
    role.value = value
    persistRole(value)
  }

  const clearRole = () => {
    role.value = null
    persistRole(null)
    setLeenerObjectives([])
    setLeenerThemes([])
  }

  const leenerObjectives = ref<number[]>([])
  const leenerThemes = ref<number[]>([])

  const persistObjectives = (values: string[]) => {
    const { session, local } = getStorage()
    const payload = JSON.stringify(values)
    if (session) {
      session.setItem(LEENER_OBJECTIVES_KEY, payload)
    }
    if (local) {
      local.removeItem(LEENER_OBJECTIVES_KEY)
    }
  }

  const setLeenerObjectives = (values: number[]) => {
    leenerObjectives.value = values
    persistObjectives(values)
  }

  const toggleLeenerObjective = (value: number, max = 3) => {
    const next = [...leenerObjectives.value]
    const existingIndex = next.indexOf(value)
    if (existingIndex >= 0) {
      next.splice(existingIndex, 1)
    } else if (next.length < max) {
      next.push(value)
    }
    setLeenerObjectives(next)
    return next
  }

  const persistThemes = (values: number[]) => {
    const { session, local } = getStorage()
    const payload = JSON.stringify(values)
    if (session) {
      session.setItem(LEENER_THEMES_KEY, payload)
    }
    if (local) {
      local.removeItem(LEENER_THEMES_KEY)
    }
  }

  const setLeenerThemes = (values: number[]) => {
    leenerThemes.value = values
    persistThemes(values)
  }

  const toggleLeenerTheme = (value: number, max = 5) => {
    const next = [...leenerThemes.value]
    const existingIndex = next.indexOf(value)
    if (existingIndex >= 0) {
      next.splice(existingIndex, 1)
    } else if (next.length < max) {
      next.push(value)
    }
    setLeenerThemes(next)
    return next
  }

  const loadFromStorage = () => {
    const { session, local } = getStorage()
    if (!session) {
      if (local) {
        local.removeItem(ROLE_STORAGE_KEY)
        local.removeItem(LEENER_OBJECTIVES_KEY)
        local.removeItem(LEENER_THEMES_KEY)
      }
      return
    }
    const stored = session.getItem(ROLE_STORAGE_KEY)
    if (stored === 'leener' || stored === 'mentor') {
      role.value = stored
    }
    if (local) {
      local.removeItem(ROLE_STORAGE_KEY)
    }

    const storedObjectives = session.getItem(LEENER_OBJECTIVES_KEY)
    if (storedObjectives) {
      try {
        const parsed = JSON.parse(storedObjectives)
        if (Array.isArray(parsed)) leenerObjectives.value = parsed.map((item: any) => Number(item)).filter((item) => !Number.isNaN(item))
      } catch {
        leenerObjectives.value = []
      }
    }
    if (local) {
      local.removeItem(LEENER_OBJECTIVES_KEY)
    }

    const storedThemes = session.getItem(LEENER_THEMES_KEY)
    if (storedThemes) {
      try {
        const parsed = JSON.parse(storedThemes)
        if (Array.isArray(parsed)) leenerThemes.value = parsed.map((item: any) => Number(item)).filter((item) => !Number.isNaN(item))
      } catch {
        leenerThemes.value = []
      }
    }
    if (local) {
      local.removeItem(LEENER_THEMES_KEY)
    }
  }

  return {
    role,
    leenerObjectives,
    leenerThemes,
    setRole,
    clearRole,
    loadFromStorage,
    setLeenerObjectives,
    toggleLeenerObjective,
    setLeenerThemes,
    toggleLeenerTheme,
    clearLeenerObjectives: () => setLeenerObjectives([]),
    clearLeenerThemes: () => setLeenerThemes([]),
  }
})
