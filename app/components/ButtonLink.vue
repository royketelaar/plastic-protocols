<script setup lang="ts">
withDefaults(
  defineProps<{ to: string; variant?: 'primary' | 'secondary' | 'ghost'; icon?: string }>(),
  { variant: 'primary' },
)
</script>

<template>
  <NuxtLink
    :to="to"
    class="group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200"
    :class="{
      'bg-ink text-paper hover:bg-teal-deep': variant === 'primary',
      'border border-line-strong bg-paper text-ink hover:border-teal hover:text-teal-deep':
        variant === 'secondary',
      'text-teal-deep hover:gap-3': variant === 'ghost',
    }"
  >
    <slot />
    <Icon
      v-if="icon"
      :name="icon"
      :size="17"
      class="transition-transform duration-200 group-hover:translate-x-0.5"
      aria-hidden="true"
    />
  </NuxtLink>
</template>
