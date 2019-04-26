<template>
  <div id="Dashboard" :class="{'showBg' : spinner}">
    <!-- navigation bar -->
    <!-- nested nav required -->
    <div v-if="spinner">
      <half-circle-spinner :animation-duration="1000" :size="100" :color="'#FFFFFF'"/>
      <p class="uploadActive" v-if="deleteAction">Deleting</p>
    </div>
    <div v-else>
      <Navbar :percentage="percentage" :fileName="fileName" :task="task"/>
      <div class="dashboard">
        <!-- floating upload button -->
        <div class="dashboard__header">
          <!-- the upload button on right side -->
          <!-- <button class="floating--btn" @click="$modal.show('upload-modal')"> -->
          <button class="floating--btn" @click="uploadDisplay">
            <i class="fas fa-upload">upload</i>
          </button>
          <!-- the title  -->
          <h1 class="font-medium dashboard__title">
            My videos &nbsp;
            <i class="fas fa-tasks font-small"></i>
          </h1>
        </div>
        <!-- video card -->
        <div class="dashboard__vcontainer" :class="{'emptyBox': videos.length === 0}">
          <p
            style="font-size: 1.8vw; color: grey;"
            v-if="videos.length === 0"
          >No Videos uploaded yet!!, Click Upload and get started !! :)</p>
          <!-- the videos uploaded by user will be displayed in this division along with the details -->
          <div class="vcard" v-for="video in videos" :key="video.id">
            <div class="vcard--img" :style="{backgroundImage: 'url(' +video.imgBase64 + ')',}">
              <!-- the tag for video -->
              <h1 class="vcard--tag vcard--tag--dashboard">
                {{video.category}}
                <!-- event to trigger delete and show warning window -->
                <button
                  type="button"
                  class="videodelete u-end-text btn"
                  @click="warningDisplay(video.id, video.url)"
                >
                  <i class="fas fa-trash-alt font-small"></i>
                </button>
              </h1>
            </div>
            <div class="vcard__info">
              <div class="vcard__info--title">
                <!-- dynamiv title of the video -->
                <span>{{video.title}}</span>

                <!-- timestamp when the video was created -->
              </div>
              <!-- will add video.timestamp here -->
              <span class="timestamp font-small">Created on: {{video.timestamp}}</span>
              <br>
              <span style="font-weight: 550;">Description:</span>
              <!-- dynamic descrptiob of the video -->
              <span class="vcard__info--des">{{video.description}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- upload form modal -->
      <transition name="fade">
        <div
          id="Test"
          class="v--modal-overlay scrollable"
          @click.self="handleBackgroundClick"
          v-if="isActiveUpload"
        >
          <form class="testBox">
            <video id="main-video" controls hidden="hidden">
              <source type="video/mp4">
            </video>
            <canvas id="video-canvas"></canvas>

            <!-- upload videos section -->
            <!-- anchor tag  to redirect to the dashboard-->
            <button class="btn--close" @click.self="handleBackgroundClick" type="reset">&times;</button>
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
            <button
              class="btn btn--upload"
              type="submit"
              id="upload-video"
              @click.prevent="upload"
            >Upload</button>
          </form>
        </div>
      </transition>
      <!-- upload button warning modal -->
      <transition name="fade">
        <div
          id="DeleteModal"
          class="v--modal-overlay scrollable"
          @click.self="handleBackgroundClickWarning"
          v-if="isActiveWarning"
        >
          <div
            id="Warning"
            class="warningBox"
            :style="{backgroundColor: bgColor, borderColor: borColor}"
          >
            <!-- delete confirmation option box -->

            <!--conatiner to chmage the color on hover on yes and no-->
            <!-- confirmation message -->
            <p
              style="font-size: 2vw"
              :style="{color: fontColor}"
            >Are you sure you want to delete this video?</p>
            <!-- confirmation options -->
            <!--buttons for yes and no option-->
            <button
              @mouseover="colorYes()"
              @mouseout="defaultColor()"
              @click.self="deleteVideo"
              class="btn btn--front"
            >Yes</button>
            <button
              @mouseover="colorNo()"
              @mouseout="defaultColor()"
              @click.self="handleBackgroundClickWarning"
              class="btn btn--front"
            >No</button>
          </div>
        </div>
      </transition>
      <!-- active upload warning modal -->
      <transition name="fade">
        <div
          id="uploadActiveModal"
          class="v--modal-overlay scrollable"
          @click.self="handleBackgroundClickUpload"
          v-if="isUploadActive"
        >
          <p
            class="uploadActive"
          >One upload task is already active, click on navbar profile option to check the progress</p>
        </div>
      </transition>

      <!-- delete warning if video is still under process -->
      <transition name="fade">
        <div
          id="uploadActiveModal"
          class="v--modal-overlay scrollable"
          @click.self="handleBackgroundClickVideoProcess"
          v-if="isVideoInProcess"
        >
          <p
            class="uploadActive"
          >Video is still under process, wait for it to finish before deleting it !</p>
        </div>
      </transition>
    </div>
    <!-- spinner when delete -->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import db from "@/firebase/init";
import firebase from "firebase";
import moment from "moment";
import { HalfCircleSpinner } from "epic-spinners";

export default {
  name: "Dashboard",
  components: {
    Navbar,
    HalfCircleSpinner
  },
  data() {
    return {
      deleteAction: false,
      spinner: false,
      activeModal: null,
      evt: null,
      percentage: 0,
      stop: false,
      fileName: null,
      task: null,
      id: null,
      videos: [],
      checkUrl: null,
      isActiveUpload: false,
      isActiveWarning: false,
      isUploadActive: false,
      isVideoInProcess: false,
      category: "Select Category",
      title: null,
      description: null,
      errMsgTitle: null,
      errMsgFileType: null,
      deleteId: null,
      deleteRef: null,
      bgColor: "#fff",
      fontColor: "#000",
      borColor: "#000",
      videoThumbnail: null
    };
  },
  created() {
    const getId = () => {
      this.spinner = true;
      let ref = db.collection("validuser");
      ref = ref
        .where("email", "==", this.user.email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.id = doc.id;
          });
        })
        .then(() => {
          let vref = db.collection("uploadedVideos").where("by", "==", this.id);
          //whenever anything update/change/else in firebase it takes snapshot of it
          //this can be used for looking or changes occuring in firebase
          vref.onSnapshot(snapshot => {
            //we will use docChanges() to get the type changes
            snapshot.docChanges().forEach(change => {
              if (change.type === "added") {
                let doc = change.doc;
                this.videos.push({
                  //doc keeps id can retrive using;
                  id: doc.id,
                  // field that we have created can be retirve using;
                  title: doc.data().title,
                  description: doc.data().description,
                  url: doc.data().url,
                  category: doc.data().category,
                  imgBase64: doc.data().imgBase64,
                  timestamp: moment(doc.data().timestamp).format("lll")
                });
              } else if (change.type === "modified") {
                let doc = change.doc;
                let length = this.videos.length;
                this.videos = this.videos.filter(video => {
                  // when id matches with applied id
                  // below condition retuns false
                  return video.id !== doc.id;
                });

                this.videos.push({
                  //doc keeps id can retrive using;
                  id: doc.id,
                  // field that we have created can be retirve using;
                  title: doc.data().title,
                  description: doc.data().description,
                  url: doc.data().url,
                  category: doc.data().category,
                  imgBase64: doc.data().imgBase64,
                  timestamp: moment(doc.data().timestamp).format("lll")
                });
              }
              this.spinner = false;
            });
            this.spinner = false;
          });
        })
        .catch(err => {
          this.spinner = false;
          console.error(err.message);
        });
    };
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        getId();
      } else {
        this.user = null;
      }
    });
  },
  computed: {
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
            .where("by", "==", this.id)
            .where("title", "==", this.title.trim())
            .get()
            .then(querySnaphot => {
              if (!querySnaphot.empty) {
                this.errMsgTitle =
                  "You have already uploaded video with same title!";
              } else {
                this.errMsgTitle = null;
              }
            });
        }
      }
    }
  },
  methods: {
    change(event) {
      this.evt = event;
    },
    uploadDisplay() {
      if (this.task) {
        this.isUploadActive = !this.isUploadActive;
      } else {
        this.isActiveUpload = !this.isActiveUpload;
      }
    },
    warningDisplay(id, url) {
      this.isActiveWarning = !this.isActiveWarning;
      this.deleteId = id;
      this.checkUrl = url;
    },
    handleBackgroundClick() {
      this.category = null;
      this.title = null;
      this.description = null;
      this.evt = null;
      this.category = "Select Category";
      this.isActiveUpload = !this.isActiveUpload;
    },
    handleBackgroundClickWarning() {
      this.bgColor = "#fff";
      this.fontColor = "#000";
      this.borColor = "#000";
      this.isActiveWarning = !this.isActiveWarning;
    },
    handleBackgroundClickUpload() {
      this.isUploadActive = !this.isUploadActive;
    },
    handleBackgroundClickVideoProcess() {
      this.isVideoInProcess = !this.isVideoInProcess;
    },
    upload() {
      if (
        this.errMsgTitle === null &&
        this.errMsgFileType === null &&
        this.category !== null &&
        this.category !== "Select Category"
      ) {
        if (this.evt) {
          let file = this.evt.target.files[0];
          this.fileName = file.name;
          // create a storage ref
          let storageRef = firebase
            .storage()
            .ref("video/" + this.id + "/" + this.title + ".mp4");
          // reset form
          this.$el.querySelector("form").reset();
          // hide the upload form
          this.isActiveUpload = !this.isActiveUpload;

          // upload file
          this.task = storageRef.put(file);

          this.task.on(
            "state_changed",
            // when upload is in progress
            snapShot => {
              // update the progress bar
              const progressBar = this.$el.querySelector("#prog");
              this.percentage = Math.floor(
                (snapShot.bytesTransferred / snapShot.totalBytes) * 100
              );
              progressBar.value = Math.floor(this.percentage);
            },
            // incase any error
            err => {
              console.error(err.message);
            },
            // when upload is completed
            () => {
              db.collection("uploadedVideos")
                .doc()
                .set({
                  title: this.title,
                  description: this.description,
                  url: null,
                  category: this.category,
                  by: this.id,
                  imgBase64: this.videoThumbnail,
                  timestamp: Date.now()
                })
                .then(() => {
                  this.task = null;
                  this.percentage = 0;
                  this.fileName = null;
                  this.evt = null;
                  this.category = "Select Category";
                  this.title = null;
                  this.description = null;
                  this.videoThumbnail = null;
                })
                .catch(err => {
                  console.error("Document write error: " + err.message);
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
    deleteVideo() {
      this.bgColor = "#fff";
      this.fontColor = "#000";
      this.borColor = "#000";
      // filtering our videos array to remove the deleted video
      // filter -> return false -> remove
      if (!this.checkUrl) {
        this.isActiveWarning = !this.isActiveWarning;
        this.isVideoInProcess = !this.isVideoInProcess;
        return;
      }
      this.videos = this.videos.filter(video => {
        // when id matches with applied id
        // below condition retuns false
        return video.id !== this.deleteId;
      });

      // hide the delete warning
      this.isActiveWarning = !this.isActiveWarning;
      this.deleteAction = true;
      this.spinner = true;
      // remove the video and video doc from db
      db.collection("uploadedVideos")
        .doc(this.deleteId)
        .get()
        .then(doc => {
          this.deleteRef = firebase.storage().refFromURL(doc.data().url);
        })
        .then(() => {
          this.deleteRef
            .delete()
            .then(() => {
              // delete video doc from db after video file delete
              db.collection("uploadedVideos")
                .doc(this.deleteId)
                .delete()
                .then(() => {
                  this.deleteId = null;
                  this.deleteRef = null;
                  this.spinner = false;
                })
                .catch(error => {
                  this.deleteAction = false;
                  this.spinner = false;
                  console.error("Error removing document: ", error.message);
                });
            })
            .catch(error => {
              this.deleteAction = false;
              this.spinner = false;
              console.error(error.message);
            });
        })
        .catch(err => {
          this.spinner = false;
          console.error(err.message);
        });
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
                  this.videoThumbnail = _CANVAS.toDataURL();
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
    colorYes() {
      this.bgColor = "#d85047";
      this.fontColor = "#fff";
      this.borColor = "#fff";
    },
    colorNo() {
      this.bgColor = "#228B22";
      this.fontColor = "#fff";
      this.borColor = "#fff";
    },
    defaultColor() {
      this.bgColor = "#fff";
      this.fontColor = "#000";
      this.borColor = "#000";
    }
  },
  mounted() {
    this.$root.$on("cancelUpload", () => {
      this.percentage = 0;
      this.fileName = null;
      this.evt = null;
      this.category = "Select Category";
      this.title = null;
      this.description = null;
      this.task = null;
    });
  }
};
</script>

<style scoped>
#main-video {
  display: none;
}
#video-canvas {
  /* display: inline;
  z-index: 0; */
  display: none;
}
.emptyBox {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.uploadActive {
  font-size: 2vw;
  color: white;
}
.showBg {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #5643fa;
}

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
  border-radius: 1.2rem;
  padding: 2rem;
  padding-top: 3.8rem;
  border: 2px solid black;
  position: relative;
  height: 650px;
  width: 45%;
  box-shadow: 0 1rem 3rem #012a57;
  background-color: #fff;
}
.warningBox {
  text-align: center;
  border-radius: 1.5rem;
  padding: 1.5rem;
  position: relative;
  max-height: 160px;
  width: 45%;
  box-shadow: 0 1rem 3rem #012a57;
  border: black 0.2rem solid;
  transition: all 0.5s ease-in;
}
.v--modal-overlay.scrollable {
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


