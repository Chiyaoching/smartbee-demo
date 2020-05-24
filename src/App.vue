<template lang="pug">
  v-app
    Header
    v-content
      router-view 
    Footer
</template>

<script>
import Header from '@/views/layout/Header'
import Footer from '@/views/layout/Footer'

export default {
  name: 'App',
  data: () => ({
  }),
  components: {
    Header,
    Footer
  },
  mounted () {
  },
  computed: {
  }
};
</script>

<style lang="sass">
</style>
