<template>
  <div id="Featured">
    <!--Featured section-->
    <section class="feature" v-if="videos.length === 3">
      <div class="feature__container">
        <div class="feature__heading" data-aos="zoom-in-up" data-aos-duration="1000">
          <h3>Featured Videos</h3>
          <span class="feature__left-line"></span>
          <span>
            <i class="fas fa-play"></i>
          </span>
          <span class="feature__right-line"></span>
        </div>

        <!-- main -->
        <div class="feature__contents">
          <div
            class="vcardhome"
            data-aos="fade-right"
            data-aos-duration="1000"
            v-for="(video,index) in videos"
            @click.stop="redirectToPlay(video.id)"
            :key="index"
            :class="{
                'vcardhome__learning': video.category === 'Learning', 
                'vcardhome__event': video.category === 'Events', 
                'vcardhome__club': video.category === 'Club activities'
                }"
          >
            <div class="vcardhome__img" :style="{backgroundImage: 'url(' +video.imgBase64 + ')'}">
              <div
                class="hoverbtn"
                :class="{
                'hoverbtn__learning': video.category === 'Learning', 
                'hoverbtn__event': video.category === 'Events', 
                'hoverbtn__club': video.category === 'Club activities'
                }"
              >
                <i class="fas fa-play-circle homeplay"></i>
              </div>
            </div>

            <div
              class="vcardhome__info"
              :class="{
                'vcardhome__info--learning': video.category === 'Learning', 
                'vcardhome__info--event': video.category === 'Events', 
                'vcardhome__info--club': video.category === 'Club activities'
                }"
            >
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
      </div>
    </section>
  </div>
</template>

<script>
import db from "@/firebase/init";
import moment from "moment";
export default {
  name: "Featured",
  data() {
    return {
      videos: [],
    };
  },
  methods: {
    redirectToPlay(id) {
      this.$router.push({
        name: "Play",
        params: { id: id }
      });
    }
  },
  created() {
    db.collection("homeVideos").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          if (change.doc.data().featured === true) {
            db.collection("uploadedVideos")
              .doc(change.doc.data().id)
              .get()
              .then(doc => {
                this.videos.push({
                  //doc keeps id can retrive using;
                  id: doc.id,
                  // field that we have created can be retirve using;
                  title: doc.data().title,
                  category: doc.data().category,
                  imgBase64: doc.data().imgBase64,
                  timestamp: moment(doc.data().timestamp).format("lll")
                });
              });
          }
        }
      });
    });
  }
};
</script>
