export function useAuthProviders() {
  const loginWithEmail = () => { /* route vers /login (form e-mail) ou modal */ }
  const loginWithGoogle = () => { /* window.location = `${API_BASE_URL}/auth/google` ... */ }
  return { loginWithEmail, loginWithGoogle }
}