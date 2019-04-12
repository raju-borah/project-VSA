/* eslint-disable */
<template>
  <div id="Home">
    <!-- 
      nested component for 
      Navigation bar
    -->
    <Navbar/>

    <!--heading section-->
    <!-- nested component for SlideShow -->
    <SlideShow/>

    <main class="main">
      <!--info section-->
      <section class="info">
        <!--info heading-->
        <div class="info__heading u-margin-top-large" data-aos="zoom-in" data-aos-duration="1000">
          <h2>What makes us diffrent?</h2>
        </div>

        <!--info about part-->
        <div class="info__grid">
          <div
            class="info__learning"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            <div class="info__imgbox">
              <img src="../../assets/img/head1.jpg" alt class="info__img">
            </div>

            <h5 class="info__title">LEARNING</h5>

            <p class="info__text">
              Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Eligendi, eos fuga laudantium
              vel sunt cupiditate vero. Mollitia placeat ratione aliquam!
            </p>
          </div>

          <!--Eevent card-->
          <div
            class="info__event"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            <div class="info__imgbox">
              <img src="../../assets/img/event1.jpg" alt class="info__img">
            </div>
            <h5 class="info__title">Event</h5>

            <p class="info__text">
              Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Eligendi, eos fuga laudantium
              vel sunt cupiditate vero. Mollitia placeat ratione aliquam!
            </p>
          </div>
          <!--Club card-->
          <div
            class="info__club"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            <div class="info__imgbox">
              <img src="../../assets/img/floor1.jpg" alt class="info__img">
            </div>

            <h5 class="info__title">CLUB ACTIVITIES</h5>

            <p class="info__text">
              Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Eligendi, eos fuga laudantium
              vel sunt cupiditate vero. Mollitia placeat ratione aliquam!
            </p>
          </div>
        </div>
      </section>

      <!-- nested component forfeatured -->
      <Featured/>

      <!-- nested component for learning -->
      <Learning/>
      <!-- nested component for Club -->
      <Event/>
      <!-- nested component for Event section -->
      <ClubActivities/>

      <!-- nested component About Team  -->
      <Team/>
    </main>
    <!-- 
    nested component footer 
    -->
    <Footer/>
  </div>
</template>


<script>
import Learning from "@/components/Home/Learning";
import Event from "@/components/Home/Events";
import ClubActivities from "@/components/Home/ClubActivities";
import Featured from "@/components/Home/Featured";
import Footer from "@/components/Home/Footer";
import Team from "@/components/Home/Team";
import SlideShow from "@/components/Home/SlideShow";
import Navbar from "@/components/Navbar/Navbar";

export default {
  name: "Home",
  components: {
    Learning,
    Event,
    ClubActivities,
    Featured,
    Navbar,
    Footer,
    Team,
    SlideShow
  },
  data() {
    return {};
  },
  mounted() {
    let slideIndex = 0; //this indicates to start from the first image

    const showSlides = () => {
      //array is needed to to get the length of images
      //here 3 images are used 0,1,2
      const nodelist = this.$el.querySelectorAll(".mySlides");

      //convert the nodelist to array
      const slides = Array.from(nodelist);

      //the loop is to hide the current image
      slides.forEach(cur => (cur.style.display = "none"));

      //increase the sildeindex to go to next image
      slideIndex++;

      //if slideindex increses more than the length of the array
      if (slideIndex > slides.length) {
        slideIndex = 1; //initiate it to the 1 postion
      }

      //to display the image
      slides[slideIndex - 1].style.display = "block";
      setTimeout(showSlides, 10000); // Change image every 10 seconds
    };
    showSlides();

    //to fade the header section on scroll
    const opacity = () => {
      const head = this.$el.querySelector(".head");
      let scrollTop;
      //height of the content area that is visible on screen
      let height = window.innerHeight;

      if (window.pageYOffset !== undefined) {
        scrollTop = window.pageYOffset;
      } else {
        scrollTop = this.$el.documentElement || this.$el.body.parentNode;
      }

      // Change this if you want it to fade faster
      height = height / 1.1;
      //increase or decrease the opacity according to the scroll
      head.style.opacity = (height - scrollTop) / height;
    };

    window.addEventListener("scroll", opacity); //header opacity
  }
};
</script>