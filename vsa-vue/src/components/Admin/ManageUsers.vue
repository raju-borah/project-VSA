<template>
  <div id="ManageUsers">
    <div class="allusers">
      <div class="validuser">
        <h1 class="u-center-text u-margin font-medium">
          <span>_______</span>Valid Users
          <span>_______</span>
        </h1>

        <ul class="adminlist">
          <li class="userlitem" v-if="loading">Loading</li>
          <li class="userlitem" v-for="(user, index) in users" :key="index" v-else>
            {{user.email}}
            <button type="button" @click="deleteUser(user.email, user.uid)">
              <i class="fas fa-minus-square font-small"></i>
            </button>
          </li>
        </ul>
      </div>
      <div class="adduser">
        <br>
        <h1 class="u-center-text u-margin font-medium">Add Valid Users</h1>
        <form class="form" style="padding-left:9rem;">
          <!-- creating form group for every fields -->
          <div class="form__group">
            <label for="signup_email" class="form__label">E-mail</label>
            <input
              type="email"
              id="signup_email"
              class="form__input form__input__signup"
              placeholder="E-mail"
              required
              v-model="newEmail"
            >
          </div>
          <div class="form__group">
            <label for="Adduser_UID" class="form__label">User ID</label>
            <input
              type="text"
              id="Adduser_UID"
              class="form__input form__input__signup"
              placeholder="Enter UserId"
              required
              v-model="newUID"
            >
          </div>
          <!-- Adduser button -->
          <div style="display:flex; justify-content:center;">
            <button
              class="btn btn--blue btn--blue--1"
              id="Adduser"
              type="submit"
              @click.prevent="addValidUser"
            >
              Add
              <i class="fas fa-arrow-circle-right"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
import { functions } from "@/firebase/init";
export default {
  name: "ManageUsers",
  data() {
    return {
      users: [],
      newEmail: null,
      newUID: null,
      loading: false
    };
  },
  methods: {
    addValidUser() {
      if (this.newEmail !== null && this.newUID !== null) {
        db.collection("validuser")
          .doc(this.newUID)
          .set({
            email: this.newEmail,
            uid: this.newUID,
            active: false,
            profilePic: ""
          })
          .then(() => {
            this.newEmail = null;
            this.newUID = null;
            alert("User Added!");
          })
          .catch(err => {
            alert(err.message);
            console.error(err.message);
          });
      } else {
        alert("Fields are empty!");
      }
    },
    deleteUser(email, uid) {
      this.loading = true;
      const deleteUserAuthAsAdmin = functions.httpsCallable(
        "deleteUserAuthAsAdmin"
      );
      deleteUserAuthAsAdmin({ email: email })
        .then(() => {
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.error(err.message);
        });

      const deleteUserAsAdmin = functions.httpsCallable("deleteUserAsAdmin");
      deleteUserAsAdmin({ uid: uid })
        .then(result => {
          this.users = this.users.filter(user => {
            return user.email !== email;
          });
          this.loading = false;
          alert("Deleted!");
        })
        .catch(err => {
          this.loading = false;
          console.error(err.message);
        });
    }
  },
  created() {
    this.loading = true;
    db.collection("validuser")
      .onSnapshot(snapshot => {
        //we will use docChanges() to get the type changes
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            this.users.push({
              uid: change.doc.data().uid,
              email: change.doc.data().email
            });
          } else if (change.type === "modified") {
            this.users.push({
              uid: change.doc.data().uid,
              email: change.doc.data().email
            });
          }
        });
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        console.error(err.message);
      });
  }
};
</script>

