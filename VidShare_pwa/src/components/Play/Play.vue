<template>
  <div id="Play">
    <div class="player">
      <Navbar />
      <!-- play page when user click the video card thwn this page will open with respective video that user ha clicked -->
      <!-- grid of video player -->
      <div class="player__container">
        <!-- division of video player -->
        <div class="player__container--1">
          <!-- video player of video.js -->
          <Player v-if="show" />
        </div>
      </div>

      <!-- grid for the below section -->
      <div class="play__grid">
        <!-- suggested videos  and playlist items-->
        <div class="suggest">
          <!-- playlist video section -->
          <span class="font-small">playlist topic</span>
          <ul class="list hauto" style="background-color: #d2ddd9;">
            <!-- playlist video--1 -->
            <li class="list--items">
              <!-- video cards -->
              <div class="vcard gridplaylist">
                <!-- the thumbnail position  vcard 1 st part-->
                <div class="vcard--img vcard--img--playlist"></div>
                <!-- the division that contain the information of the video .It is the second part of the vcard -->
                <div class="vcard__info">
                  <div class="vcard__info--title">
                    <!-- dynamiv title of the video -->
                    <span>Fun way to Learn JavaScript.</span>
                  </div>
                </div>
              </div>
              <!-- end of vcard -->
            </li>
            <!-- playlist video--2 -->
            <li class="list--items">
              <!-- video cards -->
              <div class="vcard gridplaylist">
                <!-- the thumbnail position  vcard 1 st part-->
                <div class="vcard--img vcard--img--playlist"></div>
                <!-- the division that contain the information of the video .It is the second part of the vcard -->
                <div class="vcard__info">
                  <div class="vcard__info--title">
                    <!-- dynamiv title of the video -->
                    <span>Fun way to Learn JavaScript.</span>
                  </div>
                </div>
              </div>
              <!-- end of vcard -->
            </li>
            <!-- playlist video--3 -->
            <li class="list--items">
              <!-- video cards -->
              <div class="vcard gridplaylist">
                <!-- the thumbnail position  vcard 1 st part-->
                <div class="vcard--img vcard--img--playlist"></div>
                <!-- the division that contain the information of the video .It is the second part of the vcard -->
                <div class="vcard__info">
                  <div class="vcard__info--title">
                    <!-- dynamiv title of the video -->
                    <span>Fun way to Learn JavaScript.</span>
                  </div>
                </div>
              </div>
              <!-- end of vcard -->
            </li>
            <!-- show more btn if more videos available -->
            <div class="flex-center">
              <button class="btn btn--white">
                show more
                <i class="far fa-arrow-alt-circle-down"></i>
              </button>
            </div>
          </ul>

          <!-- suggested video section -->
          <span class="font-small">Suggested Videos</span>
          <!--list define is utilities -->
          <ul class="list">
            <!-- suggested video--1 -->
            <li class="list--items">
              <!-- video cards -->
              <div class="vcard">
                <!-- the thumbnail position  vcard 1 st part-->
                <div class="vcard--img">
                  <!-- the tag for video  defining the category of video-->
                  <h1 class="vcard--tag vcard--tag vcard--tag--learning">Learning</h1>
                </div>
                <!-- the division that contain the information of the video .It is the second part of the vcard -->
                <div class="vcard__info">
                  <div class="vcard__info--title">
                    <!-- dynamiv title of the video -->
                    <span>Fun way to Learn JavaScript.</span>
                  </div>
                </div>
              </div>
              <!-- end of vcard -->
            </li>

            <!-- show more btn if more videos available -->

            <div class="flex-center">
              <button class="btn btn--white">
                show more
                <i class="far fa-arrow-alt-circle-down"></i>
              </button>
            </div>
          </ul>
        </div>

        <!-- video titles and descrptions in the play page -->
        <div class="videoinfo" v-if="$route.params.is === '0'">
          <!-- video title -->
          <div class="font-medium" id="video-title">{{ videoDetails.title }}</div>
          <div class="videopanel">
            <div class="font-small">
              <i class="fas fa-eye"></i> 12k views
            </div>
            <div>
              <button class="playpagebtn font-medium">
                <i class="fas fa-thumbs-up"></i>
              </button>
              <button class="playpagebtn font-medium">
                <i class="fas fa-thumbs-down"></i>
              </button>
              <button class="playpagebtn playpagebtn--report btn btn-blue font-medium">
                <i class="fas fa-exclamation-circle"></i>
                <span class="font-small">report</span>
              </button>
            </div>
          </div>
          <!-- image of the user that has uplodede the video  -->
          <div class="userdetails">
            <div class="uploader-image">
              <img
                class="profile--image"
                :src="videoDetails.uploadedByThumbnail"
                v-if="videoDetails.uploadedByThumbnail"
              />
              <img class="profile--image" src="../../assets/img/man.png" v-else />
            </div>
            <div class="user-name">
              <!-- the that have uploaded the video -->
              <span>{{ videoDetails.uploadedBy }}</span>
            </div>
          </div>

          <!-- description -->
          <div
            class="font-small"
            id="video-description"
            style="padding-top:1rem;"
            v-if="videoDetails.description.length > 0"
          >{{ videoDetails.description }}</div>
          <div
            class="font-small"
            id="video-description"
            style="padding-top:1rem;"
            v-else
          >No description available</div>
        </div>

        <div class="videoinfo" v-else>
          <!-- video title -->
          <div class="font-medium" id="video-title">{{ playlistVideoDetails[videoIndex].title }}</div>
          <div class="videopanel">
            <div class="font-small">
              <i class="fas fa-eye"></i> 12k views
            </div>
            <div>
              <button class="playpagebtn font-medium">
                <i class="fas fa-thumbs-up"></i>
              </button>
              <button class="playpagebtn font-medium">
                <i class="fas fa-thumbs-down"></i>
              </button>
              <button class="playpagebtn playpagebtn--report btn btn-blue font-medium">
                <i class="fas fa-exclamation-circle"></i>
                <span class="font-small">report</span>
              </button>
            </div>
          </div>
          <!-- image of the user that has uplodede the video  -->
          <div class="userdetails">
            <div class="uploader-image">
              <img
                class="profile--image"
                :src="playlistVideoDetails[videoIndex].uploadedByThumbnail"
                v-if="playlistVideoDetails[videoIndex].uploadedByThumbnail"
              />
              <img class="profile--image" src="../../assets/img/man.png" v-else />
            </div>
            <div class="user-name">
              <!-- the that have uploaded the video -->
              <span>{{ playlistVideoDetails[videoIndex].uploadedBy }}</span>
            </div>
          </div>

          <!-- description -->
          <div
            class="font-small"
            id="video-description"
            style="padding-top:1rem;"
            v-if="playlistVideoDetails[videoIndex].description.length > 0"
          >{{ playlistVideoDetails[videoIndex].description }}</div>
          <div
            class="font-small"
            id="video-description"
            style="padding-top:1rem;"
            v-else
          >No description available</div>
        </div>
        <!-- comment section -->
        <div class="video__comments">
          <div class="font-medium">Comments</div>
          <div class="user-name">
            <!-- the user that is SIGNED IN-->
            <span>Vivek Chetia</span>
          </div>

          <!-- input field for the comment -->
          <input
            type="text"
            class="form__input form__input--comment"
            placeholder="Enter comment"
            required
          />
          <!-- button to send the comment  -->
          <button class="btn btn--comment">
            send
            <i class="far fa-arrow-alt-circle-right"></i>
          </button>
          <br />
          <br />
          <!-- user comments list -->
          <ul class="comment--area list">
            <!-- if no comments ais there then display the li -->
            <li class="font-medium u-center-text u-margin-top">... NO Comments Available...</li>

            <!-- 1st comment -->
            <!-- contains the user comments and username -->
            <li class="list--items">
              <!-- card to hold the data of the user and comment given by him -->
              <div class="comment--card">
                <!-- username -->
                <div class="comment--card comment--card--commenter">
                  <!-- username -->
                  <span class="font-small">Raju</span>
                </div>
                <span class="font-xsmall">1 day ago</span>
                <br />

                <!-- comment given by the user -->
                <div class="comment--card comment--card--comments">
                  Nice video Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non aut nulla
                  soluta dolorum earum? Temporibus adipisci eum aliquam est iusto quo dignissimos facilis
                </div>
                <!-- reply box -->
                <div class="gridreply">
                  <input type="text" class="form__input form__input--reply" required />
                  <!-- reply button -->
                  <button class="btn btn--comment btn--comment-1">
                    <i class="fas fa-reply">reply</i>
                  </button>
                </div>
                <br />View Replies
                <!-- replies -->
                <ul class="list">
                  <!-- contains the user comments and username -->
                  <li class="list--items">
                    <!-- card to hold the data of the user and comment given by him -->
                    <div class="comment--card">
                      <!-- username -->
                      <div class="comment--card comment--card--commenter">
                        <!-- username -->
                        <span class="font-small">Vivek</span>
                      </div>
                      <span class="font-xsmall">
                        1 day
                        ago
                      </span>
                      <br />
                      <!-- comment given by the user -->
                      <div class="comment--card--comments">
                        Nice video Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non aut
                        nulla
                        soluta dolorum earum? Temporibus adipisci eum aliquam est iusto quo
                        dignissimos facilis
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>

            <!-- 2nd comment -->
            <!-- contains the user comments and username -->
            <li class="list--items">
              <!-- card to hold the data of the user and comment given by him -->
              <div class="comment--card">
                <!-- username -->
                <div class="comment--card comment--card--commenter">
                  <!-- username -->
                  <span class="font-small">Raju</span>
                </div>
                <span class="font-xsmall">1 day ago</span>
                <br />

                <!-- comment given by the user -->
                <div class="comment--card comment--card--comments">
                  Nice video Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non aut nulla
                  soluta dolorum earum? Temporibus adipisci eum aliquam est iusto quo dignissimos facilis
                </div>
                <!-- reply box -->
                <div class="gridreply">
                  <input type="text" class="form__input form__input--reply" required />
                  <!-- reply button -->
                  <button class="btn btn--comment btn--comment-1">
                    <i class="fas fa-reply">reply</i>
                  </button>
                </div>
                <br />View Replies
                <!-- replies -->
                <ul class="list">
                  <!-- contains the user comments and username -->
                  <li class="list--items">
                    <!-- card to hold the data of the user and comment given by him -->
                    <div class="comment--card">
                      <!-- username -->
                      <div class="comment--card comment--card--commenter">
                        <!-- username -->
                        <span class="font-small">Vivek</span>
                      </div>
                      <span class="font-xsmall">
                        1 day
                        ago
                      </span>
                      <br />
                      <!-- comment given by the user -->
                      <div class="comment--card--comments">
                        Nice video Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non aut
                        nulla
                        soluta dolorum earum? Temporibus adipisci eum aliquam est iusto quo
                        dignissimos facilis
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>

            <div class="flex-center">
              <button class="btn btn--white">
                show more
                <i class="far fa-arrow-alt-circle-down"></i>
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
import Player from "../VideoPlayer/VideoPlayer";
import Navbar from "../Navbar/Navbar";
export default {
  name: "Play",
  components: {
    Player,
    Navbar
  },
  data() {
    return {
      player: null
    };
  },

  computed: {
    show() {
      return this.$store.state.show;
    },
    videoDetails() {
      return this.$store.state.videoDetails;
    },
    source() {
      return this.$store.state.videoOptions.sources[0].src;
    },
    videoIndex() {
      return this.$store.state.playlistVideoIndex;
    },
    playlistVideoDetails() {
      return this.$store.state.playlistVideoDetails;
    }
  },
  beforeCreate() {
    if (this.$route.params.is === "1") {
      this.$store.dispatch("getPlaylistVideos", {
        id: this.$route.params.id,
        isPlaylist: this.$route.params.is
      });
    } else {
      this.$store.dispatch("getVideo", {
        id: this.$route.params.id,
        isPlaylist: this.$route.params.is
      });
    }
  }
};
</script>
