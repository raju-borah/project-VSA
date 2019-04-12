<template>
  <div id="Footer">
    <footer>
      <section class="footer">
        <div class="footer__back">
          <div class="footer__logo">
            <i class="fa fa-camera-retro"></i>
            <h3 class="footer__logo-name">VSA</h3>
            <span class="footer__copy">Copyright © 2019 KU. All Rights Reserved</span>
          </div>

          <div class="footer__communication">
            <div class="footer__communication--text">CONTACT US</div>
            <!-- Router .push Required here -->
            <a href="#" class="footer__communication--call">
              <i class="fa fa-phone"></i>
              <span class="footer__communication--callinfo">+919876543210</span>
            </a>

            <a href="#" class="footer__communication--location">
              <i class="fa fa-map-marker"></i>
              <span class="footer__communication--locationinfo">Kaziranga university</span>
            </a>

            <a href="#" class="footer__communication--mail">
              <i class="fa fa-envelope"></i>
              <span class="footer__communication--mailinfo">kazirangaVSA@gmail.com</span>
            </a>
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
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>

