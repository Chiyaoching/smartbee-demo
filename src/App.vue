<template lang="pug">
  v-app
    Drawer(:drawerFlag.sync="drawerObj.model")
    Header(:drawerFlag.sync="drawerObj.model")

    v-content
      router-view 
    Footer
</template>

<script>
import Header from '@/views/layout/Header'
import Drawer from '@/views/layout/Drawer'
import Footer from '@/views/layout/Footer'

export default {
  name: 'App',
  data: () => ({
    drawerObj: {
      model: null
    }
  }),
  components: {
    Header,
    Drawer,
    Footer
  },
  mounted () {
    console.log(window.firestore)
    this.$store.commit('SET_CURRENT_ROLE', this.roles.find(role => role.link === this.$route.path))
  },
  computed: {
    roles () {
      return this.$store.getters.getRoleList
    },
  }
};
</script>
