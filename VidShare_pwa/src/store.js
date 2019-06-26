import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from './firebase/init'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // valid user
    loggedInUser: null,
  },
  mutations: {

  },
  actions: {

  }
})
