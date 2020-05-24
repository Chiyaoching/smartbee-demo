import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pages: [
      {text: 'Index', link: '/'},
      {text: 'Today\'s Topic', link: '/today'},
      {text: 'Chat', link: '/chat'}
    ]
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getPageList (state) {
      return state.pages
    },
  }
})
