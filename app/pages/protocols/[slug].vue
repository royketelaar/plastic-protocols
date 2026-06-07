<script setup lang="ts">
import { GRADE_META, GRADE_CLASSES } from '~/utils/evidence'
import { slugOf, type ProtocolItem } from '~/types/content'

const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const setI18nParams = useSetI18nParams()
const route = useRoute()
const { protocols } = useCollections()

const slug = computed(() => String(route.params.slug))

const { data: doc } = await useAsyncData(
  () => `protocol-${locale.value}-${slug.value}`,
  async () => {
    const all = await queryCollection(protocols.value).all().catch(() => [])
    return all.find((p) => slugOf(p.path) === slug.value) ?? null
  },
  { watch: [locale] },
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Protocol not found', fatal: true })
}

// Protocol slugs are identical across locales, so register the same slug for
// every locale → correct hreflang alternates + language switching on this page.
setI18nParams(Object.fromEntries(locales.value.map((l) => [l.code, { slug: slug.value }])))

const p = computed(() => doc.value as unknown as ProtocolItem)
const gradeMeta = computed(() => GRADE_META[p.value.evidenceGrade])
const gradeCls = computed(() => GRADE_CLASSES[p.value.evidenceGrade])

const metaRows = computed(() => [
  { icon: 'lucide:target', label: t('meta.impact'), value: t(`meta.${p.value.impact}`) },
  { icon: 'lucide:activity', label: t('meta.effort'), value: t(`meta.${p.value.effort}`) },
  { icon: 'lucide:coins', label: t('meta.cost'), value: t(`meta.${p.value.cost}`) },
])

useSeoMeta({
  title: () => `${p.value.title} · ${t('site.name')}`,
  description: () => p.value.summary,
})
</script>

<template>
  <article v-if="doc">
    <!-- Hero -->
    <header class="relative overflow-hidden border-b border-line bg-paper-2/40">
      <div class="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <NuxtLink
          :to="localePath('/protocols')"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-teal"
        >
          <Icon name="lucide:arrow-left" :size="16" aria-hidden="true" />
          {{ t('common.backToProtocols') }}
        </NuxtLink>

        <div class="mt-6 flex items-start gap-4 sm:gap-5">
          <span
            class="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-paper text-teal-deep ring-1 ring-line sm:h-16 sm:w-16"
          >
            <Icon :name="p.icon" :size="30" aria-hidden="true" />
          </span>
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <EvidenceBadge :grade="p.evidenceGrade" size="sm" />
              <span class="font-mono text-[0.62rem] uppercase tracking-wide text-ink-faint">
                {{ t(`evidenceType.${p.evidenceType}`) }} · {{ p.category }}
              </span>
            </div>
            <h1 class="mt-3 max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
              {{ p.title }}
            </h1>
          </div>
        </div>

        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{{ p.summary }}</p>
      </div>
    </header>

    <!-- Body + aside -->
    <div class="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:grid lg:grid-cols-[1fr_16rem] lg:gap-12">
      <div class="prose-pp measure">
        <ContentRenderer :value="doc" />
      </div>

      <aside class="mt-10 lg:mt-0">
        <div class="lg:sticky lg:top-24">
          <div class="rounded-2xl border p-5" :class="gradeCls.border">
            <div class="flex items-center gap-2">
              <Icon :name="gradeMeta.icon" :size="18" :class="gradeCls.text" aria-hidden="true" />
              <span class="font-display font-semibold" :class="gradeCls.text">{{ t(`grade.${p.evidenceGrade}`) }}</span>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ t(`grade.desc.${p.evidenceGrade}`) }}</p>
          </div>

          <dl class="mt-5 space-y-3 rounded-2xl border border-line p-5">
            <div v-for="m in metaRows" :key="m.label" class="flex items-center justify-between gap-3 text-sm">
              <dt class="flex items-center gap-2 text-ink-soft">
                <Icon :name="m.icon" :size="15" class="text-ink-faint" aria-hidden="true" />
                {{ m.label }}
              </dt>
              <dd class="font-medium text-ink">{{ m.value }}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>

    <!-- Sources -->
    <div class="mx-auto max-w-5xl px-5 pb-4 sm:px-8">
      <hr class="rule mb-8" />
      <SourceList :sources="p.sources" />
    </div>
  </article>
</template>
