import { defineStore } from 'pinia'
import { ref } from 'vue'

export type OnboardingRole = 'learner' | 'mentor' | null

const STORAGE_KEY = 'onboarding_role'

export const useOnboardingStore = defineStore('onboarding', () => {
  const role = ref<OnboardingRole>(null)

  const setRole = (value: Exclude<OnboardingRole, null>) => {
    role.value = value
    if (globalThis.window !== undefined) {
      localStorage.setItem(STORAGE_KEY, value)
    }
  }

  const loadFromStorage = () => {
    if (globalThis.window === undefined) return
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'learner' || stored === 'mentor') {
      role.value = stored
    }
  }

  return { role, setRole, loadFromStorage }
})
