<template>
  <video ref="videoPlayer" class="video-js vjs-big-play-centered vjs-default-skin player__container--1"></video>
</template>

<script>
import videojs from "video.js";
export default {
  name: "VideoPlayer",
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