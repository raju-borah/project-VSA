<template>
  <div id="Featured">
    <!--Featured section-->
    <section class="feature">
      <div class="feature__container">
        <div class="feature__heading" data-aos="zoom-in-up" data-aos-duration="1000">
          <h3>Featured Videos</h3>
          <span class="feature__left-line"></span>
          <span>
            <i class="fas fa-play"></i>
          </span>
          <span class="feature__right-line"></span>
        </div>

        <div class="feature__contents">
          <div
            class="vcardhome vcardhome__learning"
            data-aos="fade-right"
            data-aos-duration="1000"
            @click.stop="redirectToPlay"
          >
            <div class="vcardhome__img">
              <!--video place-->
              <video class="feature__video" preload="auto">
                <!-- source willbe dynamic -->
                <source
                  src="https://firebasestorage.googleapis.com/v0/b/thevsapp.appspot.com/o/video%2Fcs16msiit004%2Fvideo%40Design%20.mp4?alt=media&token=2fde8966-6c27-4395-bdc1-6ab9ff384119"
                  type="video/mp4"
                >
              </video>
              <div class="hoverbtn hoverbtn__learning">
                <i class="fas fa-play-circle homeplay"></i>
              </div>
            </div>

            <div class="vcardhome__info vcardhome__info--learning">
              <div class="vcardhome__info--title">
                <!-- dynamiv title of the video -->

                <span>Fun way to Learn JavaScript And other new contents</span>
                <br>
                <!-- timestamp when the video was created -->
                <span class="timestamp font-small">Created on: 15-04-2019</span>
              </div>
            </div>
          </div>

          <div
            class="vcardhome vcardhome__club"
            data-aos="flip-up"
            data-aos-duration="1000"
            @click.stop="redirectToPlay"
          >
            <div class="vcardhome__img">
              <!--video place-->
              <video class="feature__video" preload="auto">
                <!-- source willbe dynamic -->
                <source
                  src="https://firebasestorage.googleapis.com/v0/b/thevsapp.appspot.com/o/video%2Fcs16msiit004%2Fvideo%40Design%20.mp4?alt=media&token=2fde8966-6c27-4395-bdc1-6ab9ff384119"
                  type="video/mp4"
                >
              </video>
              <div class="hoverbtn hoverbtn__club">
                <i class="fas fa-play-circle homeplay"></i>
              </div>
            </div>

            <div class="vcardhome__info vcardhome__info--club">
              <div class="vcardhome__info--title">
                <!-- dynamiv title of the video -->

                <span>Fun way to Learn JavaScript And other new contents</span>
                <br>
                <!-- timestamp when the video was created -->
                <span class="timestamp font-small">Created on: 15-04-2019</span>
              </div>
            </div>
          </div>

          <div
            class="vcardhome vcardhome__event"
            data-aos="fade-left"
            data-aos-duration="1000"
            @click.stop="redirectToPlay"
          >
            <div class="vcardhome__img">
              <video class="feature__video" preload="auto">
                <!-- source willbe dynamic -->
                <source
                  src="https://firebasestorage.googleapis.com/v0/b/thevsapp.appspot.com/o/video%2Fcs16msiit004%2Fvideo%40Design%20.mp4?alt=media&token=2fde8966-6c27-4395-bdc1-6ab9ff384119"
                  type="video/mp4"
                >
              </video>

              <div class="hoverbtn hoverbtn__event">
                <i class="fas fa-play-circle homeplay"></i>
              </div>
            </div>

            <div class="vcardhome__info vcardhome__info--event">
              <div class="vcardhome__info--title">
                <!-- dynamiv title of the video -->

                <span>Fun way to Learn JavaScript And other new contents</span>
                <br>
                <!-- timestamp when the video was created -->
                <span class="timestamp font-small">Created on: 15-04-2019</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Featured",
  data() {
    return {};
  },
  methods: {
    redirectToPlay() {
      this.$router.push({
        name: "Play",
        params: { id: "MXuiOrYKHZEcEx4jIuSS" }
      });
    }
  }
};
</script>
