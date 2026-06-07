import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  site: {
    url: 'https://plasticprotocols.com',
    name: 'Plastic Protocols',
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0c6f78' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    baseUrl: 'https://plasticprotocols.com',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json', dir: 'ltr' },
      { code: 'nl', language: 'nl-NL', name: 'Nederlands', file: 'nl.json', dir: 'ltr' },
      { code: 'ar', language: 'ar', name: 'العربية', file: 'ar.json', dir: 'rtl' },
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json', dir: 'ltr' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json', dir: 'ltr' },
      { code: 'hi', language: 'hi-IN', name: 'हिन्दी', file: 'hi.json', dir: 'ltr' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json', dir: 'ltr' },
      { code: 'th', language: 'th', name: 'ไทย', file: 'th.json', dir: 'ltr' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'pp_lang',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
  },

  fonts: {
    families: [
      { name: 'Fraunces', provider: 'google' },
      { name: 'Hanken Grotesk', provider: 'google' },
      { name: 'Spline Sans Mono', provider: 'google' },
    ],
  },

  image: {
    format: ['avif', 'webp'],
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 },
  },

  icon: {
    serverBundle: { collections: ['lucide'] },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      // Seed every locale root so all language trees prerender even if link
      // discovery changes; crawlLinks then follows into each localized page.
      routes: ['/', '/nl', '/ar', '/zh', '/fr', '/hi', '/es', '/th'],
    },
  },
})
