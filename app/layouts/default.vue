<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a href="#main" class="skip-link">{{ t('nav.skip') }}</a>
    <AppHeader />
    <main id="main" tabindex="-1" class="flex-1 focus:outline-none">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
