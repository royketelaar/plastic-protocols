import type { Grade, EvidenceType } from '~/utils/evidence'

export interface Source {
  title: string
  url: string
  year?: string
  type?: string
}

export interface ProtocolItem {
  path: string
  title: string
  summary: string
  tldr: string
  evidenceGrade: Grade
  evidenceType: EvidenceType
  impact: 'high' | 'medium' | 'low'
  effort: 'low' | 'medium' | 'high'
  cost: 'free' | 'low' | 'higher'
  category: string
  icon: string
  order: number
  sources: Source[]
}

export interface MythItem {
  path: string
  title: string
  claim: string
  grade: Grade
  reality: string
  order: number
  sources: Source[]
}

/** Last path segment → route slug (e.g. /en/protocols/tap-water → tap-water). */
export function slugOf(path: string): string {
  return path.split('/').filter(Boolean).pop() ?? ''
}
