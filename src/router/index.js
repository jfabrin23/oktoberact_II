import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Admin from '@/pages/Admin'
import Login from '@/pages/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '*',
      component: Home
    }
  ]
})
