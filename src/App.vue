<template lang="pug">
  v-app
    template(v-if="user && userObj")
      Header
      v-content
        router-view
      Footer
    template(v-else-if="$route.path !== '/login'")
      v-content
        v-container(fill-height)
          v-row(justify="center" align="center")
            v-progress-circular(:size="150" width="7" color="amber" indeterminate)
    template(v-else)
      v-content
        router-view
</template>

<script>
import Header from '@/views/layout/Header'
import Footer from '@/views/layout/Footer'
import {fApp, db} from '@/plugins/firebase'
const fAuth = fApp.auth()

export default {
  name: 'App',
  data: () => ({
    user: null,
    userObj: null
  }),
  components: {
    Header,
    Footer
  },
  mounted () {
    fAuth.onAuthStateChanged(user => {
      if (user) {
        this.user = user
        db.collection("Users")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().userId === user.uid) {
                this.userObj = doc.data()
                this.$store.commit('userObj', doc.data())
              }
            })
        })
        this.$store.commit('userInfo', user)
        this.$store.commit('isAuth', true)
      } else {
        this.user = null
        this.$store.commit('userInfo', null)
        this.$store.commit('userObj', null)
        this.$store.commit('isAuth', false)
        if (this.$route.path !== '/login') {
          this.$router.push('/login')
        }
      }
    })
  },
  computed: {
    isAuth () {
      return this.$store.getters.getAuthStatus
    },
    userInfo () {
      return this.$store.getters.getUserInfo
    }
  },
  watch: {
    '$route.path' (value) {
      if (value === '/login' && this.isAuth) {
        this.$router.push('/index')
      }
    }
  }
};
</script>

<style lang="sass">
</style>
