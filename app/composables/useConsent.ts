export type ConsentValue = 'granted' | 'denied' | 'unset'

const STORAGE_KEY = 'pp-consent'

/** Cookie-consent state shared across the app (banner, GA plugin, footer link). */
export const useConsent = () => {
  const consent = useState<ConsentValue>('cookie-consent', () => 'unset')

  const persist = (value: ConsentValue) => {
    consent.value = value
    if (import.meta.client) {
      if (value === 'unset') localStorage.removeItem(STORAGE_KEY)
      else localStorage.setItem(STORAGE_KEY, value)
    }
  }

  return {
    consent,
    decided: computed(() => consent.value !== 'unset'),
    accept: () => persist('granted'),
    decline: () => persist('denied'),
    /** Re-open the banner so a prior choice can be changed (consent withdrawal). */
    reopen: () => persist('unset'),
  }
}
