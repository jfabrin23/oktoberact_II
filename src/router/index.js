import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Admin from '@/pages/Admin'
import Inscricao from '@/pages/Inscricao'
import Emergencia from '@/pages/Emergencia'
import Usuario from '@/pages/Usuario'
import Financeiro from '@/pages/Financeiro'

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
      path: '/inscricao',
      name: 'Inscricao',
      component: Inscricao
    },
    {
      path: '/emergencia',
      name: 'Emergencia',
      component: Emergencia
    },
    {
      path: '/usuario',
      name: 'Usuario',
      component: Usuario
    },
    {
      path: '/financeiro',
      name: 'Financeiro',
      component: Financeiro
    },
    {
      path: '*',
      component: Home
    }
  ]
})
