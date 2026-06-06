<script setup lang="ts">
import { GRADE_ORDER, GRADE_META, GRADE_CLASSES } from '~/utils/evidence'
import type { Source } from '~/types/content'

const { t, locale } = useI18n()
const { protocols, myths } = useCollections()

useSeoMeta({
  title: () => `${t('sourcesPage.title')} · ${t('site.name')}`,
  description: () => t('sourcesPage.lead'),
})

const { data: bibliography } = await useAsyncData(
  () => `bib-${locale.value}`,
  async () => {
    const [ps, ms] = await Promise.all([
      queryCollection(protocols.value).all().catch(() => []),
      queryCollection(myths.value).all().catch(() => []),
    ])
    const seen = new Map<string, Source>()
    for (const doc of [...ps, ...ms]) {
      for (const s of (doc.sources ?? []) as Source[]) {
        if (s?.url && !seen.has(s.url)) seen.set(s.url, s)
      }
    }
    return [...seen.values()].sort((a, b) => a.title.localeCompare(b.title))
  },
  { watch: [locale] },
)

const principles = ['p1', 'p2', 'p3', 'p4']
</script>

<template>
  <div>
    <PageHeader :kicker="t('nav.sources')" :title="t('sourcesPage.title')" :lead="t('sourcesPage.lead')" tinted />

    <div class="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <!-- Grading key -->
      <section>
        <h2 class="font-display text-2xl font-semibold">{{ t('sourcesPage.gradingTitle') }}</h2>
        <p class="mt-3 text-ink-soft">{{ t('sourcesPage.gradingLead') }}</p>

        <ul class="mt-6 space-y-3">
          <li
            v-for="g in GRADE_ORDER"
            :key="g"
            class="flex items-start gap-4 rounded-2xl border border-line bg-paper p-4"
          >
            <span
              class="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              :class="GRADE_CLASSES[g].soft"
            >
              <Icon :name="GRADE_META[g].icon" :size="20" :class="GRADE_CLASSES[g].text" aria-hidden="true" />
            </span>
            <div>
              <p class="font-display font-semibold" :class="GRADE_CLASSES[g].text">{{ t(`grade.${g}`) }}</p>
              <p class="text-sm leading-relaxed text-ink-soft">{{ t(`grade.desc.${g}`) }}</p>
            </div>
          </li>
        </ul>
      </section>

      <!-- Principles -->
      <section class="mt-14">
        <h2 class="font-display text-2xl font-semibold">{{ t('sourcesPage.principlesTitle') }}</h2>
        <ul class="mt-5 space-y-3">
          <li v-for="p in principles" :key="p" class="flex gap-3">
            <Icon name="lucide:check" :size="18" class="mt-1 shrink-0 text-teal" aria-hidden="true" />
            <span class="leading-relaxed text-ink-soft">{{ t(`sourcesPage.principles.${p}`) }}</span>
          </li>
        </ul>
      </section>

      <!-- Bibliography -->
      <section class="mt-14">
        <h2 class="font-display text-2xl font-semibold">{{ t('sourcesPage.bibTitle') }}</h2>
        <p class="mt-3 text-ink-soft">{{ t('sourcesPage.bibLead') }}</p>
        <div class="mt-6">
          <SourceList :sources="bibliography ?? []" :title="`${(bibliography ?? []).length} ${t('common.sources').toLowerCase()}`" />
        </div>
      </section>
    </div>
  </div>
</template>
