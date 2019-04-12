<template>
  <div id="Dashboard">
    <!-- navigation bar -->
    <!-- nested nav required -->
    <Navbar/>
    <!-- dashboard -->
    <div class="dashboard">
      <!-- floating upload button -->

      <a href="#upload" class="floating--btn">
        <i class="fas fa-upload">upload</i>
      </a>

      <div>
        <h1 class="font-medium u-margin-small">My videos</h1>
      </div>
      <div class="dashboard__vcontainer">
        <ul class="dashboard__list">
          <li class="dashboard__list--items">
            <div class="dashboard__vcard">
              <div class="dashboard__video">
                <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0"></iframe>
              </div>
              <div class="dashboard__description">
                <button type="button" class="videodelete u-end-text btn">
                  <i class="fas fa-trash-alt font-small"></i>
                </button>

                <div class="dashboard__description--title font-medium">
                  <span>Fun way to Learn JavaScript.</span>
                </div>
                <div class="dashboard__description--vdesc font-small">
                  <span>
                    Javascript tutotial for beginner.
                    Lorem ipsum dolor sit amet, consectetur adipisicing e
                    nostrum, animi facere amet numquam aliquid, ex eius veniam tempore suscipit commodi
                    ullam magni optio sunt a hic aspernatur quod dicta?
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li class="dashboard__list--items">
            <div class="dashboard__vcard">
              <div class="dashboard__video">
                <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0"></iframe>
              </div>
              <div class="dashboard__description">
                <button type="button" class="videodelete u-end-text btn">
                  <i class="fas fa-trash-alt font-small"></i>
                </button>

                <div class="dashboard__description--title font-medium">
                  <span>Fun way to Learn JavaScript.</span>
                </div>
                <div class="dashboard__description--vdesc font-small">
                  <span>
                    Javascript tutotial for beginner.
                    Lorem ipsum dolor sit amet, consectetur adipisicing e
                    nostrum, animi facere amet numquam aliquid, ex eius veniam tempore suscipit commodi
                    ullam magni optio sunt a hic aspernatur quod dicta?
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li class="dashboard__list--items">
            <div class="dashboard__vcard">
              <div class="dashboard__video">
                <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0"></iframe>
              </div>
              <div class="dashboard__description">
                <button type="button" class="videodelete u-end-text btn">
                  <i class="fas fa-trash-alt font-small"></i>
                </button>

                <div class="dashboard__description--title font-medium">
                  <span>Fun way to Learn JavaScript.</span>
                </div>
                <div class="dashboard__description--vdesc font-small">
                  <span>
                    Javascript tutotial for beginner.
                    Lorem ipsum dolor sit amet, consectetur adipisicing e
                    nostrum, animi facere amet numquam aliquid, ex eius veniam tempore suscipit commodi
                    ullam magni optio sunt a hic aspernatur quod dicta?
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- upload section  starting-->
    <div class="upload" id="upload">
      <!-- container -->
      <div class="upload__container">
        <!-- upload videos section -->
        <div class="upload__videos--card u-center-text">
          <a href="#headSection" class="btn--close">&times;</a>

          <!-- heading -->
          <h1 class="font-medium u-margin-bottom-small">Upload Videos</h1>
          <!-- upload button -->
          <input type="file" id="upload-file" accept="video/*" hidden="hidden">
          <!-- text to display the file name to be uploaded -->
          <span id="custom-text">No file Choosen yet !</span>
          <button type="button" class="btn btn--upload u-margin-bottom-medium" id="choose-video">
            CHOOSE A
            FILE
          </button>

          <!-- for title -->
          <input
            type="text"
            class="form__input--upload form__input--upload--1"
            id="upload-title"
            placeholder="Title"
          >
          <!-- for description -->
          <textarea
            rows="2"
            cols="30"
            class="form__input--upload form__input--upload--1"
            id="upload-description"
            placeholder="Description"
          ></textarea>
          <!-- for selecting the category -->
          <select id="video-category" class="form__input--upload form__input--upload--2">
            <option value="Select Category" selected>Select Category</option>
            <option value="learning">Learning</option>
            <option value="Events">Events</option>
            <option value="Entertainment">Entertainment</option>
            <option value="others">Others</option>
          </select>

          <button class="btn btn--upload" type="submit" id="upload-video">Upload</button>
        </div>
      </div>
    </div>
    <!-- ending of upload section -->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar"

export default {
  name: "Dashboard",
  components: {
    Navbar
  },
  data() {
    return {};
  },
  mounted() {
    ``;

    // display js'

    // user profile button in navbar
    const userBtn = this.$el.querySelector(".userbutton");
    // div for data display
    const userContainer = this.$el.querySelector(".usercontainer");
    // user option division
    const signindetail = this.$el.querySelector(".signincontainer");
    // not sign in division
    const notsigin = this.$el.querySelector(".notsignincontainer");

    let display = "none";
    userBtn.addEventListener("click", function() {
      // conditional
      /**
    if(display==="none"){
        notsigin.style.display="block";
        userContainer.style.display="block";
        display="block";
       
    }else{
        userContainer.style.display="none";
        notsigin.style.display="none";
        display="none";
    }
    
      */

      if (display === "none") {
        signindetail.style.display = "block";
        userContainer.style.display = "block";
        display = "block";
      } else {
        userContainer.style.display = "none";
        signindetail.style.display = "none";
        display = "none";
      }
    });
  }
};
</script>
