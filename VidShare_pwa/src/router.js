import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home/Home.vue'
import { store } from './store'
Vue.use(Router)

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "Login" */ './components/Authentication/Login.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import(/* webpackChunkName: "Signup" */ './components/Authentication/Signup.vue')
    },
    {
      path: '/forget',
      name: 'Forget',
      component: () => import(/* webpackChunkName: "Forget" */ './components/Authentication/Forget.vue')
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import(/* webpackChunkName: "Account" */ './components/Account/Account.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "Account" */ './components/Dashboard/Dashboard.vue')
    },
    {
      path: '/play',
      name: 'Play',
      component: () => import(/* webpackChunkName: "Play" */ './components/Play/Play.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import(/* webpackChunkName: "Play" */ './components/Profile/Profile.vue')
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   if () {

//     next()
//   } else {

//     next()
//   }
// })