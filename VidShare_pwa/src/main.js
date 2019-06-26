import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './registerServiceWorker'
import swal from 'sweetalert2'
//importing animate on scroll lib here
import AOS from 'aos'
import "aos/dist/aos.css"
//videojs
import "video.js/dist/video-js.min.css";
//sweetalert
import 'sweetalert2/src/sweetalert2.scss'
//vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

window.swal = swal;
Vue.config.productionTip = false

new Vue({
  // initiated Animation on scroll here
  beforeCreate() {
    AOS.init()
  },
  mounted() {
    window.addEventListener('load', AOS.refresh)
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
