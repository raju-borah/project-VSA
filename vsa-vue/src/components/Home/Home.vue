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
      <section class="infocard">
        <div
          class="infocard__title"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >What makes us different?</div>

        <!--grid for the cards-->
        <div class="cardsgrid">
          <div class="card" data-aos="fade-up" data-aos-duration="1000">
            <div class="card__side card__side--front">
              <img src="../../assets/img/card-learn.jpg" alt="House 1" class="card__img">
              <h4 class="card__heading card__heading--1">
                <span class="card__text">learning</span>
              </h4>
            </div>
            <div class="card__side card__side--back card__side--back-1">
              <div class="card__cta">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae assumenda impedit
                  quos laudantium ducimus voluptatum quae! Vero hic ullam sint quae accusantium
                  temporibus? Doloremque deleniti perferendis similique consectetur minima consequuntur?
                </p>
              </div>
            </div>
          </div>

          <div class="card" data-aos="fade-up" data-aos-duration="1000">
            <div class="card__side card__side--front">
              <img src="../../assets/img/card-club.jpg" alt="House 1" class="card__img">
              <h4 class="card__heading card__heading--2">
                <span class="card__text">club</span>
              </h4>
            </div>
            <div class="card__side card__side--back card__side--back-2">
              <div class="card__cta">
                <p>
                  Corem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae assumenda impedit
                  quos laudantium ducimus voluptatum quae! Vero hic ullam sint quae accusantium
                  temporibus? Doloremque deleniti perferendis similique consectetur minima consequuntur?
                </p>
              </div>
            </div>
          </div>

          <div class="card" data-aos="fade-up" data-aos-duration="1000">
            <div class="card__side card__side--front">
              <img src="../../assets/img/head1.jpg" alt="House 1" class="card__img">
              <h4 class="card__heading card__heading--3">
                <span class="card__text">event</span>
              </h4>
            </div>
            <div class="card__side card__side--back card__side--back-3">
              <div class="card__cta">
                <p>
                  Eorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae assumenda impedit
                  quos laudantium ducimus voluptatum quae! Vero hic ullam sint quae accusantium
                  temporibus? Doloremque deleniti perferendis similique consectetur minima consequuntur?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- nested component forfeatured -->
      <Featured :thumb="videoThumb"/>
      <!-- nested component for learning -->
      <Learning :thumb="videoThumb"/>
      <!-- nested component for Club -->
      <Event :thumb="videoThumb"/>
      <!-- nested component for Event section -->
      <ClubActivities :thumb="videoThumb"/>

      <!-- till here -->
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
import db from "@/firebase/init";
import Navbar from "@/components/Navbar/Navbar";

export default {
  name: "Home",
  props: ["user"],
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
    return {
      videoThumb: ""
    };
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