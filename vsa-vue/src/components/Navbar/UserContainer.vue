<template>
  <div id="UserContainer">
    <div class="usercontainer">
      <!-- if user signed the following div will be displayed -->
      <div class="signincontainer">
        <img src="../../assets/img/icons/man.png" class="signincontainer__img" alt>
        <div class="margin-top">
          <h1 class="accountHolderName">Raju Moni Borah</h1>
          <h2 class="accountHolderId">cs16msiit020@gmail.com</h2>
        </div>
        <ul class="ul__list">
          <li>
            <a href="settings.html" class="list--link font-small">Account</a> &nbsp;
            <a href="dashboard.html" class="list--link font-small">My videos</a>
          </li>
          <li>
            <button type="button" class="btn btn--green btn--green--logout">Logout</button>
          </li>
        </ul>
      </div>

      <!-- required v-if with conditional firebase authentications -->

      <!-- if user is signed out then -->
      <div class="notsignincontainer">
        <div class="notsignincontainer__imgdiv">
          <img class="notsignincontainer__img" src="../../assets/img/display.jpg" alt>
        </div>
        <ul class="ul__list">
          <li>
            <a href="login.html" class="btn btn--front">login</a>
            <a href="signup.html" class="btn btn--front">Signup</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// Required Firebase Auth -> with db
export default {
  name: "UserContainer",
  data() {
    return {};
  }
};
</script>
