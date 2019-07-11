<template>
  <div id="Dashboard" class="dashboard">
    <Navbar />

    <!-- floating upload button -->
    <div class="dashboard__header">
      <!-- the title  -->
      <span class="font-medium dashboard__title">My videos</span>

      <!-- the upload button on right side -->
      <!-- LINK UPLOAD FORM HERE -->
      <a class="floating--btn" @click.prevent="uploadForm">
        <i class="fas fa-upload">upload</i>
      </a>
    </div>

    <div class="dashboard__vcontainer">
      <!-- the videos uploaded by user will be displayed in this division along with the details -->
      <div class="vcard" v-for="video in videos" :key="video.id">
        <!-- the thumbnail position  vcard 1 st part-->
        <div
          class="vcard--img"
          :style="{backgroundImage: 'url(' +video.thumbnail + ')',}"
          @click.stop="redirectToPlay(video.id)"
        >
          <!-- the tag for video  defining the category of video-->
          <h1
            class="vcard--tag vcard--tag--dashboard"
            :class="{
                'vcard--tag--learning': video.category === 'Learning', 
                'vcard--tag--event': video.category === 'Events', 
                'vcard--tag--club': video.category === 'Club activities'
                }"
          >
            {{video.category}}
            <!-- the delete button  -->
            <span class="dashboard--option">
              <button class="u-end-text btn btn--trans videodelete">
                <i class="fas fa-list"></i>
              </button>
              <ul class="list--option list--option--plist">
                <li class="list--items list--items--option">
                  <a
                    class="btnlist font-xsmall"
                    @click.stop="editVideoDetails(video.id)"
                  >Edit video details</a>
                </li>
                <li class="list--items list--items--option">
                  <a
                    class="btnlist font-xsmall"
                    @click.stop="addToPlaylist(video.id, video.thumbnail)"
                  >
                    Add
                    video to playlist
                  </a>
                </li>
                <li class="list--items list--items--option">
                  <button
                    class="btnlist btnlist--btn font-xsmall"
                    @click.stop="deleteVideo(video.id)"
                  >
                    Delete
                    video
                  </button>
                </li>
              </ul>
            </span>
          </h1>
        </div>
        <!-- the division that contain the information of the video .It is the second part of the vcard -->
        <div class="vcard__info">
          <div class="vcard__info--title">
            <!-- dynamiv title of the video -->
            <span>{{video.title}}</span>
          </div>
          <!-- timestamp when the video was created -->
          <span class="timestamp font-small">
            Created on: {{video.timestamp}}
            <!-- will be hhidden when opened in pc  -->
            <span class="dashboard--option--1">
              <button class="u-end-text btn btn--trans">
                <i class="fas fa-list"></i>
              </button>
              <ul class="list--option list--option--plist">
                <li
                  class="list--items list--items--option"
                  @click.stop="editVideoDetails(video.id)"
                >
                  <a class="btnlist font-xsmall">
                    Edit title &
                    description
                  </a>
                </li>
                <li
                  class="list--items list--items--option"
                  @click.stop="addToPlaylist(video.id, video.thumbnail)"
                >
                  <a class="btnlist font-xsmall">
                    Add
                    video to playlist
                  </a>
                </li>
                <li class="list--items list--items--option">
                  <button
                    class="btnlist btnlist--btn font-xsmall"
                    @click.stop="deleteVideo(video.id)"
                  >
                    Delete
                    video
                  </button>
                </li>
              </ul>
            </span>
          </span>
          <br />
          <span style="font-weight: 550;">Description:</span>
          <!-- dynamic descrptiob of the video -->
          <span class="vcard__info--des">{{video.description}}</span>
        </div>
      </div>
      <!-- video playlist cards -->
      <div class="vcard" v-for="playlist in videoPlayList" :key="playlist.id">
        <!-- the thumbnail position  vcard 1 st part-->
        <div class="vcard--img" :style="{backgroundImage: 'url(' +playlist.thumbnail + ')',}">
          <div class="playlist--details flex-center" style="align-items: center;">
            <div>
              <div class="font-small">{{playlist.totalVideos}}</div>
              <div class="flex-center">
                <i class="fas fa-play-circle font-medium"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- the division that contain the information of the video .It is the second part of the vcard -->
        <div class="vcard__info">
          <div class="vcard__info--title">
            <!-- dynamiv title of the video -->
            <span>{{playlist.title}}</span>
          </div>
          <!-- timestamp when the video was created -->
          <span class="timestamp font-small">Created on: {{playlist.timestamp}}</span>
          <button class="u-end-text btn btn--trans">
            <i class="fas fa-list"></i>
          </button>

          <ul class="list--option list--option--plist list-option-playlist">
            <li class="list--items list--items--option">
              <router-link :to="{name:'Playlist'}">
                <a class="btnlist font-xsmall">Edit playlist</a>
              </router-link>
            </li>
          </ul>
          <br />
          <span style="font-weight: 550;">Description:</span>
          <!-- dynamic descrptiob of the video -->
          <span class="vcard__info--des">{{playlist.description}}</span>
        </div>
      </div>
      <!-- end of vcard -->
    </div>
  </div>
</template>
<script>
import db from "../../main";
import Navbar from "../Navbar/Navbar";

export default {
  name: "Dashboard",
  components: {
    Navbar
  },
  data() {
    return {
      videos: [],
      videoPlayList: []
    };
  },
  watch: {
    uid: {
      handler: function(id) {
        let vref = db.collection("uploadedVideos").where("by", "==", id);
        let vplayListref = db
          .collection("playlist")
          .where("by", "==", this.$store.state.uid);
        // initial load when page is refreshed
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
                } else {
                  this.videos.push({
                    //doc keeps id can retrive using;
                    id: doc.id,
                    // field that we have created can be retirve using;
                    title: doc.data().title,
                    description: doc.data().description,
                    url: doc.data().url,
                    category: doc.data().category,
                    thumbnail: doc.data().thumbnail
                  });
                }
              }
            }
          });
        });

        vplayListref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
              let doc = change.doc;
              if (doc.data().timestamp) {
                this.videoPlayList.push({
                  //doc keeps id can retrive using;
                  id: doc.id,
                  // field that we have created can be retirve using;
                  title: doc.data().title,
                  description: doc.data().description,
                  thumbnail: doc.data().thumbnail,
                  timestamp: doc.data().timestamp.toDate(),
                  totalVideos: doc.data().videos.length
                });
              } else {
                this.videoPlayList.push({
                  //doc keeps id can retrive using;
                  id: doc.id,
                  // field that we have created can be retirve using;
                  title: doc.data().title,
                  description: doc.data().description,
                  thumbnail: doc.data().thumbnail,
                  totalVideos: doc.data().videos.length
                });
              }
            }
          });
        });
      }
    }
  },
  computed: {
    task() {
      return this.$store.state.task;
    },
    uid() {
      return this.$store.state.uid;
    }
  },
  beforeMount() {
    let vref = db
      .collection("uploadedVideos")
      .where("by", "==", this.$store.state.uid);
    let vplayListref = db
      .collection("playlist")
      .where("by", "==", this.$store.state.uid);
    // react to firebase firestore realtime snaphot
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
            } else {
              this.videos.push({
                //doc keeps id can retrive using;
                id: doc.id,
                // field that we have created can be retirve using;
                title: doc.data().title,
                description: doc.data().description,
                url: doc.data().url,
                category: doc.data().category,
                thumbnail: doc.data().thumbnail
              });
            }
          }
        }
      });
    });
    vplayListref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let doc = change.doc;
        if (change.type === "added") {
          if (doc.data().timestamp) {
            this.videoPlayList.push({
              //doc keeps id can retrive using;
              id: doc.id,
              // field that we have created can be retirve using;
              title: doc.data().title,
              description: doc.data().description,
              thumbnail: doc.data().thumbnail,
              timestamp: doc.data().timestamp.toDate(),
              totalVideos: doc.data().videos.length
            });
          } else {
            this.videoPlayList.push({
              //doc keeps id can retrive using;
              id: doc.id,
              // field that we have created can be retirve using;
              title: doc.data().title,
              description: doc.data().description,
              thumbnail: doc.data().thumbnail,
              totalVideos: doc.data().videos.length
            });
          }
        }
        if (change.type === "modified") {
          this.videoPlayList = this.videoPlayList.filter(playlist => {
            return playlist.id !== doc.id;
          });
          this.videoPlayList.push({
            //doc keeps id can retrive using;
            id: doc.id,
            // field that we have created can be retirve using;
            title: doc.data().title,
            description: doc.data().description,
            thumbnail: doc.data().thumbnail,
            totalVideos: doc.data().videos.length
          });
        }
      });
    });
  },
  methods: {
    uploadForm() {
      // if upload already exist dont allow
      if (!this.task) {
        swal.fire({
          title: "Upload Video",
          html:
            `<input type="file" id="upload-file" accept="video/*" hidden="hidden"/>` +
            `<div class="flex-center">
            <p class="custom-text">No file Choosen yet !</p>
          </div>` +
            `<button type="button" class="btn btn--upload u-margin-bottom-medium" id="choose-video">CHOOSE A FILE</button>` +
            `<input type="text" class="form__input--upload form__input--upload--1" id="upload-title" placeholder="Title" required>` +
            `<textarea class="form__input--upload form__input--upload--1" id="upload-description" placeholder="Description" required></textarea>` +
            `<select id="video-category" class="form__input--upload form__input--upload--2">
            <option value="" selected disabled>Select Category</option>
            <option value="Learning">Learning</option>
            <option value="Events">Events</option>
            <option value="Club activities">Club activities</option>
            </select>
            <br>` +
            `<label for="playlistopt1" class="font-small">
            <input type="radio" name="playlist" id="playlistopt1" />Create a New Playlist
            </label>` +
            `<div id="createplaylist" style="display: none;">
                <input type="text" class="form__input--upload form__input--upload--1" id="playlist-title"
                    placeholder="Playlist Title">
                <textarea class="form__input--upload form__input--upload--1" id="playlist-description"
                    placeholder="Playlist Description"></textarea>
                <br>
           </div>` +
            `<br>
            <label for="playlistopt2" class="font-small">
                 <input type="radio" name="playlist" id="playlistopt2" />
                Add to Exsiting playlist
            </label>` +
            ` <div id="existingplaylist" style="display: none;">
                <!-- for selecting the category -->
                <select id="video-playlist" class="form__input--upload form__input--upload--2">
                    <option value="" selected disabled>Select Playlist</option>
                </select>
            </div>
            <br>` +
            ` <label for="playlistopt3" class="font-small">
                 <input type="radio" name="playlist" id="playlistopt3" checked="checked"/>
                Don't create a playlist
            </label><br>` +
            `<button class="btn btn--upload" type="submit" id="upload-video">Upload</button>`,
          focusConfirm: false,
          showCloseButton: true,
          showConfirmButton: false,
          onOpen: dom => {
            // globals
            let file = null;
            const realFileBtn = dom.querySelector("#upload-file");
            const customBtn = dom.querySelector("#choose-video");
            const customText = dom.querySelector(".custom-text");
            const upload = dom.querySelector("#upload-video");
            const select = dom.querySelector("#video-playlist");

            //  for createplaylist division selection
            const createplaylist = dom.querySelector("#createplaylist");
            //  for existing playlist division selection
            const existingplaylist = dom.querySelector("#existingplaylist");
            // radio button for create playlist and existing playlist

            const crplaylist = dom.querySelector("#playlistopt1");
            const explaylist = dom.querySelector("#playlistopt2");
            const dontCreatePlaylist = dom.querySelector("#playlistopt3");
            crplaylist.addEventListener("click", function() {
              createplaylist.style.display = "block";
              existingplaylist.style.display = "none";
            });

            explaylist.addEventListener("click", () => {
              existingplaylist.style.display = "block";
              createplaylist.style.display = "none";
              swal.showLoading();
              for (let i = 1; i < select.length; i++) {
                select.remove(i);
              }

              //get all the playlist from firestore
              db.collection("playlist")
                .where("by", "==", this.$store.state.uid)
                .get()
                .then(querySnaphot => {
                  querySnaphot.docs.forEach(doc => {
                    const option = document.createElement("option");
                    option.text = doc.data().title;
                    option.value = doc.id;
                    select.appendChild(option);
                  });
                  swal.hideLoading();
                })
                .catch(err => {
                  showWarning(
                    "Playlist Error, please re-try! If problem still persist, please contact the developer."
                  );
                });
            });
            dontCreatePlaylist.addEventListener("click", function() {
              existingplaylist.style.display = "none";
              createplaylist.style.display = "none";
            });

            customBtn.addEventListener("click", function() {
              realFileBtn.click();
            });
            let changeTime;
            let videoThumbnail;
            let videoDetails = {
              title: "",
              description: "",
              category: "",
              thumbnail: "",
              playListMode: false,
              playListExist: false
            };
            // canvas
            const _CANVAS = document.createElement("canvas"),
              _CTX = _CANVAS.getContext("2d"),
              // video
              _VIDEO = document.createElement("VIDEO");

            // when file will be selected, validating the video
            realFileBtn.addEventListener("change", e => {
              // video validation
              // check if file is selected or not
              if (realFileBtn.files.length > 0) {
                // check if file chose is .mp4 or not!
                if (["video/mp4"].indexOf(realFileBtn.files[0].type) == -1) {
                  swal
                    .fire({
                      type: "warning",
                      text: "Please MP4 type video file to upload!"
                    })
                    .then(res => {
                      this.uploadForm();
                    });
                } else if (realFileBtn.files[0].size / 1024 / 1024 > 100) {
                  // if file size is greater than 100MB show error
                  swal
                    .fire({
                      type: "warning",
                      text: "File size cannot be greater than 100MB!"
                    })
                    .then(res => {
                      this.uploadForm();
                    });
                } else {
                  if (realFileBtn.value) {
                    // regular expersion for finding the file name
                    customText.innerHTML = realFileBtn.value.match(
                      /[\/\\]([\w\d\s\.\-\(\)]+)$/
                    )[1];
                    //loading the file selected in the video element as a src url
                    _VIDEO.setAttribute(
                      "src",
                      URL.createObjectURL(realFileBtn.files[0])
                    );
                    _VIDEO.load();

                    // after the video is loaded
                    _VIDEO.addEventListener("loadedmetadata", () => {
                      // seeking video to 5sec duration
                      let video_duration = _VIDEO.duration;
                      changeTime = (video_duration / 100) * 5;
                      let newTime = Math.floor(changeTime);
                      _VIDEO.currentTime = newTime;
                      _CANVAS.width = _VIDEO.videoWidth;
                      _CANVAS.height = _VIDEO.videoHeight;
                    });

                    // Seeking video to the specified duration is complete
                    // letting canvas to draw the 2d image of the frame in video element
                    _VIDEO.addEventListener("timeupdate", () => {
                      _CTX.drawImage(
                        _VIDEO,
                        0,
                        0,
                        _VIDEO.videoWidth,
                        _VIDEO.videoHeight
                      );
                      //conerting the drawn image to data-url
                      videoThumbnail = _CANVAS.toDataURL("image/jpeg", 0.8);
                      file = e.target.files[0];
                    });
                  }
                }
              }
            });
            // func to show warning msg
            const showWarning = msg => {
              swal
                .fire({
                  type: "warning",
                  text: msg
                })
                .then(() => {
                  this.uploadForm();
                });
            };
            // func to validate the title from firestore
            const fireValidate = (title, playlistExist) => {
              upload.style.display = "none";
              swal.showLoading();
              db.collection("uploadedVideos")
                .where("by", "==", this.$store.state.uid)
                .where("title", "==", title)
                .get()
                .then(querySnaphot => {
                  if (!querySnaphot.empty) {
                    // title exist show warning
                    showWarning(
                      "You have already uploaded the video with same title! Please give unique title to your video"
                    );
                  } else {
                    // upload video
                    if (playlistExist) {
                      videoDetails.playListExist = true;
                      // playlist id
                      videoDetails["playListID"] =
                        select.options[select.selectedIndex].value;
                      this.$store.dispatch("uploadVideo", videoDetails);
                      swal.close();
                    } else {
                      this.$store.dispatch("uploadVideo", videoDetails);
                      swal.close();
                    }
                  }
                });
            };
            //func to validate title and playlist title if create playlist opt is selected
            const fireValidateList = (videoTitle, playListTitle) => {
              upload.style.display = "none";
              swal.showLoading();
              let titleRef = db
                .collection("uploadedVideos")
                .where("by", "==", this.$store.state.uid)
                .where("title", "==", videoTitle);
              let playListRef = db
                .collection("playlist")
                .where("by", "==", this.$store.state.uid)
                .where("title", "==", playListTitle);

              titleRef
                .get()
                .then(querySnaphot => {
                  if (!querySnaphot.empty) {
                    // title exist show warning
                    showWarning(
                      "You have already uploaded the video with same title! Please give unique title to your video"
                    );
                  } else {
                    playListRef.get().then(querySnaphot => {
                      if (!querySnaphot.empty) {
                        // playlist title validation
                        showWarning(
                          "You have already created playlist with the same name! Please give unique title to your playlist"
                        );
                      } else {
                        // upload video
                        videoDetails["playListMode"] = true;
                        this.$store.dispatch("uploadVideo", videoDetails);
                        swal.close();
                      }
                    });
                  }
                })
                .catch(err => {
                  showWarning(err.message);
                  console.error(err);
                });
            };
            //validation the upload form
            upload.addEventListener("click", () => {
              videoDetails.title = dom
                .querySelector("#upload-title")
                .value.trim();
              videoDetails.description = dom
                .querySelector("#upload-description")
                .value.trim();
              videoDetails.category = dom.querySelector(
                "#video-category"
              ).value;
              videoDetails.thumbnail = videoThumbnail;
              videoDetails["file"] = file;
              if (crplaylist.checked) {
                // console.log("Create playlist");
                videoDetails["playListTitle"] = dom.querySelector(
                  "#playlist-title"
                ).value;
                videoDetails["playListDescription"] = dom.querySelector(
                  "#playlist-description"
                ).value;
              }
              if (explaylist.checked) {
                videoDetails["existingPlayList"] = dom.querySelector(
                  "#video-playlist"
                ).value;
              }
              // title check
              if (videoDetails.title.trim().length >= 4) {
                // category check
                if (videoDetails.category.length > 0) {
                  // validating video selection
                  if (customText.innerHTML !== "No file Choosen yet !") {
                    //validating for check list
                    if (crplaylist.checked) {
                      //playlist name and description validation
                      if (
                        videoDetails.playListTitle.length >= 4 &&
                        videoDetails.playListDescription.length > 0
                      ) {
                        //firestore validate if playlist title is unique
                        fireValidateList(
                          videoDetails.title,
                          videoDetails.playListTitle
                        );
                      } else {
                        showWarning(
                          "Playlist title should be atleast 4char long, title and description cannot be empty"
                        );
                      }
                    }
                    // if existing playlist opt
                    else if (explaylist.checked) {
                      //existing playlist validation
                      if (videoDetails.existingPlayList.length > 0) {
                        fireValidate(videoDetails.title, true);
                      } else {
                        showWarning("Please select a playlist!");
                      }
                    }
                    // if default - create no playlist
                    else {
                      fireValidate(videoDetails.title);
                    }
                  } else {
                    showWarning("Select a video to upload");
                  }
                } else {
                  showWarning("Please select a category");
                }
              } else {
                showWarning("Title cannot be empty or less than 4 char length");
              }
            });
          }
        });
      } else {
        swal.fire({
          type: "info",
          html:
            '<p>One upload task is active, please wait for it to finish <br> Click <i class="fas fa-user-circle"></i> to check upload progress</p>'
        });
      }
    },
    redirectToPlay(id) {
      this.$store.dispatch("getVideo", id);
    },
    deleteVideo(id) {
      this.videos = this.videos.filter(video => {
        // when id matches with applied id
        // below condition retuns false
        return video.id !== id;
      });
      this.$store.dispatch("deleteVideo", id);
    },
    editVideoDetails(id) {
      swal.fire({
        html:
          `<h1 class="font-medium u-margin-bottom-small"><i class="fas fa-edit"></i>Edit Video Details</h1>` +
          `<input type="text" class="form__input--upload form__input--upload--1" id="video-title" placeholder="Title">` +
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
                      this.videos.forEach(video => {
                        // when id matches with applied id
                        if (video.id === id) {
                          video.title = videoChanges.title;
                          video.description = videoChanges.description;
                          video.category = videoChanges.category;

                          console.log(video);
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
    addToPlaylist(id, thumbnail) {
      console.log(id, thumbnail);
      swal.fire({
        focusConfirm: false,
        showCloseButton: true,
        showConfirmButton: false,
        html:
          `<h1 class="font-medium u-margin-bottom-small"><i class="fas fa-edit"></i>Playlist</h1>` +
          `<label for="playlistopt1" class="font-small">
                <input type="radio" name="playlist" id="playlistopt1" />
                Create a New Playlist
            </label>` +
          ` <div id="createplaylist" style="display: none;">
                <input type="text" class="form__input--upload form__input--upload--1" id="playlist-title"
                    placeholder="Title">
                <textarea class="form__input--upload form__input--upload--1" id="playlist-description"
                    placeholder="Description"></textarea>
                <br>
            </div><br>` +
          `<label for="playlistopt2" class="font-small">
                &nbsp;&nbsp; <input type="radio" name="playlist" id="playlistopt2" />
                Add to Exsiting playlist
            </label>` +
          ` <div id="existingplaylist" style="display: none;">
                <!-- for selecting the category -->
                <select id="video-playlist" class="form__input--upload form__input--upload--2">
                    <option value="" selected disabled>Select Playlist</option>
                </select>
            </div>
            <br>` +
          `<button class="btn btn--upload" type="submit" id="savePlaylist">Save Changes</button>`,
        onOpen: dom => {
          //  for createplaylist division selection
          const createplaylist = dom.querySelector("#createplaylist");
          //  for existing playlist division selection
          const existingplaylist = dom.querySelector("#existingplaylist");
          // radio button for create playlist and existing playlist
          const crplaylist = dom.querySelector("#playlistopt1");
          const explaylist = dom.querySelector("#playlistopt2");
          // save changes button
          const save = dom.querySelector("#savePlaylist");

          crplaylist.addEventListener("click", function() {
            createplaylist.style.display = "block";
            existingplaylist.style.display = "none";
          });

          explaylist.addEventListener("click", function() {
            existingplaylist.style.display = "block";
            createplaylist.style.display = "none";
          });
          // show alert for errors or warning
          const showWarning = msg => {
            swal
              .fire({
                type: "warning",
                text: msg
              })
              .then(() => {
                this.addToPlaylist(id, thumbnail);
              });
          };

          let playlistDetail = {
            title: "",
            description: ""
          };

          save.addEventListener("click", () => {
            if (crplaylist.checked) {
              // console.log("Create playlist");
              playlistDetail["title"] = dom.querySelector(
                "#playlist-title"
              ).value;
              playlistDetail["description"] = dom.querySelector(
                "#playlist-description"
              ).value;
            }
            if (explaylist.checked) {
              playlistDetail["existingPlayList"] = dom.querySelector(
                "#video-playlist"
              ).value;
            }
            // validation
            if (
              playlistDetail.title.length > 4 &&
              playlistDetail.description.length > 0
            ) {
              swal.showLoading();
              let playListRef = db
                .collection("playlist")
                .where("by", "==", this.$store.state.uid)
                .where("title", "==", playlistDetail.title);
              playListRef.get().then(querySnaphot => {
                if (!querySnaphot.empty) {
                  // playlist title validation
                  showWarning(
                    "You have already created playlist with the same name! Please give unique title to your playlist"
                  );
                } else {
                  playlistDetail["id"] = id;
                  playlistDetail["thumbnail"] = thumbnail;
                  this.$store.dispatch("createPlaylist", playlistDetail);
                  swal.close();
                  this.videos = this.videos.filter(video => {
                    // when id matches with applied id
                    // below condition retuns false
                    return video.id !== id;
                  });
                }
              });
            } else {
              showWarning(
                "Playlist title should be greater than 4char long, title and description cannot be empty"
              );
            }
          });
        }
      });
    }
  }
};
</script>

