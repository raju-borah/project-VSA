<template>
  <div id="Learning" v-if="videos.length === 6">
    <!--Learning section-->
    <section class="learning">
      <div class="learning__heading">
        <h3 class="learning__title">LEARNING</h3>
        <a href class="learning__more" @click.prevent="redirectToMore">
          <span>View More</span>
        </a>
      </div>

      <div class="grid">
        <!-- main -->
        <div
          class="vcardhome vcardhome__learning"
          v-for="(video, index) in videos"
          @click.stop="redirectToPlay(video.id)"
          :key="index"
        >
          <div class="vcardhome__img" :style="{backgroundImage: 'url(' +video.imgBase64 + ')'}">
            <div class="hoverbtn hoverbtn__learning">
              <i class="fas fa-play-circle homeplay"></i>
            </div>
          </div>

          <div class="vcardhome__info vcardhome__info--learning">
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
  name: "Learning",
  data() {
    return {
      videos: [],
      loading: false
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
        params: { id: "AxL" }
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
                if (doc.data().category === "Learning") {
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
