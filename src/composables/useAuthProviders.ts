import { redirectToProvider } from '@/services/auth.service'

export function useAuthProviders() {
  const loginWithEmail = () => redirectToProvider('email')
  const loginWithGoogle = () => redirectToProvider('google')
  return { loginWithEmail, loginWithGoogle }
}
