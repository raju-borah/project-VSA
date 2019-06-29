<template>
  <div id="Forget">
    <!-- Creating Login Section -->
    <section class="login">
      <div class="login__container">
        <!-- Login form -->
        <form class="form form--login">
          <!-- home link -->
          <router-link :to="{name: 'Home'}">
            <a class="login__home">
              <i class="fas fa-home"></i>
            </a>
          </router-link>
          <div class="flex-center">
            <!--signin  logo -->
            <img src="../../assets/img/icons/confused.png" class="login__logo">
          </div>
          <!-- form heading -->
          <div class="u-margin-bottom-small u-center-text large-font">
            <h1 class="heading_tag">Forgot password</h1>
          </div>

          <!-- creating form group  for every fields-->
          <div class="form__group" :class="{'invalid': $v.email.$error}">
            <label for="email" class="form__label form__label--login">
              E-mail
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
              v-model.trim="email"
            >
          </div>
          <div class="u-center-text">
            <!-- login button -->
            <button
              class="btn btn--green btn--green--login"
              id="forget_passwordBtn"
              @click.prevent="sendLink($v.$invalid)"
            >Send</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import { auth } from "firebase";
export default {
  name: "Forget",
  data() {
    return {
      email: null
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    sendLink(state) {
      if (!state) {
        auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            swal.fire({
              type: "success",
              text: "Password reset link sent to your email!"
            });
            this.$router.push({ name: "Login" });
          })
          .catch(error => {
            // alert("" + error.message);
            swal.fire({
              type: "error",
              text: error.message
            });
          });
      } else {
        swal.fire({
          type: "error",
          text: "Invalid email"
        });
      }
    }
  }
};
</script>

