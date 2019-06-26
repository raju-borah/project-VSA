<template>
  <div id="Login" :class="{'showSpinner' : spinner}">
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
        <form class="form form--login u-margin-top-large">
          <!-- home link -->
          <router-link :to="{name: 'Home'}">
            <a class="login__home">
              <i class="fas fa-home"></i>
            </a>
          </router-link>
          <div class="flex-center">
            <!--signin  logo -->
            <img src="../../assets/img/icons/man.png" class="login__logo">
          </div>
          <!-- form heading -->
          <div class="u-margin-bottom-small u-center-text large-font">
            <h1 class="heading_tag">Login</h1>
          </div>

          <!-- creating form group  for every fields-->
          <div class="form__group" :class="{'invalid' : $v.email.$error}">
            <label for="email" class="form__label form__label--login">
              Email
              <span v-if="!$v.email.email">: invalid email</span>
              <span v-if="!$v.email.required && $v.email.$dirty">: must not be empty</span>
            </label>
            <i
              class="fas fa-envelope form__input__login--icons form__input__login--icons--iconuser"
            ></i>
            <input
              type="email"
              id="signin_email"
              class="form__input form__input__login"
              placeholder="Email"
              required
              @blur="$v.email.$touch()"
              v-model="email"
            >
          </div>
          <div class="form__group" :class="{'invalid' : $v.password.$error}">
            <label for="signin_passwd" class="form__label form__label--login">
              Password
              <span
                v-if="$v.password.$invalid && $v.password.$dirty"
              >: atleaast 6char length</span>
            </label>
            <i class="fas fa-lock form__input__login--icons form__input__login--icons--iconlock"></i>
            <input
              type="password"
              id="signin_passwd"
              class="form__input form__input__login"
              placeholder="Enter Password"
              required
              @blur="$v.password.$touch()"
              v-model="password"
            >
          </div>
          <div class="u-center-text">
            <!-- login button -->
            <button
              class="btn btn--green btn--green--login"
              id="signin"
              @click.prevent="login($v.$invalid)"
            >Login</button>
          </div>
          <div class="u-center-text">
            <!-- create button -->
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
import { required, email, minLength } from "vuelidate/lib/validators";
import { FulfillingBouncingCircleSpinner } from "epic-spinners";

import db from "../../firebase/init";
export default {
  name: "Login",
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
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLen: minLength(6)
    }
  },
  // watch: {
  //   showErrPass: {
  //     handler: function(state) {
  //       if (state) {
  //         swal.fire({
  //           type: "error",
  //           title: "Oops...",
  //           text: "Invalid Email or Password"
  //         });
  //         this.$store.state.errLogin = false;
  //       }
  //     }
  //   },
  //   showErrNotVerified: {
  //     handler: function(state) {
  //       if (state) {
  //         swal.fire({
  //           type: "error",
  //           title: "Oops...",
  //           text: "Email is not verified, please verify it!"
  //         });
  //         this.$store.state.errNotVerified = false;
  //       }
  //     }
  //   }
  // },
  // computed: {
  //   showErrPass() {
  //     return this.$store.state.errLogin;
  //   },
  //   showErrNotVerified() {
  //     return this.$store.state.errNotVerified;
  //   }
  // },
  methods: {
    login(state) {
      if (!state) {
        this.spinner = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            this.$store.state.loggedInUser = user.user;
            if (user.user.emailVerified) {
              db.collection("validuser")
                .where("email", "==", this.email)
                .get()
                .then(querySnapshot => {
                  if (querySnapshot.docs[0].data().active === false) {
                    querySnapshot.docs[0].ref.update({ active: true });
                  }
                })
                .then(() => {
                  this.spinner = false;
                  this.$router.push({ name: "Home" });
                })
                .catch(err => {
                  this.spinner = false;
                  swal.fire({
                    type: "error",
                    title: "Oops..",
                    text: err.message
                  });
                  console.error(err);
                });
            } else {
              this.spinner = false;
              swal.fire({
                type: "error",
                title: "Oops...",
                text: "Email is not verified, please verify it!"
              });
            }
          })
          .catch(err => {
            this.spinner = false;
            swal.fire({
              type: "error",
              title: "Oops...",
              text: "Invalid Email or Password"
            });
            console.error(err);
          });
      } else {
        swal.fire({
          type: "warning",
          text: "Invalid form inputs!"
        });
      }
    }
  }
};
</script>



