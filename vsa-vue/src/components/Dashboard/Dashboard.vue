<template>
  <div id="Dashboard" :class="{'showBg' : spinner}">
    <!-- navigation bar -->
    <!-- nested nav required -->
    <div v-if="spinner">
      <half-circle-spinner :animation-duration="1000" :size="100" :color="'#FFFFFF'"/>
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
            <div class="vcard--img">
              <!-- the tag for video -->
              <h1 class="vcard--tag vcard--tag--dashboard">
                {{video.category}}
                <!-- event to trigger delete and show warning window -->
                <button
                  type="button"
                  class="videodelete u-end-text btn"
                  @click="warningDisplay(video.id)"
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
      spinner: false,
      activeModal: null,
      evt: null,
      percentage: 0,
      stop: false,
      fileName: null,
      task: null,
      url: null,
      id: null,
      videos: [],
      isActiveUpload: false,
      isActiveWarning: false,
      isUploadActive: false,
      category: "Select Category",
      title: null,
      description: null,
      errMsgTitle: null,
      deleteId: null,
      deleteRef: null,
      bgColor: "#fff",
      fontColor: "#000",
      borColor: "#000"
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
            .where("title", "==", this.title)
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
    warningDisplay(id) {
      this.isActiveWarning = !this.isActiveWarning;
      this.deleteId = id;
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
    upload() {
      if (
        this.errMsgTitle === null &&
        this.category !== null &&
        this.category !== "Select Category"
      ) {
        if (this.evt) {
          let file = this.evt.target.files[0];
          this.fileName = file.name;
          // create a storage ref
          let storageRef = firebase
            .storage()
            .ref("video/" + this.id + "/" + this.title);
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
              storageRef
                .getDownloadURL()
                .then(url => {
                  this.url = url;
                  db.collection("uploadedVideos")
                    .doc()
                    .set({
                      title: this.title,
                      description: this.description,
                      url: this.url,
                      category: this.category,
                      by: this.id,
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
        if (this.errMsgTitle) {
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
      this.videos = this.videos.filter(video => {
        // when id matches with applied id
        // below condition retuns false
        return video.id !== this.deleteId;
      });

      // hide the delete warning
      this.isActiveWarning = !this.isActiveWarning;
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
                  this.spinner = false;
                  console.error("Error removing document: ", error.message);
                });
            })
            .catch(error => {
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
      const realFileBtn = this.$el.querySelector("#upload-file");
      const customText = this.$el.querySelector(".custom-text");
      realFileBtn.click();

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


