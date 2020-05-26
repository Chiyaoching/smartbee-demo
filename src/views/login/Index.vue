<template lang="pug">
  v-container(fill-height)
    v-row(align="center" justify="center")
      v-col(cols="auto")
        v-card(width="500")
          v-card-title.justify-center Login
          v-card-text
            v-text-field(label="email" v-model="email")
            v-text-field(type="password" label="password" v-model="password")
          v-card-actions
            v-spacer
            v-btn( @click="Login" ) Login
    
    v-snackbar(v-model="snackbar")
      span.red--text {{error}}
              
            
    
</template>

<script>
import firebase from 'firebase/app'

export default {
  data: () => ({
    email: '',
    password: '',
    error: '',
    snackbar: false
  }),
  computed: {
    userInfo () {
      return this.$store.getters.getUserInfo
    }
  },
  methods: {
    async Login () {
      try {
        await firebase.auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .catch((error) => {
            throw new Error(error)
          })
        this.$store.commit('isAuth', true)
        this.$router.push('/index')
        this.error = ''
      } catch (error) {
        console.error(error.message)
        this.snackbar = true
        this.error = error.message
        this.$store.commit('isAuth', false)
      }
    }
  },
  watch: {
    'userInfo' (value) {
      if (value) {
        this.$router.push('/index')
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>