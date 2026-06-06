export interface LocaleMeta {
  code: string
  /** endonym, shown in the switcher */
  native: string
  /** English name, for aria/search */
  english: string
  /** emoji flag */
  flag: string
  dir: 'ltr' | 'rtl'
}

/** All supported locales. Order: site languages first, then alphabetical by English name. */
export const LOCALES: LocaleMeta[] = [
  { code: 'en', native: 'English', english: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'nl', native: 'Nederlands', english: 'Dutch', flag: '🇳🇱', dir: 'ltr' },
  { code: 'ar', native: 'العربية', english: 'Arabic', flag: '🇸🇦', dir: 'rtl' },
  { code: 'zh', native: '中文', english: 'Chinese', flag: '🇨🇳', dir: 'ltr' },
  { code: 'fr', native: 'Français', english: 'French', flag: '🇫🇷', dir: 'ltr' },
  { code: 'hi', native: 'हिन्दी', english: 'Hindi', flag: '🇮🇳', dir: 'ltr' },
  { code: 'es', native: 'Español', english: 'Spanish', flag: '🇪🇸', dir: 'ltr' },
  { code: 'th', native: 'ไทย', english: 'Thai', flag: '🇹🇭', dir: 'ltr' },
]

export const LOCALE_CODES = LOCALES.map((l) => l.code)
