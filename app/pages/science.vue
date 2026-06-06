<script setup lang="ts">
import type { Grade } from '~/utils/evidence'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('sciencePage.title')} · ${t('site.name')}`,
  description: () => t('sciencePage.lead'),
})

const intake = computed(() => [
  { label: t('sciencePage.s2BarTap'), value: 4000, display: '~4,000', colorVar: 'var(--color-strong)' },
  { label: t('sciencePage.s2BarBottled'), value: 90000, display: '~90,000', colorVar: 'var(--color-emerging)' },
])

// Evidence-grade distribution across the claims reviewed for this site (from the dossier).
const grades: { grade: Grade; count: number }[] = [
  { grade: 'strong', count: 22 },
  { grade: 'emerging', count: 21 },
  { grade: 'weak', count: 12 },
  { grade: 'debunked', count: 3 },
  { grade: 'unproven', count: 2 },
]

// Daily-life sources ranked by exposure-contribution confidence (qualitative).
const sourceRanking = computed(() => [
  { label: 'Bottled water', value: 95, display: t('meta.high') },
  { label: 'Heated / microwaved plastic', value: 82, display: t('meta.high') },
  { label: 'Indoor air & household dust', value: 55, display: t('meta.medium') },
  { label: 'Scratched non-stick cookware', value: 45, display: t('meta.medium') },
  { label: 'Seafood & table salt', value: 25, display: t('meta.low') },
])
</script>

<template>
  <div>
    <PageHeader :kicker="t('nav.science')" :title="t('sciencePage.title')" :lead="t('sciencePage.lead')" tinted />

    <div class="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <!-- s1 -->
      <section>
        <p class="font-mono text-xs font-medium uppercase tracking-[0.18em] text-teal-deep">{{ t('sciencePage.s1Kicker') }}</p>
        <h2 class="mt-3 font-display text-2xl font-semibold sm:text-3xl">{{ t('sciencePage.s1Title') }}</h2>
        <p class="mt-4 text-lg leading-relaxed text-ink-soft">{{ t('sciencePage.s1Body') }}</p>
      </section>

      <!-- s2 exposure + intake chart -->
      <section class="mt-16">
        <p class="font-mono text-xs font-medium uppercase tracking-[0.18em] text-teal-deep">{{ t('sciencePage.s2Kicker') }}</p>
        <h2 class="mt-3 font-display text-2xl font-semibold sm:text-3xl">{{ t('sciencePage.s2Title') }}</h2>
        <p class="mt-4 text-lg leading-relaxed text-ink-soft">{{ t('sciencePage.s2Body') }}</p>

        <div class="mt-8 rounded-2xl border border-line bg-paper-2/40 p-6 sm:p-8">
          <h3 class="font-display text-base font-semibold">{{ t('sciencePage.s2ChartTitle') }}</h3>
          <p class="mb-6 mt-1 font-mono text-xs uppercase tracking-wide text-ink-faint">{{ t('sciencePage.s2ChartUnit') }}</p>
          <HBarChart :items="intake" :ariaLabel="t('sciencePage.s2ChartTitle')" :caption="t('sciencePage.s2ChartNote')" />
        </div>
      </section>

      <!-- s3 sources ranking -->
      <section class="mt-16">
        <p class="font-mono text-xs font-medium uppercase tracking-[0.18em] text-teal-deep">{{ t('sciencePage.s3Kicker') }}</p>
        <h2 class="mt-3 font-display text-2xl font-semibold sm:text-3xl">{{ t('sciencePage.s3Title') }}</h2>
        <p class="mt-4 text-lg leading-relaxed text-ink-soft">{{ t('sciencePage.s3Body') }}</p>

        <div class="mt-8 rounded-2xl border border-line bg-paper-2/40 p-6 sm:p-8">
          <h3 class="mb-6 font-display text-base font-semibold">{{ t('sciencePage.s3ChartTitle') }}</h3>
          <HBarChart :items="sourceRanking" :max="100" :ariaLabel="t('sciencePage.s3ChartTitle')" />
        </div>
      </section>

      <!-- s4 particles vs chemicals -->
      <section class="mt-16">
        <p class="font-mono text-xs font-medium uppercase tracking-[0.18em] text-teal-deep">{{ t('sciencePage.s4Kicker') }}</p>
        <h2 class="mt-3 font-display text-2xl font-semibold sm:text-3xl">{{ t('sciencePage.s4Title') }}</h2>
        <p class="mt-4 text-lg leading-relaxed text-ink-soft">{{ t('sciencePage.s4Body') }}</p>

        <div class="mt-8 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-emerging/30 bg-emerging-soft/30 p-6">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerging-soft text-emerging">
              <Icon name="lucide:atom" :size="20" aria-hidden="true" />
            </span>
            <h3 class="mt-3 font-display text-lg font-semibold">{{ t('sciencePage.s4ParticleTitle') }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ t('sciencePage.s4ParticleBody') }}</p>
          </div>
          <div class="rounded-2xl border border-strong/30 bg-strong-soft/30 p-6">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-strong-soft text-strong">
              <Icon name="lucide:flask-round" :size="20" aria-hidden="true" />
            </span>
            <h3 class="mt-3 font-display text-lg font-semibold">{{ t('sciencePage.s4ChemicalTitle') }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ t('sciencePage.s4ChemicalBody') }}</p>
          </div>
        </div>
      </section>

      <!-- s5 evidence map -->
      <section class="mt-16">
        <p class="font-mono text-xs font-medium uppercase tracking-[0.18em] text-teal-deep">{{ t('sciencePage.s5Kicker') }}</p>
        <h2 class="mt-3 font-display text-2xl font-semibold sm:text-3xl">{{ t('sciencePage.s5Title') }}</h2>
        <p class="mt-4 text-lg leading-relaxed text-ink-soft">{{ t('sciencePage.s5Body') }}</p>

        <div class="mt-8 rounded-2xl border border-line bg-paper-2/40 p-6 sm:p-8">
          <GradeBar :data="grades" :ariaLabel="t('sciencePage.s5Title')" />
        </div>
      </section>

      <!-- s6 bottom line -->
      <section class="mt-16 rounded-3xl border border-teal/20 bg-gradient-to-br from-teal-deep to-teal p-8 text-paper sm:p-10">
        <p class="font-mono text-xs font-medium uppercase tracking-[0.18em] text-paper/70">{{ t('sciencePage.s6Kicker') }}</p>
        <h2 class="mt-3 font-display text-2xl font-semibold sm:text-3xl">{{ t('sciencePage.s6Title') }}</h2>
        <p class="mt-4 max-w-2xl text-lg leading-relaxed text-paper/85">{{ t('sciencePage.s6Body') }}</p>
        <NuxtLink
          :to="localePath('/protocols')"
          class="group mt-7 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-semibold text-teal-deep transition-all hover:gap-3"
        >
          {{ t('sciencePage.s6Cta') }}
          <Icon name="lucide:arrow-right" :size="18" aria-hidden="true" />
        </NuxtLink>
      </section>
    </div>
  </div>
</template>
