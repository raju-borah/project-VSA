<template>
  <div id="Navbar">
    <!-- navigation bar -->
    <div class="navigationbar" v-if="!toggleMore">
      <!-- name of the Application -->
      <div class="navbarfont navigationbar--left">
        <i class="fas fa-camera-retro navbar_items u-margin-right-large"></i>
        <!-- Router .push required here :href="$router.resolve({name: 'Home'}).href"-->
        <router-link :to="{ name: 'Home'}">
          <a class="navbar_items brand-logo left">Vidshare</a>
        </router-link>
      </div>
      <!-- for right option such as search, user profile, upload -->
      <div class="navbarfont navigationbar--right">
        <div class="search">
          <input type="text" placeholder="Search" class="search__input" required>
          <button type="button" class="search__btn" id="searchButton">
            <i class="navbar_items fa fa-search search__icon" aria-hidden="true"></i>
          </button>
        </div>
        <button type="button" class="navbar_items navbar_items--icon userbutton" @click="toggle">
          <i class="fas fa-user-circle"></i>
        </button>

        <!-- 
        nested UserContainer required -> db required
        -->
        <UserContainer :percentage="percentage" :fileName="fileName" :task="task" :key="key"/>
      </div>
    </div>
    <!-- ending of navigation bar -->
    <div class="morenav" v-else>
      <!-- for right option such as usr, home button -->
      <div class="morebarfont morenav__right">
        <div class="searchmore">
          <input type="text" placeholder="searchmore" class="searchmore__input" required>
          <button type="button" class="searchmore__btn" id="searchmoreButton">
            <i class="navbar_items fa fa-search searchmore__icon" aria-hidden="true"></i>
          </button>
        </div>

        <!--home button-->
        <router-link :to="{ name: 'Home'}">
          <button type="button" class="morebar_items morebar_items--icon homebutton">
            <i class="fas fa-home"></i>
          </button>
        </router-link>

        <!-- user button -->

        <button type="button" class="morebar_items morebar_items--icon userbutton" @click="toggle">
          <i class="fas fa-user-circle"></i>
        </button>
        <UserContainer :percentage="percentage" :fileName="fileName" :task="task" :key="key"/>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

import UserContainer from "@/components/Navbar/UserContainer";
export default {
  name: "Navbar",
  props: ["percentage", "fileName", "task"],
  components: {
    UserContainer
  },
  data() {
    return {
      key: 0,
      toggleMore: false
    };
  },
  methods: {
    toggle() {
      this.$root.$emit("toggle");
    }
  },
  created() {
    if (this.$route.name === "More") {
      this.toggleMore = true;
    } else {
      this.toggleMore = false;
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.key++;
      }
    });
  },
  mounted() {
    this.$root.$on("logOut", () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.key++;
          this.$router.push({ name: "Home" });
        });
    });
    this.$root.$on("cancelUpload", () => {
      this.key++;
    });
    //not the scroll position at the starting of page loading
    let prevScrollpos = window.pageYOffset; //at starting it is 0
    if (!this.toggleMore) {
      const navposition = () => {
        //note the scroll position while scrolling on the page
        let currentScrollPos = window.pageYOffset; //increases as we scroll down and decreses as we scroll up

        //if we scroll up it will show the scroll bar
        if (prevScrollpos > currentScrollPos) {
          this.$el.querySelector(".navigationbar").style.opacity = "1"; //show the navbar
        } else {
          //else hide it when we go down
          this.$el.querySelector(".navigationbar").style.opacity = "0"; //hide the navbar
        }

        //using the current scroll position to compare with previous postion
        prevScrollpos = currentScrollPos;
      };

      //call the function navposition

      window.addEventListener("scroll", navposition);
    }
  }
};
</script>
