import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    // {
    // path: '/about',
    // name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
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
    }
  ]
})
