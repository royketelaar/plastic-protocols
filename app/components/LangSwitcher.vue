<script setup lang="ts">
import { LOCALES } from '~/utils/locales'

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const open = ref(false)
const trigger = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)

// Only show locales actually registered with i18n; enrich with endonym + flag + dir.
const items = computed(() =>
  locales.value.map((l) => {
    const meta = LOCALES.find((m) => m.code === l.code)
    return { code: l.code, native: meta?.native ?? l.name ?? l.code, flag: meta?.flag ?? '🏳️', dir: meta?.dir ?? 'ltr' }
  }),
)
const current = computed(() => items.value.find((l) => l.code === locale.value) ?? items.value[0]!)

const close = () => (open.value = false)
const toggle = () => (open.value = !open.value)
const closeAndRefocus = () => {
  close()
  nextTick(() => trigger.value?.focus())
}

// Move focus into the panel when it opens (current language first, else first option).
watch(open, (isOpen) => {
  if (!isOpen) return
  nextTick(() => {
    const el =
      panel.value?.querySelector<HTMLElement>('[aria-current="true"]') ??
      panel.value?.querySelector<HTMLElement>('a')
    el?.focus()
  })
})

watch(() => route.fullPath, close)

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && open.value) closeAndRefocus()
}
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="relative">
    <button
      ref="trigger"
      type="button"
      class="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 font-mono text-xs font-medium text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
      :aria-expanded="open"
      aria-controls="lang-menu"
      :aria-label="`${t('lang.switch')}: ${current.native}`"
      @click="toggle"
    >
      <span class="text-sm leading-none" aria-hidden="true">{{ current.flag }}</span>
      <span class="uppercase">{{ current.code }}</span>
      <Icon
        name="lucide:chevron-down"
        :size="13"
        class="transition-transform"
        :class="open && 'rotate-180'"
        aria-hidden="true"
      />
    </button>

    <!-- click-outside backdrop -->
    <button
      v-if="open"
      type="button"
      class="fixed inset-0 z-40 cursor-default"
      tabindex="-1"
      :aria-label="t('nav.close')"
      @click="closeAndRefocus"
    />

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1 scale-95"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="opacity-0 -translate-y-1 scale-95"
    >
      <nav
        v-if="open"
        id="lang-menu"
        ref="panel"
        :aria-label="t('lang.switch')"
        class="absolute end-0 z-50 mt-2 max-h-[min(70vh,26rem)] w-[min(88vw,24rem)] origin-top-right overflow-auto rounded-2xl border border-line bg-paper p-2 shadow-[0_20px_60px_-24px_rgba(20,34,30,0.45)] rtl:origin-top-left"
      >
        <p class="px-2 py-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-ink-faint">
          {{ t('lang.switch') }}
        </p>
        <ul class="grid grid-cols-2 gap-0.5">
          <li v-for="l in items" :key="l.code">
            <NuxtLink
              :to="switchLocalePath(l.code)"
              :aria-current="l.code === current.code ? 'true' : undefined"
              :lang="l.code"
              :hreflang="l.code"
              :dir="l.dir"
              class="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
              :class="
                l.code === current.code
                  ? 'bg-teal-soft/60 font-semibold text-teal-deep'
                  : 'text-ink hover:bg-paper-2'
              "
              @click="close"
            >
              <span class="flex min-w-0 items-center gap-2">
                <span class="text-base leading-none" aria-hidden="true">{{ l.flag }}</span>
                <span class="truncate">{{ l.native }}</span>
              </span>
              <Icon
                v-if="l.code === current.code"
                name="lucide:check"
                :size="15"
                class="shrink-0 text-teal"
                aria-hidden="true"
              />
              <span v-else class="shrink-0 font-mono text-[0.6rem] uppercase text-ink-faint">{{ l.code }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </div>
</template>
