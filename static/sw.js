importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-org",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.b85084679d763eabfb6c.js",
    "revision": "8ebb42736961f3dbad19b3d145b58486"
  },
  {
    "url": "/_nuxt/layouts_default.accfa9df2ad9e130b741.js",
    "revision": "844eb9ac10fdcee51ebbc3c239aa0c7c"
  },
  {
    "url": "/_nuxt/manifest.3ba8a37c8482f91f7f4d.js",
    "revision": "cf6cc3eb3135a276dc587258e23a7c98"
  },
  {
    "url": "/_nuxt/pages_about.3975c23ebd0164792bc7.js",
    "revision": "bb24a68deba47dcd6e02335172934c00"
  },
  {
    "url": "/_nuxt/pages_index.71d0c38171883717c3bb.js",
    "revision": "25af37540cfb86d5ac858f0ffebe6e0d"
  },
  {
    "url": "/_nuxt/vendor.9296e850b3358d3cbdee.js",
    "revision": "60b65aa86eda3615eaf507c2ad2c6d46"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

