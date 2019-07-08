<template>
  <div id="Navbar" class="navigationbar">
    <!-- navigation bar -->
    <!-- name of the Application -->
    <div class="navbarfont navigationbar--left">
      <router-link :to="{name: 'Home'}">
        <i class="fas fa-camera-retro navbar_items u-margin-right-large"></i>
        <a class="navbar_items navbar_title">Vidshare</a>
      </router-link>
    </div>

    <!-- for right option such as search, user profile, upload -->
    <div class="navbarfont navigationbar--right">
      <!--Search button-->

      <div class="search navbar_items">
        <input type="text" placeholder="Search" class="search__input" required />
        <button type="button" class="search__btn" id="searchButton">
          <i class="fa fa-search search__icon" aria-hidden="true"></i>
        </button>
      </div>
      <!--seacrh button end-->
      <!--notification button-->
      <button type="button" class="navbar_items navbar_items--icon notibutton">
        <i class="fas fa-bell">
          <!--red dot -->
          <span class="notibutton_dot"></span>
          <!--red dot end-->
        </i>
      </button>
      &nbsp;
      <button
        type="button"
        class="navbar_items navbar_items--icon userbutton"
        @click="toggle"
      >
        <i class="fas fa-user-circle"></i>
      </button>
      <UserContainer />
    </div>
  </div>
</template>

<script>
import db from "../../main";
import UserContainer from "./UserContainer";
export default {
  name: "Navbar",
  components: {
    UserContainer
  },
  data() {
    return {
      display: "none"
    };
  },
  computed: {
    user() {
      return this.$store.state.loggedInUser;
    }
  },
  methods: {
    toggle() {
      const userContainer = this.$el.querySelector(".usercontainer");
      if (this.user) {
        // user option division
        const signindetail = this.$el.querySelector(".signincontainer");
        // if user is signed in
        if (this.display === "none") {
          signindetail.style.display = "block";
          userContainer.style.display = "block";
          this.display = "block";
        } else {
          userContainer.style.display = "none";
          signindetail.style.display = "none";
          this.display = "none";
        }
      } else {
        // not sign in division
        const notsigin = this.$el.querySelector(".notsignincontainer");
        // if user is not signed in
        if (this.display === "none") {
          notsigin.style.display = "block";
          userContainer.style.display = "block";
          this.display = "block";
        } else {
          userContainer.style.display = "none";
          notsigin.style.display = "none";
          this.display = "none";
        }
      }
    }
  },
  beforeCreate() {
    if (this.$store.state.loggedInUser && !this.$store.state.name) {
      let email = this.$store.state.loggedInUser.email;
      db.collection("validuser")
        .where("email", "==", email)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs[0].data();
          this.$store.state.uid = data.uid;
          this.$store.state.email = email;
          this.$store.state.name = data.name;
          this.$store.state.profilePic = data.profilePic;
          this.$store.state.designation = data.designation;
          this.$store.dispatch("getProfileDetails");
        });
    }
  },
  mounted() {
    //not the scroll position at the starting of page loading
    let prevScrollpos = window.pageYOffset; //at starting it is 0
    const navposition = () => {
      //note the scroll position while scrolling on the page
      let currentScrollPos = window.pageYOffset; //increases as we scroll down and decreses as we scroll up
      //if we scroll up it will show the scroll bar
      if (prevScrollpos > currentScrollPos) {
        document.querySelector(".navigationbar").style.opacity = "1"; //show the navbar
      } else {
        //else hide it when we go down
        document.querySelector(".navigationbar").style.opacity = "0"; //hide the navbar
      }
      //using the current scroll position to compare with previous postion
      prevScrollpos = currentScrollPos;
    };
    //call the function navposition
    window.addEventListener("scroll", navposition);
  }
};
</script>
<style>

</style>

