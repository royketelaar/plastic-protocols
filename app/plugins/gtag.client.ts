// Loads Google Analytics 4 only after the visitor grants consent (EU / ePrivacy).
// On denial it sets GA's official opt-out flag so no tracking occurs.
export default defineNuxtPlugin(() => {
  const gaId = useRuntimeConfig().public.gaId
  if (!gaId) return

  const { consent } = useConsent()
  const stored = localStorage.getItem('pp-consent')
  if (stored === 'granted' || stored === 'denied') consent.value = stored

  const win = window as unknown as { dataLayer?: unknown[] } & Record<string, boolean>
  const gtag = (...args: unknown[]) => {
    win.dataLayer = win.dataLayer ?? []
    win.dataLayer.push(args)
  }

  const disableKey = `ga-disable-${gaId}`
  let loaded = false

  const load = () => {
    if (loaded) return
    loaded = true
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)
    gtag('js', new Date())
    gtag('config', gaId)
  }

  watch(
    () => consent.value,
    (value) => {
      if (value === 'granted') {
        win[disableKey] = false
        load()
      } else if (value === 'denied') {
        win[disableKey] = true
      }
    },
    { immediate: true },
  )

  useRouter().afterEach((to) => {
    if (loaded && consent.value === 'granted') {
      gtag('event', 'page_view', { page_path: to.fullPath })
    }
  })
})
