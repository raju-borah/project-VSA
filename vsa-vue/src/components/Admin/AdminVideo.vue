<template>
  <div id="AdminVideo">
    <h1 class="u-center-text u-margin font-medium">Admin Videos</h1>
    <div v-if="loading">
      <h2 class="u-center-text" style="font-size:18px">Loading</h2>
    </div>
    <div class="dashboard__vcontainer" v-else>
      <!-- the videos uploaded by user will be displayed in this division along with the details -->
      <div
        class="vcard"
        v-for="video in videos"
        :key="video.id"
        @click.stop="redirectToPlay(video.id)"
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
          >
            {{video.category}}
            <!-- event to trigger delete and show warning window -->
            <button
              type="button"
              class="videodelete u-end-text btn"
              @click.stop="deleteVideo(video.id)"
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
</template>
<script>
import db from "@/firebase/init";
import moment from "moment";
export default {
  name: "AdminVideo",
  data() {
    return {
      videos: [],
      loading: false
    };
  },
  methods: {
    redirectToPlay(id) {
      let routeData = this.$router.resolve({
        name: "Play",
        params: { id: id }
      });
      window.open(routeData.href, "_blank");
    },
    deleteVideo(id) {
      let del = confirm("Are you sure ?");
      if (del) {
        db.collection("uploadedVideos")
          .doc(id)
          .delete()
          .then(() => {
            alert("Delete Success!");
            this.videos = this.videos.filter(video => {
              return video.id !== id;
            });
          });
      }
    }
  },
  created() {
    this.loading = true;
    db.collection("uploadedVideos")
      .where("by", "==", "Admin")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            this.videos.push({
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
        });
        this.loading = false;
      });
  }
};
</script>

