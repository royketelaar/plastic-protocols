# Plastic Protocols

Evidence-graded awareness site about micro- and nanoplastics: what they are, how
much we're really exposed to, and the small, proven changes that lower your
exposure. Calm and non-alarmist, every claim carries an evidence grade and a
source.

Live goal: make the severity clear, then funnel people to the **protocols**.

## Stack

- [Nuxt 4](https://nuxt.com) + [Nuxt Content v3](https://content.nuxt.com) (file-based, evidence-graded articles)
- [@nuxtjs/i18n](https://i18n.nuxtjs.org) — 7 languages, English default, RTL for Arabic
- Tailwind CSS v4, `@nuxt/image`, `@nuxt/fonts` (self-hosted), `@nuxt/icon`
- Package manager: **bun**. Deploy: **Netlify** (static prerender).

## Develop

```bash
bun install
bun run dev        # http://localhost:3000  (use TMPDIR=/tmp/x on macOS if the vite-node socket errors)
```

## Build

```bash
bun run generate   # static site → .output/public  (Netlify publish dir)
```

## Structure

```
app/            # pages, components, composables, layouts, utils, assets
content/<lang>/  protocols/*.md  myths/*.md   # evidence-graded articles, per locale
i18n/locales/   # UI strings per language
content.config.ts  # Nuxt Content collections + frontmatter schema
docs/           # evidence dossier (single source of truth) + design spec
```

## Content model

Each protocol/myth is Markdown with frontmatter (`evidenceGrade`, `evidenceType`,
`impact`, `effort`, `cost`, `sources[]`, …). All claims trace back to
[`docs/evidence-dossier.md`](./docs/evidence-dossier.md), which grades every
statement `strong | emerging | weak | unproven | debunked`.

## Languages

English (default), Nederlands, العربية (RTL), 中文, Français, हिन्दी, Español.

## Quality

WCAG 2.2 AA (axe: 0 violations across templates), responsive, per-locale
`<html lang>` + hreflang. Educational, not medical advice.
