<template>
  <div id="Dashboard">
    <Navbar/>

    <div class="dashboard">
      <!-- floating upload button -->
      <div class="dashboard__header">
        <!-- the title  -->
        <span class="font-medium dashboard__title">My videos</span>

        <!-- the upload button on right side -->
        <!-- LINK UPLOAD FORM HERE -->
        <a class="floating--btn" @click.prevent="uploadForm">
          <i class="fas fa-upload">upload</i>
        </a>
      </div>

      <div class="dashboard__vcontainer">
        <!-- the videos uploaded by user will be displayed in this division along with the details -->

        <!-- video playlist cards -->
        <div class="vcard">
          <!-- the thumbnail position  vcard 1 st part-->
          <div class="vcard--img">
            <div class="playlist--details flex-center" style="align-items: center;">
              <div>
                <div class="font-small">12 videos</div>
                <div class="flex-center">
                  <i class="fas fa-play-circle font-medium"></i>
                </div>
              </div>
            </div>
          </div>
          <!-- the division that contain the information of the video .It is the second part of the vcard -->
          <div class="vcard__info">
            <div class="vcard__info--title">
              <!-- dynamiv title of the video -->
              <span>Fun way to Learn JavaScript.</span>
            </div>
            <!-- timestamp when the video was created -->
            <span class="timestamp font-small">Created on: 15-04-2019</span>
            <br>
            <span style="font-weight: 550;">Description:</span>
            <!-- dynamic descrptiob of the video -->
            <span class="vcard__info--des">Lorem ipsum, dolor</span>
          </div>
        </div>

        <!-- video cards -->
        <div class="vcard">
          <!-- the thumbnail position  vcard 1 st part-->
          <div class="vcard--img">
            <!-- the tag for video  defining the category of video-->
            <h1 class="vcard--tag vcard--tag--dashboard vcard--tag--learning">
              Learning
              <!-- the delete button  -->
              <button type="button" class="videodelete u-end-text btn">
                <i class="fas fa-trash-alt font-small"></i>
              </button>
            </h1>
          </div>
          <!-- the division that contain the information of the video .It is the second part of the vcard -->
          <div class="vcard__info">
            <div class="vcard__info--title">
              <!-- dynamiv title of the video -->
              <span>Fun way to Learn JavaScript.</span>
            </div>
            <!-- timestamp when the video was created -->
            <span class="timestamp font-small">Created on: 15-04-2019</span>
            <br>
            <span style="font-weight: 550;">Description:</span>
            <!-- dynamic descrptiob of the video -->
            <span class="vcard__info--des">Lorem ipsum, dolor</span>
          </div>
        </div>

        <!-- end of vcard -->

        <!-- video cards -->
        <div class="vcard">
          <!-- the thumbnail position  vcard 1 st part-->
          <div class="vcard--img">
            <!-- the tag for video  defining the category of video-->
            <h1 class="vcard--tag vcard--tag--dashboard vcard--tag--club">
              Learning
              <!-- the delete button  -->
              <button type="button" class="videodelete u-end-text btn">
                <i class="fas fa-trash-alt font-small"></i>
              </button>
            </h1>
          </div>
          <!-- the division that contain the information of the video .It is the second part of the vcard -->
          <div class="vcard__info">
            <div class="vcard__info--title">
              <!-- dynamiv title of the video -->
              <span>Fun way to Learn JavaScript.</span>
            </div>
            <!-- timestamp when the video was created -->
            <span class="timestamp font-small">Created on: 15-04-2019</span>
            <br>
            <span style="font-weight: 550;">Description:</span>
            <!-- dynamic descrptiob of the video -->
            <span class="vcard__info--des">Lorem ipsum, dolor sit amet consec</span>
          </div>
        </div>

        <!-- end of vcard -->
        <!-- video cards -->
        <div class="vcard">
          <!-- the thumbnail position  vcard 1 st part-->
          <div class="vcard--img">
            <!-- the tag for video  defining the category of video-->
            <h1 class="vcard--tag vcard--tag--dashboard vcard--tag--event">
              Learning
              <!-- the delete button  -->
              <button type="button" class="videodelete u-end-text btn">
                <i class="fas fa-trash-alt font-small"></i>
              </button>
            </h1>
          </div>
          <!-- the division that contain the information of the video .It is the second part of the vcard -->
          <div class="vcard__info">
            <div class="vcard__info--title">
              <!-- dynamiv title of the video -->
              <span>Fun way to Learn JavaScript.</span>
            </div>
            <!-- timestamp when the video was created -->
            <span class="timestamp font-small">Created on: 15-04-2019</span>
            <br>
            <span style="font-weight: 550;">Description:</span>
            <!-- dynamic descrptiob of the video -->
            <span class="vcard__info--des">
              Lorem ipsum, dolor sit amet consectetur adipisicing
              elit.Suscipit sit, explicabo hic nostrum
            </span>
          </div>
        </div>

        <!-- end of vcard -->
      </div>
    </div>
  </div>
</template>
<script>
import db from "../../main";
import Navbar from "../Navbar/Navbar";
export default {
  name: "Dashboard",
  components: {
    Navbar
  },
  validation: {},
  methods: {
    uploadForm() {
      swal.fire({
        title: "Upload Video",
        html:
          '<input type="file" id="upload-file" accept="video/*" hidden="hidden"/>' +
          '<span class="custom-text" >No file Choosen yet !</span>' +
          '<button type="button" class="btn btn--upload u-margin-bottom-medium" id="choose-video">CHOOSE A FILE</button>' +
          '<input type="text" class="form__input--upload form__input--upload--1" id="upload-title" placeholder="Title" required>' +
          '<textarea class="form__input--upload form__input--upload--1" id="upload-description" placeholder="Description" required></textarea>' +
          '<select id="video-category" class="form__input--upload form__input--upload--2"><option value="" selected disabled>Select Category</option><option value="learning">Learning</option><option value="Events">Events</option><option value="Entertainment">Club activities</option></select>' +
          '<button class="btn btn--upload" type="submit" id="upload-video">Upload</button>',
        focusConfirm: false,
        showCloseButton: true,
        showConfirmButton: false,
        onOpen: dom => {
          // globals
          const realFileBtn = dom.querySelector("#upload-file");
          const customBtn = dom.querySelector("#choose-video");
          const customText = dom.querySelector(".custom-text");
          const upload = dom.querySelector("#upload-video");

          customBtn.addEventListener("click", function() {
            realFileBtn.click();
          });
          let changeTime;
          let videoThumbnail;
          let videoDetails = {
            title: "",
            description: "",
            category: "",
            thumbnail: ""
          };
          // canvas
          const _CANVAS = document.createElement("canvas"),
            _CTX = _CANVAS.getContext("2d"),
            // video
            _VIDEO = document.createElement("VIDEO");

          // when file will be selected, validating the video
          realFileBtn.addEventListener("change", () => {
            // video validation
            // check if file is selected or not
            if (realFileBtn.files.length > 0) {
              // check if file chose is .mp4 or not!
              if (["video/mp4"].indexOf(realFileBtn.files[0].type) == -1) {
                swal
                  .fire({
                    type: "warning",
                    text: "Please MP4 type video file to upload!"
                  })
                  .then(res => {
                    this.uploadForm();
                  });
              } else if (realFileBtn.files[0].size / 1024 / 1024 > 100) {
                // if file size is greater than 100MB show error
                swal
                  .fire({
                    type: "warning",
                    text: "File size cannot be greater than 100MB!"
                  })
                  .then(res => {
                    this.uploadForm();
                  });
              } else {
                if (realFileBtn.value) {
                  // regular expersion for finding the file name
                  customText.innerHTML = realFileBtn.value.match(
                    /[\/\\]([\w\d\s\.\-\(\)]+)$/
                  )[1];
                  //loading the file selected in the video element as a src url
                  _VIDEO.setAttribute(
                    "src",
                    URL.createObjectURL(realFileBtn.files[0])
                  );
                  _VIDEO.load();

                  // after the video is loaded
                  _VIDEO.addEventListener("loadedmetadata", () => {
                    // seeking video to 5sec duration
                    let video_duration = _VIDEO.duration;
                    changeTime = (video_duration / 100) * 5;
                    let newTime = Math.floor(changeTime);
                    _VIDEO.currentTime = newTime;
                    _CANVAS.width = _VIDEO.videoWidth;
                    _CANVAS.height = _VIDEO.videoHeight;
                  });

                  // Seeking video to the specified duration is complete
                  // letting canvas to draw the 2d image of the frame in video element
                  _VIDEO.addEventListener("timeupdate", () => {
                    _CTX.drawImage(
                      _VIDEO,
                      0,
                      0,
                      _VIDEO.videoWidth,
                      _VIDEO.videoHeight
                    );
                    //conerting the drawn image to data-url
                    videoThumbnail = _CANVAS.toDataURL("image/jpeg", 0.8);
                  });
                }
              }
            }
          });

          //validation the upload form
          upload.addEventListener("click", () => {
            videoDetails.title = dom
              .querySelector("#upload-title")
              .value.trim();
            videoDetails.description = dom
              .querySelector("#upload-description")
              .value.trim();
            videoDetails.category = dom.querySelector("#video-category").value;
            videoDetails.thumbnail = videoThumbnail;
            // console.log(videoDetails.title, videoDetails.description, videoDetails.category);
            // title check
            if (videoDetails.title.trim().length >= 4) {
              // category check
              if (videoDetails.category.length > 0) {
                // validating video selection
                console.log(customText.innerHTML);
                if (customText.innerHTML !== "No file Choosen yet !") {
                  upload.style.display = "none";
                  swal.showLoading();
                  db.collection("uploadedVideos")
                    .where("title", "==", videoDetails.title)
                    .get()
                    .then(querySnaphot => {
                      if (!querySnaphot.empty) {
                        console.log("video can be uploaded");
                        console.log(videoThumbnail);
                        this.$store.dispatch("uploadVideo", videoDetails);
                        swal.close();
                      } else {
                        // swal.hideLoading();
                        swal
                          .fire({
                            type: "warning",
                            text:
                              "You have already uploaded the video with same title! Please give unique title to your video"
                          })
                          .then(res => {
                            this.uploadForm();
                          });
                      }
                    });
                } else {
                  swal
                    .fire({
                      type: "warning",
                      text: "Select a video to upload"
                    })
                    .then(res => {
                      this.uploadForm();
                    });
                }
              } else {
                swal
                  .fire({
                    type: "warning",
                    text: "Please select a category"
                  })
                  .then(res => {
                    this.uploadForm();
                  });
              }
            } else {
              swal
                .fire({
                  type: "warning",
                  text: "Title cannot be empty or less than 4 char length"
                })
                .then(res => {
                  this.uploadForm();
                });
            }
          });
        }
      });
    }
  }
};
</script>

