<template>
  <div id="More">
    <div class="morehead">
      <div class="morehead__back">
        <!--button for learning -->
        <button type="button" class="morehead__learn" id="LearnButton" @click="showLearn">
          <h1 class="morehead__learntext">LEARNING</h1>
        </button>

        <!--button for event-->
        <button type="button" class="morehead__event" id="eventButton" @click="showEvent">
          <h1 class="morehead__eventtext">EVENT</h1>
        </button>

        <!--button for club-->
        <button type="button" class="morehead__club" id="clubButton" @click="showClub">
          <h1 class="morehead__clubtext">CLUB</h1>
        </button>
      </div>
    </div>
    <!--nav bar for more page-->
    <Navbar/>
    <!--navbar  end-->
    <div class="morecontainer">
      <!--lerning part-->
      <transition name="fade">
        <Learn v-if="showLearnVis"/>
        <!--event part-->
        <Event v-if="showEventVis"/>
        <!--club part-->
        <Club v-if="showClubVis"/>
      </transition>

      <!--conatiner for videos to show from diffrent pages-->
    </div>
  </div>
</template>

<script>
import UserContainer from "@/components/Navbar/UserContainer";
import Navbar from "@/components/Navbar/Navbar";
import Learn from "@/components/More/Learn";
import Club from "@/components/More/Club";
import Event from "@/components/More/Event";
export default {
  name: "More",
  components: {
    UserContainer,
    Learn,
    Club,
    Event,
    Navbar
  },
  props: ["opt"],
  data() {
    return {
      showLearnVis: false,
      showClubVis: false,
      showEventVis: false
    };
  },
  methods: {
    showLearn() {
      this.showLearnVis = true;
      this.showEventVis = false;
      this.showClubVis = false;
    },
    showClub() {
      this.showClubVis = true;
      this.showLearnVis = false;
      this.showEventVis = false;
    },
    showEvent() {
      this.showEventVis = true;
      this.showClubVis = false;
      this.showLearnVis = false;
    }
  },
  created() {
    if (this.$route.params.id === "AxC") this.showClub();
    else if (this.$route.params.id === "AxE") this.showEvent();
    else if (this.$route.params.id === "AxL") this.showLearn();
    else this.$router.push({ name: "PageNotFound" });
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
