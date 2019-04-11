<template>
  <div id="Navbar">
    <!-- navigation bar -->
    <div class="navigationbar">
      <!-- name of the Application -->
      <div class="navbarfont navigationbar--left">
        <i class="fas fa-camera-retro navbar_items u-margin-right-large"></i>
        <!-- Router .push required here -->
        <a href="home.html" class="navbar_items">Vidshare</a>
      </div>
      <!-- for right option such as search, user profile, upload -->
      <div class="navbarfont navigationbar--right">
        <div class="search">
          <input type="text" placeholder="Search" class="search__input" required>
          <button type="button" class="search__btn" id="searchButton">
            <i class="navbar_items fa fa-search search__icon" aria-hidden="true"></i>
          </button>
        </div>
        <button type="button" class="navbar_items navbar_items--icon userbutton">
          <i class="fas fa-user-circle"></i>
        </button>

        <!-- 
        nested UserContainer required -> db required
        -->
        <UserContainer/>
      </div>
    </div>
    <!-- ending of navigation bar -->
  </div>
</template>

<script>
import UserContainer from "@/components/Navbar/UserContainer";
export default {
  name: "Navbar",
  components: {
    UserContainer
  },
  mounted() {
    // display js'

    // user profile button in navbar
    const userBtn = this.$el.querySelector(".userbutton");
    // div for data display
    const userContainer = this.$el.querySelector(".usercontainer");
    // user option division
    const signindetail = this.$el.querySelector(".signincontainer");
    // not sign in division
    const notsigin = this.$el.querySelector(".notsignincontainer");

    let display = "none";
    userBtn.addEventListener("click", function() {
      // conditional
      /**
    if(display==="none"){
        notsigin.style.display="block";
        userContainer.style.display="block";
        display="block";
       
    }else{
        userContainer.style.display="none";
        notsigin.style.display="none";
        display="none";
    }
    
      */

      if (display === "none") {
        signindetail.style.display = "block";
        userContainer.style.display = "block";
        display = "block";
      } else {
        userContainer.style.display = "none";
        signindetail.style.display = "none";
        display = "none";
      }
    });
  }
};
</script>
