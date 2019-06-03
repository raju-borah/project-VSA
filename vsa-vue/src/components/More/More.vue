<template>
  <div id="More">
    <div class="morehead" :style="{background: bgColor}">
      <!--button for learning -->
      <div>
        <button
          type="button"
          class="morehead__learn"
          id="LearnButton"
          @click="showLearn"
          @mouseover="learnColor"
          @mouseout="defaultColor"
        >
          <h1 class="morehead__learntext">LEARNING</h1>
        </button>
      </div>

      <!--button for event-->
      <div>
        <button
          type="button"
          class="morehead__event"
          id="eventButton"
          @click="showEvent"
          @mouseover="eventColor"
          @mouseout="defaultColor"
        >
          <h1 class="morehead__eventtext">EVENT</h1>
        </button>
      </div>

      <!--button for club-->
      <div>
        <button
          type="button"
          class="morehead__club"
          id="clubButton"
          @click="showClub"
          @mouseover="clubColor"
          @mouseout="defaultColor"
        >
          <h1 class="morehead__clubtext">CLUB</h1>
        </button>
      </div>
    </div>
    <Navbar/>
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
import Learn from "@/components/More/Learn";
import Club from "@/components/More/Club";
import Event from "@/components/More/Event";
import Navbar from "@/components/Navbar/Navbar";

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
      showEventVis: false,
      bgColor: "linear-gradient(120deg, #28b485 30%, #5643fa 60%, #ff7730 90%)"
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
    },
    learnColor() {
      this.bgColor = "#28b485";
    },
    clubColor() {
      this.bgColor = "#ff7730";
    },
    eventColor() {
      this.bgColor = "#5643fa";
    },
    defaultColor() {
      this.bgColor =
        "linear-gradient(120deg, #28b485 30%, #5643fa 60%, #ff7730 90%)";
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
