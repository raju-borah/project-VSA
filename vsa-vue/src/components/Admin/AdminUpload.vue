<template>
  <div id="AdminUpload">
    <!-- upload section  starting   width: 100%;  height: 100vh;-->
    <div class="upload" id="upload">
      <!-- container     width: 50%;  height: auto; -->
      <form class="upload__container u-center-text">
        <!-- upload videos section -->

        <!-- heading -->
        <h1 class="font-medium u-margin-bottom-small">Upload Videos</h1>
        <!-- upload button that is hidden-->
        <input type="file" id="upload-file" accept="video/*" hidden="hidden">
        <!-- text to display the file name to be uploaded -->
        <!-- change in upload.js changing the id to class of custom text -->
        <span class="custom-text">No file Choosen yet !</span>
        <!-- select a file button is designed for the selection of the file from the local storage -->
        <button type="button" class="btn btn--upload u-margin-bottom-medium" id="choose-video">
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
        >
        <!-- for description of video -->
        <textarea
          class="form__input--upload form__input--upload--1"
          id="upload-description"
          placeholder="Description"
          required
        ></textarea>
        <!-- for selecting the category -->
        <select id="video-category" class="form__input--upload form__input--upload--2">
          <option value="Select Category" selected>Select Category</option>
          <option value="learning">Learning</option>
          <option value="Events">Events</option>
          <option value="Entertainment">Club activities</option>
        </select>
        <!-- button that will start the process of upload the file to server -->
        <button class="btn btn--upload" type="submit" id="upload-video">Upload</button>
      </form>
    </div>
    <!-- ending of upload section -->
  </div>
</template>
<script>
export default {
  name: "AdminUpload",
  mounted() {
    const realFileBtn = this.$el.querySelector("#upload-file");
    const customBtn = this.$el.querySelector("#choose-video");
    const customText = this.$el.querySelector(".custom-text");

    // when choose a file button clicked
    customBtn.addEventListener("click", function() {
      realFileBtn.click();
    });

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
  }
};
</script>
