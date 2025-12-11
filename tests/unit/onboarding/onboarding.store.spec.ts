import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useOnboardingStore } from '@/stores/onboarding'

const createMockStorage = () => {
  let data: Record<string, string> = {}
  return {
    getItem: (key: string) => (key in data ? data[key] : null),
    setItem: (key: string, value: string) => {
      data[key] = value
    },
    removeItem: (key: string) => {
      delete data[key]
    },
    clear: () => {
      data = {}
    },
  }
}

describe('useOnboardingStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    Object.defineProperty(window, 'sessionStorage', { value: createMockStorage(), configurable: true })
    Object.defineProperty(window, 'localStorage', { value: createMockStorage(), configurable: true })
  })

  it('setRole persiste dans la session', () => {
    const store = useOnboardingStore()
    const spy = vi.spyOn(window.sessionStorage, 'setItem')

    store.setRole('leener')

    expect(store.role).toBe('leener')
    expect(spy).toHaveBeenCalledWith('onboarding_role', 'leener')
  })

  it('clearRole efface role + selections', () => {
    const store = useOnboardingStore()
    store.setRole('mentor')
    store.setLeenerObjectives([1, 2])
    store.setLeenerThemes([3])

    store.clearRole()

    expect(store.role).toBeNull()
    expect(store.leenerObjectives).toHaveLength(0)
    expect(store.leenerThemes).toHaveLength(0)
  })

  it('toggleLeenerObjective respecte la limite et peut deselectionner', () => {
    const store = useOnboardingStore()

    store.toggleLeenerObjective(1, 2)
    store.toggleLeenerObjective(2, 2)
    store.toggleLeenerObjective(3, 2) // ignore car limite atteinte

    expect(store.leenerObjectives).toEqual([1, 2])

    store.toggleLeenerObjective(2, 2)
    expect(store.leenerObjectives).toEqual([1])
  })

  it('toggleLeenerTheme persiste en session', () => {
    const store = useOnboardingStore()
    const spy = vi.spyOn(window.sessionStorage, 'setItem')

    store.toggleLeenerTheme(4, 5)

    expect(store.leenerThemes).toEqual([4])
    expect(spy).toHaveBeenCalledWith('onboarding_leener_themes', JSON.stringify([4]))
  })

  it('loadFromStorage restaure role/objectifs/themes', () => {
    window.sessionStorage.setItem('onboarding_role', 'mentor')
    window.sessionStorage.setItem('onboarding_leener_objectives', JSON.stringify([1, 2]))
    window.sessionStorage.setItem('onboarding_leener_themes', JSON.stringify([5, 6]))

    const store = useOnboardingStore()
    store.loadFromStorage()

    expect(store.role).toBe('mentor')
    expect(store.leenerObjectives).toEqual([1, 2])
    expect(store.leenerThemes).toEqual([5, 6])
  })
})
