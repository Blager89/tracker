<template ref="test">
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <div class="nav-logo text-center">
          <!--<router-link to="/"><img src="../assets/logo.png" alt="logo"></router-link>-->
          <img src="../assets/logo.png" alt="logo">
        </div>
      </div>
      <div class="col-10">
        <div class="nav-menu float-right">
              <div>
                <b-dropdown  id="ddown1" variant="link" right :text="loginName" class="m-md-2 sss">
                  <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
                  <b-dropdown-item>##########</b-dropdown-item>
                </b-dropdown>
              </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "Navbar",
    data() {
      return {
        loginName: '',
        email: '',
        password: '',
        dDisabled: true

      }
    },
    methods: {
      logout() {
        this.dDisabled = true;
        localStorage.removeItem('authorization');
        localStorage.removeItem('name');
        this.loginName = 'Sign in';
        this.$router.push('/login');

      },
      showName() {
        if (localStorage.getItem('name')) {
          this.dDisabled = false;
          this.loginName = localStorage.getItem('name');
        }else {
          this.loginName = 'Sign in';
        }
      },
      changeName(name) {
        this.loginName = name;
      }
    },
    mounted() {
      this.showName();

    },
    created() {
      const $ = this;
      this.$root.$on('sendName', function (name) {
          $.changeName(name);
      });
    }

  }
</script>

<style scoped>
  .nav-logo img {
    position: absolute;
    z-index: 10;
    width: 20%;
    margin: 2px;

  }

  .nav-menu {
    margin-right: 10px;
  }



  .nav-menu li {
    list-style-type: none;
    display: inline-block;
    padding: 5px;
  }
</style>