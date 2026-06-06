<script setup lang="ts">
withDefaults(defineProps<{ kicker?: string; title: string; lead?: string; tinted?: boolean }>(), {
  tinted: false,
})
</script>

<template>
  <header class="relative overflow-hidden border-b border-line" :class="tinted && 'bg-paper-2/40'">
    <ParticleField v-if="tinted" />
    <div class="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <p
        v-if="kicker"
        class="pp-rise font-mono text-xs font-medium uppercase tracking-[0.18em] text-teal-deep"
      >
        {{ kicker }}
      </p>
      <h1
        class="pp-rise mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"
        style="animation-delay: 0.08s"
      >
        {{ title }}
      </h1>
      <p
        v-if="lead"
        class="pp-rise mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft"
        style="animation-delay: 0.16s"
      >
        {{ lead }}
      </p>
      <slot />
    </div>
  </header>
</template>
