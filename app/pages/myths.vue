<script setup lang="ts">
const { t, locale } = useI18n()
const { myths } = useCollections()

useSeoMeta({
  title: () => `${t('mythsPage.title')} · ${t('site.name')}`,
  description: () => t('mythsPage.lead'),
})

const { data } = await useAsyncData(
  () => `myths-${locale.value}`,
  () => queryCollection(myths.value).order('order', 'ASC').all().catch(() => []),
  { watch: [locale] },
)
</script>

<template>
  <div>
    <PageHeader :kicker="t('nav.myths')" :title="t('mythsPage.title')" :lead="t('mythsPage.lead')" tinted />

    <div class="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <p class="mb-8 flex gap-2.5 rounded-2xl border border-line bg-paper-2/40 p-5 text-sm leading-relaxed text-ink-soft">
        <Icon name="lucide:info" :size="18" class="mt-0.5 shrink-0 text-teal" aria-hidden="true" />
        {{ t('mythsPage.intro') }}
      </p>

      <div class="space-y-6">
        <MythCard v-for="m in data ?? []" :key="m.path" :myth="m" />
      </div>
    </div>
  </div>
</template>
