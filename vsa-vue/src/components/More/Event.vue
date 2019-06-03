<template>
  <div id="Play" :class="{'showBg' : spinner}">
    <div v-if="spinner">
      <half-circle-spinner :animation-duration="1000" :size="100" :color="'#FFFFFF'"/>
    </div>
    <div v-else>
      <div id="Event">
        <div v-if="videos.length > 0" class="EventBody grid2">
          <div>
            <div
              class="vcardmore"
              v-for="video in videos"
              :key="video.id"
              @click="redirectToPlay(video)"
            >
              <div class="vcard--img" :style="{backgroundImage: 'url(' +video.imgBase64 + ')',}">
                <div class="playicon">
                  <i class="fas fa-play-circle"></i>
                </div>
              </div>
              <h1 class="vcardmore--tag vcardmore--tag colorclub">Event</h1>
              <div class="vcardmore__info">
                <div class="vcardmore__info--title textclub">
                  <!-- dynamiv title of the video -->
                  <span>{{video.title}}</span>
                  <br>
                  <!-- timestamp when the video was created -->
                  <span class="timestamp font-small">Created on: {{video.timestamp}}</span>
                </div>

                <span style="font-weight: 550;">Description:</span>
                <!-- dynamic descrptiob of the video -->
                <span class="vcardmore__info--des">{{video.description}}</span>
              </div>
            </div>
          </div>
          <!--add more videos from here-->
        </div>
        <div v-else style="text-align:center">
          <p style="font-size: 2.8vw; color: grey;">No Videos Found 0_0 !</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
import moment from "moment";
import { HalfCircleSpinner } from "epic-spinners";

export default {
  name: "Club",
  components: {
    HalfCircleSpinner
  },
  data() {
    return {
      videos: [],
      spinner: false
    };
  },
  methods: {
    redirectToPlay(video) {
      if (video.url) {
        this.$router.push({ name: "Play", params: { id: video.id } });
      }
    }
  },
  created() {
    this.spinner = true;
    db.collection("uploadedVideos")
      .where("category", "==", "Event")
      .onSnapshot(snapshot => {
        //we will use docChanges() to get the type changes
        if (snapshot.size === 0) this.spinner = false;
        snapshot.docChanges().forEach(change => {
          if (change.type === "modified") {
            let doc = change.doc;
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
              // base 64 value for thumbnail -> actual image
              imgBase64: doc.data().imgBase64,
              // date formated to local using moment js
              timestamp: moment(doc.data().timestamp).format("lll")
            });
          }
          this.spinner = false;
        });
      });
  }
};
</script>
<style scoped>
.showBg {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #5643fa;
}
</style>
