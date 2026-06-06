<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const year = 2026

const cols = computed(() => [
  { to: localePath('/science'), label: t('nav.science') },
  { to: localePath('/protocols'), label: t('nav.protocols') },
  { to: localePath('/myths'), label: t('nav.myths') },
  { to: localePath('/check'), label: t('nav.check') },
  { to: localePath('/sources'), label: t('nav.sources') },
])
</script>

<template>
  <footer class="mt-24 border-t border-line bg-paper-2/60">
    <div class="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <div class="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div class="max-w-sm">
          <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5">
            <BrandMark :size="30" />
            <span class="font-display text-base font-semibold tracking-tight">
              Plastic<span class="text-teal">Protocols</span>
            </span>
          </NuxtLink>
          <p class="mt-4 text-sm leading-relaxed text-ink-soft">
            {{ t('footer.builtNote') }}
          </p>
        </div>

        <nav class="flex flex-col gap-2.5 text-sm" :aria-label="t('nav.menu')">
          <NuxtLink
            v-for="c in cols"
            :key="c.to"
            :to="c.to"
            class="text-ink-soft transition-colors hover:text-teal"
          >
            {{ c.label }}
          </NuxtLink>
        </nav>
      </div>

      <hr class="rule my-8" />

      <div class="flex flex-col gap-3 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} {{ t('footer.rights') }}</p>
        <p class="font-mono">plasticprotocols.com</p>
      </div>
    </div>
  </footer>
</template>
