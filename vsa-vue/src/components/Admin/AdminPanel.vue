<template>
  <div id="AdminPanel">
    <!-- admin panel -->
    <div class="adminpanel">
      <!-- admin options lists -->
      <div class="adminoptions">
        <ul class="adminlist">
          <h4 class="adminhead">Admin options</h4>
          <li class="adminlistitem" @click="showReport">Reports</li>
          <li class="adminlistitem" @click="showUsers">Accounts</li>
          <li class="adminlistitem" @click="showUploadedVideos">Admin videos</li>
          <li class="adminlistitem" @click="showUpload">Admin Upload</li>
          <li class="adminlistitem" @click="showManageHome">Manage Home Page</li>
          <li class="adminlistitem" @click="showMakeAdmin">Make Admin</li>
          <li class="adminlistitem" @click="logout">Logout</li>
        </ul>
      </div>

      <!--admin detail display panel ...when report selected the report details to be shown here  -->
      <div class="admindetail">
        <ManageUsers v-if="usersVis"/>
        <AdminUpload v-if="uploadVis"/>
        <ReportedVideos v-if="reportVis"/>
        <MakeAdmin v-if="makeAdminVis"/>
        <AdminVideo v-if="uploadedVideoVis"/>
        <ManageHomePage v-if="manageHome"/>
      </div>
    </div>
  </div>
</template>

<script>
import ManageUsers from "@/components/Admin/ManageUsers";
import AdminUpload from "@/components/Admin/AdminUpload";
import ReportedVideos from "@/components/Admin/ReportedVideos";
import MakeAdmin from "@/components/Admin/MakeAdmin";
import AdminVideo from "@/components/Admin/AdminVideo";
import ManageHomePage from "@/components/Admin/ManageHomePage";
import firebase from "firebase";
export default {
  name: "AdminPanel",
  components: {
    ManageUsers,
    AdminUpload,
    ReportedVideos,
    MakeAdmin,
    AdminVideo,
    ManageHomePage
  },
  data() {
    return {
      reportVis: true,
      usersVis: false,
      uploadVis: false,
      makeAdminVis: false,
      uploadedVideoVis: false,
      manageHome: false
    };
  },
  methods: {
    showReport() {
      this.reportVis = true;
      this.usersVis = false;
      this.uploadVis = false;
      this.makeAdminVis = false;
      this.uploadedVideoVis = false;
      this.manageHome = false;
    },
    showUsers() {
      this.usersVis = true;
      this.reportVis = false;
      this.uploadVis = false;
      this.uploadedVideoVis = false;
      this.makeAdminVis = false;
      this.manageHome = false;
    },
    showUpload() {
      this.uploadVis = true;
      this.reportVis = false;
      this.usersVis = false;
      this.uploadedVideoVis = false;
      this.makeAdminVis = false;
      this.manageHome = false;
    },
    showUploadedVideos() {
      this.uploadedVideoVis = true;
      this.uploadVis = false;
      this.reportVis = false;
      this.usersVis = false;
      this.makeAdminVis = false;
      this.manageHome = false;
    },
    showMakeAdmin() {
      this.makeAdminVis = true;
      this.reportVis = false;
      this.usersVis = false;
      this.uploadVis = false;
      this.uploadedVideoVis = false;
      this.manageHome = false;
    },
    showManageHome() {
      this.manageHome = true;
      this.makeAdminVis = false;
      this.reportVis = false;
      this.usersVis = false;
      this.uploadVis = false;
      this.uploadedVideoVis = false;
    },
    logout() {
      firebase.auth().signOut();
      this.$router.push({ name: "Home" });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.push({ name: "Home" });
      }
    });
  }
};
</script>
