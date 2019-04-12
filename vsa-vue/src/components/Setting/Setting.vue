<template>
  <div id="Setting">
    <!-- Setting page layout -->
    <section class="settings">
      <br>
      <div class="u-center-text">
        <h1 class="heading_tag">Account</h1>
      </div>

      <div class="settings__img">
        <img src="../../assets/img/icons/man.png" id="profileimage" class="settings__icon" alt>
        <input type="file" id="imageupload" accept="image/jpg" hidden="hidden">
        <button type="button" class="btn settings__editbutton" id="editprofileimage">
          <i class="fas fa-camera font-medium"></i>
          <span class="tooltiptext">Edit Profile Image</span>
        </button>
      </div>

      <div class="settings__container">
        <h1 class="u-center-text font-small u-margin-bottom-medium">
          Signed as
          <span class="accountHolderName">Raju</span>
          <br>
          <span class="accountHolderId">cs16msiit020@gmail.com</span>
        </h1>
        <form action="#" class="settings__form">
          <h1 class="font-small">Change Password</h1>
          <div class="form__group">
            <label for="current_passwd" class="form__label">Current Password</label>
            <input
              type="password"
              id="current_passwd"
              class="form__input form__input__signup"
              placeholder="Enter Password"
              required
            >
          </div>
          <div class="form__group">
            <label for="signup_passwd" class="form__label">New Password</label>
            <input
              type="password"
              id="new_passwd"
              class="form__input form__input__signup"
              placeholder="Enter Password"
              required
            >
          </div>
          <div class="form__group">
            <label for="signup_confirm_passwd" class="form__label">New Password (Confirm)</label>
            <input
              type="password"
              id="new_confirm_passwd"
              class="form__input form__input__signup"
              placeholder="Re-Enter Password"
              required
            >
          </div>
          <button class="btn btn--green" type="button" id="changePasswordBtn">Save Changes</button>
        </form>
      </div>
    </section>
  </div>
</template>

// auth base operation will done here
// this page is only available for authenticated user!
<script>
export default {
  name: "Setting",
  data() {
    return {};
  },
  mounted() {
    // current profile image
    const profileimg = this.$el.querySelector("#profileimage");
    // upload button
    const imageUpload = this.$el.querySelector("#imageupload");
    // custom button for upload
    const editImageButton = this.$el.querySelector("#editprofileimage");

    // save Edit image button clicked button
    editImageButton.addEventListener("click", function() {
      imageUpload.click();
    });

    /* 
    imageUpload.addEventListener('change',function(){

    });
    */
  }
};
</script>

