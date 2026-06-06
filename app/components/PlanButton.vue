<script setup lang="ts">
const props = withDefaults(
  defineProps<{ slug: string; variant?: 'icon' | 'full' }>(),
  { variant: 'icon' },
)
const { t } = useI18n()
const { has, toggle } = usePlan()
const active = computed(() => has(props.slug))
</script>

<template>
  <button
    type="button"
    :aria-pressed="active"
    :aria-label="active ? t('common.inPlan') : t('common.addToPlan')"
    class="relative z-10 inline-flex items-center gap-2 rounded-full border text-sm font-medium transition-colors"
    :class="[
      active
        ? 'border-teal/30 bg-teal-soft/60 text-teal-deep'
        : 'border-line text-ink-soft hover:border-teal/40 hover:text-teal-deep',
      variant === 'full' ? 'px-4 py-2.5' : 'h-9 w-9 justify-center',
    ]"
    @click="toggle(slug)"
  >
    <Icon
      :name="active ? 'lucide:check' : 'lucide:plus'"
      :size="variant === 'full' ? 17 : 18"
      aria-hidden="true"
    />
    <span v-if="variant === 'full'">{{ active ? t('common.inPlan') : t('common.addToPlan') }}</span>
  </button>
</template>
