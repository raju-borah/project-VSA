<template>
  <video ref="videoPlayer" class="video-js vjs-big-play-centered vjs-default-skin"></video>
</template>

<script>
import videojs from "video.js";

export default {
  name: "VideoPlayer",
  // props: {
  //   options: {
  //     type: Object,
  //     default() {
  //       return {};
  //     }
  //   }
  // },
  watch: {
    playerOption: {
      handler: function(state) {
        this.player = videojs(this.$refs.videoPlayer, state);
      }
    }
  },
  computed: {
    playerOption() {
      return this.$store.state.videoOptions;
    }
  },
  data() {
    return {
      player: null
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.$store.state.videoOptions
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>