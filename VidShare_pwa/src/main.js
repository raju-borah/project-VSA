import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from './store'

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
import firebase from 'firebase'
// import firestore from 'firebase/firestore'
var config = {
  apiKey: "AIzaSyDZEum6Pbyp1fl3-OYeqnEs3zVyM0YFg6E",
  authDomain: "thevsapp.firebaseapp.com",
  databaseURL: "https://thevsapp.firebaseio.com",
  projectId: "thevsapp",
  storageBucket: "thevsapp.appspot.com",
  messagingSenderId: "182971808770"
};
const firebaseApp = firebase.initializeApp(config);
export default firebaseApp.firestore()
let functions = firebaseApp.functions()
export { functions }


let app
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      // initiated Animation on scroll here
      beforeCreate() {
        AOS.init()
        if (user) {
          store.state.loggedInUser = user
        }
        else {
          store.state.loggedInUser = null
        }
      },
      mounted() {
        window.addEventListener('load', AOS.refresh)
      },
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});