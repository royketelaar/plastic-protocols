<script setup lang="ts">
withDefaults(defineProps<{ size?: number; animated?: boolean }>(), {
  size: 32,
  animated: false,
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
    class="shrink-0"
  >
    <!-- bottle dissolving into particles -->
    <path
      d="M20.5 5h7c.3 0 .5.2.5.5v2.2c0 .8.3 1.5.8 2.1l1.5 1.8c.8 1 1.2 2.2 1.2 3.4V37c0 3.3-2.7 6-6 6h-3c-3.3 0-6-2.7-6-6V18c0-1.2.4-2.4 1.2-3.4l1.5-1.8c.5-.6.8-1.3.8-2.1V5.5c0-.3.2-.5.5-.5Z"
      class="fill-teal"
    />
    <path
      d="M18 22c2.5 1.4 5.5 1.4 8 0s5.5-1.4 8 0"
      class="stroke-paper"
      stroke-width="1.6"
      stroke-linecap="round"
      fill="none"
      opacity="0.8"
    />
    <g class="fill-aqua">
      <circle :class="animated ? 'pp-drift' : ''" style="--dx: 4px; --dy: -6px" cx="37" cy="13" r="2.4" />
      <circle :class="animated ? 'pp-drift' : ''" style="--dx: 6px; --dy: -4px; animation-delay: 0.4s" cx="42" cy="19" r="1.7" opacity="0.8" />
      <circle :class="animated ? 'pp-drift' : ''" style="--dx: 5px; --dy: -7px; animation-delay: 0.9s" cx="40" cy="9" r="1.3" opacity="0.65" />
      <circle :class="animated ? 'pp-drift' : ''" style="--dx: 7px; --dy: -3px; animation-delay: 1.3s" cx="44" cy="13" r="1" opacity="0.5" />
    </g>
  </svg>
</template>

<style scoped>
.pp-drift {
  animation: pp-drift 6s ease-in-out infinite;
}
</style>
