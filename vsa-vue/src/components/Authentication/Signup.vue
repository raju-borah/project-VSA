<template>
  <div id="Signup" :class="{'showBg' : spinner}">
    <div class="showSpinBg" v-if="spinner">
      <fingerprint-spinner :animation-duration="1500" :size="100" :color="'#FFFFFF'"/>
    </div>
    <!-- Create Account section  that is hidden at first-->
    <div class="signup" id="signup" v-else>
      <div class="signup__container">
        <!-- signup form section -->
        <form class="form form--signup">
          <!-- home link -->
          <!-- router link required -->
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
          <div class="form__group">
            <label for="singup_firstname" class="form__label">FirstName</label>
            <input
              type="text"
              id="singup_firstname"
              class="form__input form__input__signup"
              placeholder="FirstName"
              required="true"
              v-model="fName"
            >
          </div>
          <div class="form__group">
            <label for="signup_lastname" class="form__label">LastName</label>
            <input
              type="text"
              id="signup_lastname"
              class="form__input form__input__signup"
              placeholder="LastName"
              required
              v-model="lName"
            >
          </div>
          <div class="form__group">
            <label for="signup_email" class="form__label">
              E-mail
              <span style="color:red" v-if="errMsgEmail">{{ errMsgEmail }}</span>
            </label>
            <input
              type="email"
              id="signup_email"
              class="form__input form__input__signup"
              placeholder="E-mail"
              required
              v-model="validEmail"
            >
          </div>
          <div class="form__group">
            <label for="signup_passwd" class="form__label">
              Password
              <span style="color:red" v-if="errMsgPassStren">{{ errMsgPassStren }}</span>
            </label>
            <input
              type="password"
              id="signup_passwd"
              class="form__input form__input__signup"
              placeholder="Enter Password"
              required
              v-model="validPass"
            >
          </div>
          <div class="form__group">
            <label for="signup_confirm_passwd" class="form__label">
              Confirm Password
              <span style="color:red" v-if="errMsgPass">{{ errMsgPass }}</span>
            </label>
            <input
              type="password"
              id="signup_confirm_passwd"
              class="form__input form__input__signup"
              placeholder="Re-Enter Password"
              required
              v-model="validPassConf"
            >
          </div>
          <!-- signup button -->
          <button class="btn btn--blue" id="signup" type="submit" @click.prevent="onSignup">
            Sign
            Up
            <i class="fas fa-arrow-circle-right"></i>
          </button>

          <div class="font-small u-center-text">
            Already a User Click here...
            <router-link :to="{name : 'Login'}">
              <a>Login</a>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import { FingerprintSpinner } from "epic-spinners";
export default {
  name: "Signup",
  components: {
    FingerprintSpinner
  },
  data() {
    return {
      email: null,
      password: null,
      fName: null,
      lName: null,

      confirmPass: null,
      errMsgPass: null,
      errMsgEmail: null,

      errMsgPassStren: null,
      ref: null,
      spinner: false
    };
  },
  computed: {
    validPassConf: {
      get() {
        return this.confirmPass;
      },
      set(newVal) {
        this.confirmPass = newVal;
        this.password !== this.confirmPass
          ? (this.errMsgPass = "Passwords do not match")
          : (this.errMsgPass = null);
      }
    },
    //email validation
    validEmail: {
      get() {
        return this.email;
      },
      set(newVal) {
        this.email = newVal;
        firebase
          .auth()
          .fetchSignInMethodsForEmail(this.email)
          .then(providers => {
            // console.log(providers.length);
            if (providers.length === 0) {
              let ref = db.collection("validuser");
              ref = ref.where("active", "==", false);
              ref = ref.where("email", "==", this.email);
              ref.get().then(querySnapshot => {
                if (!querySnapshot.empty) {
                  //saving ref of newly signup user to update his data
                  this.errMsgEmail = null;
                  // gettin the user id from the query
                } else {
                  this.errMsgEmail = "Email is not valid or already used!";
                }
              });
              this.ref = ref;
            } else {
              this.errMsgEmail = "Email is not valid or already used!";
            }
          });
      }
    },

    validPass: {
      get() {
        return this.password;
      },
      set(newVal) {
        this.password = newVal;
        if (this.password.length >= 6) {
          this.errMsgPassStren = null;
        } else {
          this.errMsgPassStren = "Weak!";
        }
      }
    }
  },

  methods: {
    onSignup() {
      // bacis validation check
      if (
        this.errMsgPass === null &&
        this.errMsgEmail === null &&
        this.errMsgPassStren === null
      ) {
        if (this.fName != null && this.lName != null) {
          // take in email and pass for signup
          this.spinner = true;
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
              user.user.sendEmailVerification().then(
                // as signup will login the user automatically but dont want than
                // untill user is verifired !
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    this.spinner = false;
                    this.$router.push({ name: "Login" });
                  })
              );
            })
            .then(() => {
              this.ref.get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  // Build doc ref from doc.id
                  db.collection("validuser")
                    .doc(doc.id)
                    .update({
                      active: false,
                      email: this.email,
                      name: this.fName + " " + this.lName
                    });
                });
              });
            })
            .catch(err => {
              this.spinner = false;
              this.errMsgPass = err.message;
            });
        } else {
          alert("Form fields are empty!");
        }
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




