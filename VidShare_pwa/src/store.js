import Vue from 'vue'
import Vuex from 'vuex'
import { auth, storage, firestore } from 'firebase'
import db from './main'
import { router } from './router'

Vue.use(Vuex)

// const alert = msg => {
//   swal
// }

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
    dob: null,
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
          src: 'https://firebasestorage.googleapis.com/v0/b/thevsapp.appspot.com/o/001%20Introduction%20to%20the%20App%20Design%20Course.mp4?alt=media&token=83dbf921-ebfe-4639-9db0-ac9c8d0a0b98',
          type: "video/mp4"
        }
      ]
    },

    //upload task
    task: null,
    percentage: 0,
    paused: false,
    fileName: null
  },
  mutations: {
    resetUser(state) {
      state.loggedInUser = null
      state.email = null
      state.name = null
      state.uid = null
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
                swal.fire({
                  type: 'success',
                  title: 'Signed in successfully',
                  toast: true,
                  position: 'bottom-end',
                  showConfirmButton: false,
                  timer: 3000
                })
              })
              .catch(err => {
                state.loginSpinner = false;
                swal.fire({
                  type: "error",
                  title: "Oops..",
                  text: err.message
                });
                console.error(err);
              });
          } else {
            state.loginSpinner = false;
            swal.fire({
              type: "error",
              title: "Oops...",
              text: "Email is not verified, please verify it!"
            });
          }
        })
        .catch(err => {
          state.loginSpinner = false;
          swal.fire({
            type: "error",
            title: "Oops...",
            text: "Invalid Email or Password"
          });
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
                swal.fire({
                  type: "success",
                  text:
                    "Please check the link sent to your email to verify your account!"
                });
              })
              .catch(err => {
                state.signupSpinner = false;
                swal.fire({
                  type: 'error',
                  text: 'Database error \nIf the problem still persist, please contact the developer!'
                })
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
                console.log(doc.id);
                let refDoc = db.collection("validuser").doc(doc.id);
                refDoc.update({
                  name: payload.firstName + " " + payload.lastName
                });
              });
            })
          // .then(() => {
          //   payload.vmodalReset();
          // });
        })
        .catch(err => {
          state.signupSpinner = false;
          swal.fire({
            type: "error",
            text: err.message
          });
        });
    },
    logout() {
      auth()
        .signOut()
        .then(() => {
          router.push({ name: "Home" });
          swal.fire({
            type: 'success',
            title: 'Logout successfully',
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3000
          })
        });
    },
    changeName(state, payload) {
      let ref = db.collection('validuser').doc(state.uid)
      ref.update({
        name: payload
      })
        .then(() => {
          state.name = payload
          swal.fire({
            type: 'success',
            text: 'Name changed!'
          })
        })
        .catch(err => {
          console.error(err)
          swal.fire({
            type: ' error',
            text: 'Name change error'
          })
        })
    },
    sendPasswordResetLink(state) {
      auth().sendPasswordResetEmail(state.email).then(() => {
        swal.fire({
          type: 'success',
          text: 'Link sent to your email!'
        })
      })
    },
    changeProfilePic(state, payload) {
      let ref = db.collection("validuser")
        .doc(state.uid)
      ref.update({
        profilePic: payload
      })
        .then(() => {
          // alert("Profile Pic Changed! :)");
          swal.fire({
            type: 'success',
            text: 'Profile Pic Changed! :)'
          })
          state.profilePic = payload
        });
    },
    edit(state, payload) {
      let ref = db.collection('profile').doc(state.uid)
      ref.set(payload, { merge: true })
        .then(() => {
          swal.fire({
            type: 'success',
            text: 'Profile edited !'
          })
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
          swal.fire({
            type: 'success',
            text: 'Cover Pic changed!'
          })
        })
    },
    uploadVideo(state, payload) {
      // create a storage ref
      let storageRef = storage().ref("video/" + state.uid + "/" + payload.title + ".mp4");

      state.fileName = payload.file.name

      // upload file
      state.task = storageRef.put(payload.file);
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
          swal.fire({
            type: 'error',
            text: 'Upload error, ' + err.message
          })
          console.error(err);
        },
        // when upload is completed
        () => {
          state.percentage = 0;
          state.paused = false;
          state.task = null;

          db.collection('uploadedVideos')
            .doc()
            .set({
              title: payload.title,
              description: payload.description,
              thumbnail: payload.thumbnail,
              timestamp: firestore.FieldValue.serverTimestamp(),
              by: state.uid,
              category: payload.category
            })
            .then(() => {
              swal.fire({
                type: 'success',
                text: 'File uploaded!'
              })
            })
        }
      );
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
    }
  }
})