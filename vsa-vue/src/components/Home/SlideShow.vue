<template>
  <div id="SlideShow">
    <section class="head" id="headSection">
      <header class="header">
        <!-- Events -->
        <div class="mySlides fade">
          <img src="../../assets/img/event-1.jpg">
          <div class="header__text-box">
            <h1 class="heading-primary textShadow">
              <span class="heading-primary--main">EVENTS</span>
              <span class="heading-primary--sub">Entertainment</span>
            </h1>
          </div>
        </div>
        <!-- learning -->
        <div class="mySlides fade">
          <img src="../../assets/img/head.jpg">
          <div class="header__text-box textShadow">
            <h1 class="heading-primary">
              <span class="heading-primary--main">LEARNING</span>
              <span class="heading-primary--sub">Knowleadge</span>
            </h1>
          </div>
        </div>
        <!-- activities -->
        <div class="mySlides fade">
          <img src="../../assets/img/col.jpg">
          <div class="header__text-box">
            <h1 class="heading-primary textShadow">
              <span class="heading-primary--main">CLUB ACTIVITIES</span>
              <span class="heading-primary--sub">joy</span>
            </h1>
          </div>
        </div>
      </header>
    </section>
  </div>
</template>

<script>
export default {
  name: "SlideShow",
  data() {
    return {};
  }
};
</script>

