<template>
  <div id="Play">
    <!-- 
            nested Navbar required 
    -->
    <Navbar/>

    <div class="player">
      <div class="player__container">
        <video controls class="videoplayer">
          <source src="img/sample.mp4" type="video/mp4">
        </video>
        <div class="videoinfo">
          <h1 class="font-medium" id="video-title">JavaScript</h1>
          <h2 class="font-small" id="video-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Rerum recusandae animi, nostrum,
            facilis dicta, excepturi atque dolore quam velit quas cum. Quae unde dolor doloremque delectus, qui
            assumenda vitae aliquam?
          </h2>
        </div>

        <div class="video__comments">
          <h1>Comments</h1>
        </div>
      </div>
      <div class="player__suggestedvideo">
        <h1>&nbsp;&nbsp; Suggested Videos</h1>

        <ul class="list">
          <li class="list--items">
            <iframe src="https://www.youtube.com/embed/zGR0Dep0sqk" frameborder="0"></iframe>
          </li>
          <li class="list--items">
            <iframe src="https://www.youtube.com/embed/zGR0Dep0sqk" frameborder="0"></iframe>
          </li>
          <li class="list--items">
            <iframe src="https://www.youtube.com/embed/zGR0Dep0sqk" frameborder="0"></iframe>
          </li>
          <li class="list--items">
            <iframe src="https://www.youtube.com/embed/zGR0Dep0sqk" frameborder="0"></iframe>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";

export default {
  name: "Play",
  components: {
    Navbar
  },
  data() {
    return {};
  }
};
</script>

