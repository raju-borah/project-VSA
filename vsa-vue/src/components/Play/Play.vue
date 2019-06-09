<template>
  <div id="Play" :class="{'showBg' : spinner}">
    <div v-if="spinner">
      <half-circle-spinner :animation-duration="1000" :size="100" :color="'#FFFFFF'"/>
    </div>
    <div v-else>
      <Navbar/>
      <!-- play page when user click the video card thwn this page will open with respective video that user ha clicked -->
      <div class="player">
        <!-- grid of video player -->
        <div class="player__container">
          <!-- division of video player -->
          <div class="player__container--1">
            <!-- video player of video.js -->
            <video-player v-if="show" id="my-video" :options="videoOptions"/>
          </div>
        </div>

        <!-- grid for the below section -->
        <div class="play__grid">
          <!-- image of the user that has uplodede the video  -->
          <div class="uploader-image">
            <img class="profile--image" src="../../assets/img/man.png" v-if="!pic">
            <img class="profile--image" :src="pic" v-else>
          </div>
          <div class="user-name">
            <!-- the that have uploaded the video -->
            <span v-if="name" style="font-size: 3rem;font-weight: bold;">{{name}}</span>
            <br>
            <span v-if="video">{{this.video.by}}</span>
          </div>

          <!-- suggested videos -->
          <!-- db suggested video -->
          <div class="suggest">
            <h1>Suggested Videos</h1>
            <!--list define is utilities -->
            <ul class="list">
              <li
                class="list--items"
                v-for="videosg in suggestedVideos"
                :key="videosg.id"
                @click="redirectToPlay(videosg)"
              >
                <!-- video cards -->
                <div class="vcard">
                  <!-- the thumbnail position  vcard 1 st part-->
                  <div
                    class="vcard--img"
                    :style="{backgroundImage: 'url(' +videosg.imgBase64 + ')'}"
                  >
                    <!-- the tag for video  defining the category of video-->
                    <h1
                      class="vcard--tag vcard--tag"
                      :class="{
                'vcard--tag--learning': video.category === 'Learning', 
                'vcard--tag--event': video.category === 'Events', 
                'vcard--tag--club': video.category === 'Club activities'
                }"
                    >{{videosg.category}}</h1>
                  </div>
                  <!-- the division that contain the information of the video .It is the second part of the vcard -->
                  <div class="vcard__info">
                    <div class="vcard__info--title">
                      <!-- dynamiv title of the video -->
                      <span>{{videosg.title}}</span>
                    </div>
                  </div>
                </div>
                <!-- end of vcard -->
              </li>
            </ul>
          </div>

          <!-- video titles and descrptions in the play page -->
          <div class="videoinfo">
            <!-- video title -->
            <div class="font-medium" id="video-title" v-if="video">
              {{video.title}}
              <button
                class="reportbtn font-medium"
                @click="showReportModal"
                v-if="video.by !== 'Admin'"
              >
                <i class="fas fa-exclamation-circle"></i>
                <span class="tooltiptext1">Report</span>
              </button>
            </div>
            <!-- description -->
            <div class="font-small" id="video-description" v-if="video">{{video.description}}</div>
          </div>
          <!-- comment section -->
          <!-- db comment section -->
          <div class="video__comments">
            <div class="font-medium">Comments</div>
            <div class="user-name">
              <!-- the user that is SIGNED IN-->
              <span>{{signedUser}}</span>
            </div>

            <div v-if="signedEmail">
              <!-- input field for the comment -->
              <input
                type="text"
                class="form__input form__input--comment"
                placeholder="Enter comment"
                required
                ref="commentField"
              >
              <!-- button to send the comment  -->
              <button class="btn btn--comment" @click="comment">
                send
                <i class="far fa-arrow-alt-circle-right"></i>
              </button>
            </div>
            <br>
            <br>
            <!-- user comments list -->
            <!-- v-if conditional required -->
            <ul class="comment--area list">
              <!-- if no comments ais there then display the li -->
              <li
                class="font-medium u-center-text u-margin-top"
                v-if="!displayComment"
              >... NO Comments Available...</li>

              <!-- contains the user comments and username -->
              <li class="list--items" v-else v-for="(comment,index) in comments" :key="index">
                <!-- card to hold the data of the user and comment given by him -->
                <div class="comment--card">
                  <!-- username -->
                  <div class="comment--card--commenter">
                    <!-- username -->
                    <span class="font-small">{{comment.commentedBy}}</span>
                    <br>
                    <!-- email id -->
                    <span class="font-xsmall">{{comment.email}}</span>
                  </div>
                  <!-- comment given by the user -->
                  <div class="comment--card--comments">{{comment.comment}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- play warning if video is still under process -->
      <transition name="fade">
        <div
          id="uploadActiveModal"
          class="v--modal-overlay scrollable"
          @click.self="handleBackgroundClickVideo"
          v-if="showModal"
        >
          <p
            class="uploadActive"
          >Video is still under process, wait for it to finish before playing ^.^!</p>
        </div>
      </transition>
      <!-- report modal -->
      <transition name="fade">
        <div
          class="v--modal-overlay scrollable"
          @click.self="handleBackgroundClick"
          v-if="showReport"
        >
          <form class="testBox">
            <textarea
              class="form__input--upload form__input--upload--1"
              id="upload-description"
              placeholder="Reason"
              v-model="report"
              style="resize:none; height:45%"
            ></textarea>
            <!-- button that will start the process of upload the file to server -->
            <button
              class="btn btn--upload"
              type="submit"
              id="upload-video"
              @click.prevent="submitReport"
            >Report</button>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import moment from "moment";
import { HalfCircleSpinner } from "epic-spinners";
import Navbar from "@/components/Navbar/Navbar";

export default {
  name: "Play",
  components: {
    VideoPlayer,
    HalfCircleSpinner,
    Navbar
  },
  data() {
    return {
      signedUser: null,
      signedEmail: null,
      name: null,
      show: false,
      pic: null,
      displayComment: false,
      spinner: false,
      suggestedCategory: null,
      suggestedVideos: [],
      comments: [],
      showModal: false,
      showReport: false,
      report: null,
      video: null,
      videoOptions: {
        autoplay: true,
        controls: true,
        preload: "auto",
        fluid: true,
        playbackRates: [1, 1.5, 2],
        sources: [
          {
            src: null,
            type: "video/mp4"
          }
        ]
      }
    };
  },
  methods: {
    showReportModal() {
      this.showReport = true;
    },
    handleBackgroundClick() {
      this.showReport = false;
      this.report = null;
    },
    submitReport() {
      if (this.report) {
        this.showReport = false;
        db.collection("reportedVideos")
          .doc()
          .set({
            reason: this.report,
            videoTitle: this.video.title,
            by: this.video.by,
            videoID: this.$route.params.id,
            url: this.video.url,
            reportedBy: this.signedEmail
          })
          .then(() => {
            this.report = null;
            alert("Report Success");
          })
          .catch(err => {
            console.error(err.message);
          });
      }
    },
    redirectToPlay(video) {
      if (video.url) {
        this.$router.push({ name: "Play", params: { id: video.id } });
        this.$router.go(0);
        window.scrollTo(0, 0);
      } else {
        this.showModal = !this.showModal;
      }
    },
    handleBackgroundClickVideo() {
      this.showModal = !this.showModal;
    },
    comment() {
      const commented = this.$refs.commentField;
      if (/([^\s])/.test(commented.value)) {
        db.collection("comments")
          .doc()
          .set({
            commentedBy: this.signedUser,
            email: this.signedEmail,
            comment: commented.value,
            video: this.$route.params.id
          })
          .then((commented.value = ""));
      }
    }
  },
  created() {
    const getName = usr => {
      let ref = db.collection("validuser");
      ref = ref
        .where("email", "==", usr.email)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.signedUser = doc.data().name;
          });
        });
    };
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let usr = user;
        this.signedEmail = user.email;
        getName(usr);
      }
    });

    this.spinner = true;
    // get the play video details
    db.collection("uploadedVideos")
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        this.video = doc.data();
        this.suggestedCategory = doc.data().category;
        this.videoOptions.sources[0].src = doc.data().url;
        this.show = true;
        this.spinner = false;
      })
      .then(() => {
        if (this.video.by !== "Admin") {
          db.collection("validuser")
            .doc(this.video.by)
            .get()
            .then(doc => {
              this.name = doc.data().name;
              this.pic = doc.data().profilePic;
            })
            .catch(err => {
              console.log("err: " + err.message);
            });
        } else {
          this.name = this.video.by;
        }
      })
      .then(() => {
        let ref = db
          .collection("uploadedVideos")
          .where("category", "==", this.suggestedCategory);
        ref.onSnapshot(
          snapshot => {
            //we will use docChanges() to get the type changes
            snapshot.docChanges().forEach(change => {
              // let doc = change.doc;
              if (change.type === "modified") {
                this.suggestedVideos = this.suggestedVideos.filter(video => {
                  // when id matches with applied id
                  // below condition retuns false
                  return video.id !== change.doc.id;
                });
                if (!(this.$route.params.id == change.doc.id)) {
                  this.suggestedVideos.push({
                    //doc keeps id can retrive using;
                    id: change.doc.id,
                    // field that we have created can be retirve using;
                    title: change.doc.data().title,
                    description: change.doc.data().description,
                    url: change.doc.data().url,
                    category: change.doc.data().category,
                    imgBase64: change.doc.data().imgBase64
                  });
                }
              }
              if (change.type === "added") {
                if (!(this.$route.params.id == change.doc.id)) {
                  this.suggestedVideos.push({
                    //doc keeps id can retrive using;
                    id: change.doc.id,
                    // field that we have created can be retirve using;
                    title: change.doc.data().title,
                    description: change.doc.data().description,
                    url: change.doc.data().url,
                    category: change.doc.data().category,
                    imgBase64: change.doc.data().imgBase64
                  });
                }
              }
            });
          },
          err => {
            this.spinner = false;
            console.log("err: " + err.message);
          }
        );
      })
      .catch(err => {
        this.spinner = false;
        console.log("err: " + err.message);
        this.$router.push({ name: "PageNotFound" });
      });

    let refComment = db
      .collection("comments")
      .where("video", "==", this.$route.params.id);

    refComment.onSnapshot(snapshot => {
      //we will use docChanges() to get the type changes
      snapshot.docChanges().forEach(change => {
        let doc = change.doc;
        if (change.type === "added") {
          this.displayComment = true;
          this.comments.push({
            commentedBy: doc.data().commentedBy,
            email: doc.data().email,
            comment: doc.data().comment
          });
        }
      });
    });
  }
};
</script>

<style scoped>
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
.testBox {
  text-align: center;
  border-radius: 1.2rem;
  padding: 2rem;
  padding-top: 3.8rem;
  border: 2px solid black;
  position: relative;
  height: 250px;
  width: 45%;
  box-shadow: 0 1rem 3rem #012a57;
  background-color: #fff;
}
</style>

