<script>
import SHA256 from 'crypto-js'
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
      date: '',
      formValidated: false,
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
    async signUp(event) {
      // blocca il comportamento di default del submit
      event.preventDefault();

      const form = event.target.closest('form');
      this.formValidated = true;

      if (!form.checkValidity()) {
        // Il form non è valido, mostra messaggi errori bootstrap
        return;
      }

      if (this.password !== this.passwordRetype) {
        alert("Passwords do not match!");
        return;
      }

      const hashed = SHA256(this.password).toString()

      const userData = {
        name: this.name,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        password: hashed,
        dateOfBirth: this.date,
        fidelityPoints: 0
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

            <form :class="{ 'was-validated': formValidated }" novalidate @submit="signUp">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Name</label>
                  <input type="text" class="form-control" v-model="name" required>
                  <div class="invalid-feedback">Please enter your name.</div>
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label">Last name</label>
                  <input type="text" class="form-control" v-model="lastName" required>
                  <div class="invalid-feedback">Please enter your last name.</div>
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label">Username</label>
                  <input type="text" class="form-control" v-model="username" required>
                  <div class="invalid-feedback">Please choose a username.</div>
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label">Email address</label>
                  <input type="email" class="form-control" v-model="email" required>
                  <div class="invalid-feedback">Please enter a valid email address.</div>
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="password" required minlength="6">
                  <div class="invalid-feedback">Please provide a password (min 6 characters).</div>
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label">Re-enter Password</label>
                  <input type="password" class="form-control" id="passwordRetype" v-model="passwordRetype" required
                    minlength="6">
                  <div class="invalid-feedback">Please re-enter your password.</div>
                </div>

                <div class="mb-4 col-12">
                  <label class="form-label">Date of Birth</label>
                  <input type="date" class="form-control" v-model="date" required>
                  <div class="invalid-feedback">Please enter your date of birth.</div>
                </div>

                <div class="mb-3 form-check col-12">
                  <input type="checkbox" class="form-check-input" @change="changePasswordInputType" id="exampleCheck1">
                  <label class="form-check-label" for="exampleCheck1">Show Password</label>
                </div>

                <div class="d-grid mb-3 col-12">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add your styles here */
</style>
