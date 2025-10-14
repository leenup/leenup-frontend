export function useAnalytics() {
  const track = (event: string, payload?: Record<string, any>) => {
    // console.log ou Hook vers Matomo/GA4 plus tard
  }
  return { track }
}