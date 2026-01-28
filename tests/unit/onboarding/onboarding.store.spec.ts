import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useOnboardingStore } from '@/stores/onboarding'

describe('useOnboardingStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('setLeenerObjectives met a jour la liste', () => {
    const store = useOnboardingStore()

    store.setLeenerObjectives([1, 2])

    expect(store.leenerObjectives).toEqual([1, 2])
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

  it('toggleLeenerTheme respecte la limite et peut deselectionner', () => {
    const store = useOnboardingStore()

    store.toggleLeenerTheme(4, 2)
    store.toggleLeenerTheme(5, 2)
    store.toggleLeenerTheme(6, 2)

    expect(store.leenerThemes).toEqual([4, 5])

    store.toggleLeenerTheme(4, 2)
    expect(store.leenerThemes).toEqual([5])
  })

  it('clear remet a zero objectifs et themes', () => {
    const store = useOnboardingStore()
    store.setLeenerObjectives([1, 2])
    store.setLeenerThemes([3, 4])

    store.clear()

    expect(store.leenerObjectives).toEqual([])
    expect(store.leenerThemes).toEqual([])
  })
})
