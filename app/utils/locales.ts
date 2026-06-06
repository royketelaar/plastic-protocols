export interface LocaleMeta {
  code: string
  /** endonym, shown in the switcher */
  native: string
  /** English name, for aria/search */
  english: string
  dir: 'ltr' | 'rtl'
}

/** All supported locales. Order: site languages first, then alphabetical by English name. */
export const LOCALES: LocaleMeta[] = [
  { code: 'en', native: 'English', english: 'English', dir: 'ltr' },
  { code: 'nl', native: 'Nederlands', english: 'Dutch', dir: 'ltr' },
  { code: 'ar', native: 'العربية', english: 'Arabic', dir: 'rtl' },
  { code: 'zh', native: '中文', english: 'Chinese', dir: 'ltr' },
  { code: 'fr', native: 'Français', english: 'French', dir: 'ltr' },
  { code: 'hi', native: 'हिन्दी', english: 'Hindi', dir: 'ltr' },
  { code: 'es', native: 'Español', english: 'Spanish', dir: 'ltr' },
]

export const LOCALE_CODES = LOCALES.map((l) => l.code)
