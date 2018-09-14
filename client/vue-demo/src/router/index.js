import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/admin/Dashboard'
import Project from '@/components/admin/Project'
import Tracks from '@/components/admin/Tracks'
import Admin from '@/components/admin/Index'
import Home from '@/components/Home'
import Login from '@/components/Login'
import {auth} from './../../middleware/auth'
Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: auth,

    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEach: auth,
      children:[
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'project',
          name: 'Project',
          component: Project,
        },
        {
          path: 'tracks',
          name: 'Tracks',
          component: Tracks,
        },
      ]
    },
    { path: "*", redirect: '/login' }


  ]
})
