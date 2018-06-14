importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-org",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.7f81a39fdd76449ced53.js",
    "revision": "1c98f7acc667d47e885a46c5edb4cd3e"
  },
  {
    "url": "/_nuxt/layouts_default.accfa9df2ad9e130b741.js",
    "revision": "844eb9ac10fdcee51ebbc3c239aa0c7c"
  },
  {
    "url": "/_nuxt/manifest.51182ebc26030043721d.js",
    "revision": "e34efc3d19029955ea2dbec343c3d30d"
  },
  {
    "url": "/_nuxt/pages_about.3975c23ebd0164792bc7.js",
    "revision": "bb24a68deba47dcd6e02335172934c00"
  },
  {
    "url": "/_nuxt/pages_index.7997e37399fb0a65fbab.js",
    "revision": "eb43440fc5f241ed9e8a4713cc4ad614"
  },
  {
    "url": "/_nuxt/vendor.9296e850b3358d3cbdee.js",
    "revision": "60b65aa86eda3615eaf507c2ad2c6d46"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

