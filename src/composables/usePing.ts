import { ref } from 'vue'
import { http } from '@/lib/http'
export function usePing() {
  const loading = ref(false), data = ref<string|null>(null), error = ref<string|null>(null)
  const ping = async () => {
    loading.value = true; data.value = null; error.value = null
    try { const r = await http.get('/ping'); data.value = String(r.data ?? 'pong') }
    catch (e: any) { error.value = e?.message ?? 'Unknown error' }
    finally { loading.value = false }
  }
  return { loading, data, error, ping }
}