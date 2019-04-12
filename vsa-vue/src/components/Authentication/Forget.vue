<template>
  <div id="Forget">
    <!-- Creating Login Section -->
    <section class="login" id="login">
      <div class="login__left"></div>
      <div class="login__right">
        <!-- Login form -->
        <form action="#" class="form form--login">
          <!--signin  logo -->
          <img src="../../assets/img/icons/confused.png" class="login__logo">
          <!-- form heading -->
          <div class="u-margin-bottom-small u-margin-top-large u-center-text large-font">
            <h1 class="heading_tag">Forgot password</h1>
          </div>
          <div class="login--container">
            <!-- creating form group  for every fields-->
            <div class="form__group">
              <label for="email" class="form__label form__label--signin">E-mail</label>
              <input
                type="email"
                id="signin_email"
                class="form__input form__input__signin"
                placeholder="Enter registered email"
                required
              >
            </div>
            <div class="u-center-text">
              <!-- login button -->
              <button class="btn btn--green btn--green--login" id="forget_passwordBtn">Request OTP</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
    name: 'Forget',
    data() {
        return {

        }
    },
    mounted() {
        
    },
}
</script>

