/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Login from '@/components/Authentication/Login'
import Signup from '@/components/Authentication/Signup'
import Forget from '@/components/Authentication/Forget'
import Dashboard from '@/components/Dashboard/Dashboard'
import PageNotFound from '@/components/404/PageNotFound'
import Play from '@/components/Play/Play'
import More from '@/components/More/More'
import Setting from '@/components/Setting/Setting'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // Home page
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    // Login page
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // Signup 
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    // ForgetPassword 
    {
      path: '/forgetpassword',
      name: 'Forget',
      component: Forget
    },
    // Dashboard Page
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    // Play Page
    {
      path: '/play',
      name: 'Play',
      component: Play
    },   
     // More Page
    {
      path: '/more',
      name: 'More',
      component: More
    },
    // Setting Page
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },

    // for rest not registered path show page not found
    { 
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound 
    }
  ]
})
