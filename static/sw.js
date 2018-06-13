importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-org",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.a56edf6386c6e37ed698.js",
    "revision": "dda75655e8586485beaa141ca6e6836c"
  },
  {
    "url": "/_nuxt/layouts_default.accfa9df2ad9e130b741.js",
    "revision": "844eb9ac10fdcee51ebbc3c239aa0c7c"
  },
  {
    "url": "/_nuxt/manifest.e4942bc462cc53466ca9.js",
    "revision": "855e563be278fd5cb380dd21e64adb3f"
  },
  {
    "url": "/_nuxt/pages_about.a5c631d93d7358f3ded7.js",
    "revision": "20492a48f4d03017ce41a4f59fd08b65"
  },
  {
    "url": "/_nuxt/pages_index.254543bc6f988ec84d1f.js",
    "revision": "3b3f381e247a528cba5487ad8f7c5a23"
  },
  {
    "url": "/_nuxt/vendor.3cc6d255577785acacf3.js",
    "revision": "a8552717b3ecfe3f138ed4b7dd21f207"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

