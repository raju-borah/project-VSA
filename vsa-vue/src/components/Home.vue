<template>
  <div id="Home">
    
  </div>
</template>

<script>
export default {
  name: "Home",

  mounted() {
    console.log(this.$el);
    let slideIndex = 0; //this indicates to start from the first image

    const showSlides = () => {
      //array is needed to to get the length of images
      //here 3 images are used 0,1,2
      const nodelist = this.$el.querySelectorAll(".mySlides");
      //convert the nodelist to array
      const slides = Array.from(nodelist);

      console.log(slides); //array object 0,1,2

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
      // console.log(window)
      if (window.pageYOffset !== undefined) {
        console.log("I am here");
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

    // upload page
    const realFileBtn = this.$el.querySelector("#upload-file");
    const customBtn = this.$el.querySelector("#choose-video");
    const customText = this.$el.querySelector("#custom-text");

    // when choose a file button clicked
    customBtn.addEventListener("click", function() {
      realFileBtn.click();
    });

    realFileBtn.addEventListener("change", function() {
      if (realFileBtn.value) {
        // regular expersion for finding the file name
        customText.innerHTML = realFileBtn.value.match(
          /[\/\\]([\w\d\s\.\-\(\)]+)$/
        )[1];
      } else {
        customText.innerHTML = "No file choosen yet!";
      }
    });
  }
};
</script>