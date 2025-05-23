<script>
import bcrypt from "bcryptjs";

export default {
  data() {
    return {
      isVisible: false,
      name: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      passwordRetype: '',
      date: ''
    };
  },
  methods: {
    changePasswordInputType() {
      const passwordInput = document.getElementById("password");
      const passwordRetypeInput = document.getElementById("passwordRetype");
      if (!this.isVisible) {
        passwordInput.type = "text";
        passwordRetypeInput.type = "text";
        this.isVisible = true;
      } else {
        passwordInput.type = "password";
        passwordRetypeInput.type = "password";
        this.isVisible = false;
      }
    },
    async signUp() {
      if (this.password !== this.passwordRetype) {
        alert("Passwords do not match!");
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(this.password, salt);

      const userData = {
        name: this.name,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        password: hashed,
        dateOfBirth: this.date
      };

      const response = await fetch("http://localhost:8090/api/addUser", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();
      console.log(result);
    }
  }
};
</script>

<template>
  <div class="container-fluid d-flex justify-content-center align-items-center"
    style="height: calc(100vh - 72.7167px);">
    <div class="row w-100">
      <div class="col-md-8 offset-md-2 d-flex justify-content-center align-items-center">
        <div class="rounded p-4 px-5 border border-secondary shadow w-100" style="max-width: 900px;">
          <div class="h-100">
            <h2 class="mb-4 text-center">Sign Up</h2>

            <div class="form">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Name</label>
                  <input type="text" class="form-control" v-model="name">
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label">Last name</label>
                  <input type="text" class="form-control" v-model="lastName">
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label">Username</label>
                  <input type="text" class="form-control" v-model="username">
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label">Email address</label>
                  <input type="email" class="form-control" v-model="email">
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="password">
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label">Re-enter Password</label>
                  <input type="password" class="form-control" id="passwordRetype" v-model="passwordRetype">
                </div>

                <div class="mb-4">
                  <label class="form-label">Date of Birth</label>
                  <input type="date" class="form-control" v-model="date">
                </div>

                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" @change="changePasswordInputType" id="exampleCheck1">
                  <label class="form-check-label" for="exampleCheck1">Show Password</label>
                </div>

                <div class="d-grid mb-3">
                  <button type="submit" class="btn btn-primary" @click="signUp">Submit</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add your styles here */
</style>
