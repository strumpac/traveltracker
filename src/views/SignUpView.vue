<script >
import bcrypt from "bcryptjs"
export default {
  methods: {
    changePasswordInputType() {
      if (!this.isVisible) {
        const passwordInput = document.getElementById("password")
        if (passwordInput.type == "password") {
          passwordInput.type = "text"
        }
        this.isVisible = true
      } else {
        const passwordInput = document.getElementById("password")
        passwordInput.type = "password"
        this.isVisible = false
      }
    },
    async signUp() {
      const username = document.getElementById("username").value
      //const password = document.getElementById("password").value
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(document.getElementById("password").value, salt)
      //console.log(hashed)
      const response = await fetch("http://localhost:8090/api/addUser", {
        
      })
    }
  },
  data() {
    return {
      isVisible : false
    }
  }
}
</script>

<template>
  <div id="divForm" class="container-fluid d-flex justify-content-center align-items-center"
    style="height: calc(100vh - 72.7167px);">

    <div class="rounded p-4 px-5 border border-secondary shadow" style="width: 35rem; height: 30rem;">
      <div class="d-flex flex-column justify-content-center align-items-center h-100">

        <h2 class="mb-4">Sign Up</h2>

        <form class="w-100">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="username" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="password">
          </div>

          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" @change="() => changePasswordInputType()" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>

          <div class="d-grid">
            <button type="submit" class="btn btn-primary" @click="() => signUp()">Submit</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: light enhancement */

</style>


<style scoped>

</style>