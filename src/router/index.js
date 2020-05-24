import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Today from '../views/Today.vue'
import ChatList from '../views/chat/Index.vue'
import Chat from '../views/chat/Chat.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/today',
    component: Today
  },
  {
    path: '/chat',
    component: ChatList
  },
  {
    path: '/chat/:roomId',
    component: Chat
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
