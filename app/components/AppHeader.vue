<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const open = ref(false)

const nav = computed(() => [
  { to: localePath('/science'), label: t('nav.science') },
  { to: localePath('/protocols'), label: t('nav.protocols') },
  { to: localePath('/myths'), label: t('nav.myths') },
  { to: localePath('/check'), label: t('nav.check') },
])

const isActive = (to: string) =>
  to === localePath('/') ? route.path === to : route.path.startsWith(to)

// close mobile menu on route change
watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-md">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
      <!-- Brand -->
      <NuxtLink
        :to="localePath('/')"
        class="group flex items-center gap-2.5 rounded-md"
        :aria-label="t('site.name')"
      >
        <BrandMark :size="34" animated />
        <span class="font-display text-lg font-semibold leading-none tracking-tight">
          Plastic<span class="text-teal">Protocols</span>
        </span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-1 md:flex" :aria-label="t('nav.menu')">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="relative rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          :class="isActive(item.to) && 'text-ink'"
        >
          {{ item.label }}
          <span
            v-if="isActive(item.to)"
            class="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-teal"
          />
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-1.5">
        <LangSwitcher />

        <!-- Mobile toggle -->
        <button
          type="button"
          class="-mr-1 inline-flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
          :aria-expanded="open"
          :aria-label="open ? t('nav.close') : t('nav.menu')"
          @click="open = !open"
        >
          <Icon :name="open ? 'lucide:x' : 'lucide:menu'" :size="22" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="open"
        class="border-t border-line bg-paper md:hidden"
        :aria-label="t('nav.menu')"
      >
        <ul class="mx-auto max-w-6xl px-5 py-3 sm:px-8">
          <li v-for="item in nav" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="block rounded-md px-2 py-3 text-base font-medium text-ink-soft transition-colors hover:text-ink"
              :class="isActive(item.to) && 'text-teal'"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>
