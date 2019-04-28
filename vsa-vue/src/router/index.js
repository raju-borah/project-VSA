
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


import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // Home page
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true,
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
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    // Play Page
    // will add uid of the video to play in this path
    {
      path: '/play/:id',
      name: 'Play',
      component: Play,
      props: true,
      
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
      component: Setting,
      meta: {
        requiresAuth: true
      }
    },
    // for rest not registered path show page not found
    {
      name: 'PageNotFound',
      path: '/pagenotfound',
      component: PageNotFound
    },
    {
      path: '*',
      redirect: 'PageNotFound'
    },
  ]
})

// router guards
router.beforeEach((to, from, next) => {
  // check to see if route has auth guard
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    // let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in. Proceed to route
        next()
      } else {
        // No user is signed in. Redirect to login
        next({
          name: 'Home'
        })
      }
    })

  } else {
    // if route is not guarded by auth, proceed
    next()
  }
})

export default router