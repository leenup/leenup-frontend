import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useOnboardingStore } from '@/stores/onboarding'

describe('useOnboardingStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
    // reset localStorage
    localStorage.clear()
  })

  it('setRole met à jour le state et persiste', () => {
    const store = useOnboardingStore()
    const spy = vi.spyOn(globalThis.localStorage, 'setItem')

    store.setRole('leener')

    expect(store.role).toBe('leener')
    expect(spy).toHaveBeenCalledWith('onboarding_role', 'leener')
  })

  it('loadFromStorage lit la valeur persistée', () => {
    localStorage.setItem('onboarding_role', 'mentor')
    const store = useOnboardingStore()

    store.loadFromStorage()

    expect(store.role).toBe('mentor')
  })
})
