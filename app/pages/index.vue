<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => `${t('site.name')} · ${t('site.tagline')}`,
  description: () => t('home.heroLead'),
  ogTitle: () => t('site.name'),
  ogDescription: () => t('home.heroLead'),
})

const { protocols } = useCollections()
const { data: top } = await useAsyncData(
  () => `home-top-${locale.value}`,
  () => queryCollection(protocols.value).order('order', 'ASC').all().catch(() => []),
  { watch: [locale] },
)
const topThree = computed(() => [...(top.value ?? [])].sort(byEvidenceThenOrder).slice(0, 3))

const stats = computed(() => [
  { label: t('home.stat1Label'), value: t('home.stat1Value'), body: t('home.stat1Body'), icon: 'lucide:activity' },
  { label: t('home.stat2Label'), value: t('home.stat2Value'), body: t('home.stat2Body'), icon: 'lucide:droplet' },
  { label: t('home.stat3Label'), value: t('home.stat3Value'), body: t('home.stat3Body'), icon: 'lucide:heart-pulse' },
])
</script>

<template>
  <div>
    <!-- ░░ HERO ░░ -->
    <section class="relative overflow-hidden border-b border-line">
      <ParticleField />
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-teal-soft/25 via-paper to-paper" aria-hidden="true" />
      <div class="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <p class="pp-rise font-mono text-xs font-medium uppercase tracking-[0.2em] text-teal-deep" style="animation-delay: 0.05s">
          {{ t('home.kicker') }}
        </p>
        <h1 class="pp-rise mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl" style="animation-delay: 0.12s">
          {{ t('home.heroTitle') }}
        </h1>
        <p class="pp-rise mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl" style="animation-delay: 0.2s">
          {{ t('home.heroLead') }}
        </p>
        <div class="pp-rise mt-9 flex flex-wrap gap-3" style="animation-delay: 0.28s">
          <ButtonLink :to="localePath('/protocols')" icon="lucide:arrow-right">{{ t('home.heroPrimary') }}</ButtonLink>
          <ButtonLink :to="localePath('/science')" variant="secondary">{{ t('home.heroSecondary') }}</ButtonLink>
        </div>
      </div>
    </section>

    <!-- ░░ SEVERITY (dark, for gravity) ░░ -->
    <section class="relative overflow-hidden bg-ink text-paper">
      <div class="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <p class="font-mono text-xs font-medium uppercase tracking-[0.2em] text-aqua">{{ t('home.severityKicker') }}</p>
        <h2 class="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          {{ t('home.severityTitle') }}
        </h2>
        <p class="mt-5 max-w-xl text-lg leading-relaxed text-paper/70">{{ t('home.severityLead') }}</p>

        <div class="mt-12 grid gap-px overflow-hidden rounded-2xl bg-paper/10 sm:grid-cols-3">
          <article v-for="s in stats" :key="s.label" class="bg-ink p-7">
            <span class="flex items-center gap-2 text-aqua">
              <Icon :name="s.icon" :size="18" aria-hidden="true" />
              <span class="font-mono text-[0.65rem] uppercase tracking-wider">{{ s.label }}</span>
            </span>
            <p class="mt-4 font-display text-3xl font-semibold leading-tight text-paper tnum">{{ s.value }}</p>
            <p class="mt-2 text-sm leading-relaxed text-paper/65">{{ s.body }}</p>
          </article>
        </div>

        <div class="mt-12 flex flex-col gap-6 border-t border-paper/15 pt-10 sm:flex-row sm:items-end sm:justify-between">
          <p class="max-w-2xl font-display text-xl leading-snug text-paper sm:text-2xl">{{ t('home.severityPivot') }}</p>
          <NuxtLink
            :to="localePath('/protocols')"
            class="group inline-flex shrink-0 items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:gap-3"
          >
            {{ t('home.heroPrimary') }}
            <Icon name="lucide:arrow-right" :size="18" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ░░ HONEST FRAMING (credibility) ░░ -->
    <section class="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div class="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading :kicker="t('home.framingTitle')">{{ t('home.framingBody') }}</SectionHeading>
        </div>
        <div class="grid gap-5 sm:grid-cols-2">
          <article class="rounded-[--radius-card] border border-line bg-paper p-6">
            <span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-strong-soft text-strong">
              <Icon name="lucide:ruler" :size="22" aria-hidden="true" />
            </span>
            <h3 class="mt-4 font-display text-xl font-semibold">{{ t('home.framing1Title') }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ t('home.framing1Body') }}</p>
          </article>
          <article class="rounded-[--radius-card] border border-line bg-paper p-6">
            <span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerging-soft text-emerging">
              <Icon name="lucide:flask-round" :size="22" aria-hidden="true" />
            </span>
            <h3 class="mt-4 font-display text-xl font-semibold">{{ t('home.framing2Title') }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ t('home.framing2Body') }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ░░ TOP PROTOCOLS (the payoff) ░░ -->
    <section v-if="topThree.length" class="border-y border-line bg-paper-2/50">
      <div class="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHeading :title="t('home.topProtocolsTitle')" :lead="t('home.topProtocolsLead')" />
        <div class="mt-10 grid gap-6 md:grid-cols-3">
          <ProtocolCard v-for="p in topThree" :key="p.path" :protocol="p" />
        </div>
        <div class="mt-10">
          <ButtonLink :to="localePath('/protocols')" variant="ghost" icon="lucide:arrow-right">{{ t('common.viewAllProtocols') }}</ButtonLink>
        </div>
      </div>
    </section>

    <!-- ░░ SELF-CHECK CTA ░░ -->
    <section class="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div class="relative overflow-hidden rounded-3xl border border-teal/20 bg-gradient-to-br from-teal-deep to-teal px-7 py-14 text-paper sm:px-14">
        <ParticleField />
        <div class="relative max-w-xl">
          <h2 class="font-display text-3xl font-semibold leading-tight sm:text-4xl">{{ t('home.checkTitle') }}</h2>
          <p class="mt-4 text-base leading-relaxed text-paper/85">{{ t('home.checkLead') }}</p>
          <NuxtLink
            :to="localePath('/check')"
            class="group mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-semibold text-teal-deep transition-all hover:gap-3"
          >
            <Icon name="lucide:clipboard-check" :size="18" aria-hidden="true" />
            {{ t('common.startCheck') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ░░ MYTH TEASER ░░ -->
    <section class="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
      <NuxtLink
        :to="localePath('/myths')"
        class="group flex flex-col gap-4 rounded-[--radius-card] border border-line bg-paper p-7 transition-colors hover:border-debunked/40 sm:flex-row sm:items-center sm:justify-between sm:p-9"
      >
        <div class="max-w-2xl">
          <span class="flex items-center gap-2 text-debunked">
            <Icon name="lucide:circle-x" :size="20" aria-hidden="true" />
            <span class="font-mono text-xs font-medium uppercase tracking-wide">{{ t('home.mythTeaserTitle') }}</span>
          </span>
          <p class="mt-3 text-lg leading-relaxed text-ink-soft">{{ t('home.mythTeaserLead') }}</p>
        </div>
        <span class="inline-flex shrink-0 items-center gap-2 font-semibold text-ink transition-all group-hover:gap-3">
          {{ t('home.mythTeaserCta') }}
          <Icon name="lucide:arrow-right" :size="18" aria-hidden="true" />
        </span>
      </NuxtLink>
    </section>
  </div>
</template>
