import { Configuration } from '@nuxt/types'

const config: Configuration = {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /**
   * Source directory
   */
  srcDir: 'src/',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /**
   * Axios config
   */
  axios: {
    baseURL: '/',
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['ant-design-vue/dist/antd.css', '~/assets/css/global.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/antd-ui',
    '~/plugins/global-components.js',
    '~/plugins/composition-api.js',
    '~/plugins/lodash.js',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    // '@nuxtjs/pwa',
    [
      'nuxt-i18n',
      {
        strategy: 'no_prefix',
        locales: [
          {
            code: 'vi',
            iso: 'vi-JP',
            name: 'Vietnam',
            file: 'vi-VN.js',
          },
          {
            code: 'en',
            iso: 'en-US',
            name: 'English',
            file: 'en-US.js',
          },
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'vi',
        vueI18n: {
          fallbackLocale: 'vi',
          formatFallbackMessages: true,
        },
        // vueI18nLoader: true
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
        },
      },
    ],
  ],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  /**
   * Typescript eslint
   */
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
      },
    },
  },
  // pwa: {},
}

export default config
