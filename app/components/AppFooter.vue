<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const year = 2026
const xUrl = 'https://x.com/PlasticProtocol'

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
          <a
            :href="xUrl"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="t('footer.followX')"
            class="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-teal hover:text-teal-deep"
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
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
