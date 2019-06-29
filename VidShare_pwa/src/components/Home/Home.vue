<template>
  <div id="Home">
    <Navbar/>
    <!--heading section-->
    <section class="head" id="headSection">
      <header class="header">
        <!-- Events -->
        <div class="mySlides fade">
          <img src="../../assets/img/event-1.jpg" class="header_img">
          <div class="header__text-box">
            <h1 class="heading-primary textShadow">
              <span class="heading-primary--main">EVENTS</span>
              <span class="heading-primary--sub">Entertainment</span>
            </h1>
          </div>
        </div>
        <!-- learning -->
        <div class="mySlides fade">
          <img src="../../assets/img/head.jpg" class="header_img">
          <div class="header__text-box textShadow">
            <h1 class="heading-primary">
              <span class="heading-primary--main">LEARNING</span>
              <span class="heading-primary--sub">Knowleadge</span>
            </h1>
          </div>
        </div>
        <!-- activities -->
        <div class="mySlides fade">
          <img src="../../assets/img/club.jpg" class="header_img">
          <div class="header__text-box">
            <h1 class="heading-primary textShadow">
              <span class="heading-primary--main">CLUB ACTIVITIES</span>
              <span class="heading-primary--sub">joy</span>
            </h1>
          </div>
        </div>
      </header>
    </section>

    <!--main body design after header-->
    <main class="main">
      <!--notification panel-->
      <div id="notification" class="notify">
        <!-- inner content -->
        <div class="notify_panel">
          <!--title for notification-->
          <div class="notify_panel--title">
            <i class="fas fa-exclamation-circle"></i>
            NOTIFICATIONS
          </div>

          <!--grid for notfication-->
          <div class="notify_panel_layout">
            <!--notification box-->
            <div class="notify_panel_notes">
              <div class="notify_panel_notes--thumb"></div>
              <div class="notify_panel_notes--user">
                <span class="notify_panel_notes--user--name">Nabajyoti borah</span>
                <span class="notify_panel_notes--user--tag">COMMENTED ON OUR VIDEO</span>
              </div>
              <div class="notify_panel_notes--comment"></div>
            </div>
          </div>
        </div>
      </div>

      <!--info story section-->
      <!---------------------------New html and css-------------------------------->

      <section class="infocard">
        <!--heading of info card-->
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
      <!--INFO SECTION DONE-->

      <!---------------------------New html and css-------------------------------->
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
            >
              <div class="vcardhome__img">
                <!--video place-->
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

            <div class="vcardhome vcardhome__club" data-aos="flip-up" data-aos-duration="1000">
              <div class="vcardhome__img">
                <!--video place-->

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

            <div class="vcardhome vcardhome__event" data-aos="fade-left" data-aos-duration="1000">
              <div class="vcardhome__img">
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
      <!--feature SECTION DONE-->

      <!---------------------------New html and css-------------------------------->
      <!--Learning section-->
      <section class="learning">
        <div class="learning__heading">
          <h3 class="learning__title">LEARNING</h3>
          <a href class="learning__more">
            <span>View More</span>
          </a>
        </div>

        <div class="grid">
          <div class="vcardhome vcardhome__learning border">
            <div class="vcardhome__img">
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

          <div class="vcardhome vcardhome__learning border">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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

          <div class="vcardhome vcardhome__learning border">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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

          <div class="vcardhome vcardhome__learning border">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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

          <div class="vcardhome vcardhome__learning border">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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

          <div class="vcardhome vcardhome__learning border">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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
        </div>

        <span class="line"></span>
      </section>

      <!---------------------------New html and css-------------------------------->
      <!--Club section-->
      <section class="club">
        <div class="club__heading">
          <h3 class="club__title">CLUB ACTIVITIES</h3>
          <a href class="club__more">
            <span>View More</span>
          </a>
        </div>

        <div class="grid">
          <div class="vcardhome vcardhome__club">
            <div class="vcardhome__img">
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

          <div class="vcardhome vcardhome__club">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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

          <div class="vcardhome vcardhome__club">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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

          <div class="vcardhome vcardhome__club">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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

          <div class="vcardhome vcardhome__club">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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

          <div class="vcardhome vcardhome__club">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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
        </div>
      </section>

      <!---------------------------New html and css-------------------------------->
      <!--Event section-->
      <section class="event">
        <div class="event__heading">
          <h3 class="event__title">EVENTS</h3>
          <a href class="event__more">
            <span>View More</span>
          </a>
        </div>

        <div class="grid">
          <div class="vcardhome vcardhome__event">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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

          <div class="vcardhome vcardhome__event">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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

          <div class="vcardhome vcardhome__event">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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

          <div class="vcardhome vcardhome__event">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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

          <div class="vcardhome vcardhome__event">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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

          <div class="vcardhome vcardhome__event">
            <div class="vcardhome__img">
              <!-- the tag for video -->
              <!--new colours for all categories added in grid.scss-->

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
      </section>

      <!--MY team section-->

      <section class="team">
        <!--team icon-->
        <div>
          <center>
            <span class="team__icon">
              <i class="fas fa-users"></i>
            </span>
          </center>
        </div>

        <!--team title-->
        <div>
          <h3 class="team__title">MEET OUR TEAM</h3>
        </div>

        <!-- Section Description -->
        <div class="team__description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div class="team__grid">
          <!--member 1-->
          <div class="team__member">
            <a href="#" class="team__profile">
              <div class="team__unhover-img">
                <img class="team__img" src="../../assets/img/man.png" alt>
              </div>

              <div class="team__hover-img">
                <img class="team__img" src="../../assets/img/man.png" alt>
              </div>

              <span class="team__designation">CS16MSIIT004</span>

              <h4 class="team__h4">
                <span class="team__name">Vivek</span>Chetia
              </h4>
            </a>

            <!--social media link needed-->
            <ul class="team__list">
              <li class="team__item">
                <a href="#" class="team__link" target="_blank">
                  <i class="fab fa-github-square"></i>
                </a>
              </li>
              <li class="team__item">
                <a href="#" class="team__link" target="_blank">
                  <i class="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>

          <!--member 2-->
          <div class="team__member">
            <a href="#" class="team__profile">
              <div class="team__unhover-img">
                <img class="team__img" src="../../assets/img/man.png" alt>
              </div>

              <div class="team__hover-img">
                <img class="team__img" src="../../assets/img/man.png" alt>
              </div>

              <span class="team__designation">CS16MSIIT020</span>

              <h4 class="team__h4">
                <span class="team__name">Raju Moni</span>Borah
              </h4>
            </a>

            <!--social media link needed-->
            <ul class="team__list">
              <li class="team__item">
                <a href="#" class="team__link" target="_blank">
                  <i class="fab fa-github-square"></i>
                </a>
              </li>
              <li class="team__item">
                <a href="#" class="team__link" target="_blank">
                  <i class="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>

          <!--member 4-->
          <div class="team__member">
            <a href="#" class="team__profile">
              <div class="team__unhover-img">
                <img class="team__img" src="../../assets/img/man.png" alt>
              </div>

              <div class="team__hover-img">
                <img class="team__img" src="../../assets/img/man.png" alt>
              </div>
              <span class="team__designation">CS16MSIIT035</span>

              <h4 class="team__h4">
                <span class="team__name">Nabajyoti</span>Borah
              </h4>
            </a>

            <!--social media link needed-->
            <ul class="team__list">
              <li class="team__item">
                <a href="#" class="team__link" target="_blank">
                  <i class="fab fa-github-square"></i>
                </a>
              </li>
              <li class="team__item">
                <a href="#" class="team__link" target="_blank">
                  <i class="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
    <!--main bosy end-->

    <!--footer-->
    <section class="footer">
      <div class="footer__back">
        <div class="footer__logo">
          <i class="fa fa-camera-retro"></i>
          <h3 class="footer__logo-name">VSA</h3>
          <span class="footer__copy"></span>
        </div>

        <div class="footer__communication">
          <div class="footer__communication--text">CONTACT US</div>

          <div class="footer__communication--call">
            <i class="fa fa-phone"></i>
            <span class="footer__communication--callinfo">+919876543210</span>
          </div>

          <div class="footer__communication--location">
            <i class="fa fa-map-marker"></i>
            <span class="footer__communication--locationinfo">Kaziranga&nbsp;university</span>
          </div>

          <div class="footer__communication--mail">
            <i class="fa fa-envelope"></i>
            <span class="footer__communication--mailinfo">VSA@gmail.com</span>
          </div>
        </div>

        <div class="footer__social">
          <div class="footer__social--text">FOLLOW US AT</div>
          <a href="#" class="footer__social--fb">
            <i class="fab fa-facebook-square"></i>
          </a>

          <a href="#" class="footer__social--twit">
            <i class="fab fa-twitter-square"></i>
          </a>

          <a href="#" class="footer__social--link">
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </section>
    <!--footer end-->
  </div>
</template>
<script>
import Navbar from "../Navbar/Navbar";
export default {
  name: "Home",
  components: {
    Navbar
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
  }
};
</script>
