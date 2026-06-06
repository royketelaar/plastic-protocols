<script setup lang="ts">
// Deterministic particle set (no Math.random → no SSR hydration mismatch).
const particles = [
  { x: 8, y: 22, r: 3.5, o: 0.18, d: 0 },
  { x: 17, y: 64, r: 2, o: 0.14, d: 1.2 },
  { x: 27, y: 38, r: 5, o: 0.1, d: 0.4 },
  { x: 38, y: 78, r: 2.5, o: 0.16, d: 2.1 },
  { x: 44, y: 18, r: 3, o: 0.12, d: 0.8 },
  { x: 55, y: 56, r: 4.5, o: 0.09, d: 1.7 },
  { x: 63, y: 30, r: 2, o: 0.15, d: 0.2 },
  { x: 71, y: 72, r: 3.5, o: 0.13, d: 2.6 },
  { x: 79, y: 44, r: 2.5, o: 0.16, d: 1 },
  { x: 88, y: 25, r: 4, o: 0.1, d: 1.9 },
  { x: 93, y: 62, r: 2, o: 0.14, d: 0.6 },
  { x: 50, y: 88, r: 3, o: 0.11, d: 2.3 },
]
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <svg class="h-full w-full" preserveAspectRatio="none">
      <circle
        v-for="(p, i) in particles"
        :key="i"
        :cx="`${p.x}%`"
        :cy="`${p.y}%`"
        :r="p.r"
        fill="var(--color-teal)"
        :opacity="p.o"
        class="pp-float"
        :style="{ '--dx': `${(i % 3) * 5 + 4}px`, '--dy': `${-(i % 4) * 4 - 6}px`, animationDelay: `${p.d}s` }"
      />
    </svg>
  </div>
</template>

<style scoped>
.pp-float {
  animation: pp-drift 9s ease-in-out infinite;
}
</style>
