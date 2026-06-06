<script setup lang="ts">
import { GRADE_VAR, type Grade } from '~/utils/evidence'

const props = defineProps<{ data: { grade: Grade; count: number }[]; ariaLabel: string }>()
const { t } = useI18n()

const total = computed(() => props.data.reduce((s, d) => s + d.count, 0) || 1)
const pct = (n: number) => (n / total.value) * 100
</script>

<template>
  <figure class="not-prose" role="img" :aria-label="ariaLabel">
    <div class="flex h-5 w-full overflow-hidden rounded-full ring-1 ring-line">
      <div
        v-for="d in data"
        :key="d.grade"
        class="h-full first:rounded-l-full last:rounded-r-full"
        :style="{ width: `${pct(d.count)}%`, background: GRADE_VAR[d.grade] }"
      />
    </div>
    <ul class="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
      <li v-for="d in data" :key="d.grade" class="flex items-center gap-2 text-sm">
        <span class="h-3 w-3 shrink-0 rounded-full" :style="{ background: GRADE_VAR[d.grade] }" />
        <span class="text-ink-soft">{{ t(`grade.short.${d.grade}`) }}</span>
        <span class="ml-auto font-mono text-xs tabular-nums text-ink-faint">{{ d.count }}</span>
      </li>
    </ul>
  </figure>
</template>
