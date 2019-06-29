<template>
  <div id="UserContainer">
    <div class="usercontainer">
      <!-- if user signed the following div will be displayed -->

      <div class="signincontainer" v-if="userIn">
        <img :src="profilePic" class="signincontainer__img" alt v-if="profilePic">
        <img src="../../assets/img/icons/man.png" class="signincontainer__img" alt v-else>
        <ul class="ul__list">
          <li class="ul__list--items">
            <h1 class="accountHolderName font-small">{{name}}</h1>
          </li>
          <li class="ul__list--items">
            <h2 class="accountHolderId font-xsmall">{{email}}</h2>
          </li>
          <li class="ul__list--items">
            <span v-if="!hideAccountBtn">
              <router-link :to="{name: 'Account'}">
                <a class="list--link font-small">Account</a>
              </router-link>
            </span>
            <span v-if="!hideMyVideoBtn">
              <router-link :to="{name: 'Dashboard'}">
                <a class="list--link font-small">My videos</a>
              </router-link>
            </span>
            <span v-if="!hideProfileBtn">
              <router-link :to="{name: 'Profile'}">
                <a class="list--link font-small">My&nbsp;Profile</a>
              </router-link>
            </span>
          </li>

          <!-- list item for progress bar -->
          <li class="ul__list--items ul__list--items--progress">
            <!-- line  128  navigationbar.scsss  -->
            <div class="progressbox">
              <h4 class="progressbox__text">FILENAME heloooooooooooooooooooooooooooooooooo</h4>
              <progress class="progressbox__bar" value="50" max="100"></progress>
              <div class="progressbox__percentage">50%</div>
              <div class="progressbox__btn">
                <button type="button" class="progressbox__play vidbtn">
                  <i class="fas fa-play-circle"></i>
                </button>
                <button type="button" class="progressbox__pause vidbtn">
                  <i class="far fa-pause-circle"></i>
                </button>
                <button type="button" class="progressbox__cancel vidbtn">
                  <i class="far fa-window-close"></i>
                </button>
              </div>
            </div>
          </li>

          <li class="ul__list--items">
            <button type="button" class="btn btn--green btn--green--logout" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
      <!-- if user is signed out then -->
      <div class="notsignincontainer" v-if="!userIn">
        <div class="notsignincontainer__imgdiv">
          <img class="notsignincontainer__img" src="../../assets/img/display.jpg" alt>
        </div>
        <ul class="ul__list">
          <li>
            <router-link :to="{name: 'Login'}">
              <a class="btn btn--front">login</a>
            </router-link>
            <router-link :to="{name : 'Signup'}">
              <a class="btn btn--front">Signup</a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { auth } from "firebase";
export default {
  name: "UserContainer",
  data() {
    return {
      hideMyVideoBtn: false,
      hideAccountBtn: false,
      hideProfileBtn: false
    };
  },
  computed: {
    email() {
      return this.$store.state.email;
    },
    name() {
      return this.$store.state.name;
    },
    userIn() {
      return this.$store.state.loggedInUser;
    },
    profilePic() {
      return this.$store.state.profilePic;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$store.dispatch("resetUser");
    }
  },
  created() {
    if (this.$route.name === "Dashboard") {
      this.hideMyVideoBtn = true;
    }

    if (this.$route.name === "Account") {
      this.hideAccountBtn = true;
    }
    if (this.$route.name === "Profile") {
      this.hideProfileBtn = true;
    }
  }
};
</script>

