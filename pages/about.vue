<template>
  <div>
    <p>Hi from {{ name }}</p>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  asyncData() {
    return {
      name: process.static ? 'static' : (process.server ? 'server' : 'client')
    }
  },
  data () {
    return {
      title: 'About - Nuxt.org'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'About of Nuxt.org' }
      ]
    }
  }
};
</script>

<style lang="less">

</style>
