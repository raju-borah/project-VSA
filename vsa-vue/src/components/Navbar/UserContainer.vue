<template>
  <div id="UserContainer">
    <div class="usercontainer">
      <!-- if user signed the following div will be displayed -->
      <div class="signincontainer">
        <img src="../../assets/img/icons/man.png" class="signincontainer__img" alt v-if="!pic">
        <img :src="pic" class="signincontainer__img" alt v-else>
        <ul class="ul__list">
          <li class="ul__list--items">
            <h1 class="accountHolderName" v-if="name">{{ name }}</h1>
          </li>
          <li class="ul__list--items">
            <h2 class="accountHolderId" v-if="user">{{ user.email }}</h2>
          </li>
          <li class="ul__list--items" style="padding-top: 1.5rem">
            <!-- required routerlink here -->
            <span v-if="!hideAccountBtn">
              <router-link :to="{name: 'Setting'}">
                <a class="list--link font-small">Account</a>
              </router-link>
            </span>
            &nbsp;
            <!-- required routerlink here -->
            <span v-if="!hideMyVideoBtn">
              <router-link :to="{name: 'Dashboard'}">
                <a class="list--link font-small">My videos</a>
              </router-link>
            </span>
          </li>

          <!-- this value will be taken from the upload from  -->
          <!-- conditionally show the progress bar -->
          <!-- list item for progress bar -->

          <li class="ul__list--items ul__list--items--progress" v-if="task">
            <!-- line  128  navigationbar.scsss  -->
            <div class="progressbox">
              <h4 class="progressbox__text">{{fileName}}</h4>
              <progress class="progressbox__bar" id="prog" :value="value" max="100"></progress>
              <div class="progressbox__percentage">{{percent}}%</div>
              <div class="progressbox__btn">
                <button
                  type="button"
                  class="progressbox__play vidbtn"
                  @click="resumeUpload"
                  v-if="paused"
                >
                  <i class="fas fa-play-circle"></i>
                </button>
                <button
                  type="button"
                  class="progressbox__pause vidbtn"
                  @click="pauseUpload"
                  v-if="!paused"
                >
                  <i class="far fa-pause-circle"></i>
                </button>
                <button type="button" class="progressbox__cancel vidbtn" @click="cancelUpload">
                  <i class="far fa-window-close"></i>
                </button>
              </div>
            </div>
          </li>

          <li class="ul__list--items" v-else>
            <h1 style="color:grey">No upload is active.</h1>
          </li>
          <!-- conditonal hide here -->

          <li class="ul__list--items">
            <button type="button" class="btn btn--green btn--green--logout" @click="logOut">Logout</button>
          </li>
        </ul>
      </div>
      <!-- if user is signed out then -->
      <div class="notsignincontainer">
        <div class="notsignincontainer__imgdiv">
          <img class="notsignincontainer__img" src="../../assets/img/display.jpg" alt>
        </div>
        <ul class="ul__list">
          <li>
            <!-- router link required here -->
            <router-link :to="{name: 'Login'}">
              <a class="btn btn--front">login</a>
            </router-link>
            <!-- routerlink required here -->
            <router-link :to="{name: 'Signup'}">
              <a class="btn btn--front">Signup</a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// Required Firebase Auth -> with db
import firebase from "firebase";
import db from "@/firebase/init";
export default {
  name: "UserContainer",
  computed: {
    percent() {
      return this.$store.state.percentage;
    },
    task() {
      return this.$store.state.task;
    },
    fileName() {
      return this.$store.state.fileName;
    },
    value() {
      return this.$store.state.value;
    },
    paused() {
      return this.$store.state.paused;
    }
  },
  data() {
    return {
      user: null,
      name: null,
      pic: null,
      hideMyVideoBtn: false,
      hideAccountBtn: false
    };
  },

  methods: {
    logOut() {
      this.$root.$emit("logOut");
    },
    resumeUpload() {
      if (this.task) {
        this.task.resume();
        this.$store.state.paused = false;
      }
    },
    pauseUpload() {
      if (this.task) {
        this.task.pause();
        this.$store.state.paused = true;
      }
    },
    cancelUpload() {
      if (this.task) {
        this.task.resume();
        this.$store.state.paused = false;
        this.task.cancel();
        this.$root.$emit("cancelUpload");
      }
    }
  },
  beforeCreate() {
    const getName = () => {
      let ref = db.collection("validuser");
      ref = ref
        .where("email", "==", this.user.email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.name = doc.data().name;
            this.pic = doc.data().profilePic;
          });
        })
        .catch(err => {
          console.error(err.message);
        });
    };
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        getName();
      } else {
        this.$store.state.homeSpinner = false;
        this.user = null;
      }
    });
  },
  created() {
    if (this.$route.name === "Dashboard") {
      this.hideMyVideoBtn = true;
    }

    if (this.$route.name === "Setting") {
      this.hideAccountBtn = true;
    }
  },
  mounted() {
    const userContainer = this.$el.querySelector(".usercontainer");
    // user option division
    const signindetail = this.$el.querySelector(".signincontainer");
    // not sign in division
    const notsigin = this.$el.querySelector(".notsignincontainer");

    let display = "none";

    this.$root.$on("toggle", () => {
      if (this.user) {
        // if user is signed in

        if (display === "none") {
          signindetail.style.display = "block";
          userContainer.style.display = "block";
          display = "block";
        } else {
          userContainer.style.display = "none";
          signindetail.style.display = "none";
          display = "none";
        }
      } else {
        // if user is not signed in

        if (display === "none") {
          notsigin.style.display = "block";
          userContainer.style.display = "block";
          display = "block";
        } else {
          userContainer.style.display = "none";
          notsigin.style.display = "none";
          display = "none";
        }
      }
    });
  }
};
</script>

