<script>
  import { verify } from 'argon2';

  var username = '';
  var password = '';

  function login() {
    username = this.usernameInput;
    password = this.passwordInput;
    console.log("user: " + username);
    console.log("passw: " + password);

    try{
      fetch(`http://localhost:3000/login?nome=${encodeURIComponent(username)}`, {
        method: 'GET',
      }).then(hash => (){
        verifyPasswordArgon2(hash, password);
        alert("log in effetuato con sucesso");
      })
    }catch (error) 
    {
      alert("An error occurred: " + error.message);
    }
  }
  
  async function verifyPasswordArgon2(hash, password) {
    try {
      console.log('result:'+hash);
      const verified = await verify(hash, password);
      return verified; // Returns true if the password matches the hash, false otherwise
    } catch (error) {
      console.error("Error during Argon2 verification:", error);
      return false;
    }
  }

</script>
<template>
  <br>
    <div id="divForm" class="container-fluid">

      <div class="rounded p-4 px-5 border border-secondary">
        <!-- DIV LABELS -->
        <div class="row">
          
          <label class="my-1">Username:</label>
          <input class="m-1" type="email" id="inpName" v-model="usernameInput" placeholder="username@mail.com">
          
          <label class="my-1 mt-3">Password:</label>
          <input class="m-1" type="password" id="inpPsw" v-model="passwordInput" placeholder="password123!">
         
          <span id="btnLogin" class="btn btn-success mt-4" @Click="login()">Log in</span> 
          <span id="btnSignUp" class="btn btn-light mt-4">
            <RouterLink class="nav-link" to="/signUpPage">Registrati</RouterLink>
          </span>       
        </div>
      </div>
    </div>
</template>
  
<style scoped>
  #divForm{
    width: 50vw;
  }

  input{
    height: 5vh;
  }

  label{
    font-size: x-large;
  }

  #btnLogin{
    width: 7vw;
    margin-left: 18vw;
  }

  #btnSignUp{
    width: 7vw;
    margin-left: 18vw;
  }
</style>  