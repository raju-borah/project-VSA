<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive include="home">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "App",
  data() {
    return {};
  }
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
