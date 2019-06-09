<template>
  <div id="ManageHomePage">
    <div v-if="loading">
      <h2 class="u-center-text" style="font-size:18px">Loading</h2>
    </div>
    <div v-else>
      <h2 class="font-medium u-margin-bottom-small">Featured Videos</h2>
      <ul class="adminlist">
        <li
          v-for="(video, index) in featuredArr"
          :key="index"
          class="userlitem u-center-text"
          @click.stop="featuredArrRemove(video.id)"
        >
          {{video.title}}
          <i class="far fa-times-circle"></i>
        </li>
        <li class="u-center-text">
          <button class="btn" @click.stop="addHomeFeatured">Add to Home Featured Section</button>
        </li>
      </ul>
      <!-- learn -->

      <h2 class="font-medium u-margin-bottom-small">Learning</h2>
      <ul class="adminlist">
        <li
          v-for="(video, index) in learnArr"
          :key="index"
          class="userlitem u-center-text"
          @click.stop="learnArrRemove(video.id)"
        >
          {{video.title}}
          <i class="far fa-times-circle"></i>
        </li>
        <li class="u-center-text">
          <button class="btn" @click.stop="addHomeLearn">Add to Home Learning Section</button>
        </li>
      </ul>
      <div class="dashboard__vcontainer">
        <!-- the videos uploaded by user will be displayed in this division along with the details -->
        <div class="vcard" v-for="(video,index) in videosLearning" :key="index">
          <div class="vcard--img" :style="{backgroundImage: 'url(' +video.imgBase64 + ')',}">
            <!-- the tag for video -->
            <h1 class="vcard--tag--learning">
              {{video.category}}
              <button class="btn" @click.stop="homeLearn(video)">Add to Home</button>
              <button class="btn" @click.stop="homeFeatured(video)">Add to Featured</button>
            </h1>
          </div>

          <div class="vcard__info" @click.stop="redirectToPlay(video.id)">
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

      <!-- Events -->
      <h2 class="font-medium u-margin-bottom-small">Events</h2>'
      <ul class="adminlist">
        <li
          v-for="(video, index) in eventArr"
          :key="index"
          class="userlitem u-center-text"
          @click.stop="eventArrRemove(video.id)"
        >
          {{video.title}}
          <i class="far fa-times-circle"></i>
        </li>
        <li class="u-center-text">
          <button class="btn" @click.stop="addHomeEvent">Add to Home Event Section</button>
        </li>
      </ul>
      <div class="dashboard__vcontainer">
        <!-- the videos uploaded by user will be displayed in this division along with the details -->
        <div
          class="vcard"
          v-for="video in videosEvent"
          :key="video.id"
          @click.stop="redirectToPlay(video.id)"
        >
          <div class="vcard--img" :style="{backgroundImage: 'url(' +video.imgBase64 + ')',}">
            <!-- the tag for video -->
            <h1 class="vcard--tag--event">
              {{video.category}}
              <button class="btn" @click.stop="homeEvent(video)">Add to Home</button>
              <button class="btn" @click.stop="homeFeatured(video)">Add to Featured</button>
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

      <!-- Club -->

      <h2 class="font-medium u-margin-bottom-small">Club Activites</h2>
      <ul class="adminlist">
        <li
          v-for="(video, index) in clubArr"
          :key="index"
          class="userlitem u-center-text"
          @click.stop="clubArrRemove(video.id)"
        >
          {{video.title}}
          <i class="far fa-times-circle"></i>
        </li>
        <li class="u-center-text">
          <button class="btn" @click.stop="addHomeClub">Add to Home Club Section</button>
        </li>
      </ul>
      <div class="dashboard__vcontainer">
        <!-- the videos uploaded by user will be displayed in this division along with the details -->
        <div
          class="vcard"
          v-for="video in videosClub"
          :key="video.id"
          @click.stop="redirectToPlay(video.id)"
        >
          <div class="vcard--img" :style="{backgroundImage: 'url(' +video.imgBase64 + ')',}">
            <!-- the tag for video -->
            <h1 class="vcard--tag--club">
              {{video.category}}
              <button class="btn" @click.stop="homeClub(video)">Add to Home</button>
              <button class="btn" @click.stop="homeFeatured(video)">Add to Featured</button>
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
  </div>
</template>
<script>
import db from "@/firebase/init";
import moment from "moment";

export default {
  name: "ManageHomePage",
  data() {
    return {
      videosLearning: [],
      videosClub: [],
      videosEvent: [],
      loading: false,
      learnArr: [],
      eventArr: [],
      clubArr: [],
      featuredArr: []
    };
  },
  methods: {
    learnArrRemove(id) {
      this.learnArr = this.learnArr.filter(video => {
        return video.id !== id;
      });
    },
    homeLearn(video) {
      if (this.learnArr.length < 6) {
        this.learnArr.push(video);
      } else {
        alert("Cannot select more than 6 (Learn)");
      }
    },
    eventArrRemove(id) {
      this.eventArr = this.eventArr.filter(video => {
        return video.id !== id;
      });
    },
    clubArrRemove(id) {
      this.clubArr = this.clubArr.filter(video => {
        return video.id !== id;
      });
    },
    featuredArrRemove(id) {
      this.featuredArr = this.featuredArr.filter(video => {
        return video.id !== id;
      });
    },
    addHomeLearn() {
      if (this.learnArr.length === 6) {
        db.collection("homeVideos")
          .doc("homeLearn1")
          .set({
            id: this.learnArr[0].id
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeLearn2")
              .set({
                id: this.learnArr[1].id
              });
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeLearn3")
              .set({
                id: this.learnArr[2].id
              });
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeLearn4")
              .set({
                id: this.learnArr[3].id
              });
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeLearn5")
              .set({
                id: this.learnArr[4].id
              });
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeLearn6")
              .set({
                id: this.learnArr[5].id
              });
          })
          .then(() => {
            alert("Added to Home(Learn) Success");
            this.learnArr = [];
          })
          .catch(err => {
            console.err(err.message);
          });
      } else {
        alert("Please Select 6 video!");
      }
    },
    addHomeEvent() {
      if (this.eventArr.length === 6) {
        db.collection("homeVideos")
          .doc("homeEvent1")
          .set({
            id: this.eventArr[0].id
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeEvent2")
              .set({
                id: this.eventArr[1].id
              });
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeEvent3")
              .set({
                id: this.eventArr[2].id
              });
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeEvent4")
              .set({
                id: this.eventArr[3].id
              });
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeEvent5")
              .set({
                id: this.eventArr[4].id
              });
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeEvent6")
              .set({
                id: this.eventArr[5].id
              });
          })
          .then(() => {
            alert("Added to Home(Event) Success");
            this.eventArr = [];
          })
          .catch(err => {
            console.err(err.message);
          });
      } else {
        alert("Please Select 6 video!");
      }
    },
    addHomeClub() {
      if (this.clubArr.length === 6) {
        db.collection("homeVideos")
          .doc("homeClub1")
          .set({
            id: this.clubArr[0].id
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeClub2")
              .set({
                id: this.clubArr[1].id
              });
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeClub3")
              .set({
                id: this.clubArr[2].id
              });
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeClub4")
              .set({
                id: this.clubArr[3].id
              });
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeClub5")
              .set({
                id: this.clubArr[4].id
              });
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeClub6")
              .set({
                id: this.clubArr[5].id
              });
          })
          .then(() => {
            alert("Added to Home(Club) Success");
            this.clubArr = [];
          })
          .catch(err => {
            console.err(err.message);
          });
      } else {
        alert("Please Select 6 video!");
      }
    },
    homeEvent(video) {
      if (this.eventArr.length < 6) {
        this.eventArr.push(video);
      } else {
        alert("Cannot select more than 6 (Event)");
      }
    },
    homeClub(video) {
      if (this.clubArr.length < 6) {
        this.clubArr.push(video);
      } else {
        alert("Cannot select more than 6 (Club)");
      }
    },
    homeFeatured(video) {
      if (this.featuredArr.length < 3) {
        this.featuredArr.push(video);
      } else {
        alert("Cannot select more than 3 (Featured Videos)");
      }
    },
    addHomeFeatured() {
      if (this.featuredArr.length === 3) {
        db.collection("homeVideos")
          .doc("homeFeature1")
          .set({
            id: this.featuredArr[0].id,
            featured: true
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeFeature2")
              .set({
                id: this.featuredArr[1].id,
                featured: true
              });
          })
          .then(() => {
            db.collection("homeVideos")
              .doc("homeFeature3")
              .set({
                id: this.featuredArr[2].id,
                featured: true
              });
          })
          .then(() => {
            alert("Added to Home(Featured Video) Success");
            this.featuredArr = [];
          })
          .catch(err => {
            console.err(err.message);
          });
      } else {
        alert("Please Select 3 video!");
      }
    },
    redirectToPlay(id) {
      let routeData = this.$router.resolve({
        name: "Play",
        params: { id: id }
      });
      window.open(routeData.href, "_blank");
    }
  },
  created() {
    this.loading = true;
    db.collection("uploadedVideos")
      .where("by", "==", "Admin")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            if (change.doc.data().category === "Learning") {
              this.videosLearning.push({
                //doc keeps id can retrive using;
                id: change.doc.id,
                // field that we have created can be retirve using;
                title: change.doc.data().title,
                description: change.doc.data().description,
                url: change.doc.data().url,
                category: change.doc.data().category,
                imgBase64: change.doc.data().imgBase64,
                timestamp: moment(change.doc.data().timestamp).format("lll")
              });
            } else if (change.doc.data().category === "Events") {
              this.videosEvent.push({
                //doc keeps id can retrive using;
                id: change.doc.id,
                // field that we have created can be retirve using;
                title: change.doc.data().title,
                description: change.doc.data().description,
                url: change.doc.data().url,
                category: change.doc.data().category,
                imgBase64: change.doc.data().imgBase64,
                timestamp: moment(change.doc.data().timestamp).format("lll")
              });
            } else {
              this.videosClub.push({
                //doc keeps id can retrive using;
                id: change.doc.id,
                // field that we have created can be retirve using;
                title: change.doc.data().title,
                description: change.doc.data().description,
                url: change.doc.data().url,
                category: change.doc.data().category,
                imgBase64: change.doc.data().imgBase64,
                timestamp: moment(change.doc.data().timestamp).format("lll")
              });
            }
          }
        });
        this.loading = false;
      });
  },
  mounted() {}
};
</script>


