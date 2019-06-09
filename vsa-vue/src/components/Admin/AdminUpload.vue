<template>
  <div id="AdminUpload">
    <!-- upload section  starting   width: 100%;  height: 100vh;-->
    <!-- <div class="upload" id="upload"> -->
    <!-- container     width: 50%;  height: auto; -->
    <form class="testBox" v-if="!hide">
      <video id="main-video" controls hidden="hidden">
        <source type="video/mp4">
      </video>
      <canvas id="video-canvas"></canvas>

      <!-- upload videos section -->
      <!-- anchor tag  to redirect to the dashboard-->
      <!-- heading -->
      <h1 class="font-medium u-margin-bottom-small">Upload Videos</h1>
      <!-- upload button that is hidden-->
      <input type="file" id="upload-file" accept="video/*" hidden="hidden" @change="change">
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
        v-model="validTile"
      >
      <span v-if="errMsgTitle" style="color:red; font-size: 1.4rem;">{{errMsgTitle}}</span>
      <!-- for description of video -->
      <textarea
        class="form__input--upload form__input--upload--1"
        id="upload-description"
        placeholder="Description"
        v-model="description"
        style="resize:none; height:15%"
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
      <button class="btn btn--upload" type="submit" id="upload-video" @click.prevent="upload">Upload</button>
    </form>
    <div class="centered" v-else>
      <p style="font-size:2.8vh" v-if="value">Uploading... {{value}}%</p>
      <!-- <progress id="uploader" style="align: center" :value="value" max="100"></progress> -->

      <button type="button" class="btn btn--upload" @click="resumeUpload" v-if="paused">
        <i class="fas fa-play-circle"></i>
      </button>
      <button type="button" class="btn btn--upload" @click="pauseUpload" v-if="!paused">
        <i class="far fa-pause-circle"></i>
      </button>
      <button type="button" class="btn btn--upload" @click="cancelUpload">
        <i class="far fa-window-close"></i>
      </button>
    </div>
    <!-- </div> -->
    <!-- ending of upload section -->
  </div>
</template>
<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "AdminUpload",
  data() {
    return {
      videoThumbnail: null,
      errMsgFileType: null,
      evt: null,
      errMsgTitle: null,
      category: "Select Category",
      title: null,
      fileName: null,
      task: null,
      description: null,
      hide: false
    };
  },
  computed: {
    value() {
      return this.$store.state.adminValue;
    },
    validTile: {
      get() {
        return this.title;
      },
      set(newVal) {
        this.title = newVal;
        if (this.title.trim().length <= 4) {
          this.errMsgTitle = "Title length must be greater than 4chars";
        } else {
          db.collection("uploadedVideos")
            .where("by", "==", "Admin")
            .where("title", "==", this.title)
            .get()
            .then(querySnaphot => {
              if (!querySnaphot.empty) {
                this.errMsgTitle =
                  "You have already uploaded video with same title!";
              } else {
                this.errMsgTitle = null;
              }
            })
            .catch(err => {
              console.error(err.message);
            });
        }
      }
    },
    paused() {
      return this.$store.state.adminPaused;
    }
  },
  methods: {
    change(event) {
      this.evt = event;
    },
    filePick() {
      // globals
      this.videoThumbnail = null;
      const realFileBtn = this.$el.querySelector("#upload-file");
      const customText = this.$el.querySelector(".custom-text");
      realFileBtn.click();
      let changeTime;
      // canvas
      const _CANVAS = this.$el.querySelector("#video-canvas"),
        _CTX = _CANVAS.getContext("2d"),
        // video tag
        _VIDEO = this.$el.querySelector("#main-video");

      realFileBtn.addEventListener("change", () => {
        if (realFileBtn.files.length > 0) {
          // check if file chose is .mp4 or not!
          if (["video/mp4"].indexOf(realFileBtn.files[0].type) == -1) {
            this.errMsgFileType = "Error : Only MP4 format allowed";
            customText.innerHTML = "Error : Only MP4 format allowed";
          } else if (realFileBtn.files[0].size / 1024 / 1024 > 100) {
            // if file size is greater than 100MB show error
            this.errMsgFileType =
              "Error : File size cannot be greater than 100MB";
            customText.innerHTML =
              "Error : File size cannot be greater than 100MB";
          } else {
            this.errMsgFileType = null;
            if (realFileBtn.value) {
              // regular expersion for finding the file name
              customText.innerHTML = realFileBtn.value.match(
                /[\/\\]([\w\d\s\.\-\(\)]+)$/
              )[1];

              // load video to the video tag that is hidden
              this.$el
                .querySelector("#main-video source")
                .setAttribute("src", URL.createObjectURL(realFileBtn.files[0]));
              _VIDEO.load();

              // after the video is loaded
              _VIDEO.addEventListener("loadedmetadata", () => {
                let video_duration = _VIDEO.duration;
                changeTime = (video_duration / 100) * 5;
                let newTime = Math.floor(changeTime);
                _VIDEO.currentTime = newTime;
                _CANVAS.width = _VIDEO.videoWidth;
                _CANVAS.height = _VIDEO.videoHeight;
              });

              // Seeking video to the specified duration is complete
              this.$el
                .querySelector("#main-video")
                .addEventListener("timeupdate", () => {
                  _CTX.drawImage(
                    _VIDEO,
                    0,
                    0,
                    _VIDEO.videoWidth,
                    _VIDEO.videoHeight
                  );
                  this.videoThumbnail = _CANVAS.toDataURL("image/jpeg", 0.5);
                });
            } else {
              customText.innerHTML = "No file choosen yet!";
            }
          }
        } else {
          this.evt = null;
          customText.innerHTML = "No file choosen yet!";
        }
      });
    },
    upload() {
      if (
        this.errMsgTitle === null &&
        this.title !== null &&
        this.errMsgFileType === null &&
        this.category !== null &&
        this.category !== "Select Category"
      ) {
        if (this.evt) {
          let file = this.evt.target.files[0];
          this.fileName = file.name;
          this.$store.state.adminFileName = file.name;
          // create a storage ref
          let storageRef = firebase
            .storage()
            .ref("video/" + "admin" + "/" + this.title + ".mp4");
          // reset form
          this.$el.querySelector("form").reset();

          this.$store.state.hide = true;
          this.hide = this.$store.state.hide;
          // upload file
          this.task = storageRef.put(file);
          this.$store.dispatch("adminUpload", this.task);

          // this.$root.$emit("task", this.task);
          this.task.on(
            "state_changed",
            // when upload is in progress
            snapShot => {},
            // incase any error
            err => {},
            // when upload is completed
            () => {
              storageRef
                .getDownloadURL()
                .then(downloadURL => {
                  this.$store.state.adminUrl = downloadURL;
                })
                .then(() => {
                  db.collection("uploadedVideos")
                    .doc()
                    .set({
                      title: this.title,
                      description: this.description,
                      url: this.$store.state.adminUrl,
                      category: this.category,
                      imgBase64: this.videoThumbnail,
                      timestamp: Date.now(),
                      by: "Admin"
                    })
                    .then(() => {
                      this.task = null;
                      this.fileName = null;
                      this.evt = null;
                      this.category = "Select Category";
                      this.title = null;
                      this.description = null;
                      this.videoThumbnail = null;
                      this.$store.state.adminUrl = null;
                      this.$store.state.hide = false;
                      this.hide = this.$store.state.hide;
                    })
                    .catch(err => {
                      console.error("Document write error: " + err.message);
                    });
                })
                .catch(err => {
                  console.error(err.message);
                });
            }
          );
        } else {
          alert("Select a video to upload!");
        }
      } else {
        if (this.errMsgFileType) {
          alert(this.errMsgFileType);
        } else if (this.errMsgTitle) {
          alert(this.errMsgTitle);
        } else {
          alert("Category or title cannot be empty");
        }
      }
    },
    resumeUpload() {
      if (this.task) {
        this.task.resume();
        this.$store.state.adminPaused = false;
      }
    },
    pauseUpload() {
      if (this.task) {
        this.task.pause();
        this.$store.state.adminPaused = true;
      }
    },
    cancelUpload() {
      if (this.task) {
        this.task.resume();
        this.$store.state.adminPaused = false;
        this.task.cancel();
        this.task = null;
        this.fileName = null;
        this.evt = null;
        this.category = "Select Category";
        this.title = null;
        this.description = null;
        this.videoThumbnail = null;
        this.$store.state.adminUrl = null;
        this.$store.state.hide = false;
        this.hide = this.$store.state.hide;
      }
    }
  },
  created() {
    this.hide = this.$store.state.hide;
  }
};
</script>

<style scoped>
.testBox {
  text-align: center;
  padding: 2rem;
  background-color: #fff;
}
#main-video {
  display: none;
}
#video-canvas {
  display: none;
}
.centered {
  display: flex;
  min-height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

