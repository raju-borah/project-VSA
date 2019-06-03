<template>
  <div id="Search" :class="{'showBg' : spinner}">
    <div v-if="spinner">
      <half-circle-spinner :animation-duration="1000" :size="100" :color="'#FFFFFF'"/>
      <p class="uploadActive">Searching</p>
    </div>
    <div v-else>
      <Navbar/>
      <div v-if="videos.length > 0 && query === ''" class="dashboard__vcontainer">
        <div
          class="vcard"
          v-for="video in videos"
          :key="video.id"
          @click.stop="redirectToPlay(video)"
        >
          <div class="vcard--img" :style="{backgroundImage: 'url(' +video.imgBase64 + ')',}">
            <!-- the tag for video -->
            <h1
              class="vcard--tag vcard--tag--dashboard"
              :class="{
                'vcard--tag--learning': video.category === 'Learning', 
                'vcard--tag--event': video.category === 'Events', 
                'vcard--tag--club': video.category === 'Club activities'
                }"
            >{{video.category}}</h1>
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
      <div v-else class="notFound">
        <p style="font-size: 1.8vw; color: grey;">No videos found !! (^0^)</p>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar";
import db from "@/firebase/init";
import moment from "moment";
import { HalfCircleSpinner } from "epic-spinners";

export default {
  name: "Seacrh",
  components: {
    Navbar,
    HalfCircleSpinner
  },
  data() {
    return {
      query: "",
      videos: [],
      spinner: false
    };
  },
  methods: {
    redirectToPlay(video) {
      this.$router.push({ name: "Play", params: { id: video.id } });
    }
  },
  watch: {
    "$route.params.id": function() {
      this.spinner = true;
      // this.$router.go(0);
      console.log("here"+ this.query.length)
        this.query = this.$route.params.id.toUpperCase();
        this.videos = [];
        db.collection("uploadedVideos")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.videos.push({
                //doc keeps id can retrive using;
                id: doc.id,
                // field that we have created can be retirve using;
                searchTitle: doc.data().title.toUpperCase(),
                title: doc.data().title,
                description: doc.data().description,
                url: doc.data().url,
                category: doc.data().category,
                imgBase64: doc.data().imgBase64,
                timestamp: moment(doc.data().timestamp).format("lll")
              });
            });
          })
          .then(() => {
            this.videos = this.videos.filter(video => {
              return video.searchTitle.match(this.query);
            });
            this.spinner = false;
            this.query = "";
          })
          .catch(err => {
            this.spinner = false;
            console.error(err);
          });
      }
    
  },
  beforeMount() {
    this.spinner = true;

    this.query = this.$route.params.id.toUpperCase();
    db.collection("uploadedVideos")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.videos.push({
            //doc keeps id can retrive using;
            id: doc.id,
            // field that we have created can be retirve using;
            searchTitle: doc.data().title.toUpperCase(),
            title: doc.data().title,
            description: doc.data().description,
            url: doc.data().url,
            category: doc.data().category,
            imgBase64: doc.data().imgBase64,
            timestamp: moment(doc.data().timestamp).format("lll")
          });
        });
      })
      .then(() => {
        this.videos = this.videos.filter(video => {
          return video.searchTitle.match(this.query);
        });
        this.spinner = false;
        this.query = "";
      })
      .catch(err => {
        this.spinner = false;
        console.error(err);
      });
  }
  // updated() {
  //   this.query = this.$route.params.id;
  // },
  // mounted() {
  //   if (!this.videos) console.log("empty");
  //   this.videos.forEach(video => {
  //     console.log(video);
  //   });
  // }
};
</script>

<style>
.showBg {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #5643fa;
}
.notFound {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.uploadActive {
  font-size: 1.5vw;
  color: white;
}
</style>
