<template>
  <div id="AddVideo">
    <Navbar />
    <div class="addvideo">
      <!-- floating upload button -->
      <div class="addvideo--top">
        <!-- the title  -->
        <span class="font-medium dashboard__title">Add video to playlist</span>

        <!--Search button-->

        <div class="search search--addvideo">
          <input type="text" placeholder="Search" class="search__input" required />
          <button type="button" class="search__btn" id="searchButton">
            <i class="fa fa-search search__icon" aria-hidden="true"></i>
          </button>
        </div>
        <!--seacrh button end-->
      </div>

      <div class="addvideo--mid">
        <div class="dashboard__vcontainer dashboard__vcontainer--addvideo">
          <!-- video cards -->
          <div class="vcard">
            <!-- the thumbnail position  vcard 1 st part-->
            <div class="vcard--img">
              <label class="container">
                <input type="checkbox" hidden />
                <span class="checkmark"></span>
              </label>

              <!-- the tag for video  defining the category of video-->
              <h1 class="vcard--tag vcard--tag--addvideo vcard--tag--learning">Learning</h1>
            </div>
            <!-- the division that contain the information of the video .It is the second part of the vcard -->
            <div class="vcard__info">
              <div class="vcard__info--title">
                <!-- dynamiv title of the video -->
                <span>Fun way to Learn JavaScript.</span>
              </div>
              <!-- timestamp when the video was created -->
              <span class="timestamp font-small">Created on: 15-04-2019</span>
              <br />
              <span style="font-weight: 550;">Description:</span>
              <!-- dynamic descrptiob of the video -->
              <span class="vcard__info--des">Lorem ipsum, dolor</span>
            </div>
          </div>
        </div>
      </div>

      <div class="addvideo--footer">
        <button class="btn btn--addvideo">Add Video</button>&nbsp;
        <button class="btn btn--addvideo">Cancel</button>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "../Navbar/Navbar";
import bd from "../../main";
export default {
  name: "AddVideo",
  components: {
    Navbar
  },
  data() {
    return {
      videos: []
    };
  },
  beforeCreate() {
    let vref = db
      .collection("uploadedVideos")
      .where("by", "==", this.$store.state.uid);
    vref.onSnapshot(snapshot => {
      //we will use docChanges() to get the type changes
      snapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          let doc = change.doc;
          if (!doc.data().playList) {
            if (doc.data().timestamp) {
              this.videos.push({
                //doc keeps id can retrive using;
                id: doc.id,
                // field that we have created can be retirve using;
                title: doc.data().title,
                description: doc.data().description,
                url: doc.data().url,
                category: doc.data().category,
                thumbnail: doc.data().thumbnail,
                timestamp: doc.data().timestamp.toDate()
              });
            }
          }
        }
      });
    });
  }
};
</script>

