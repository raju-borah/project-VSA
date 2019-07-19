import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home/Home.vue'

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
      path: '/index.html',
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
      path: '/play/:id/playlist/:is',
      name: 'Play',
      props: true,
      component: () => import(/* webpackChunkName: "Play" */ './components/Play/Play.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import(/* webpackChunkName: "Play" */ './components/Profile/Profile.vue')
    },
    {
      path: '/dashboard/playlist/:playlistID',
      name: 'Playlist',
      component: () => import(/* webpackChunkName: "Playlist" */ './components/Dashboard/Playlist.vue')
    },
    {
      path: '/dashboard/playlist/addvideo/:playlistID',
      name: 'AddVideo',
      component: () => import(/* webpackChunkName: "AddVideo" */ './components/Dashboard/AddVideo.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if () {

//     next()
//   } else {

//     next()
//   }
// })