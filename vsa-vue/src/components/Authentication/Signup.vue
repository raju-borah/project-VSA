<template>
  <div id="Signup">
    <!-- Create Account section  that is hidden at first-->
    <div class="signup" id="signup">
      <!-- for icon and welcome message -->
      <div class="signup__left">
        <!-- the rocket icon -->
        <img src="../../assets/img/icons/rocket.png" class="signup__left--img" alt>
        <!-- text message -->
        <h3 class="font-small" style="color:white;">Welcome</h3>
        <p class="font-small" style="color:white;">
          Join now to watch
          <br>Fun and Exciting Videos !
        </p>
        <!-- login button -->
        <div class="u-center-text">
          <br>
          <h1>Already a User Click here...</h1>
          <a href="login.html" class="btn btn--upload" id="signin">Login</a>
        </div>
      </div>
      <!-- signup form section -->
      <form action="#" class="signup__form">
        <!-- form heading -->
        <div class="u-margin u-center-text">
          <h1 class="heading_tag">SIGN UP</h1>
        </div>

        <!-- textfields and labels -->
        <div class="signup__form--container">
          <!-- creating form group for every fields -->
          <div class="form__group form__group--signup">
            <label for="singup_firstname" class="form__label">First Name</label>
            <input
              type="text"
              id="singup_firstname"
              class="form__input form__input__signup"
              placeholder="FirstName"
              required="true"
              v-model="fName"
            >
          </div>
          <div class="form__group form__group--signup">
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
          <div class="form__group form__group--signup">
            <label for="signup_email" class="form__label">
              E-mail
              <span v-if="errMsgEmail" style="color:red">({{errMsgEmail}})</span>
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
          <div class="form__group form__group--signup">
            <label for="signup_number" class="form__label">
              Mobile Number
              <span v-if="errMsgMobile" style="color:red">({{errMsgMobile}})</span>
            </label>
            <input
              type="tel"
              id="signup_number"
              class="form__input form__input__signup"
              placeholder="Mobile Number"
              minlength="10"
              maxlength="10"
              required
              v-model="validMobile"
            >
          </div>
          <div class="form__group form__group--signup">
            <label for="signup_passwd" class="form__label">
              Password
              <span v-if="errMsgPassStren" style="color:red">({{errMsgPassStren}})</span>
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
          <div class="form__group form__group--signup">
            <label for="signup_confirm_passwd" class="form__label">
              Confirm Password
              <span v-if="errMsgPass" style="color:red">({{errMsgPass}})</span>
            </label>
            <input
              type="password"
              id="signup_confirm_passwd"
              class="form__input form__input__signup"
              placeholder="Re-Enter Password"
              required
              v-model="validPassConf"
            >
            <!-- <v-text-field
              name="confirmPassword"
              label="Confirm Password"
              id="confirmPassword"
              v-model="confirmPass"
              type="password"
              :rules="[comparePasswords]"
            ></v-text-field>-->
          </div>

          <!-- signup button -->
          <div style="clear:left; ">
            <!-- button tag -->
            <br>
            <button class="btn btn--blue" id="signup" style="left:32%;" @click.prevent="onSignup">
              Sign
              Up
              <i class="fas fa-arrow-circle-right"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      fName: null,
      lName: null,
      mobile: null,
      confirmPass: null,
      errMsgPass: null,
      errMsgEmail: null,
      errMsgMobile: null,
      errMsgPassStren: null,
      ref: null
    };
  },
  computed: {
    //password validation
    // comparePasswords() {
    //   this.password !== this.confirmPass
    //     ? (this.errMsgPass = "Passwords do not match")
    //     : (this.errMsgPass = null);
    // },
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
            console.log(providers.length);
            if (providers.length === 0) {
              let ref = db.collection("validuser");
              ref = ref.where("active", "==", false);
              ref = ref
                .where("email", "==", this.email)
                .get()
                .then(querySnapshot => {
                  if (!querySnapshot.empty) {
                    //saving ref of newly signup user to update his data
                    this.ref = querySnapshot.docs[0].ref;
                    this.errMsgEmail = null;
                    // console.log(this.ref);
                  } else {
                    this.errMsgEmail = "Email is not valid or already used!";
                  }
                });
            } else {
              this.errMsgEmail = "Email is not valid or already used!";
            }
          });
      }
    },

    validMobile: {
      get() {
        return this.mobile;
      },
      set(newVal) {
        this.mobile = newVal;
        let phoneno = /^\d{10}$/;
        if (this.mobile.match(phoneno)) {
          this.errMsgMobile = null;
        } else {
          this.errMsgMobile = "Enter proper mobile number!";
        }
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
        this.errMsgMobile === null &&
        this.errMsgPassStren === null
      ) {
        if (this.fName != null && this.lName != null) {
          // take in email and pass for signup
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
              this.ref.update({
                name: this.fName + " " + this.lName,
                mobile: parseInt(this.mobile)
              });
              user.user.sendEmailVerification().then(
                // as signup will login the user automatically but dont want that
                // untill user is verifired !
                firebase
                  .auth()
                  .signOut()
                  .then(this.$router.push({ name: "Login" }))
              );
            })
            // after update as well send the verification email
            .then(() => {
              let user = firebase.auth().currentUser;
            })
            .catch(err => {
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


