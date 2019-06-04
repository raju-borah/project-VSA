<template>
  <div id="PageNotFound">
    <!-- for the background -->
    <div class="bgcontain">
      <router-link :to="{name : 'Home'}">
        <a class="backhome">
          <i class="far fa-hand-point-left"></i>Home
        </a>
      </router-link>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar";

export default {
  name: "PageNotFound"
};
</script>

