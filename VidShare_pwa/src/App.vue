<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "./assets/css/style.css";

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
.swal2-popup {
  font-size: 1.6rem !important;
}
.form__group.invalid input {
  border: 1px solid red;
  background-color: #ffc9aa;
}
.form__group.invalid label {
  color: red;
}
.showSpinner {
  background-color: #5643fa;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
