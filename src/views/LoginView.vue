<script setup>
import {ref, inject} from 'vue'

const usernameInput = ref('')
const passwordInput = ref('')
const user = inject('userData')

const login = async () => {
    const response = await fetch("http://localhost:8090/api/tryToLog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Username: usernameInput.value,
          Password: passwordInput.value
        })
      })
        .then(res => res.json())
        .then(data => user.value = data)
        .catch(err => console.error(err));
    }

</script>
<template>
  <br>
  <div id="divForm" class="container-fluid">

    <div class="rounded p-4 px-5 border border-secondary">
      <!-- DIV LABELS -->
      <div class="row">

        <label class="my-1">Username:</label>
        <input class="m-1" type="email" id="inpName" v-model="usernameInput" placeholder="Username">

        <label class="my-1 mt-3">Password:</label>
        <input class="m-1" type="password" id="inpPsw" v-model="passwordInput" placeholder="Password">

        <span id="btnLogin" class="btn btn-success mt-4" @click="login">Log in</span>
        <span id="btnSignUp" class="btn btn-light mt-4">
          <RouterLink class="nav-link" to="/signUpPage">Registrati</RouterLink>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
#divForm {
  width: 50vw;
}

input {
  height: 5vh;
}

label {
  font-size: x-large;
}

#btnLogin {
  width: 7vw;
  margin-left: 18vw;
}

#btnSignUp {
  width: 7vw;
  margin-left: 18vw;
}
</style>