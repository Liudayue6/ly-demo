import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Login from '../views/Login/index.vue'


Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    meta: {
      isLogin: true
    },
    children: []
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
