<template>
  <div id="MoreNav" class="morenav">
    <!-- for right option such as usr, home button -->
    <div class="morebarfont morenav__right">
      <div class="searchmore">
        <input type="text" placeholder="searchmore" class="searchmore__input" required>
        <button type="button" class="searchmore__btn" id="searchmoreButton">
          <i class="navbar_items fa fa-search searchmore__icon" aria-hidden="true"></i>
        </button>
      </div>

      <!--home button-->
      <button type="button" class="morebar_items morebar_items--icon homebutton">
        <i class="fas fa-home"></i>
      </button>

      <!-- user button -->

      <button type="button" class="morebar_items morebar_items--icon userbutton">
        <i class="fas fa-user-circle"></i>
      </button>

      <div class="usercontainer">
        <!-- if user signed the following div will be displayed -->
        <div class="signincontainer">
          <img src="img/icons/man.png" class="signincontainer__img" alt>
          <ul class="ul__list">
            <li class="ul__list--items">
              <h1 class="accountHolderName">Raju Moni Borah</h1>
            </li>
            <li class="ul__list--items">
              <h2 class="accountHolderId">cs16msiit020@kazirangauniversity.in</h2>
            </li>
            <li class="ul__list--items">
              <a href="settings.html" class="list--link font-small">Account</a>
              &nbsp;
              <a href="dashboard.html" class="list--link font-small">My videos</a>
            </li>

            <!-- list item for progress bar -->
            <li class="ul__list--items ul__list--items--progress">
              <!-- line  128  morenav.scsss  -->
              <div class="progressbox">
                <h4 class="progressbox__text">FILENAME heloooooooooooooooooooooooooooooooooo</h4>
                <progress class="progressbox__bar" value="50" max="100"></progress>
                <div class="progressbox__percentage">50%</div>
                <div class="progressbox__btn">
                  <button type="button" class="progressbox__play vidbtn">
                    <i class="fas fa-play-circle"></i>
                  </button>
                  <button type="button" class="progressbox__pause vidbtn">
                    <i class="far fa-pause-circle"></i>
                  </button>
                  <button type="button" class="progressbox__cancel vidbtn">
                    <i class="far fa-window-close"></i>
                  </button>
                </div>
              </div>
            </li>

            <li class="ul__list--items">
              <button type="button" class="btn btn--green btn--green--logout">Logout</button>
            </li>
          </ul>
        </div>
        <!-- if user is signed out then -->
        <div class="notsignincontainer">
          <div class="notsignincontainer__imgdiv">
            <img class="notsignincontainer__img" src="img/display.jpg" alt>
          </div>
          <ul class="ul__list">
            <li>
              <a href="login.html" class="btn btn--front">login</a>
              <a href="signup.html" class="btn btn--front">Signup</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoreNav",
  data() {
    return {};
  }
};
</script>

