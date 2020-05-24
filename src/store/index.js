import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roles: [
      {text: 'Index', link: '/'},
      {text: 'Today\'s Topic', link: '/today'},
      {text: 'Chat', link: '/chat'}
    ],
    role: {text: 'Chat', link: '/chat'},
    headerText: ''
  },
  mutations: {
    SET_CURRENT_ROLE (state, role) {
      state.role = role
    },
    SET_HEADER_TEXT (state, data) {
      state.headerText = data
    },
  },
  actions: {
  },
  getters: {
    getRoleList (state) {
      return state.roles
    },
    getCurrentRole (state) {
      return state.role
    },
    getHeaderText (state) {
      return state.headerText
    },
  }
})
