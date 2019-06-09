
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
import Search from '@/components/Search/Search'
import AdminLogin from '@/components/Admin/AdminLogin'
import AdminPanel from '@/components/Admin/AdminPanel'

import { store } from '@/Store/Store'
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
      path: '/more/:id',
      name: 'More',
      component: More,
      props: true,
    },
    // search page
    {
      path: '/search/:id',
      name: 'Search',
      component: Search,
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.id.trim() === "") {
          next(false);
        }
        else {
          next();
        }
      }

    },
    // Setting Page
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        requiresAuth: true,
      }
    },
    // Admin Login
    {
      path: '/coradmin',
      name: 'AdminLogin',
      component: AdminLogin,
    },

    // Admin panel 
    {
      path: '/coradmin/panel',
      name: 'AdminPanel',
      component: AdminPanel,
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
  // for admin login 
  if (to.name === 'AdminLogin') {
    alert('If any upload is active it will be canceled!')
    firebase.auth().signOut();
    next()
  }
  else if (to.name === 'AdminPanel') {
    if (to.matched.some(rec => rec.meta.requiresAuth)) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
            .auth()
            .currentUser.getIdTokenResult()
            .then(idTokenResult => {
              // Confirm the user is an Admin.
              if (!!idTokenResult.claims.admin) {
                next()
              } else {
                next({
                  name: 'AdminLogin'
                })
              }
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          next({
            name: 'PageNotFound'
          })
        }
      })
    }
  }

  // check to see if route has auth guard
  else if (to.matched.some(rec => rec.meta.requiresAuth)) {
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