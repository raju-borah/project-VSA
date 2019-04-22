<template>
  <div
    id="Test"
    class="v--modal-overlay scrollable"
    @mousedown.self="handleBackgroundClick"
    @touchstart.self="handleBackgroundClick"
  >
    <div class="testBox">
      <!-- upload videos section -->
      <!-- anchor tag  to redirect to the dashboard-->
      <button
        class="btn--close"
        @mousedown.self="handleBackgroundClick"
        @touchstart.self="handleBackgroundClick"
      >&times;</button>
      <!-- heading -->
      <h1 class="font-medium u-margin-bottom-small">Upload Videos</h1>
      <!-- upload button that is hidden-->
      <input type="file" id="upload-file" accept="video/*" hidden="hidden">
      <!-- text to display the file name to be uploaded -->
      <!-- change in upload.js changing the id to class of custom text -->
      <p class="custom-text">No file Choosen yet !</p>
      <!-- select a file button is designed for the selection of the file from the local storage -->
      <button
        type="button"
        class="btn btn--upload u-margin-bottom-medium"
        id="choose-video"
        @click.self="filePick"
      >
        CHOOSE A
        FILE
      </button>

      <!-- for video title that will be given by the user -->
      <input
        type="text"
        class="form__input--upload form__input--upload--1"
        id="upload-title"
        placeholder="Title"
        required
        v-model="validTile"
      >
      <span v-if="errMsgTitle" style="color:red; font-size: 1.4rem;">{{errMsgTitle}}</span>
      <!-- for description of video -->
      <textarea
        class="form__input--upload form__input--upload--1"
        id="upload-description"
        placeholder="Description"
        required
        v-model="description"
      ></textarea>
      <!-- for selecting the category -->
      <select
        id="video-category"
        class="form__input--upload form__input--upload--2"
        v-model="category"
      >
        <option disabled selected>Select Category</option>
        <!-- <option disabled value selected>Please select one</option> -->
        <!-- <option value="Select Category" selected>Select Category</option> -->
        <option>Learning</option>
        <option>Events</option>
        <option>Club activities</option>
      </select>
      <!-- button that will start the process of upload the file to server -->
      <button class="btn btn--upload" type="submit" id="upload-video">Upload</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadModal",
  data() {
    return {
      category: null,
      title: null,
      description: null,
      errMsgTitle: null
    };
  },
  methods: {
    handleBackgroundClick() {
      this.$root.$emit("hideUpload");
    },
    filePick() {
      //   this.$root.$emit("filePick")
    }
  },
  mounted() {
    // this.$root.$on("filePick", () => {
    const realFileBtn = this.$el.querySelector("#upload-file");
    const customBtn = this.$el.querySelector("#choose-video");
    const customText = this.$el.querySelector("#custom-text");
    // customBtn.addEventListener("click", function() {
    realFileBtn.click();
    // });

    realFileBtn.addEventListener("change", function() {
      if (realFileBtn.value) {
        // regular expersion for finding the file name
        customText.innerHTML = realFileBtn.value.match(
          /[\/\\]([\w\d\s\.\-\(\)]+)$/
        )[1];
      } else {
        customText.innerHTML = "No file choosen yet!";
      }
    });
    //   });
  },
  computed: {
    validTile: {
      get() {
        return this.title;
      },
      set(newVal) {
        this.title = newVal;
        if (this.title.trim().length <= 4) {
          this.errMsgTitle = "Title length must be than 4chars";
        } else {
          this.errMsgTitle = null;
        }
      }
    }
  }
};
</script>

<style>
.v--modal-overlay {
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
  opacity: 1;

  display: flex;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.testBox {
  text-align: center;
  border-radius: 1.5rem;
  padding: 2rem;
  padding-top: 3.8rem;
  border: 2px solid black;
  position: relative;
  height: 650px;
  width: 45%;
  box-shadow: 0 1rem 3rem #012a57;
  background-color: #fff;
}
.v--modal-overlay.scrollable {
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
