<template>
  <div id="MakeAdmin">
    <form action="#" class="form" style="padding-left:9rem;">
      <!-- creating form group for every fields -->
      <div class="form__group">
        <label for="signup_email" class="form__label">E-mail</label>
        <input
          type="email"
          id="signup_email"
          class="form__input form__input__signup"
          placeholder="E-mail"
          v-model="email"
        >
      </div>`
      <!-- Adduser button -->
      <div style="display:flex; justify-content:center;">
        <button class="btn btn--blue btn--blue--1" id="Adduser" @click.prevent="addAdmin">
          Add
          <i class="fas fa-arrow-circle-right"></i>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { functions } from "@/firebase/init";
export default {
  name: "MakeAdmin",
  data() {
    return {
      email: null
    };
  },
  methods: {
    addAdmin() {
      if (this.email) {
        const addAdminRole = functions.httpsCallable("addAdminRole");
        addAdminRole({ email: this.email }).then(result => {
          this.email = null;
          alert("Success!");
        });
      } else {
        alert("Email cannot be empty!");
      }
    }
  }
};
</script>

