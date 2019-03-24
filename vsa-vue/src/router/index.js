// import vue
import Vue from 'vue'
import Router from 'vue-router'

//import components
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
