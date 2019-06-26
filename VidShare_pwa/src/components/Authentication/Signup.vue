<template>
  <div id="Signup" :class="{'showSpinner' : spinner}">
    <div class="showSpinBg" v-if="spinner">
      <fingerprint-spinner :animation-duration="1500" :size="100" :color="'#FFFFFF'"/>
    </div>
    <div class="signup" v-else>
      <div class="signup__container">
        <!-- signup form section -->
        <form class="form form--signup" id="myForm">
          <!-- home link -->
          <router-link :to="{name: 'Home'}">
            <a class="login__home">
              <i class="fas fa-home"></i>
            </a>
          </router-link>
          <!-- form heading -->
          <div class="u-center-text">
            <h1 class="heading_tag">SIGN UP</h1>
          </div>
          <!-- creating form group for every fields -->
          <div class="form__group" :class="{ 'invalid': $v.firstName.$error}">
            <label for="singup_firstname" class="form__label">
              FirstName
              <span
                v-if="!$v.firstName.required && $v.firstName.$dirty"
              >: must not be empty</span>
            </label>
            <input
              type="text"
              id="singup_firstname"
              class="form__input form__input__signup"
              placeholder="FirstName"
              required="true"
              @blur="$v.firstName.$touch()"
              v-model.trim="firstName"
            >
          </div>
          <div class="form__group" :class="{'invalid' : $v.lastName.$error}">
            <label for="signup_lastname" class="form__label">
              LastName
              <span v-if="!$v.lastName.required && $v.lastName.$dirty">: must not be empty</span>
            </label>
            <input
              type="text"
              id="signup_lastname"
              class="form__input form__input__signup"
              placeholder="LastName"
              required
              @blur="$v.lastName.$touch()"
              v-model.trim="lastName"
            >
          </div>
          <div class="form__group" :class="{'invalid': $v.email.$error}">
            <label for="signup_email" class="form__label">
              E-mail
              <span v-if="!$v.email.unique">: already used or not valid</span>
              <span v-if="!$v.email.required && $v.email.$dirty">: must not be empty</span>
            </label>
            <input
              type="email"
              id="signup_email"
              class="form__input form__input__signup"
              placeholder="E-mail"
              required
              v-model.trim="email"
              @blur="$v.email.$touch()"
            >
          </div>
          <div class="form__group" :class="{'invalid' : $v.password.$error}">
            <label for="signup_passwd" class="form__label">
              Password
              <!-- <span v-if="!$v.password.required && $v.password.$dirty">: must not be empty</span> -->
              <span v-if="$v.password.$invalid && $v.password.$dirty">: atleaast 6char length</span>
            </label>
            <input
              type="password"
              id="signup_passwd"
              class="form__input form__input__signup"
              placeholder="Enter Password"
              required
              @blur="$v.password.$touch()"
              v-model="password"
            >
          </div>
          <div class="form__group" :class="{'invalid' : $v.confirmPassword.$error}">
            <label for="signup_confirm_passwd" class="form__label">Confirm Password</label>
            <input
              type="password"
              id="signup_confirm_passwd"
              class="form__input form__input__signup"
              placeholder="Re-Enter Password"
              required
              @blur="$v.confirmPassword.$touch()"
              v-model="confirmPassword"
            >
          </div>
          <div class="flex-center">
            <!-- signup button -->
            <button
              class="btn btn--blue"
              id="signup"
              type="submit"
              @click.prevent="signup($v.$invalid)"
            >
              Sign
              Up
              <i class="fas fa-arrow-circle-right"></i>
            </button>
          </div>
          <div class="font-small u-center-text">
            Already a User Click here...
            <router-link :to="{name: 'Login'}">
              <a>Login</a>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../../firebase/init";
import { FingerprintSpinner } from "epic-spinners";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  name: "Signup",
  components: {
    FingerprintSpinner
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      spinner: false
    };
  },
  validations: {
    email: {
      required,
      email,
      unique: val => {
        if (val === "") return true;
        let ref = db.collection("validuser");
        ref = ref.where("active", "==", false);
        ref = ref.where("email", "==", val);
        return ref.get().then(querySnapshot => {
          if (querySnapshot.empty) {
            return false;
          } else {
            return true;
          }
        });
      }
    },
    firstName: {
      required
    },
    lastName: {
      required
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs("password")
    }
  },
  methods: {
    signup(state) {
      if (state) {
        swal.fire({
          type: "error",
          text: "Invalid form input!"
        });
      } else {
        this.spinner = true;
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            user.user.sendEmailVerification().then(() => {
              // as signup will login the user automatically but dont want than
              // untill user is verifired !
              firebase
                .auth()
                .signOut()
                .then(() => {
                  this.$router.push({ name: "Login" });
                  this.spinner = false;
                  swal.fire({
                    type: "success",
                    text:
                      "Please check the link sent to your email to verify your account!"
                  });
                });
            });
          })
          .then(() => {
            let ref = db.collection("validuser");
            ref = ref.where("active", "==", false);
            ref = ref.where("email", "==", this.email);
            ref
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // Build doc ref from doc.id
                  console.log(doc.id);
                  let refDoc = db.collection("validuser").doc(doc.id);
                  refDoc.update({
                    name: this.firstName + " " + this.lastName
                  });
                });
              })
              .then(() => {
                this.vmodalReset();
              });
          })
          .catch(err => {
            this.spinner = false;
            swal.fire({
              type: "error",
              text: err.message
            });
          });
      }
    },
    vmodalReset() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
    }
  }
};
</script>





