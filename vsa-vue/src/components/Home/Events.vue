<template>
  <div id="Events">
    <section class="event" v-if="videos.length === 6">
      <div class="event__heading">
        <h3 class="event__title">EVENTS</h3>
        <a href class="event__more" @click.prevent="redirectToMore">
          <span>View More</span>
        </a>
      </div>

      <div class="grid">
        <div
          class="vcardhome vcardhome__event"
          v-for="(video, index) in videos"
          @click.stop="redirectToPlay(video.id)"
          :key="index"
        >
          <div class="vcardhome__img" :style="{backgroundImage: 'url(' +video.imgBase64 + ')'}">
            <div class="hoverbtn hoverbtn__event">
              <i class="fas fa-play-circle homeplay"></i>
            </div>
          </div>

          <div class="vcardhome__info vcardhome__info--event">
            <div class="vcardhome__info--title">
              <!-- dynamiv title of the video -->

              <span>{{video.title}}</span>
              <br>
              <!-- timestamp when the video was created -->
              <span class="timestamp font-small">{{video.timestamp}}</span>
            </div>
          </div>
        </div>
      </div>
      <span class="line"></span>
    </section>
  </div>
</template>

<script>
import db from "@/firebase/init";
import moment from "moment";
export default {
  name: "Events",
  data() {
    return {
      videos: []
    };
  },
  methods: {
    redirectToPlay(id) {
      this.$router.push({
        name: "Play",
        params: { id: id }
      });
    },
    redirectToMore() {
      this.$router.push({
        name: "More",
        params: { id: "AxE" }
      });
    }
  },
  created() {
    db.collection("homeVideos").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          if (change.doc.data().featured !== true) {
            db.collection("uploadedVideos")
              .doc(change.doc.data().id)
              .get()
              .then(doc => {
                if (doc.data().category === "Events") {
                  this.videos.push({
                    //doc keeps id can retrive using;
                    id: doc.id,
                    // field that we have created can be retirve using;
                    title: doc.data().title,
                    category: doc.data().category,
                    imgBase64: doc.data().imgBase64,
                    timestamp: moment(doc.data().timestamp).format("lll")
                  });
                }
              });
          }
        }
      });
    });
  }
};
</script>
