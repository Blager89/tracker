<template>
  <div class="row">
    <div class="offset-sm-4 col-sm-3">
      <div :class="{'myError': myError,'noError':!myError}" class="alert alert-danger" role="alert">
        <span>{{eMessage}}</span>

      </div>
      <form @submit.prevent = validateBeforeSubmit>
        <div class="form-group login-form">
          <label for="loginEmail">Email address</label>
          <input
              v-validate="'required|email'"
              name="email"
              type="email"
              class="form-control"
              id="loginEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model="email"
              :class="{'bg-error':errors.first('email')}"
          >
          <span class="text-danger" >{{ errors.first('email') }}</span>

        </div>

        <div class="form-group">
          <label for="loginPassword">Password</label>
          <input
              v-validate="{required:true,min:3}"
              name="password"
              type="password"
              class="form-control"
              id="loginPassword"
              placeholder="Password"
              v-model="password"
              :class="{'bg-error':errors.first('password')}"
          >
          <span class="text-danger" >{{ errors.first('password') }}</span>

        </div>
        <button type="submit" class="btn btn-primary w-100" >Submit</button>


      </form>
    </div>
    <div class="col-4"></div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "Login",
    data() {
      return {
        err: false,
        loginName: '',
        email: '',
        password: '',
        myError: false,
        eMessage :''


      }
    },
    methods: {
      validateBeforeSubmit(e) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.login();
            return;
          }
        }).catch(() => {
          return false
        });
      },

      login() {
        axios({
          method: 'post',
          url: '/api/login',
          data: {
            email: this.email,
            password: this.password
          }
        }).then(res => {
          if (res.data.token) {
            localStorage.setItem('authorization', res.data.token);
            localStorage.setItem('name', res.data.name);
            this.$router.push('/');
            this.$root.$emit('sendName', res.data.name);
          }
        }).catch(err=>{
          if (err.response.status === 401) {
            this.eMessage = 'Email or password is incorrect';
          }else{
            this.eMessage = 'Email not found'
          }
          this.myError = true;
          setTimeout(() => {
            this.myError = false;
          
          },3000);

        });
      },

    },
    mounted() {
    },

  }
</script>

<style scoped>
  .myError{
    transition:  1.5s;
    opacity: 1;
    top: 20px;
  }
  .noError {
    transition:  1.5s;
    top: -20px;
    opacity: 0;
  }
  .login-form {
    margin-top: 20%;
  }


  .bg-error{
    background: #dc354570;
  }
</style>