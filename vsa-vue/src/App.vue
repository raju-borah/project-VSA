<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "App",
  data() {
    return {
    };
  },
  // computed: {
  //   percent() {
  //     return this.$store.state.percentage;
  //   },
  //   task() {
  //     return this.$store.state.task;
  //     this.$store.state.key++;
  //   },
  //   fileName() {
  //     return this.$store.state.fileName;
  //   },
  //   progress() {}
  // },
  mounted() {
    // console.log(this.$store.state.task);
    // if (this.$store.state.task) {
    //   console.log("here");
    //   this.$store.state.task.on(
    //     "state_changed",
    //     // when upload is in progress
    //     snapShot => {
    //       // update the progress bar
    //       const progressBar = this.$el.querySelector("#prog");
    //       this.$store.state.percentage = Math.floor(
    //         (snapShot.bytesTransferred / snapShot.totalBytes) * 100
    //       );
    //       progressBar.value = Math.floor(this.$store.state.percentage);
    //     }
    //   );
    // }
  },
};
</script>

<style lang="scss">
@import "./assets/sass/style.css";

// -enter-active -> when page loads
// -leave-active -> when page closes
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
