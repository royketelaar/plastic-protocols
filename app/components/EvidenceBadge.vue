<script setup lang="ts">
import { GRADE_META, GRADE_CLASSES, type Grade } from '~/utils/evidence'

const props = withDefaults(
  defineProps<{ grade: Grade; size?: 'sm' | 'md'; showIcon?: boolean }>(),
  { size: 'md', showIcon: true },
)

const { t } = useI18n()
const meta = computed(() => GRADE_META[props.grade])
const cls = computed(() => GRADE_CLASSES[props.grade].badge)
const label = computed(() => t(`grade.short.${props.grade}`))
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full border font-mono font-medium uppercase tracking-wide"
    :class="[cls, size === 'sm' ? 'px-2 py-0.5 text-[0.62rem]' : 'px-2.5 py-1 text-[0.7rem]']"
  >
    <Icon v-if="showIcon" :name="meta.icon" :size="size === 'sm' ? 12 : 14" aria-hidden="true" />
    {{ label }}
  </span>
</template>
