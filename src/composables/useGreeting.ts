import { computed, onMounted, onUnmounted, ref } from 'vue'

type GreetingOptions = { timeZone?: string; intervalMs?: number }

export function useGreeting(options: GreetingOptions = {}) {
  const tick = ref(Date.now())
  const interval = options.intervalMs ?? 60_000 // refresh every minute by default

  let timer: ReturnType<typeof setInterval> | undefined

  const currentHour = computed(() => {
    const formatter = new Intl.DateTimeFormat('fr-FR', {
      hour: 'numeric',
      hour12: false,
      timeZone: options.timeZone,
    })
    // Format to get hour string then parse
    const parts = formatter.formatToParts(new Date(tick.value))
    const hourPart = parts.find((p) => p.type === 'hour')?.value
    return hourPart ? Number(hourPart) : new Date(tick.value).getHours()
  })

  const greeting = computed(() => {
    const hour = currentHour.value
    if (hour < 12) return 'Bonjour'
    if (hour < 18) return 'Bon après-midi'
    return 'Bonsoir'
  })

  onMounted(() => {
    timer = globalThis.setInterval(() => { tick.value = Date.now() }, interval)
  })

  onUnmounted(() => {
    if (timer) globalThis.clearInterval(timer)
  })

  return { greeting }
}
