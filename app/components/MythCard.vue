<script setup lang="ts">
import { GRADE_CLASSES, GRADE_META, type Grade } from '~/utils/evidence'

interface MythDoc {
  title: string
  claim: string
  reality: string
  grade: Grade
  body?: unknown
}

const props = defineProps<{ myth: MythDoc }>()
const { t } = useI18n()
const cls = computed(() => GRADE_CLASSES[props.myth.grade])
const meta = computed(() => GRADE_META[props.myth.grade])
</script>

<template>
  <article class="overflow-hidden rounded-[--radius-card] border border-line bg-paper">
    <div class="border-l-4 p-6 sm:p-7" :class="cls.border">
      <div class="flex items-start justify-between gap-4">
        <p class="font-display text-lg italic leading-snug text-ink-soft">
          <Icon name="lucide:quote" :size="16" class="mr-1 inline text-ink-faint" aria-hidden="true" />“{{ myth.claim }}”
        </p>
        <EvidenceBadge :grade="myth.grade" size="sm" />
      </div>

      <div class="mt-4 flex gap-2.5">
        <Icon :name="meta.icon" :size="20" class="mt-0.5 shrink-0" :class="cls.text" aria-hidden="true" />
        <p class="text-base font-medium leading-relaxed text-ink">{{ myth.reality }}</p>
      </div>

      <details v-if="myth.body" class="group mt-4">
        <summary
          class="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-teal-deep transition-colors hover:text-teal"
        >
          <Icon
            name="lucide:chevron-right"
            :size="16"
            class="transition-transform group-open:rotate-90"
            aria-hidden="true"
          />
          {{ t('common.theFullStory') }}
        </summary>
        <div class="prose-pp mt-3 text-[0.95rem]">
          <ContentRenderer :value="myth" />
        </div>
      </details>
    </div>
  </article>
</template>
