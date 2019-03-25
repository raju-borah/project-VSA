<template>
  <div id="home">
    <!-- navigation bar -->
    <div class="navigationbar">
      <!-- for the left part -->
      <div class="navbarfont navigationbar--left">
        <!-- checkedbox for controling list items -->
        <input type="checkbox" class="navigationbar__checkbox" id="navi-toggle">
        <label for="navi-toggle" class="navigationbar__button">
          <!-- the navigation icon -->
          <div class="navigationbar--left--icon"></div>
        </label>

        <!-- more settings option -->
        <ul class="navigationbar__more_setting">
          <li class="navigationbar__more_setting--item">
            <a href="#" class="listlink--item">Channel</a>
          </li>
          <li class="navigationbar__more_setting--item">
            <a href="#" class="listlink--item">Settings</a>
          </li>
          <li class="navigationbar__more_setting--item">
            <a href="#" class="listlink--item">
              <!--custom icon <img src="img//icons/support.png" class="icon" alt="">&nbsp; &nbsp; &nbsp; -->
              Help
            </a>
          </li>
          <li class="navigationbar__more_setting--item">
            <a href="#" class="listlink--item">Feedback</a>
          </li>
        </ul>
      </div>
      <!-- name of the Application -->
      <div class="navbarfont navigationbar--mid">
        <a href="#" class="navbar_items">Vidshare</a>
      </div>
      <!-- for right option such as search, user profile, upload -->
      <div class="navbarfont navigationbar--right">
        <div class="search u-margin-right-medium">
          <input type="text" placeholder="Search" class="search__input">
          <button type="button" class="search__btn" id="searchButton">
            <i class="fa fa-search search__icon" aria-hidden="true"></i>
          </button>
        </div>
        <a href="#" class="navbar_items">
          <i class="fas fa-user-tie"></i>
        </a>
        <a href="#upload" class="navbar_items">
          <i class="fas fa-cloud-upload-alt">&nbsp; Upload</i>
        </a>
      </div>
    </div>

    <!--heading section-->
    <section class="head">
      <header class="header">
        <!-- Events -->
        <div class="mySlides fade">
          <img src="../assets/img/event-2.jpg">
          <div class="header__text-box">
            <h1 class="heading-primary textShadow">
              <span class="heading-primary--main">EVENTS</span>
              <span class="heading-primary--sub">Entertainment</span>
            </h1>
          </div>
        </div>
        <!-- learning -->
        <div class="mySlides fade">
          <img src="../assets/img/head.jpg">
          <div class="header__text-box textShadow">
            <h1 class="heading-primary">
              <span class="heading-primary--main">LEARNING</span>
              <span class="heading-primary--sub">Knowleadge</span>
            </h1>
          </div>
        </div>
        <!-- activities -->
        <div class="mySlides fade">
          <img src="../assets/img/col.jpg">
          <div class="header__text-box">
            <h1 class="heading-primary textShadow">
              <span class="heading-primary--main">CLUB ACTIVITIES</span>
              <span class="heading-primary--sub">joy</span>
            </h1>
          </div>
        </div>
      </header>
    </section>

    <main class="main">
      <!-- upload section  starting-->
      <div class="upload" id="upload">
        <!-- container -->
        <div class="upload__container">
          <!-- upload videos section -->
          <div class="upload__videos--card u-center-text">
            <span class="u-end-text">
              <a href="" class="btn btn--close">&times;
                  <router-link :to="{ name: 'Home'}"></router-link>
              </a>
            </span>
            <!-- heading -->
            <h1 class="font-medium u-margin-bottom-small">Upload Videos</h1>
            <!-- upload button -->
            <input type="file" id="upload-file" accept="video/*" hidden="hidden">
            <!-- text to display the file name to be uploaded -->
            <span id="custom-text">No file Choosen yet !</span>
            <button type="button" class="btn btn--upload u-margin-bottom-medium" id="choose-video">
              CHOOSE A
              FILE
            </button>

            <!-- for title -->
            <input
              type="text"
              class="form__input--upload form__input--upload--1"
              id="upload-title"
              placeholder="Title"
            >
            <!-- for description -->
            <textarea
              rows="2"
              cols="30"
              class="form__input--upload form__input--upload--1"
              id="upload-description"
              placeholder="Description"
            ></textarea>
            <!-- for selecting the category -->
            <select id="video-category" class="form__input--upload form__input--upload--2">
              <option value="Select Category" selected>Select Category</option>
              <option value="learning">Learning</option>
              <option value="Events">Events</option>
              <option value="Entertainment">Entertainment</option>
              <option value="others">Others</option>
            </select>

            <button class="btn btn--upload" type="submit" id="upload-video">Upload</button>
          </div>
        </div>
      </div>
      <!-- ending of upload section -->

      <!--slider section-->
      <section class="slider">
        <!--slider heading-->
        <div class="slider__heading">
          <h2>What we provide?</h2>
        </div>

        <!--slider about part-->
        <div class="slider__grid">
          <div class="slider__info">
            <div class="slider__info--learning">
              <h1>learn</h1>
            </div>

            <div class="slider__info--event">
              <h1>learn</h1>
            </div>

            <div class="slider__info--club">
              <h1>learn</h1>
            </div>
          </div>
        </div>
      </section>

      <!--Learning section-->
      <section class="learning">
        <div class="heading">
          <h3 class="heading__title">LEARNING</h3>
        </div>

        <div class="grid">
          <div class="item item--1">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>

          <div class="item item--2">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>

          <div class="item item--3">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>

          <div class="item item--4">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>

          <div class="item item--5">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </section>

      <!--Club section-->
      <section class="club">
        <div class="heading">
          <h3 class="heading__title">CLUB ACTIVITIES</h3>
        </div>

        <div class="grid">
          <div class="item item--1">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>

          <div class="item item--2">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>

          <div class="item item--3">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>

          <div class="item item--4">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>

          <div class="item item--5">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </section>

      <!--Event section-->
      <section class="event">
        <div class="heading">
          <h3 class="heading__title">EVENTS</h3>
        </div>

        <div class="grid">
          <div class="item item--1">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>
          <div class="item item--2">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>
          <div class="item item--3">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>
          <div class="item item--4">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>
          <div class="item item--5">
            <iframe src="https://www.youtube.com/embed/1-xGerv5FOk" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      created() {
        // upload page
        const realFileBtn = document.getElementById("upload-file");
        const customBtn = document.getElementById("choose-video");
        const customText = document.getElementById("custom-text");

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

        //to fade the header section on scroll
        function opacity() {
          var head = document.querySelector(".head");

          //height of the window
          var height = window.innerHeight;
          console.log(height); //486

          if (window.pageYOffset !== undefined) {
            var scrollTop = window.pageYOffset;
          } else {
            scrollTop = document.documentElement || document.body.parentNode;
          }
          console.log(scrollTop);

          // Change this if you want it to fade faster
          height = height / 1;

          head.style.opacity = (height - scrollTop) / height;
        }

        window.addEventListener("scroll", opacity); //header opacity
        var slideIndex = 0;

        showSlides();

        function showSlides() {
          var i;
          var slides = document.getElementsByClassName("mySlides");

          for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
          }

          slideIndex++;

          if (slideIndex > slides.length) {
            slideIndex = 1;
          }

          slides[slideIndex - 1].style.display = "block";
          setTimeout(showSlides, 10000); // Change image every 10 seconds
        }
      }
    };
  }
};
</script>

<style>
@import "../assets/css/style.css";
</style>

