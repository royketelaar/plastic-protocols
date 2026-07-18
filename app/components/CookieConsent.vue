<script setup lang="ts">
const { t } = useI18n()
const gaId = useRuntimeConfig().public.gaId
const { decided, accept, decline } = useConsent()

// Only relevant when GA (the only cookie-using feature) is configured.
const show = computed(() => !!gaId && !decided.value)
</script>

<template>
  <Transition name="consent">
    <div
      v-if="show"
      role="dialog"
      aria-modal="false"
      :aria-label="t('consent.label')"
      class="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-card border border-line-strong bg-paper p-4 shadow-xl sm:flex sm:items-center sm:gap-4"
    >
      <p class="text-sm leading-relaxed text-ink-soft">{{ t('consent.message') }}</p>
      <div class="mt-3 flex shrink-0 gap-2 sm:mt-0">
        <button
          type="button"
          class="flex-1 rounded-full border border-line-strong px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-teal hover:text-teal-deep sm:flex-none"
          @click="decline"
        >
          {{ t('consent.decline') }}
        </button>
        <button
          type="button"
          class="flex-1 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-teal-deep sm:flex-none"
          @click="accept"
        >
          {{ t('consent.accept') }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.consent-enter-active,
.consent-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.consent-enter-from,
.consent-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
