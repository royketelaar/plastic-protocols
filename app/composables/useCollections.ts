import { LOCALE_CODES } from '~/utils/locales'

type Code = 'en' | 'nl' | 'zh' | 'hi' | 'es' | 'fr' | 'ar'

/**
 * Locale-aware Nuxt Content collection names.
 * Content is split into per-locale collections (protocols_en, protocols_nl, …);
 * this resolves the right one for the active i18n locale, falling back to English.
 */
export function useCollections() {
  const { locale } = useI18n()
  const loc = computed<Code>(() => (LOCALE_CODES.includes(locale.value) ? (locale.value as Code) : 'en'))

  return {
    loc,
    protocols: computed(() => `protocols_${loc.value}` as `protocols_${Code}`),
    myths: computed(() => `myths_${loc.value}` as `myths_${Code}`),
  }
}
