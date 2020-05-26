import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Index.vue'
import Index from '../views/Index.vue'
import Today from '../views/Today.vue'
import ChatList from '../views/chat/Index.vue'
import Chat from '../views/chat/Chat.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/index'
    // meta: {auth: true}
  },
  {
    path: '/index',
    component: Index,
    meta: {auth: true}
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {auth: false}
  },
  {
    path: '/today',
    component: Today,
    meta: {auth: true}
  },
  {
    path: '/chat',
    component: ChatList,
    meta: {auth: true}
  },
  {
    path: '/chat/:roomId',
    component: Chat,
    meta: {auth: true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
