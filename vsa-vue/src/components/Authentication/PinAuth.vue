// display this when forget pass email is authoriseds

<template>
  <div id="PinAuth">
    <!-- Creating Login Section -->
    <section class="login" id="login">
      <div class="login__left"></div>
      <div class="login__right">
        <!-- Login form -->
        <form action="#" class="form form--login">
          <!--signin  logo -->
          <img src="img/icons/confused.png" class="login__logo">
          <!-- form heading -->
          <div class="u-margin-bottom-small u-margin-top-large u-center-text large-font">
            <h1 class="heading_tag">Forgot password</h1>
          </div>
          <div class="login--container">
            <!-- creating form group  for every fields-->
            <div class="form__group">
              <label for="signin_OTP" class="form__label">Enter One Time Password</label>
              <input
                type="text"
                minlength="6"
                maxlength="6"
                class="form__input form__input__pin"
                id="otp_field"
              >
            </div>
            <div class="u-center-text">
              <!-- login button -->
              <Button class="btn btn--green btn--green--login" id="submit_otp">Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
    name: 'PinAuth',
    data() {
        return {

        }
    },
    mounted() {

    }
}
</script>

