# Plastic Protocols — Design Spec

**Date:** 2026-06-03 · **Status:** approved, building · **Domain:** plasticprotocols.com

## Premise
Awareness site about micro- & nanoplastics. Core, research-driven message:
**exposure is proven; harm in humans is largely not yet proven; associated *chemicals*
(BPA/phthalates/PFAS) are better-evidenced than the *particles* themselves.**
No panic — clear, evidence-graded action. Every claim shows an evidence grade + source.

Single source of truth for content: [`evidence-dossier.md`](./evidence-dossier.md).

## Decisions
- **Name:** Plastic Protocols (wordmark + tagline).
- **Languages:** bilingual. **English = default (root)**, Dutch under `/nl`. Strategy `prefix_except_default`.
- **Evidence grading:** every claim labeled `strong | emerging | weak | unproven | debunked`.
- **Deploy:** Netlify (nitro `netlify` preset, static/prerender where possible).

## Stack
- Nuxt 4.4 · Nuxt Content v3 (collections) · @nuxtjs/i18n v10 · Tailwind CSS v4 (`@tailwindcss/vite`)
- @nuxt/image (responsive `sizes`, AVIF/WebP, lazy) · @nuxt/fonts · @nuxt/icon
- Package manager: **bun**. Testing: **Playwright** (mobile/tablet/desktop) + a11y (axe) + Lighthouse.

## Information architecture
| Route (en) | Route (nl) | Purpose |
|---|---|---|
| `/` | `/nl` | Hero, honest framing, top protocols, self-check CTA, data teaser |
| `/science` | `/nl/wetenschap` | What MPs are; how much we ingest; particles vs chemicals; health effects (graded); data-viz |
| `/protocols` | `/nl/protocollen` | 8 evidence-graded actions; filter by grade/impact/effort; checklist |
| `/protocols/[slug]` | `/nl/protocollen/[slug]` | Per-protocol deep dive |
| `/myths` | `/nl/mythes` | Debunked/overstated claims |
| `/check` | `/nl/check` | Exposure self-check → personalized plan (client-side) |
| `/sources` | `/nl/bronnen` | Grading method + full bibliography |

## Content model (Nuxt Content v3)
Collections per locale: `content/en/**`, `content/nl/**`.
Protocol frontmatter schema:
```
title, slug, summary, evidenceGrade (enum), evidenceType ('particle'|'chemical'|'both'),
impact ('high'|'medium'|'low'), effort ('low'|'medium'|'high'), cost ('free'|'low'|'higher'),
category, icon, order, sources: [{ title, url, year, type }], excludedNote?
```
Myth frontmatter: `title, claim, grade ('debunked'|'weak'|'unproven'|'emerging'), reality, sources[]`.

## The 8 protocols (from dossier shortlist)
1. Tap over bottled water — `strong`
2. Fresh/frozen over canned — `strong` (chemical)
3. Never microwave plastic; heat/store in glass/ceramic — `emerging`/`strong`
4. Metal/cast-iron cookware; bin scratched non-stick — `strong`
5. Filter at the tap (RO/sub-micron, PFAS-rated) — `emerging`/`strong`
6. Reduce indoor fibre load (ventilate, sealed HEPA vacuum, natural fibres) — `emerging`
7. Skip plastic mesh tea bags & plastic kettles — `emerging`/`weak`
8. Mind the chemicals, not just particles (BPA-free ≠ safe; PFAS packaging) — `strong`

## Myths to correct
credit-card/week (`debunked`), "spoon in brain" (overstated), tea-bag billions (`weak`),
blood/plasma donation (`unproven`), sauna/sweat (`debunked`), TPE detox (`weak`/commercial),
detox supplements (`unproven`), fibre "57%" flush (`weak`, fabricated figure), probiotics/leaky-gut (`weak`).

## Visual direction — "lab paper" editorial-scientific
- **Theme:** light, warm-paper background, deep ink, ocean-teal accent (logo: bottle → particles).
- **Type:** Fraunces (display serif) · Hanken Grotesk (body) · Spline Sans Mono (figures, tabular nums).
- **Evidence-grade color system** (signature, reused in badges + charts):
  strong=teal-green · emerging=amber · weak=slate · unproven=slate-dim · debunked=clay-red.
- **Tufte-style margin citations** (sources in the margin on wide viewports).
- **Motion:** restrained; staggered load reveals; calm particle-dispersion hero motif; honors `prefers-reduced-motion`.
- **Data-viz:** hand-built accessible SVG (source ranking, intake uncertainty range, grade distribution).

## Interactive (no backend)
- **Exposure self-check** (`/check`): short questionnaire → ranked personalized protocols.
- **Checklist / action plan:** mark protocols done/saved, persisted in `localStorage`.
- **Data visualizations:** accessible SVG components on `/science`.

## Quality gates
- WCAG 2.2 AA: landmarks, focus-visible, keyboard nav, contrast, `prefers-reduced-motion`, alt text.
- Playwright across 375 / 768 / 1280 / 1920; a11y (axe) zero criticals; Lighthouse perf/a11y/SEO.
- Images via @nuxt/image with explicit `sizes`; fonts via @nuxt/fonts; prerender static routes.
- i18n: hreflang, localized routes, language switch preserves page.
