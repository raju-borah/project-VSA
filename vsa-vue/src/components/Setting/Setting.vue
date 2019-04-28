<template>
  <div id="Setting">
    <!-- Setting page layout -->
    <Navbar/>
    <div class="settings">
      <br>
      <div class="u-center-text">
        <h1 class="heading_tag">Account</h1>
      </div>

      <div class="settings__img">
        <img src="../../assets/img/icons/man.png" id="profileimage" class="settings__icon" alt>

        <input type="file" id="imageupload" accept="image/jpeg" hidden="hidden">
        <button type="button" class="btn settings__editbutton" id="editprofileimage">
          <i class="fas fa-camera font-medium"></i>
          <span class="tooltiptext">Edit Profile Image</span>
        </button>
      </div>

      <div class="settings__container">
        <h1 class="u-center-text font-small u-margin-bottom-medium">
          Signed as
          <span class="accountHolderName">{{name}}</span>
          <br>
          <span class="accountHolderId">{{user.email}}</span>
        </h1>

        <div class="settings__form">
          <h1 class="font-small">Change Account Settings</h1>
          <div class="form__group">
            <form>
              <label for="current_username" class="form__label">Change UserName</label>
              <input
                type="text"
                id="current_passwd"
                class="form__input form__input--settings"
                placeholder="Enter UserName"
                v-model="userName"
              >
              <!-- for changing username -->
              <button class="btn btn--upload" type="submit" @click.prevent="saveChange">Save Changes</button>
            </form>
            <span class="upperline"></span>
            <!-- for sending the password reset link -->
            <label class="font-small">Send reset Password link</label>
            <button class="btn btn--upload" @click="reset">Reset Password</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "Setting",
  components: {
    Navbar
  },
  data() {
    return {
      user: null,
      name: null,
      userName: null,
      id: null
    };
  },
  methods: {
    saveChange() {
      console.log(this.userName);
      console.log(this.id);
      db.collection("validuser")
        .doc(this.id)
        .update({
          name: this.userName
        })
        .then(() => {
          alert("User Name Chnaged!");
          this.userName = null;
          this.$router.go(0)
        });
    },
    reset() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.user.email)
        .then(() => {
          alert("Password reset link sent to your email!");
        })
        .catch(error => {
          alert("" + error.message);
        });
    }
  },
  created() {
    const getName = () => {
      let ref = db.collection("validuser");
      ref = ref
        .where("email", "==", this.user.email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.name = doc.data().name;
            this.id = doc.data().uid;
          });
        });
    };
    if (firebase.auth().currentUser) {
      this.user = firebase.auth().currentUser;
      getName();
    } else {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user;
          getName();
        } else {
          this.user = null;
        }
      });
    }
  },
  mounted() {
    // current profile image
    const profileimg = this.$el.querySelector("#profileimage");
    // upload button
    const imageUpload = this.$el.querySelector("#imageupload");
    // custom button for upload
    const editImageButton = this.$el.querySelector("#editprofileimage");

    // save Edit image button clicked button
    editImageButton.addEventListener("click", function() {
      imageUpload.click();
    });

    /* 
    imageUpload.addEventListener('change',function(){

    });
    */
  }
};
</script>

