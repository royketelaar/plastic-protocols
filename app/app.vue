<script setup lang="ts">
// Per-locale <html lang>/<dir>, hreflang alternates and og:locale via i18n.
const head = useLocaleHead()

useHead(() => ({
  htmlAttrs: {
    lang: head.value.htmlAttrs?.lang,
    dir: head.value.htmlAttrs?.dir as 'ltr' | 'rtl' | 'auto' | undefined,
  },
  link: head.value.link,
  meta: head.value.meta,
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
