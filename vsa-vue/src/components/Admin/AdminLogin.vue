<template>
  <div id="AdminLogin" :class="{'showBg' : spinner}">
    <div v-if="spinner">
      <fulfilling-bouncing-circle-spinner
        :animation-duration="4000"
        :size="100"
        :color="'#FFFFFF'"
      />
    </div>
    <div class="login" v-else>
      <div class="login__container">
        <!-- Login form -->
        <form class="form form--login">
          <!-- home link -->
          <router-link :to="{name: 'Home'}">
            <a class="login__home">
              <i class="fas fa-home"></i>
            </a>
          </router-link>
          <!--signin  logo -->
          <img src="../../assets/img/icons/man.png" class="login__logo">
          <!-- form heading -->
          <div class="u-margin-bottom-small u-margin-top-large u-center-text large-font">
            <h1 class="heading_tag">Admin Login</h1>
          </div>

          <!-- creating form group  for every fields-->
          <div class="form__group">
            <label for="email" class="form__label form__label--login">Email</label>
            <i
              class="fas fa-envelope form__input__login--icons form__input__login--icons--iconuser"
            ></i>
            <input
              type="email"
              id="signin_email"
              class="form__input form__input__login"
              placeholder="Email"
              required
              v-model="email"
            >
          </div>
          <div class="form__group">
            <label for="signin_passwd" class="form__label form__label--login">Password</label>
            <i class="fas fa-lock form__input__login--icons form__input__login--icons--iconlock"></i>
            <input
              type="password"
              id="signin_passwd"
              class="form__input form__input__login"
              placeholder="Enter Password"
              required
              v-model="password"
            >
          </div>
          <div class="u-center-text">
            <!-- login button -->
            <button
              class="btn btn--green btn--green--login"
              id="signin"
              @click.prevent="login"
            >Login</button>
          </div>
          <div class="u-center-text">
            <!-- forget button -->
            <router-link :to="{name: 'Forget'}">
              <a class="btn btn--white" id="forget_password">Forget Password</a>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { functions } from "@/firebase/init";
import firebase from "firebase";
import { FulfillingBouncingCircleSpinner } from "epic-spinners";

export default {
  name: "AdminLogin",
  components: {
    FulfillingBouncingCircleSpinner
  },
  data() {
    return {
      email: null,
      password: null,
      spinner: false
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.spinner = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            this.email = null;
            this.password = null;
            this.spinner = false;
            this.$router.push({ name: "AdminPanel" });
          })
          .catch(error => {
            this.spinner = false;
            console.log(error);
          });
        // });
      } else {
        alert("Empty Field");
      }
    }
  }
};
</script>
<style scoped>
.showBg {
  background-color: #5643fa;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

