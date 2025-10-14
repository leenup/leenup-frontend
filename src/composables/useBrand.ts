export function useBrand() {
  const colors = {
    primary: '#29235C', secondary: '#4D63FF',
    accent: { orange: '#FF5500', green: '#4BFFA5' },
    bg: '#F9F7F0'
  }
  const radius = { 100:4,200:8,300:12,400:16,500:20,600:24,700:32,800:48 }
  const shadows = { e100:'shadow-e-100', e200:'shadow-e-200', e300:'shadow-e-300', e400:'shadow-e-400', e500:'shadow-e-500' }
  return { colors, radius, shadows }
}