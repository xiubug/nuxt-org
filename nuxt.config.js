const opn = require('opn');

module.exports = {
  hooks: {
    listen(server, { host, port }) {
      opn(`http://${host}:${port}`)
    }
  },
  dev: (process.env.NODE_ENV !== 'production'),
  render: {
    bundleRenderer: {
      cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15
      }),
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '一套基于 Vue.js 的高质量 UI 组件库 - Weich',
    meta: [
      { charset: 'utf-8' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'format-detection', content: 'telephone=no' },
      { "http-equiv": 'cleartype', content: 'on'  },
      { "http-equiv": 'X-UA-Compatible', content: 'ie=edge' },
      { name: 'referrer', content: 'always'},
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { hid: 'keywords', name: 'keywords', content:  'Zant,Zanm,UI组件' },
      { hid: 'description', name: 'description', content: 'Zant,Zanm,一套基于 Vue.js 的高质量 UI 组件库' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: '~/components/loading.vue',
  /*
  ** Build configuration
  */
  build: {
    vender:[
      'element-ui',
      'big.js'
    ],
    babel: {
      "plugins": [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    '~assets/style/main.css',
    'element-ui/lib/theme-chalk/index.css'
  ],
  plugins: [{
    src: '~/plugins/element-ui'
  }],
  modules: [
    "@nuxtjs/pwa"
  ]
}
