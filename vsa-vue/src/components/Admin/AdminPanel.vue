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
          <li class="adminlistitem" @click="showUpload">Homepage videos</li>
          <li class="adminlistitem" @click="showMakeAdmin">Make Admin</li>
          <li class="adminlistitem" @click="logout">Logout</li>
        </ul>
      </div>

      <!--admin detail display panel ...when report selected the report details to be shown here  -->
      <!-- <div class="admindetail"> -->
      <ManageUsers v-if="usersVis"/>
      <AdminUpload v-if="uploadVis"/>
      <ReportedVideos v-if="reportVis"/>
      <MakeAdmin v-if="makeAdminVis"/>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import ManageUsers from "@/components/Admin/ManageUsers";
import AdminUpload from "@/components/Admin/AdminUpload";
import ReportedVideos from "@/components/Admin/ReportedVideos";
import MakeAdmin from "@/components/Admin/MakeAdmin";
import firebase from "firebase";
export default {
  name: "AdminPanel",
  components: {
    ManageUsers,
    AdminUpload,
    ReportedVideos,
    MakeAdmin
  },
  data() {
    return {
      reportVis: true,
      usersVis: false,
      uploadVis: false,
      makeAdminVis: false
    };
  },
  methods: {
    showReport() {
      this.reportVis = true;
      this.usersVis = false;
      this.uploadVis = false;
      this.makeAdminVis = false;
    },
    showUsers() {
      this.usersVis = true;
      this.reportVis = false;
      this.uploadVis = false;
      this.makeAdminVis = false;
    },
    showUpload() {
      this.uploadVis = true;
      this.reportVis = false;
      this.usersVis = false;
      this.makeAdminVis = false;
    },
    showMakeAdmin() {
      this.makeAdminVis = true;
      this.reportVis = false;
      this.usersVis = false;
      this.uploadVis = false;
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
