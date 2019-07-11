<template>
  <div id="Profile">
    <Navbar />
    <!--editform panel-->
    <div id="editbox" class="editpanel">
      <!-- editform content -->
      <form class="editpanel_content" id="profileForm">
        <!--user icon on top-->
        <div class="editpanel_content--icon">
          <i class="fas fa-user-edit editpanel_content--icon--edit"></i>
        </div>

        <!--close mark -->
        <div class="editpanel_content--closebtn">
          <button class="editpanel_content--close" @click="closeEdit">
            <span class="close">
              <i class="fas fa-times"></i>
            </span>
          </button>
        </div>
        <!--date of birth-->
        <i class="far fa-calendar-alt"></i>
        <label class="editpanel_label dob">Date Of Birth :</label>
        <input type="date" class="editpanel_input" id="date" required />
        <br />

        <!--department-->
        <i class="fas fa-building"></i>
        <label class="editpanel_label dept">Department :</label>
        <!-- <input type="text" class="editpanel_input" id="department" placeholder="eg: SCS" required> -->

        <select class="editpanel_drop" v-model="profileDetails.department">
          <option value class="editpanel_drop--item" selected disabled>Select your Department</option>
          <option value="SCS" class="editpanel_drop--item">SCS</option>
          <option value="SOB" class="editpanel_drop--item">SOB</option>
          <option value="SET" class="editpanel_drop--item">SET</option>
          <option value="SSS" class="editpanel_drop--item">SSS</option>
          <option value="SBS" class="editpanel_drop--item">SBS</option>
          <option value="SHS" class="editpanel_drop--item">SHS</option>
        </select>
        <br />

        <!--phone number-->
        <i class="fas fa-mobile-alt"></i>
        <label class="editpanel_label ph">Phone no. :</label>
        <input
          type="text"
          class="editpanel_input"
          id="phone"
          placeholder="eg: +91987654321"
          required
          v-model.trim="profileDetails.phoneno"
        />
        <br />

        <!--email -->
        <i class="far fa-envelope"></i>
        <label class="editpanel_label mail">E-mail :</label>
        <input
          type="email"
          class="editpanel_input"
          id="email"
          placeholder="eg: name@gmail.com."
          required
          v-model.trim="profileDetails.emailPersonal"
        />
        <br />

        <!--address-->
        <i class="far fa-address-book"></i>
        <label class="editpanel_label add">Address :</label>
        <input
          type="text"
          class="editpanel_input"
          id="address"
          placeholder="eg: jorhat"
          required
          v-model="profileDetails.address"
        />
        <br />

        <!--about myself-->
        <i class="fas fa-address-card"></i>
        <label class="editpanel_label about">About yourself :</label>
        <textarea
          class="editpanel_input"
          id="subject"
          placeholder="Write something.."
          required
          v-model.trim="profileDetails.aboutYourself"
        ></textarea>

        <!--submit button-->
        <input type="submit" value="SUBMIT" class="submitbtn" @click.prevent="edit" />
      </form>
    </div>
    <!--editpanel end-->

    <!--coverphoto and name-->
    <div class="coverpic">
      <div class="coverpic_img">
        <img :src="coverPic" id="coverimage" class="coverpic_img--pic" alt v-if="coverPic" />
        <img
          src="../../assets/img/sf-boat.jpg"
          id="coverimage"
          class="coverpic_img--pic"
          alt
          v-else
        />
      </div>
      <div class="coverpic_namebox">
        <h1 class="coverpic_name">
          <span class="coverpic_name--main textShadow">Hi, My Name Is</span>
          <br />
          <span class="coverpic_name--sub textShadow">{{name}}</span>
        </h1>
      </div>

      <div class="upload_btn">
        <button class="btn">
          <i class="fas fa-camera font-medium btn_icon"></i>
        </button>
        <input type="file" accept="image/jpeg" id="coverFilePicker" @change="changeCoverPic" />
      </div>
    </div>
    <!--coverphoto and name end-->

    <!--button to open form-->
    <button class="editbtn" @click="openEdit">
      <i class="fas fa-user-edit"></i>
    </button>

    <!--button end-->

    <!--personal deatils-->
    <div class="personalinfo">
      <div class="personalinfo_about">
        <div class="personalinfo_about--title font-medium">ABOUT ME</div>

        <div class="personalinfo_about--para font-xsmall">{{profile.aboutYourself}}</div>
      </div>

      <div class="personalinfo_img">
        <img
          :src="profilePic"
          id="profileimage"
          class="personalinfo_img--pic"
          alt
          v-if="profilePic"
        />
        <img
          src="../../assets/img/display.jpg"
          id="profileimage"
          class="personalinfo_img--pic"
          alt
          v-else
        />
      </div>

      <div class="personalinfo_details">
        <div class="personalinfo_details--title font-medium">PERSONAL DETAILS</div>
        <div class="personalinfo_details--info">
          Name :
          <span class="personalinfo_details--info--text">{{name}}</span>
        </div>
        <br />
        <div class="personalinfo_details--info">
          DOB :
          <span
            class="personalinfo_details--info--text"
          >{{profile.dob.day}}-{{profile.dob.month}}-{{profile.dob.year}}</span>
        </div>
        <br />
        <div class="personalinfo_details--info">
          ID :
          <span class="personalinfo_details--info--text">{{uid}}</span>
        </div>
        <br />
        <div class="personalinfo_details--info">
          Department :
          <span class="personalinfo_details--info--text">{{profile.department}}</span>
        </div>
        <br />
        <div class="personalinfo_details--info">
          Designation :
          <span class="personalinfo_details--info--text">{{designation}}</span>
        </div>
        <br />
      </div>
    </div>
    <!--personal deatils done-->

    <!--user contact -->
    <div class="contact">
      <div class="contact_title">CONTACT ME ON</div>

      <div class="contact_items">
        <div class="contact_items--call">
          <i class="fas fa-mobile-alt"></i>
          <div class="contact_items--call--1">{{profile.phoneno}}</div>
        </div>
        <div class="contact_items--location">
          <i class="fas fa-compass"></i>
          <div class="contact_items--location--1">{{profile.address}}</div>
        </div>
        <div class="contact_items--mail">
          <i class="fa fa-envelope"></i>
          <div class="contact_items--mail--1">{{profile.emailPersonal}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "../Navbar/Navbar";
export default {
  name: "Profile",
  components: {
    Navbar
  },
  data() {
    return {
      editform: null,
      profileDetails: {
        dob: {
          day: null,
          month: null,
          year: null
        },
        department: "SCS",
        phoneno: "",
        emailPersonal: "",
        address: "",
        aboutYourself: ""
      }
    };
  },
  computed: {
    name() {
      return this.$store.state.name;
    },
    profilePic() {
      return this.$store.state.profilePic;
    },
    coverPic() {
      return this.$store.state.coverPic;
    },
    uid() {
      return this.$store.state.uid;
    },
    profile() {
      return this.$store.state.profileDetails;
    },
    designation() {
      return this.$store.state.designation;
    }
  },
  methods: {
    openEdit() {
      window.scrollBy(0, 50);
      this.editform.style.display = "block";
    },
    closeEdit() {
      this.editform.style.display = "none";
    },
    edit() {
      const date = this.$el.querySelector("#date");
      const form = this.$el.querySelector("#profileForm");
      if (date.value) {
        const dateValue = date.value.split("-");
        this.profileDetails.dob.year = dateValue[0];
        this.profileDetails.dob.month = dateValue[1];
        this.profileDetails.dob.day = dateValue[2];
      }

      this.$store.dispatch("edit", this.profileDetails);
      form.reset();
    },
    changeCoverPic() {
      const imageUpload = this.$el.querySelector("#coverFilePicker");
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      canvas.width = 1366; // target width
      canvas.height = 768; // target height

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
        this.$store.dispatch("changeCoverPic", imageConv);
      };
    }
  },
  mounted() {
    this.editform = this.$el.querySelector(".editpanel");
  }
};
</script>

