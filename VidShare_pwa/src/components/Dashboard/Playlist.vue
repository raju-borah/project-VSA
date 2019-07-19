<template>
  <div id="Playlist">
    <Navbar />
    <div class="dashboardplaylist">
      <!-- for playlist descrpition and other details -->
      <div>
        <!-- playlist details-->
        <div class="vcard vcard--playlist">
          <!-- the thumbnail position  vcard 1 st part-->
          <div
            class="vcard--img vcard--img--playlist1"
            :style="{backgroundImage: 'url(' +playlistDetails.thumbnail + ')',}"
          >
            <!-- the tag for video  defining the category of video-->
            <h1 class="vcard--tag vcard--tag--playlist">
              <button class="btn btn--front">Play all</button>
            </h1>
          </div>
          <!-- the division that contain the information of the video .It is the second part of the vcard -->
          <div class="vcard__info">
            <div class="vcard__info--title">
              <!-- dynamiv title of the video -->
              <span>{{playlistDetails.title}}</span>
            </div>
            <!-- timestamp when the video was created -->
            <span class="timestamp font-small">Created on: {{playlistDetails.timestamp}}</span>
            <button class="u-end-text btn btn--trans">
              <i class="fas fa-list"></i>
            </button>

            <ul class="list--option list--option--plist">
              <li
                class="list--items list--items--option"
                @click.stop="editPlaylistDetails(playlistDetails.id)"
              >
                <a class="btnlist font-xsmall">Edit Playlist details</a>
              </li>
              <li class="list--items list--items--option">
                <router-link :to="{name: 'AddVideo', params:{playlistID: playlistDetails.id}}">
                  <a class="btnlist font-xsmall">
                    Add
                    video
                  </a>
                </router-link>
              </li>
              <li class="list--items list--items--option">
                <button
                  class="btnlist btnlist--btn font-xsmall"
                  @click.stop="deletePlaylist(playlistDetails.id)"
                >Delete playlist</button>
              </li>
              <li class="list--items list--items--option">
                <button
                  class="btnlist btnlist--btn font-xsmall"
                  @click.stop="deleteAllVideos(playlistDetails.id, playlistDetails.videos)"
                >
                  Delete all the
                  video
                </button>
              </li>
            </ul>
            <br />
            <div class="font-small">
              <i class="fas fa-eye"></i> 12k views
            </div>

            <span style="font-weight: 550;">
              <b>Description:</b>
            </span>
            <br />
            <!-- dynamic descrptiob of the video -->
            <span class="vcard__info--des">{{playlistDetails.description}}</span>
          </div>
        </div>
        <!-- end of vcard -->
      </div>
      <!-- list of video on the playlist  -->
      <ul class="list hauto">
        <!-- playlist video--1 -->
        <li class="list--items" v-for="video in videoList.videos" :key="video.id">
          <!-- video cards -->
          <div class="vcard gridplaylist gridplaylist--1">
            <!-- the thumbnail position  vcard 1 st part-->
            <div
              class="vcard--img vcard--img--playlist"
              :style="{backgroundImage: 'url(' +video.thumbnail + ')',}"
              @click.stop="redirectToPlay(video.id)"
            ></div>
            <!-- the division that contain the information of the video .It is the second part of the vcard -->
            <div class="vcard__info">
              <div class="vcard__info--title">
                <!-- dynamiv title of the video -->
                <span>{{video.title}}</span>
              </div>
              <!-- timestamp when the video was created -->
              <span class="timestamp font-small">Created on:</span>
              <p class="timestamps">{{video.timestamp}}</p>
              <button class="u-end-text btn btn--trans">
                <i class="fas fa-list"></i>
              </button>
              <ul class="list list--option list--option--playlist">
                <li
                  class="list--items list--items--option"
                  @click.stop="editVideoDetails(video.id)"
                >
                  <a class="btnlist font-xsmall">Edit video details</a>
                </li>
                <li class="list--items list--items--option">
                  <button
                    class="btnlist btnlist--btn font-xsmall"
                    @click.stop="deleteVideo(video.id)"
                  >
                    Delete the
                    video
                  </button>
                </li>
                <li class="list--items list--items--option">
                  <button
                    class="btnlist btnlist--btn font-xsmall"
                    @click.stop="removeFromPlaylist(video.id)"
                  >Remove from playlist</button>
                </li>
              </ul>

              <br />
              <div class="playlist--desc">
                <span style="font-weight: 550;">
                  <b>Description:</b>
                </span>
                <!-- dynamic descrptiob of the video -->
                <span class="vcard__info--des">{{video.description}}</span>
              </div>
            </div>
          </div>
          <!-- end of vcard -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Navbar from "../Navbar/Navbar";
import db from "../../main";
export default {
  name: "Playlist",
  components: {
    Navbar
  },
  data() {
    return {
      playlistDetails: {
        title: "",
        description: "",
        by: "",
        thumbnail: "",
        timestamp: "",
        videos: [],
        id: ""
      },
      videoList: {
        videos: [],
        playlistID: ""
      }
    };
  },
  beforeCreate() {
    // get playlist details
    let vplayListref = db
      .collection("playlist")
      .doc(this.$route.params.playlistID);
    vplayListref.onSnapshot(doc => {
      let data = doc.data();
      this.playlistDetails.title = data.title;
      this.playlistDetails.description = data.description;
      this.playlistDetails.thumbnail = data.thumbnail;
      this.playlistDetails.timestamp = data.timestamp.toDate();
      this.playlistDetails.videos = data.videos;
      this.playlistDetails.id = doc.id;
      this.videoList.playlistID = doc.id;

      //get videos of the playlist

      this.videoList.videos = [];
      this.playlistDetails.videos.forEach(id => {
        db.collection("uploadedVideos")
          .doc(id)
          .get()
          .then(doc => {
            let data = doc.data();
            this.videoList.videos.push({
              title: data.title,
              description: data.description,
              thumbnail: data.thumbnail,
              id: doc.id,
              by: data.by,
              timestamp: data.timestamp.toDate()
            });
          });
      });
    });
  },
  methods: {
    editVideoDetails(id) {
      swal.fire({
        html:
          `<h1 class="font-medium u-margin-bottom-small"><i class="fas fa-edit"></i>Edit Video Details</h1>` +
          `<input type="text" class="form__input--upload form__input--upload--1" id="video-title" placeholder="Title (required, atleast 4char)">` +
          `<textarea class="form__input--upload form__input--upload--1" id="video-description" placeholder="Description"></textarea>` +
          `<select id="video-category" class="form__input--upload form__input--upload--2">
                <option value="" selected disabled>Select Category</option>
                <option value="Learning">Learning</option>
                <option value="Events">Events</option>
                <option value="Club activities">Club activities</option>
            </select><br>` +
          `<button class="btn btn--upload" type="submit" id="saveDetails">Save Changes</button>`,
        focusConfirm: false,
        showCloseButton: true,
        showConfirmButton: false,
        onOpen: dom => {
          const save = dom.querySelector("#saveDetails");
          let videoChanges = {
            title: "",
            description: "",
            category: ""
          };
          const showWarning = msg => {
            swal
              .fire({
                type: "warning",
                text: msg
              })
              .then(() => {
                this.editVideoDetails(id);
              });
          };
          save.addEventListener("click", () => {
            videoChanges.title = dom.querySelector("#video-title").value.trim();
            videoChanges.description = dom
              .querySelector("#video-description")
              .value.trim();
            videoChanges.category = dom.querySelector("#video-category").value;
            //validation
            if (videoChanges.title.trim().length >= 4) {
              // category check
              if (videoChanges.category.length > 0) {
                swal.showLoading();
                // check if title unique
                db.collection("uploadedVideos")
                  .where("by", "==", this.$store.state.uid)
                  .where("title", "==", videoChanges.title)
                  .get()
                  .then(querySnaphot => {
                    if (!querySnaphot.empty) {
                      // title exist show warning
                      showWarning(
                        "You have already uploaded the video with same title! Please give unique title to your video"
                      );
                    } else {
                      swal.close();
                      videoChanges["id"] = id;
                      this.$store.dispatch("editVideoDetails", videoChanges);
                      //update outdated video in dashboard
                      this.videoList.videos.forEach(video => {
                        // when id matches with applied id
                        if (video.id === id) {
                          video.title = videoChanges.title;
                          video.description = videoChanges.description;
                          video.category = videoChanges.category;
                          video.timestamp;
                        }
                      });
                    }
                  });
              } else {
                showWarning("Please select video category!");
              }
            } else {
              showWarning("Title cannot be less than 4char length!");
            }
          });
        }
      });
    },
    deleteVideo(id) {
      this.videoList.videos = this.videoList.videos.filter(video => {
        // when id matches with applied id
        // below condition retuns false
        return video.id !== id;
      });
      let deleteDetails = {
        id: id,
        deleteFromPlaylist: true,
        playlistID: this.videoList.playlistID
      };
      this.$store.dispatch("deleteVideo", deleteDetails);
    },
    redirectToPlay(id) {
      this.$store.dispatch("getVideo", id);
    },
    removeFromPlaylist(id) {
      this.videoList.videos = this.videoList.videos.filter(video => {
        // when id matches with applied id
        // below condition retuns false
        return video.id !== id;
      });
      let removeDetails = {
        videoID: id,
        playlistID: this.videoList.playlistID
      };
      this.$store.dispatch("removeFromPlaylist", removeDetails);
    },
    editPlaylistDetails(id) {
      swal.fire({
        html:
          `<h1 class="font-medium u-margin-bottom-small"><i class="fas fa-edit"></i>Edit Playlist Details</h1>` +
          `<input type="text" class="form__input--upload form__input--upload--1" id="video-title" placeholder="Title (required, atleast 4char)">` +
          `<textarea class="form__input--upload form__input--upload--1" id="video-description" placeholder="Description (required, atleast 4char)"></textarea><br>` +
          `<button class="btn btn--upload" type="submit" id="saveDetails">Save Changes</button>`,
        focusConfirm: false,
        showCloseButton: true,
        showConfirmButton: false,
        onOpen: dom => {
          const save = dom.querySelector("#saveDetails");
          let playlistChanges = {
            title: "",
            description: ""
          };
          const showWarning = msg => {
            swal
              .fire({
                type: "warning",
                text: msg
              })
              .then(() => {
                this.editPlaylistDetails(id);
              });
          };
          save.addEventListener("click", () => {
            playlistChanges.title = dom
              .querySelector("#video-title")
              .value.trim();
            playlistChanges.description = dom
              .querySelector("#video-description")
              .value.trim();
            //validation
            if (playlistChanges.title.trim().length >= 4) {
              // category check
              if (playlistChanges.description.trim().length >= 4) {
                swal.showLoading();
                // check if title unique
                db.collection("playlist")
                  .where("by", "==", this.$store.state.uid)
                  .where("title", "==", playlistChanges.title)
                  .get()
                  .then(querySnaphot => {
                    if (!querySnaphot.empty) {
                      // title exist show warning
                      showWarning(
                        "You have already created playlist with same title! Please give unique title to your playlist"
                      );
                    } else {
                      swal.close();
                      playlistChanges["id"] = id;
                      this.$store.dispatch(
                        "editPlaylistDetails",
                        playlistChanges
                      );
                      //update outdated playlist description in dashboard
                      this.playlistDetails.title = playlistChanges.title;
                      this.playlistDetails.description =
                        playlistChanges.description;
                    }
                  });
              } else {
                showWarning("Description cannot be less than 4char length!");
              }
            } else {
              showWarning("Title cannot be less than 4char length!");
            }
          });
        }
      });
    },
    deletePlaylist(id) {
      let toRemove = {
        id: id,
        videos: this.playlistDetails.videos
      };
      this.$store.dispatch("deletePlaylist", toRemove);
    },
    deleteAllVideos(id, videos) {
      let deleteOpt = {
        id: id,
        videoIDs: videos
      };
      this.$store.dispatch("deleteAllVideos", deleteOpt);
    }
  }
};
</script>
