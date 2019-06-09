<template>
  <div id="Setting">
    <Navbar/>
    <div class="settings">
      <br>
      <div class="u-center-text">
        <h1 class="heading_tag">Account</h1>
      </div>

      <div class="settings__img">
        <img
          src="../../assets/img/icons/man.png"
          id="profileimage"
          class="settings__icon"
          alt
          v-if="!pic"
        >
        <img :src="pic" id="profileimage" class="settings__icon" alt v-else>

        <input type="file" id="imageupload" accept="image/jpeg" hidden="hidden" @change="change">
        <button
          type="button"
          class="btn settings__editbutton"
          id="editprofileimage"
          @click="pickImage"
        >
          <i class="fas fa-camera font-medium"></i>
          <span class="tooltiptext">Edit Profile Image</span>
        </button>
      </div>

      <div class="settings__container">
        <h1 class="u-center-text font-small u-margin-bottom-medium">
          Signed as
          <span class="accountHolderName" v-if="name">{{name}}</span>
          <br>
          <span class="accountHolderId" v-if="user">{{user.email}}</span>
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
import firebase from "firebase";
import db from "@/firebase/init";
import Navbar from "@/components/Navbar/Navbar";

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
      id: null,
      evt: null,
      pic: null
    };
  },
  methods: {
    change(event) {
      const imageUpload = this.$el.querySelector("#imageupload");
      this.evt = event;

      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      canvas.width = 512; // target width
      canvas.height = 512; // target height

      let image = new Image();
      // document.getElementById("original").appendChild(image);
      image.onload = e => {
        ctx.drawImage(
          // draw the image as original
          image,
          0,
          0,
          image.width,
          image.height,
          //convert it to the target hit
          0,
          0,
          canvas.width,
          canvas.height
        );
        // create a new base64 encoding
        let imageConv = canvas.toDataURL("image/jpeg");
        this.pic = imageConv;
        db.collection("validuser")
          .doc(this.id)
          .update({
            profilePic: imageConv
          })
          .then(() => {
            alert("Profile Pic Changed! :)");
            this.$root.$emit("refresh");
          });
      };

      if (imageUpload.files.length > 0) {
        // check if file chose is .mp4 or not!
        if (["image"].indexOf(imageUpload.files[0].type) == -1) {
          image.setAttribute("src", URL.createObjectURL(imageUpload.files[0]));
        } else {
          alert("Unsupported Image type!");
        }
      }
    },
    pickImage() {
      const imageUpload = this.$el.querySelector("#imageupload");
      imageUpload.click();
    },
    saveChange() {
      db.collection("validuser")
        .doc(this.id)
        .update({
          name: this.userName
        })
        .then(() => {
          alert("User Name Chnaged!");
          this.userName = null;
          this.$root.$emit("refresh");

          // this.$router.go(0);
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
    const getName = () => {};
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        let ref = db.collection("validuser");
        ref = ref
          .where("email", "==", user.email)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.name = doc.data().name;
              this.id = doc.data().uid;
              this.pic = doc.data().profilePic;
            });
          });
      } else {
        this.user = null;
      }
    });
  },
  mounted() {}
};
</script>

