<template>
  <div id="Forget">
    <!-- Creating Login Section -->
    <section class="login" id="login">
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
          <img src="../../assets/img/icons/confused.png" class="login__logo">

          <!-- form heading -->
          <div class="u-margin-bottom-small u-margin-top-large u-center-text large-font">
            <h1 class="heading_tag">Forgot password</h1>
          </div>

          <!-- creating form group  for every fields-->
          <div class="form__group">
            <label for="email" class="form__label form__label--login">E-mail</label>
            <i
              class="fas fa-envelope form__input__login--icons form__input__login--icons--iconuser"
            ></i>
            <input
              type="email"
              id="signin_email"
              class="form__input form__input__login"
              placeholder="Email"
              required
              v-model="validEmail"
            >
            <p v-if="errMsg" style="color:red; font-size:18px; text-align:center;">{{ errMsg }}</p>
          </div>
          <div class="u-center-text">
            <!-- login button -->
            <button
              class="btn btn--green btn--green--login"
              id="forget_passwordBtn"
              @click.prevent="sendLink"
            >Send</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Forget",
  data() {
    return {
      email: null,
      errMsg: null
    };
  },
  computed: {
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
              this.errMsg = "Email is not valid!";
            } else {
              this.errMsg = null;
            }
          });
      }
    }
  },
  methods: {
    sendLink() {
      if (!this.errMsg) {
        firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            alert("Password reset link sent to your email!");
            this.$router.push({ name: "Login" });
          })
          .catch(error => {
            alert("" + error.message);
          });
      }
    }
  }
};
</script>

