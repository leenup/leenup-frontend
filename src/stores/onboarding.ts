import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOnboardingStore = defineStore('onboarding', () => {
  const leenerObjectives = ref<number[]>([])
  const leenerThemes = ref<number[]>([])

  const setLeenerObjectives = (values: number[]) => {
    leenerObjectives.value = values
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

  const setLeenerThemes = (values: number[]) => {
    leenerThemes.value = values
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

  const clear = () => {
    setLeenerObjectives([])
    setLeenerThemes([])
  }

  return {
    leenerObjectives,
    leenerThemes,
    setLeenerObjectives,
    toggleLeenerObjective,
    setLeenerThemes,
    toggleLeenerTheme,
    clearLeenerObjectives: () => setLeenerObjectives([]),
    clearLeenerThemes: () => setLeenerThemes([]),
    clear,
  }
})
