<template>
  <div>
    This is About Page!
    <Button type="primary">主要按钮</Button>
  </div>
</template>

<script>
import { Button } from "element-ui";

export default {
  components: {
    Button
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
