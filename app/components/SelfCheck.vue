<script setup lang="ts">
import { byEvidenceThenOrder } from '~/utils/evidence'
import { slugOf, type ProtocolItem } from '~/types/content'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { protocols } = useCollections()
const { has, toggle } = usePlan()

// Quiz model: each option contributes weights to protocol slugs.
interface Option { id: string; weights: Record<string, number> }
interface Question { id: string; options: Option[] }

const QUESTIONS: Question[] = [
  { id: 'water', options: [
    { id: 'bottled', weights: { 'tap-over-bottled-water': 3, 'filter-your-water': 1 } },
    { id: 'tap', weights: { 'filter-your-water': 1 } },
    { id: 'filtered', weights: {} },
  ] },
  { id: 'food', options: [
    { id: 'often', weights: { 'fresh-over-canned': 3, 'mind-the-chemicals': 1 } },
    { id: 'sometimes', weights: { 'fresh-over-canned': 2 } },
    { id: 'rarely', weights: {} },
  ] },
  { id: 'heat', options: [
    { id: 'yes', weights: { 'never-microwave-plastic': 3, 'mind-the-chemicals': 1 } },
    { id: 'sometimes', weights: { 'never-microwave-plastic': 2 } },
    { id: 'no', weights: {} },
  ] },
  { id: 'cook', options: [
    { id: 'nonstick', weights: { 'metal-over-nonstick': 3 } },
    { id: 'mixed', weights: { 'metal-over-nonstick': 1 } },
    { id: 'metal', weights: {} },
  ] },
  { id: 'tea', options: [
    { id: 'plastic', weights: { 'skip-plastic-teabags': 3 } },
    { id: 'paper', weights: { 'skip-plastic-teabags': 1 } },
    { id: 'loose', weights: {} },
  ] },
  { id: 'home', options: [
    { id: 'synthetic', weights: { 'cut-indoor-fibre-load': 3 } },
    { id: 'some', weights: { 'cut-indoor-fibre-load': 1 } },
    { id: 'natural', weights: {} },
  ] },
  { id: 'chem', options: [
    { id: 'no', weights: { 'mind-the-chemicals': 3 } },
    { id: 'some', weights: { 'mind-the-chemicals': 1 } },
    { id: 'yes', weights: {} },
  ] },
]

const { data } = await useAsyncData(
  () => `check-protocols-${locale.value}`,
  () => queryCollection(protocols.value).all().catch(() => []),
  { watch: [locale] },
)
const protocolMap = computed(() => {
  const m = new Map<string, ProtocolItem>()
  for (const p of (data.value ?? []) as unknown as ProtocolItem[]) m.set(slugOf(p.path), p)
  return m
})

type Stage = 'intro' | 'quiz' | 'result'
const stage = ref<Stage>('intro')
const step = ref(0)
const answers = ref<Record<string, string>>({})

const current = computed(() => QUESTIONS[step.value])
const progress = computed(() => ((step.value + 1) / QUESTIONS.length) * 100)
const currentAnswer = computed(() => (current.value ? answers.value[current.value.id] : undefined))

const start = () => {
  stage.value = 'quiz'
  step.value = 0
  answers.value = {}
}
const choose = (qid: string, oid: string) => {
  answers.value = { ...answers.value, [qid]: oid }
}
const next = () => {
  if (step.value < QUESTIONS.length - 1) step.value++
  else stage.value = 'result'
}
const back = () => {
  if (step.value > 0) step.value--
}
const restart = () => {
  stage.value = 'intro'
  step.value = 0
  answers.value = {}
}

const recommendations = computed(() => {
  const scores: Record<string, number> = {}
  for (const q of QUESTIONS) {
    const ans = answers.value[q.id]
    const opt = q.options.find((o) => o.id === ans)
    if (!opt) continue
    for (const [slug, w] of Object.entries(opt.weights)) scores[slug] = (scores[slug] ?? 0) + w
  }
  return Object.entries(scores)
    .filter(([, v]) => v > 0)
    .map(([slug, score]) => ({ slug, score, protocol: protocolMap.value.get(slug) }))
    .filter((r) => r.protocol)
    .sort((a, b) => b.score - a.score || byEvidenceThenOrder(a.protocol!, b.protocol!))
})

const addAll = () => {
  for (const r of recommendations.value) if (!has(r.slug)) toggle(r.slug)
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-5 py-14 sm:px-8">
    <!-- INTRO -->
    <div v-if="stage === 'intro'" class="text-center">
      <span class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-soft text-teal-deep">
        <Icon name="lucide:clipboard-list" :size="32" aria-hidden="true" />
      </span>
      <h1 class="mt-6 font-display text-3xl font-semibold sm:text-4xl">{{ t('checkPage.title') }}</h1>
      <p class="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{{ t('checkPage.lead') }}</p>
      <button
        type="button"
        class="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-teal-deep"
        @click="start"
      >
        <Icon name="lucide:play" :size="17" aria-hidden="true" />
        {{ t('checkPage.start') }}
      </button>
    </div>

    <!-- QUIZ -->
    <div v-else-if="stage === 'quiz' && current">
      <div class="flex items-center justify-between gap-4">
        <p class="font-mono text-xs uppercase tracking-wide text-ink-faint">
          {{ t('checkPage.question', { n: step + 1, total: QUESTIONS.length }) }}
        </p>
        <div
          class="h-1.5 w-32 overflow-hidden rounded-full bg-paper-3"
          role="progressbar"
          :aria-valuenow="Math.round(progress)"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div class="h-full rounded-full bg-teal transition-[width] duration-300" :style="{ width: `${progress}%` }" />
        </div>
      </div>

      <h2 class="mt-6 font-display text-2xl font-semibold leading-snug sm:text-3xl">
        {{ t(`checkPage.q.${current.id}.q`) }}
      </h2>

      <fieldset class="mt-6 space-y-3">
        <legend class="sr-only">{{ t(`checkPage.q.${current.id}.q`) }}</legend>
        <label
          v-for="opt in current.options"
          :key="opt.id"
          class="flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors"
          :class="
            currentAnswer === opt.id
              ? 'border-teal bg-teal-soft/40 ring-1 ring-teal/30'
              : 'border-line hover:border-line-strong'
          "
        >
          <input
            type="radio"
            :name="current.id"
            :value="opt.id"
            :checked="currentAnswer === opt.id"
            class="h-4 w-4 accent-teal"
            @change="choose(current.id, opt.id)"
          />
          <span class="text-base font-medium">{{ t(`checkPage.q.${current.id}.${opt.id}`) }}</span>
        </label>
      </fieldset>

      <div class="mt-8 flex items-center justify-between">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink disabled:opacity-40"
          :disabled="step === 0"
          @click="back"
        >
          <Icon name="lucide:arrow-left" :size="16" aria-hidden="true" />
          {{ t('checkPage.back') }}
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-teal-deep disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="!currentAnswer"
          @click="next"
        >
          {{ step === QUESTIONS.length - 1 ? t('checkPage.seeResults') : t('checkPage.next') }}
          <Icon name="lucide:arrow-right" :size="16" aria-hidden="true" />
        </button>
      </div>
    </div>

    <!-- RESULT -->
    <div v-else-if="stage === 'result'">
      <p class="font-mono text-xs uppercase tracking-wide text-teal-deep">{{ t('checkPage.resultTitle') }}</p>
      <h1 class="mt-2 font-display text-3xl font-semibold sm:text-4xl">{{ t('checkPage.resultTitle') }}</h1>

      <template v-if="recommendations.length">
        <p class="mt-4 text-lg leading-relaxed text-ink-soft">{{ t('checkPage.resultLead') }}</p>

        <ol class="mt-8 space-y-4">
          <li
            v-for="(r, i) in recommendations"
            :key="r.slug"
            class="relative flex items-start gap-4 rounded-2xl border border-line bg-paper p-5"
            :class="i === 0 && 'ring-1 ring-teal/30'"
          >
            <span class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper-2 font-mono text-sm font-semibold text-teal-deep tnum">
              {{ i + 1 }}
            </span>
            <div class="min-w-0 flex-1">
              <span v-if="i === 0" class="font-mono text-[0.62rem] uppercase tracking-wide text-teal-deep">{{ t('checkPage.topMatch') }}</span>
              <div class="flex items-center gap-2">
                <NuxtLink
                  :to="localePath(`/protocols/${r.slug}`)"
                  class="font-display text-lg font-semibold leading-snug hover:text-teal-deep after:absolute after:inset-0 after:content-['']"
                >
                  {{ r.protocol!.title }}
                </NuxtLink>
              </div>
              <div class="mt-1.5">
                <EvidenceBadge :grade="r.protocol!.evidenceGrade" size="sm" />
              </div>
            </div>
            <PlanButton :slug="r.slug" />
          </li>
        </ol>

        <div class="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-teal-deep"
            @click="addAll"
          >
            <Icon name="lucide:list-plus" :size="17" aria-hidden="true" />
            {{ t('checkPage.addAll') }}
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            @click="restart"
          >
            <Icon name="lucide:rotate-ccw" :size="16" aria-hidden="true" />
            {{ t('checkPage.restart') }}
          </button>
        </div>
      </template>

      <template v-else>
        <p class="mt-4 text-lg leading-relaxed text-ink-soft">{{ t('checkPage.allGood') }}</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <ButtonLink :to="localePath('/protocols')" icon="lucide:arrow-right">{{ t('checkPage.browseAll') }}</ButtonLink>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            @click="restart"
          >
            <Icon name="lucide:rotate-ccw" :size="16" aria-hidden="true" />
            {{ t('checkPage.restart') }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
