<script setup lang="ts">
withDefaults(
  defineProps<{ kicker?: string; title?: string; lead?: string; align?: 'left' | 'center' }>(),
  { align: 'left' },
)
</script>

<template>
  <div :class="['max-w-2xl', align === 'center' && 'mx-auto text-center']">
    <p
      v-if="kicker"
      class="font-mono text-xs font-medium uppercase tracking-[0.18em] text-teal-deep"
    >
      {{ kicker }}
    </p>
    <h2
      v-if="title || $slots.default"
      class="mt-3 font-display text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl"
    >
      <slot>{{ title }}</slot>
    </h2>
    <p v-if="lead" class="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{{ lead }}</p>
  </div>
</template>
