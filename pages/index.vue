<template>
  <div>
    <h1>Welcome!Cached components</h1>
    <p>Look at the source code and see how the timestamp is not reloaded before 10s after refreshing the page.</p>
    <p>Timestamp: {{ date }}</p>
    <nuxt-link to="/about">About page</nuxt-link>
  </div>
</template>

<script>
// import AppLogo from "~/components/AppLogo.vue";

export default {
  name: 'home',
  // components: {
  //   AppLogo
  // },
  serverCacheKey() {
    // Will change every 10 secondes
    return Math.floor(Date.now() / 10000);
  },
  data () {
    return {
      title: 'Index - Nuxt.org',
      date: Date.now()
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'Index of Nuxt.org' }
      ]
    }
  }
};
</script>

<style lang="less">
</style>
