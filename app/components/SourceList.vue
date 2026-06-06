<script setup lang="ts">
import type { Source } from '~/types/content'

defineProps<{ sources: Source[]; title?: string }>()
const { t } = useI18n()
</script>

<template>
  <section v-if="sources?.length" class="not-prose">
    <h2 class="flex items-center gap-2 font-display text-lg font-semibold text-ink">
      <Icon name="lucide:book-marked" :size="18" class="text-teal" aria-hidden="true" />
      {{ title ?? t('common.sources') }}
    </h2>
    <ol class="mt-4 space-y-3">
      <li
        v-for="(s, i) in sources"
        :key="s.url"
        class="flex gap-3 text-sm leading-relaxed"
      >
        <span class="mt-0.5 font-mono text-xs text-ink-faint tnum">{{ String(i + 1).padStart(2, '0') }}</span>
        <span>
          <a
            :href="s.url"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium text-ink underline decoration-line-strong underline-offset-2 transition-colors hover:decoration-teal"
          >
            {{ s.title }}<span v-if="s.year" class="text-ink-faint"> · {{ s.year }}</span>
          </a>
          <span
            v-if="s.type"
            class="ml-2 inline-block rounded-full bg-paper-2 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide text-ink-faint"
          >{{ s.type }}</span>
        </span>
      </li>
    </ol>
  </section>
</template>
