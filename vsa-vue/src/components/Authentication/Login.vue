<template>
  <div id="Login" :class="{'showBg' : spinner}">
    <!--  :class="{'showSpinBg' : spinner}" -->
    <div v-if="spinner">
      <fulfilling-bouncing-circle-spinner
        :animation-duration="4000"
        :size="100"
        :color="'#FFFFFF'"
      />
    </div>
    <!-- Creating Login Section -->
    <div class="login" id="login" v-else>
      <div class="login__container">
        <!-- Login form -->
        <form class="form form--login">
          <!-- home link -->
          <!-- router link required here -->
          <router-link :to="{name: 'Home'}">
            <a class="login__home">
              <i class="fas fa-home"></i>
            </a>
          </router-link>

          <!--signin  logo -->
          <img src="../../assets/img/icons/man.png" class="login__logo">
          <!-- form heading -->
          <div class="u-margin-bottom-small u-margin-top-large u-center-text large-font">
            <h1 class="heading_tag">Login</h1>
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
            <button class="btn btn--green btn--green--login" id="signin" @click="login">Login</button>
          </div>
          <div class="u-center-text">
            <!-- create button -->
            <!-- router link required here -->
            <router-link :to="{name: 'Signup'}">
              <a class="btn btn--white" id="create_account">Create Account</a>
            </router-link>
            <span class="font-small">|</span>
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
import firebase from "firebase";
import db from "@/firebase/init";
import { FulfillingBouncingCircleSpinner } from "epic-spinners";

export default {
  name: "Login",
  components: {
    FulfillingBouncingCircleSpinner
  },
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      user: null,
      spinner: false
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.feedback = null;
        this.spinner = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            if (user.user.emailVerified) {
              // retrive the existing user
              if (firebase.auth().currentUser) {
                this.user = firebase.auth().currentUser;
              } else {
                firebase.auth().onAuthStateChanged(user => {
                  if (user) {
                    this.user = user;
                  } else {
                    this.user = null;
                  }
                });
              }
              // in case logged in happen or logout

              let ref = db.collection("validuser");
              ref = ref.where("active", "==", false);
              ref = ref
                .where("email", "==", this.email)
                .get()
                .then(querySnapshot => {
                  if (querySnapshot.docs.length > 0) {
                    querySnapshot.docs[0].ref.update({ active: true });
                  }
                  this.spinner = false;
                  this.$router.push({
                    name: "Home",
                    params: { user: this.user }
                  });
                });
            } else {
              this.spinner = false;
              firebase.auth().signOut();
              alert("email not verified");
            }
          })
          // .then()
          .catch(err => {
            this.spinner = false;
            if (err.code === "auth/user-not-found")
              alert("Email not verified or User does not exist!");
            else if (err.code === "auth/invalid-email") alert("Bad email");
            else alert("" + err.message);
          });
      } else {
        alert("Please fill in both fields");
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
