export type Grade = 'strong' | 'emerging' | 'weak' | 'unproven' | 'debunked'
export type EvidenceType = 'particle' | 'chemical' | 'both'

export interface GradeMeta {
  /** colour token suffix → text-{color}, bg-{color}-soft, border-{color} */
  color: string
  icon: string
  /** 0 = strongest, used for sorting */
  rank: number
}

export const GRADE_META: Record<Grade, GradeMeta> = {
  strong: { color: 'strong', icon: 'lucide:shield-check', rank: 0 },
  emerging: { color: 'emerging', icon: 'lucide:flask-conical', rank: 1 },
  weak: { color: 'weak', icon: 'lucide:circle-dashed', rank: 2 },
  unproven: { color: 'unproven', icon: 'lucide:circle-help', rank: 3 },
  debunked: { color: 'debunked', icon: 'lucide:circle-x', rank: 4 },
}

export const GRADE_ORDER: Grade[] = ['strong', 'emerging', 'weak', 'unproven', 'debunked']

/**
 * Static, fully-literal Tailwind class strings per grade.
 * Written out in full so Tailwind v4's source scanner detects every utility
 * (dynamic `text-${x}` interpolation would NOT be generated).
 */
export const GRADE_CLASSES: Record<
  Grade,
  { text: string; border: string; dot: string; soft: string; badge: string }
> = {
  strong: {
    text: 'text-strong',
    border: 'border-strong',
    dot: 'bg-strong',
    soft: 'bg-strong-soft',
    badge: 'text-strong bg-strong-soft/70 border-strong/25',
  },
  emerging: {
    text: 'text-emerging',
    border: 'border-emerging',
    dot: 'bg-emerging',
    soft: 'bg-emerging-soft',
    badge: 'text-emerging bg-emerging-soft/70 border-emerging/25',
  },
  weak: {
    text: 'text-weak',
    border: 'border-weak',
    dot: 'bg-weak',
    soft: 'bg-weak-soft',
    badge: 'text-weak bg-weak-soft/70 border-weak/25',
  },
  unproven: {
    text: 'text-unproven',
    border: 'border-unproven',
    dot: 'bg-unproven',
    soft: 'bg-unproven-soft',
    badge: 'text-unproven bg-unproven-soft/70 border-unproven/30',
  },
  debunked: {
    text: 'text-debunked',
    border: 'border-debunked',
    dot: 'bg-debunked',
    soft: 'bg-debunked-soft',
    badge: 'text-debunked bg-debunked-soft/70 border-debunked/25',
  },
}

/** CSS custom property per grade, for inline SVG/chart fills. */
export const GRADE_VAR: Record<Grade, string> = {
  strong: 'var(--color-strong)',
  emerging: 'var(--color-emerging)',
  weak: 'var(--color-weak)',
  unproven: 'var(--color-unproven)',
  debunked: 'var(--color-debunked)',
}

export const EVIDENCE_TYPE_ICON: Record<EvidenceType, string> = {
  particle: 'lucide:atom',
  chemical: 'lucide:flask-round',
  both: 'lucide:layers',
}

export const META_ICON = {
  impact: 'lucide:target',
  effort: 'lucide:activity',
  cost: 'lucide:coins',
} as const

/** Sort helper: strongest evidence first, then by author-defined order. */
export function byEvidenceThenOrder<T extends { evidenceGrade?: Grade; order?: number }>(
  a: T,
  b: T,
): number {
  const ga = a.evidenceGrade ? GRADE_META[a.evidenceGrade].rank : 99
  const gb = b.evidenceGrade ? GRADE_META[b.evidenceGrade].rank : 99
  if (ga !== gb) return ga - gb
  return (a.order ?? 0) - (b.order ?? 0)
}
