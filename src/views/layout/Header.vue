<template lang="pug">
  v-app-bar(app)
    v-avatar
      v-img(:src="require('@/assets/img/smartbee.png')")
    v-tabs
      v-tab(v-for="item in pages" :key="item.link" link :to="item.link") {{item.text}}
    v-spacer
    v-btn(icon @click="logout" )
      v-icon logout
      
    v-avatar(color="primary")
      span(class="black--text") {{userInfo && userInfo.name}}
</template>

<script>
import firebase from 'firebase/app'

export default {
  props: {
  },
  data: () => ({
  }),
  computed: {
    pages () {
      return this.$store.getters.getPageList
    },
    userInfo () {
      return this.$store.getters.getUserObj
    },
    
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function() {
        // An error happened.
      });
    }
  }
}
</script>