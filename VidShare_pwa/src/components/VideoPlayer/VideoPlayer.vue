<template>
  <video
    ref="videoPlayer"
    class="player__container--1 video-js vjs-big-play-centered vjs-default-skin"
  ></video>
</template>

<script>
import videojs from "video.js";
import videojsPlaylist from "videojs-playlist";

export default {
  name: "VideoPlayer",
  data() {
    return {
      player: null
    };
  },
  mounted() {
    if (this.$route.params.is === "1") {
      this.player = videojs(this.$refs.videoPlayer, {
        autoplay: true,
        controls: true,
        preload: "auto",
        playbackRates: [1, 1.5, 2]
      });

      this.player.playlist(this.playlistVideos);
      this.player.playlist.autoadvance(0);

      /* ADD PREVIOUS */
      let Button = videojs.getComponent("Button");

      // Extend default
      let PrevButton = videojs.extend(Button, {
        constructor: function() {
          Button.apply(this, arguments);
          /* NEW VIDEOJS ICON PREV NEXT */
          this.addClass("vjs-icon-previous-item");
          this.controlText("Previous");
        },

        handleClick: () => {
          this.player.playlist.previous();
        }
      });

      /* ADD BUTTON */
      // Extend default
      let NextButton = videojs.extend(Button, {
        constructor: function() {
          Button.apply(this, arguments);
          /* NEW VIDEOJS ICON PREV NEXT */
          this.addClass("vjs-icon-next-item");
          this.controlText("Next");
        },

        handleClick: () => {
          this.player.playlist.next();
        }
      });

      // Register the new component
      videojs.registerComponent("NextButton", NextButton);
      videojs.registerComponent("PrevButton", PrevButton);
      this.player.getChild("controlBar").addChild("PrevButton", {}, 0);
      this.player.getChild("controlBar").addChild("NextButton", {}, 2);
    } else {
      this.player = videojs(
        this.$refs.videoPlayer,
        this.$store.state.videoOptions
      );
    }
  },
  watch: {
    playerIndex: {
      handler: function(val) {
        this.$store.state.playlistVideoIndex = val;
      }
    }
  },
  computed: {
    playlistVideos() {
      return this.$store.state.playlistVideos;
    },
    playerIndex() {
      if (this.player && this.$route.params.is === "1") {
        return this.player.playlist.currentIndex();
      }
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>
