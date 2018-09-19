<template>
  <div class="userTable">
    <div class="createForm">
      <div class="row">
        <div class="col-12">
          <create-form
              v-bind:allRoles="allRoles"
              v-bind:userData="userData"
              v-bind:emailError="eError"
              v-on:createNewUser="createNewUser($event)"
          ></create-form>
        </div>
      </div>
    </div>
    <div class="userList">
      <user-list
          v-bind:allRoles="allRoles"
          v-bind:allUsers="allUsers"
          v-bind:updateUserData="updateUserData"
          v-on:loadCurrentUser="loadCurrentUser($event)"
          v-on:deleteUser="deleteUser($event)"
          v-on:updateUser="updateUser($event)"
      ></user-list>
    </div>
  </div>
</template>

<script>
  import CreateForm from './CreateForm'
  import UserList from './UserList'
  import axios from 'axios'

  export default {
    name: "UserTable",
    components: {
      CreateForm,
      UserList
    },
    data() {
      return {
        allRoles: {},
        userData: {},
        allUsers: {},
        updateUserData: {},
        eError: false
      }
    },
    methods: {
      loadAllUser() {
        axios({
          method: 'get',
          url: '/api/user'
        }).then(res => {
          this.allUsers = res.data;
        })
      },
      createNewUser(data) {
        axios({
          method: 'post',
          url: '/api/user/create/',
          data: data
        }).then(() => {
          this.eError = false;
          this.userData = {
            role_id: ''
          };
          this.loadAllUser();

        }).catch(error => {
          if (error.response.status === 400) {
            this.eError = true;
          }
        });
      },
      deleteUser(id) {
        axios({
          method: 'delete',
          url: '/api/user/delete/' + id,
        }).then(() => {
          this.loadAllUser();
        })
      },
      loadCurrentUser(id) {
        axios({
          method: 'get',
          url: '/api/user/' + id
        }).then(res => {
          this.updateUserData = res.data;

        })
      },
      updateUser(data) {
        axios({
          method: 'put',
          url: '/api/user/update/' + data.id,
          data: data
        }).then(() => {
          this.loadAllUser();
        })
      },
      loadAllRoles() {
        axios({
          method: 'get',
          url: '/api/role/all'
        }).then(res => {
          this.allRoles = res.data;

        });
      }
    },
    mounted() {
      this.loadAllRoles();
      this.loadAllUser();
    }
  }
</script>

<style scoped>

</style>