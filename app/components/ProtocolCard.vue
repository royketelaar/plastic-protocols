<script setup lang="ts">
import { slugOf, type ProtocolItem } from '~/types/content'

const props = defineProps<{ protocol: ProtocolItem }>()
const { t } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => slugOf(props.protocol.path))
const to = computed(() => localePath(`/protocols/${slug.value}`))
</script>

<template>
  <article
    class="group relative flex flex-col rounded-[--radius-card] border border-line bg-paper p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_12px_40px_-24px_rgba(20,34,30,0.5)]"
  >
    <span
      class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-2 text-teal-deep ring-1 ring-line"
    >
      <Icon :name="protocol.icon" :size="24" aria-hidden="true" />
    </span>

    <div class="mt-5 flex items-center gap-2">
      <EvidenceBadge :grade="protocol.evidenceGrade" size="sm" />
      <span class="font-mono text-[0.62rem] uppercase tracking-wide text-ink-faint">
        {{ t(`evidenceType.${protocol.evidenceType}`) }}
      </span>
    </div>

    <h3 class="mt-3 font-display text-xl font-semibold leading-snug">
      <NuxtLink :to="to" class="after:absolute after:inset-0 after:content-['']">
        {{ protocol.title }}
      </NuxtLink>
    </h3>
    <p class="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{{ protocol.tldr }}</p>

    <dl class="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-ink-soft">
      <div class="flex items-center gap-1.5">
        <Icon name="lucide:target" :size="14" class="text-ink-faint" aria-hidden="true" />
        <dt class="sr-only">{{ t('meta.impact') }}</dt>
        <dd>{{ t('meta.impact') }}: <span class="font-medium text-ink">{{ t(`meta.${protocol.impact}`) }}</span></dd>
      </div>
      <div class="flex items-center gap-1.5">
        <Icon name="lucide:activity" :size="14" class="text-ink-faint" aria-hidden="true" />
        <dt class="sr-only">{{ t('meta.effort') }}</dt>
        <dd>{{ t('meta.effort') }}: <span class="font-medium text-ink">{{ t(`meta.${protocol.effort}`) }}</span></dd>
      </div>
    </dl>
  </article>
</template>
