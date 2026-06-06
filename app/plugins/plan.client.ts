const KEY = 'pp-plan'

export default defineNuxtPlugin(() => {
  const plan = useState<string[]>('pp-plan', () => [])

  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) plan.value = parsed.filter((s): s is string => typeof s === 'string')
    }
  } catch {
    // ignore corrupt storage
  }

  watch(
    plan,
    (value) => {
      try {
        localStorage.setItem(KEY, JSON.stringify(value))
      } catch {
        // storage unavailable (private mode / quota) — non-fatal
      }
    },
    { deep: true },
  )
})
