/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './Store/Store'

//importing animate on scroll lib here
import AOS from 'aos'
import "aos/dist/aos.css"
Vue.config.productionTip = false
import "video.js/dist/video-js.min.css";

/* eslint-disable no-new */
new Vue({
  // initiated Animation on scroll here
  beforeCreate() {
    AOS.init()
  },
  mounted() {
    window.addEventListener('load', AOS.refresh)
  },
  // store property will set the vuex store 
  store: store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
