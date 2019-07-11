import Vue from 'vue'
import Vuex from 'vuex'
import { auth, storage, firestore } from 'firebase'
import db from './main'
import { router } from './router'

Vue.use(Vuex)

const alertError = msg => {
  swal.fire({
    type: 'error',
    title: 'Oops...',
    text: msg
  })
}
const alertSuccess = msg => {
  swal.fire({
    type: 'success',
    text: msg
  })
}
const alertSuccessToast = msg => {
  swal.fire({
    type: 'success',
    title: msg,
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000
  })
}

export let store = new Vuex.Store({
  state: {
    // valid user
    loggedInUser: null,
    email: null,
    name: null,
    uid: null,
    profilePic: null,
    department: null,
    designation: null,
    coverPic: null,
    profileDetails: {
      dob: {
        day: null,
        month: null,
        year: null
      },
      department: "",
      phoneno: "",
      emailPersonal: "",
      address: "",
      aboutYourself: "",
    },
    //login spinner
    loginSpinner: false,

    //signup spinner
    signupSpinner: false,

    //video player options
    videoOptions: {
      autoplay: true,
      controls: true,
      preload: "auto",
      fluid: true,
      playbackRates: [1, 1.5, 2],
      sources: [
        {
          src: null,
          type: "video/mp4"
        }
      ]
    },
    show: false,

    //current video details fetched from firebase
    videoDetails: {
      title: '',
      description: '',
      category: '',
      thumbnail: '',
      playList: '',
      uploadedBy: '',
      timestamp: '',
      uploadedByThumbnail: ''
    },

    //upload task
    task: null,
    percentage: 0,
    paused: false,
    fileName: null,
    url: null,

    // app update state
    registration: null,
    updateExists: false
  },
  mutations: {
    resetUser(state) {
      state.loggedInUser = null
      state.email = null
      state.name = null
      state.uid = null
      state.profileDetails = {
        dob: {
          day: null,
          month: null,
          year: null
        },
        department: "",
        phoneno: "",
        emailPersonal: "",
        address: "",
        aboutYourself: "",
      }
    },
    login(state, payload) {
      state.loginSpinner = true
      auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          store.state.loggedInUser = user.user;
          if (user.user.emailVerified) {
            db.collection("validuser")
              .where("email", "==", payload.email)
              .get()
              .then(querySnapshot => {
                if (querySnapshot.docs[0].data().active === false) {
                  querySnapshot.docs[0].ref.update({ active: true });
                }
              })
              .then(() => {
                state.loginSpinner = false;
                router.push({ name: "Home" });
                alertSuccessToast("Signed in successfully")
              })
              .catch(err => {
                state.loginSpinner = false;
                alertError(err.message)
                console.error(err);
              });
          } else {
            state.loginSpinner = false;
            alertError("Email is not verified, please verify it!")
          }
        })
        .catch(err => {
          state.loginSpinner = false;
          alertError("Invalid Email or Password")
          console.error(err);
        });

    },
    signup(state, payload) {
      state.signupSpinner = true
      auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          user.user.sendEmailVerification().then(() => {
            // as signup will login the user automatically but dont want than
            // untill user is verifired !
            auth()
              .signOut()
              .then(() => {
                router.push({ name: "Login" });
                state.signupSpinner = false;
                alertSuccess("Please check the link sent to your email to verify your account!")
              })
              .catch(err => {
                state.signupSpinner = false;
                alertError('Database error, If the problem still persist, please contact the developer!')
              });
          });
        })
        .then(() => {
          let ref = db.collection("validuser");
          ref = ref.where("active", "==", false);
          ref = ref.where("email", "==", payload.email);
          ref
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                // Build doc ref from doc.id
                let refDoc = db.collection("validuser").doc(doc.id);
                refDoc.update({
                  name: payload.firstName + " " + payload.lastName
                });
              });
            })
        })
        .catch(err => {
          state.signupSpinner = false;
          alertError(err.message)
          console.error(err)
        });
    },
    logout() {
      auth()
        .signOut()
        .then(() => {
          router.push({ name: "Home" });
          alertSuccessToast('Logout successfully')
        });
    },
    changeName(state, payload) {
      let ref = db.collection('validuser').doc(state.uid)
      ref.update({
        name: payload
      })
        .then(() => {
          state.name = payload
          alertSuccess('Name changed!')
        })
        .catch(err => {
          console.error(err)
          alertError('Name change error')
        })
    },
    sendPasswordResetLink(state) {
      auth().sendPasswordResetEmail(state.email).then(() => {
        alertSuccess('Link sent to your email!')
      })
    },
    changeProfilePic(state, payload) {
      let ref = db.collection("validuser")
        .doc(state.uid)
      ref.update({
        profilePic: payload
      })
        .then(() => {
          alertSuccess('Profile Pic Changed! :)')
          state.profilePic = payload
        });
    },
    edit(state, payload) {
      let ref = db.collection('profile').doc(state.uid)
      ref.set(payload, { merge: true })
        .then(() => {
          alertSuccess('Profile edited !')
          state.profileDetails = payload
        })
    },
    getProfileDetails(state) {
      let ref = db.collection('profile').doc(state.uid)
      ref.get().then(doc => {
        if (doc.exists) {
          state.coverPic = doc.data().coverPic
          state.profileDetails = doc.data()
        }
      })
    },
    changeCoverPic(state, payload) {
      let ref = db.collection('profile').doc(state.uid)
      ref.set({
        coverPic: payload
      }, { merge: true })
        .then(() => {
          state.coverPic = payload
          alertSuccess('Cover Pic changed!')
        })
    },
    uploadVideo(state, payload) {
      // create a storage ref
      let storageRef = storage().ref("video/" + state.uid + "/" + payload.title + ".mp4");

      state.fileName = payload.file.name
      // upload file
      state.task = storageRef.put(payload.file)

      state.task.on(
        "state_changed",
        // when upload is in progress
        snapShot => {
          let percentage = Math.floor(
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100
          );
          state.percentage = Math.floor(percentage);
        },
        // incase any error
        err => {
          state.task = null;
          state.percentage = 0;
          state.paused = false;
          alertError(`Upload error, ${err.message}`)
          console.error(err);
        },
        // when upload is completed
        () => {
          state.percentage = 0;
          state.paused = false;
          state.task = null;

          let videoRef = db.collection('uploadedVideos').doc()
          let playlistRef = db.collection('playlist').doc()

          storageRef
            .getDownloadURL()
            .then(downloadURL => {
              state.url = downloadURL;
            })
            .then(() => {
              if (!payload.playListMode && !payload.playListExist) {
                videoRef.set({
                  title: payload.title,
                  description: payload.description,
                  thumbnail: payload.thumbnail,
                  timestamp: firestore.FieldValue.serverTimestamp(),
                  by: state.uid,
                  category: payload.category,
                  url: state.url
                })
                  .then(() => {
                    alertSuccess("Video uploaded!")
                  })
              }
              else if (payload.playListExist) {
                db
                  .collection('uploadedVideos')
                  .doc(videoRef.id)
                  .set({
                    playList: payload.playListID
                  },
                    {
                      merge: true
                    })
                  .then(() => {
                    db
                      .collection('playlist')
                      .doc(payload.playListID)
                      .set({
                        videos: firestore.FieldValue.arrayUnion(videoRef.id)
                      },
                        {
                          merge: true
                        })
                      .then(() => {
                        alertSuccess('Video uploaded!')
                      })
                  })
              }
              else {
                playlistRef.set({
                  title: payload.playListTitle,
                  description: payload.playListDescription,
                  by: state.uid,
                  videos: firestore.FieldValue.arrayUnion(videoRef.id),
                  timestamp: firestore.FieldValue.serverTimestamp(),
                  thumbnail: payload.thumbnail
                })
                  .then(() => {
                    db
                      .collection('uploadedVideos')
                      .doc(videoRef.id)
                      .set({
                        playList: playlistRef.id
                      },
                        {
                          merge: true
                        })
                      .then(() => {
                        alertSuccess('Video uploaded!')
                      })
                  })
              }

            })
            .catch(err => {
              console.error(err)
              alertError(err.message)
            })


        }
      );
    },
    getVideo(state, payload) {
      let vidRef = db.collection('uploadedVideos').doc(payload)
      vidRef
        .get()
        .then(doc => {
          state.videoOptions.sources[0].src = doc.data().url
          state.videoDetails.title = doc.data().title
          state.videoDetails.category = doc.data().category
          state.videoDetails.thumbnail = doc.data().thumbnail
          state.videoDetails.timestamp = doc.data().timestamp.toDate()
          state.videoDetails.playList = doc.data().playList
          return doc.data().by
        })
        .then(id => {
          db
            .collection('validuser')
            .doc(id)
            .get()
            .then(doc => {
              state.videoDetails.uploadedBy = doc.data().name
              state.videoDetails.uploadedByThumbnail = doc.data().profilePic
            })
        })
        .then(() => {
          window.scrollTo(0, 0);
          router.push({ name: "Play", params: { id: payload } });
          state.show = true
        })
    },
    updateApp(state) {
      swal
        .fire({
          type: "success",
          title: "Update",
          showCloseButton: true,
          html: `<div class="flex-center">
                    <p>
                      Click Ok to update now </p>
                    <p>
                  </div>`,
        })
        .then(res => {
          if (res.value) {
            state.updateExists = false;
            if (!state.registration || !state.registration.waiting) {
              return;
            }
            state.registration.waiting.postMessage("skipWaiting");
          }
        });
    },
    deleteVideo(state, payload) {
      let deleteRef
      db.collection("uploadedVideos")
        .doc(payload)
        .get()
        .then(doc => {
          deleteRef = storage().refFromURL(doc.data().url)
        })
        .then(() => {
          deleteRef
            .delete()
            .then(() => {
              // delete video doc from db after video file delete
              db.collection("uploadedVideos")
                .doc(payload)
                .delete()
                .then(() => {
                  alertSuccess("Video Deleted!")
                })
                .catch(error => {
                  console.error(error.message)
                  alertError("Error removing document")
                })
            })
            .catch(error => {
              console.error(error.message)
            })
        })
        .catch(err => {
          console.error(err.message)
        })
    },
    editVideoDetails(state, payload) {
      let editRef = db.collection('uploadedVideos').doc(payload.id)
      editRef.update({
        title: payload.title,
        description: payload.description,
        category: payload.category
      })
        .then(() => {
          alertSuccess('Video details updated !')
        })
    },
    createPlaylist(state, payload) {
      let playlistRef = db.collection('playlist').doc()

      playlistRef.set({
        title: payload.title,
        description: payload.description,
        by: state.uid,
        videos: firestore.FieldValue.arrayUnion(payload.id),
        timestamp: firestore.FieldValue.serverTimestamp(),
        thumbnail: payload.thumbnail
      })
        .then(() => {
          db
            .collection('uploadedVideos')
            .doc(payload.id)
            .set({
              playList: playlistRef.id
            },
              {
                merge: true
              })
            .then(() => {
              alertSuccess('Video added to playlist !')
            })
        })
    }
  },
  actions: {
    resetUser(context) {
      context.commit('resetUser')
    },
    login(context, payload) {
      context.commit('login', payload)
    },
    signup(context, payload) {
      context.commit('signup', payload)
    },
    changeName(context, payload) {
      context.commit('changeName', payload)
    },
    logout(context) {
      context.commit('logout')
    },
    sendPasswordResetLink(context) {
      context.commit('sendPasswordResetLink')
    },
    changeProfilePic(context, payload) {
      context.commit('changeProfilePic', payload)
    },
    edit(context, payload) {
      context.commit('edit', payload)
    },
    getProfileDetails(context) {
      context.commit('getProfileDetails')
    },
    changeCoverPic(context, payload) {
      context.commit('changeCoverPic', payload)
    },
    uploadVideo(context, payload) {
      context.commit('uploadVideo', payload)
    },
    getVideo(context, payload) {
      context.commit('getVideo', payload)
    },
    updateApp(context) {
      context.commit('updateApp')
    },
    deleteVideo(context, payload) {
      context.commit('deleteVideo', payload)
    },
    editVideoDetails(context, payload) {
      context.commit('editVideoDetails', payload)
    },
    createPlaylist(context, payload) {
      context.commit('createPlaylist', payload)
    }
  }
})