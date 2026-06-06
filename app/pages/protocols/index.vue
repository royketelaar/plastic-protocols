<script setup lang="ts">
import { GRADE_ORDER, GRADE_CLASSES, byEvidenceThenOrder, type Grade, type EvidenceType } from '~/utils/evidence'
import type { ProtocolItem } from '~/types/content'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { protocols } = useCollections()

useSeoMeta({
  title: () => `${t('protocolsPage.title')} · ${t('site.name')}`,
  description: () => t('protocolsPage.lead'),
})

const { data } = await useAsyncData(
  () => `protocols-${locale.value}`,
  () => queryCollection(protocols.value).all().catch(() => []),
  { watch: [locale] },
)

const all = computed(() => ([...(data.value ?? [])] as unknown as ProtocolItem[]).sort(byEvidenceThenOrder))

const grade = ref<Grade | null>(null)
const etype = ref<EvidenceType | null>(null)

const types: EvidenceType[] = ['particle', 'chemical', 'both']

const filtered = computed(() =>
  all.value.filter(
    (p) =>
      (!grade.value || p.evidenceGrade === grade.value) &&
      (!etype.value || p.evidenceType === etype.value),
  ),
)

const reset = () => {
  grade.value = null
  etype.value = null
}
</script>

<template>
  <div>
    <PageHeader :kicker="t('nav.protocols')" :title="t('protocolsPage.title')" :lead="t('protocolsPage.lead')" tinted />

    <div class="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <!-- Filters -->
      <div class="flex flex-col gap-4 border-y border-line py-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-wrap items-center gap-2">
          <span class="mr-1 font-mono text-xs uppercase tracking-wide text-ink-faint">{{ t('protocolsPage.filterGrade') }}</span>
          <button
            type="button"
            class="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
            :class="grade === null ? 'border-ink bg-ink text-paper' : 'border-line text-ink-soft hover:border-line-strong'"
            @click="grade = null"
          >
            {{ t('protocolsPage.all') }}
          </button>
          <button
            v-for="g in GRADE_ORDER"
            :key="g"
            type="button"
            class="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
            :class="grade === g ? GRADE_CLASSES[g].badge + ' ring-1' : 'border-line text-ink-soft hover:border-line-strong'"
            @click="grade = grade === g ? null : g"
          >
            {{ t(`grade.short.${g}`) }}
          </button>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <span class="mr-1 font-mono text-xs uppercase tracking-wide text-ink-faint">{{ t('protocolsPage.filterType') }}</span>
          <button
            v-for="ty in types"
            :key="ty"
            type="button"
            class="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
            :class="etype === ty ? 'border-teal bg-teal-soft/60 text-teal-deep' : 'border-line text-ink-soft hover:border-line-strong'"
            @click="etype = etype === ty ? null : ty"
          >
            {{ t(`evidenceType.${ty}`) }}
          </button>
        </div>
      </div>

      <p class="mt-5 flex items-center gap-2 text-sm text-ink-faint">
        <Icon name="lucide:arrow-down-narrow-wide" :size="15" aria-hidden="true" />
        {{ t('protocolsPage.results', { count: filtered.length }) }} · {{ t('protocolsPage.sortedNote') }}
      </p>

      <!-- Grid -->
      <div v-if="filtered.length" class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProtocolCard v-for="p in filtered" :key="p.path" :protocol="p" />
      </div>
      <div v-else class="mt-10 rounded-2xl border border-dashed border-line p-12 text-center">
        <p class="text-ink-soft">{{ t('protocolsPage.none') }}</p>
        <button type="button" class="mt-4 text-sm font-medium text-teal-deep underline" @click="reset">
          {{ t('protocolsPage.reset') }}
        </button>
      </div>
    </div>
  </div>
</template>
