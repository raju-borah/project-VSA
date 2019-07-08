<template>
  <div id="Account" class="settings">
    <Navbar />
    <div class="u-center-text flex-center">
      <h1 class="heading_tag">Account</h1>
    </div>

    <br />
    <img
      src="../../assets/img/icons/man.png"
      id="profileimage"
      class="settings__icon"
      alt
      v-if="!profilePic"
    />
    <img :src="profilePic" id="profileimage" class="settings__icon" alt v-else />

    <input type="file" id="imageupload" accept="image/jpeg" hidden="hidden" @change="filePicked" />
    <button type="button" class="btn settings__editbutton" id="editprofileimage" @click="pickFile">
      <i class="fas fa-camera font-medium"></i>
      <span class="tooltiptext">Edit Profile Image</span>
    </button>

    <br />
    <h1 class="u-center-text font-medium u-margin-bottom-medium">
      Signed as
      <span class="accountHolderName">{{name}}</span>
      <br />
      <span class="accountHolderId">{{email}}</span>
    </h1>
    <div class="settings__form">
      <h1 class="font-medium">Change Account Settings</h1>
      <div class="form__group">
        <form>
          <label for="current_username" class="font-small">Change User Name</label>
          <input
            type="text"
            id="current_passwd"
            class="form__input form__input--settings"
            placeholder="Enter UserName"
            required
            v-model.trim="nameNew"
          />
          <!-- for changing username -->
          <button class="btn btn--upload" type="submit" @click.prevent="changeName">Save Changes</button>
        </form>
        <span class="upperline"></span>
        <!-- for sending the password reset link -->
        <label class="font-small">Send reset Password link</label>
        <button class="btn btn--upload" @click="sendPasswordResetLink">Reset Password</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../Navbar/Navbar";
export default {
  name: "Account",
  components: {
    Navbar
  },
  computed: {
    email() {
      return this.$store.state.email;
    },
    name() {
      return this.$store.state.name;
    },
    profilePic() {
      return this.$store.state.profilePic;
    }
  },
  data() {
    return {
      nameNew: ""
    };
  },
  methods: {
    changeName() {
      if (this.nameNew) {
        this.$store.dispatch("changeName", this.nameNew);
        this.nameNew = "";
      } else {
        swal.fire({
          type: "warning",
          text: "Name cannot be empty!"
        });
      }
    },
    sendPasswordResetLink() {
      this.$store.dispatch("sendPasswordResetLink");
    },
    pickFile() {
      const imageUpload = this.$el.querySelector("#imageupload");
      imageUpload.click();
    },
    filePicked() {
      const imageUpload = this.$el.querySelector("#imageupload");
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      canvas.width = 512; // target width
      canvas.height = 512; // target height

      let image = new Image();

      if (imageUpload.files.length > 0) {
        // check if file chose is image type or not
        if (["image/jpeg"].indexOf(imageUpload.files[0].type) !== -1) {
          image.setAttribute("src", URL.createObjectURL(imageUpload.files[0]));
        } else {
          // alert("Unsupported Image type!");
          swal.fire({
            type: "warning",
            text: "Unsupported Image type! Please select JPEG image"
          });
        }
      }
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
        let imageConv = canvas.toDataURL("image/jpeg", 0.6);
        this.$store.dispatch("changeProfilePic", imageConv);
      };
    }
  }
};
</script>
