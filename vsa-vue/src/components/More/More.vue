// from home.vue more btn 
<template>
  <div id="More">
    <Navbar/>

    <div class="morehead">
      <div class="morehead__back">
        <!--button for learning -->
        <button type="button" class="morehead__learn" id="LearnButton" @click="showLearn">
          <h1 class="morehead__learntext">LEARNING</h1>
        </button>

        <!--button for event-->
        <button type="button" class="morehead__event" id="eventButton">
          <h1 class="morehead__eventtext">EVENT</h1>
        </button>

        <!--button for club-->
        <button type="button" class="morehead__club" id="clubButton">
          <h1 class="morehead__clubtext">CLUB</h1>
        </button>
      </div>
    </div>

    <div class="morecontainer">
      <!--conatiner for videos to show from diffrent pages-->
      <span v-if="showLearnVis">
        <Learn/>
      </span>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import Learn from "@/components/More/Learn";
import Club from "@/components/More/Club";
import Event from "@/components/More/Event";
export default {
  name: "More",
  components: {
    Navbar,
    Learn,
    Club,
    Event
  },
  data() {
    return {
      showLearnVis: false,
      showClubVis: false,
      showEventVis: false
    };
  },
  methods: {
    showLearn() {
      if (!this.showLearnVis) {
        this.showLearnVis = true;
      } else {
        this.showLearnVis = false;
      }
    },
    showClub() {
      if (!this.showLearnVis) {
        this.showLearnVis = true;
      } else {
        this.showLearnVis = false;
      }
    },
    showEvent() {
      if (!this.showLearnVis) {
        this.showLearnVis = true;
      } else {
        this.showLearnVis = false;
      }
    }
  }
};
</script>

