import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pages: [
      {text: 'Index', link: '/index'},
      {text: 'Today\'s Topic', link: '/today'},
      {text: 'Chat', link: '/chat'}
    ],
    user: null,
    isAuth: false,
    userObj: null
  },
  mutations: {
    userInfo (state, data) {
      state.user = data
    },
    isAuth (state, data) {
      state.isAuth = data
    },
    userObj (state, data) {
      state.userObj = data
    }
  },
  actions: {
  },
  getters: {
    getPageList (state) {
      return state.pages
    },
    getUserInfo (state) {
      return state.user
    },
    getAuthStatus (state) {
      return state.isAuth
    },
    getUserObj (state) {
      return state.userObj
    }
  }
})
