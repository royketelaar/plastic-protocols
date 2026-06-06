<script setup lang="ts">
interface Bar {
  label: string
  value: number
  display?: string
  sub?: string
  colorVar?: string
}
const props = withDefaults(
  defineProps<{ items: Bar[]; max?: number; caption?: string; ariaLabel: string }>(),
  {},
)
const maxValue = computed(() => props.max ?? Math.max(...props.items.map((i) => i.value), 1))
const pct = (v: number) => Math.max(2, Math.round((v / maxValue.value) * 100))
</script>

<template>
  <figure class="not-prose" role="img" :aria-label="ariaLabel">
    <ul class="space-y-4">
      <li v-for="bar in items" :key="bar.label">
        <div class="flex items-baseline justify-between gap-3">
          <span class="text-sm font-medium text-ink">{{ bar.label }}</span>
          <span class="font-mono text-sm tabular-nums text-ink-soft">{{ bar.display ?? bar.value }}</span>
        </div>
        <div class="mt-1.5 h-2.5 overflow-hidden rounded-full bg-paper-3">
          <div
            class="h-full rounded-full transition-[width] duration-700 ease-out"
            :style="{ width: `${pct(bar.value)}%`, background: bar.colorVar ?? 'var(--color-teal)' }"
          />
        </div>
        <p v-if="bar.sub" class="mt-1 text-xs text-ink-faint">{{ bar.sub }}</p>
      </li>
    </ul>
    <figcaption v-if="caption" class="mt-5 border-l-2 border-line pl-3 text-xs leading-relaxed text-ink-faint">
      {{ caption }}
    </figcaption>
  </figure>
</template>
