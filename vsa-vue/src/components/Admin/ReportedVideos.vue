<template>
  <div id="ReportedVideos">
    <div class="reportpage">
      <!-- title -->
      <h1 class="u-center-text u-margin font-medium">Reported Videos</h1>

      <div class="dashboard__vcontainer">
        <!-- the videos uploaded by user will be displayed in this division along with the details -->

        <!-- video cards -->
        <div class="vcard" v-if="loading">
          <h2>Loading...</h2>
        </div>
        <div class="vcard" v-for="video in videos" :key="video.reportID" @click.stop="redirectToPlay(video.videoID)" v-else >
          <!-- the division that contain the information of the video .It is the second part of the vcard -->
          <div class="vcard__info">
            <div class="vcard__info--title">
              <!-- dynamiv title of the video -->
              <span>{{video.videoTitle}}</span>
            </div>
            <span>By:</span>
            <!-- dismiss button -->
            <button type="button" class="u-end-text btn" @click.stop="dismiss(video.reportID)">
              <i class="far fa-check-square"></i>
            </button>
            <br>
            <!-- the delete button  -->
            <button type="button" class="u-end-text btn" @click.stop="deleteVideo(video.videoID, video.reportID)">
              <i class="fas fa-trash-alt font-small"></i>
            </button>

            <br>
            <span>
              <b>{{video.by}}@kazirangauniversity.in</b>
            </span>
            <br>
            <span style="font-weight: 550;">Report Reason:(reported by {{video.reportedBy}})</span>
            <!-- dynamic descrptiob of the video -->
            <span class="vcard__info--report">{{video.reason}}</span>
          </div>
        </div>

        <!-- end of vcard -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from "@/firebase/init";
export default {
  name: "ReportedVideos",
  data() {
    return {
      videos: [],
      loading: false
    };
  },
  methods: {
    redirectToPlay(id) {
      let routeData = this.$router.resolve({name: "Play", params: { id: id } });
      window.open(routeData.href, '_blank');
    },
    dismiss(id, vid = null){
      const redo = id => {
        this.videos = this.videos.filter(video => {
        // when id matches with applied id
        // below condition retuns false
        return video.reportID !== id;
       });
      }

      db.collection('reportedVideos').doc(id).delete().then(() => {
        redo(id);
        if(vid !== null) {
          console.log('heer', vid)
          db.collection('reportedVideos').where('videoID', '==', vid).get().then(snapshot => {
            snapshot.forEach(doc => {
              db.collection('reportedVideos').doc(doc.id).delete();
              redo(doc.id)
            })
          })
        }
      });
    },
    deleteVideo(id, rid){
      this.loading = true;
      db.collection("uploadedVideos")
        .doc(id)
        .get()
        .then(doc => {
          firebase.storage().refFromURL(doc.data().url).delete().then(() => {
            db.collection("uploadedVideos")
                .doc(id)
                .delete()
                .then(() => {
                  this.dismiss(rid, id);
                  this.loading = false;
                  alert('Video Deleted!');
                })
                .catch(err => {
                  this.loading = false;                  
                  alert(err.message);
                  console.error(err.message);
                })
          })
        })
        .catch(err => {
          this.loading = false;
          console.error(err.message);
        })
    }
  },
  created() {
    this.loading = true;
    db.collection("reportedVideos").onSnapshot(snapshot => {
      //we will use docChanges() to get the type changes
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          this.videos.push({
            by: change.doc.data().by,
            reason: change.doc.data().reason,
            url: change.doc.data().url,
            videoID: change.doc.data().videoID,
            videoTitle: change.doc.data().videoTitle,
            reportedBy: change.doc.data().reportedBy,
            reportID: change.doc.id
          });
        } else if (change.type === "modified") {
          this.videos.push({
            by: change.doc.data().by,
            reason: change.doc.data().reason,
            url: change.doc.data().url,
            videoID: change.doc.data().videoID,
            videoTitle: change.doc.data().videoTitle,
            reportedBy: change.doc.data().reportedBy,
            reportID: change.doc.id
          });
        }
      });
      this.loading = false;
    });
  }
};
</script>

