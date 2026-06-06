<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('checkPage.title')} · ${t('site.name')}`,
  description: () => t('checkPage.lead'),
})
</script>

<template>
  <div class="relative overflow-hidden">
    <ParticleField />
    <SelfCheck />
  </div>
</template>
