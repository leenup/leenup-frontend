import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useOnboardingRegistration } from '@/composables/useOnboardingRegistration'

const registerMock = vi.hoisted(() => vi.fn())
const authStoreMock = vi.hoisted(() => ({
  authenticate: vi.fn(),
}))

vi.mock('@/services/auth.service', () => ({
  register: registerMock,
}))

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => authStoreMock,
}))

describe('useOnboardingRegistration', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    registerMock.mockReset()
    authStoreMock.authenticate.mockReset()
  })

  it('envoie le profil selectionne dans le payload', async () => {
    registerMock.mockResolvedValueOnce({ firstName: 'Jane' })
    authStoreMock.authenticate.mockResolvedValueOnce({})

    const { form, canSubmit, onSubmit } = useOnboardingRegistration({
      profile: 'mentor',
      afterSuccess: vi.fn(),
    })

    form.firstName = 'Jane'
    form.lastName = 'Doe'
    form.email = 'jane@example.com'
    form.password = 'Test123!'
    form.acceptTerms = true

    expect(canSubmit.value).toBe(true)

    await onSubmit()

    expect(registerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        profiles: ['mentor'],
      })
    )
    expect(authStoreMock.authenticate).toHaveBeenCalledWith({
      email: 'jane@example.com',
      password: 'Test123!',
    })
  })
})
