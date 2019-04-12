<template>
  <div id="Login">
    <!-- Creating Login Section -->
    <section class="login" id="login">
      <div class="login__left"></div>
      <div class="login__right">
        <!-- Login form -->
        <form action="#" class="form form--login">
          <!--signin  logo -->
          <img src="../../assets/img/icons/man.png" class="login__logo">
          <!-- form heading -->
          <div class="u-margin-bottom-small u-margin-top-large u-center-text large-font">
            <h1 class="heading_tag">Sign in</h1>
          </div>
          <div class="login--container">
            <!-- creating form group  for every fields-->
            <div class="form__group">
              <label for="email" class="form__label form__label--signin">E-mail</label>
              <input
                type="email"
                id="signin_email"
                class="form__input form__input__signin"
                placeholder="Email"
                required
                v-model="email"
              >
            </div>
            <div class="form__group">
              <label for="signin_passwd" class="form__label form__label--signin">Password</label>
              <input
                type="password"
                id="signin_passwd"
                class="form__input form__input__signin"
                placeholder="Enter Password"
                required
                v-model="password"
              >
            </div>
            <p v-if="feedback" style="color:red">{{ feedback }}</p>
            <div class="u-center-text">
              <!-- login button -->
              <button
                class="btn btn--green btn--green--login"
                id="signin"
                @click.prevent="login"
              >Login In</button>
            </div>
            <div class="u-center-text">
              <br>
              <!-- create button -->
              <a href="signup.html" class="btn btn--white" id="create_account">Create Account</a> &nbsp;
              <span class="btn">&nbsp;|&nbsp;</span>
              <!-- forget button -->
              <a href="forget.html" class="btn btn--white" id="forget_password">Forget Password</a>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            console.log(user.user.emailVerified);
            if (user.user.emailVerified) {
              let ref = db.collection("validuser");
              ref = ref.where("active", "==", false);
              ref = ref
                .where("email", "==", this.email)
                .get()
                .then(querySnapshot => {
                  querySnapshot.docs[0].ref.update({ active: true });
                  this.$router.push({ name: "Home" });
                });
            } else {
              firebase.auth().signOut();
            }
          })
          // .then()
          .catch(err => {
            // this.feedback = err.message;
            if (err.code === "auth/user-not-found")
              this.feedback = "Email not verified or User does not exist!";
          });
      } else {
        this.feedback = "Please fill in both fields";
      }
    }
  }
};
</script>
