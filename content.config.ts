import { defineContentConfig, defineCollection, z } from '@nuxt/content'

/** All supported locale codes. Keep in sync with nuxt.config i18n + app/utils/locales. */
const CODES = ['en', 'nl', 'zh', 'hi', 'es', 'fr', 'ar', 'th']

const sourceSchema = z.object({
  title: z.string(),
  url: z.string(),
  year: z.string().optional(),
  type: z.string().optional(),
})

const protocolSchema = z.object({
  title: z.string(),
  summary: z.string(),
  tldr: z.string(),
  evidenceGrade: z.enum(['strong', 'emerging', 'weak', 'unproven', 'debunked']),
  evidenceType: z.enum(['particle', 'chemical', 'both']),
  impact: z.enum(['high', 'medium', 'low']),
  effort: z.enum(['low', 'medium', 'high']),
  cost: z.enum(['free', 'low', 'higher']),
  category: z.string(),
  icon: z.string(),
  order: z.number(),
  sources: z.array(sourceSchema),
})

const mythSchema = z.object({
  title: z.string(),
  claim: z.string(),
  reality: z.string(),
  grade: z.enum(['debunked', 'weak', 'unproven', 'emerging']),
  order: z.number(),
  sources: z.array(sourceSchema),
})

function localeCollections(locale: string) {
  return {
    [`protocols_${locale}`]: defineCollection({
      type: 'page',
      source: `${locale}/protocols/*.md`,
      schema: protocolSchema,
    }),
    [`myths_${locale}`]: defineCollection({
      type: 'page',
      source: `${locale}/myths/*.md`,
      schema: mythSchema,
    }),
  }
}

export default defineContentConfig({
  collections: Object.assign({}, ...CODES.map(localeCollections)),
})
