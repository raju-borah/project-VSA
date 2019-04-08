import Vue from 'vue'
import App from './App'
import router from './router'
//importing animate on scroll lib here
import AOS from 'aos'
import "aos/dist/aos.css"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  created(){
    AOS.init()
  },
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
