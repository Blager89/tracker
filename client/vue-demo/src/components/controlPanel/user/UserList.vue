<template>
  <div class="userList">
    <div class="row">
      <div class="col-12">


        <b-card no-body class="mb-1 userCard addNewUser" v-for="(u,index) in allUsers" :key="u.id">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <div class="row text-center" v-b-toggle="'accordion' + index" @click="$emit('loadCurrentUser',u.id)">
              <div class="col-2 p-1">{{index+1}}</div>
              <div class="col-2 p-1">{{u.name}}</div>
              <div class="col-4 p-1">{{u.email}}</div>
              <div class="col-2 p-1">{{u.role_title}}</div>
              <div class="col-2 p-1">
                <b-btn variant="danger" @click="$emit('deleteUser',u.id)">delete</b-btn>
              </div>
            </div>
          </b-card-header>
          <b-collapse :id="'accordion' + index" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <div class="card-text">
                <form @submit.prevent="validateBeforeUpdate(u.id)">
                  <div class="form-group text-center">
                    <input v-validate="'required'" :class="{'create-error':errors.first('update_user_name')}"
                           name="update_user_name" type="text" class="form-control d-inline-block"
                           placeholder="Name" v-model="updateUserData.name">
                    <input v-validate="'required'" :class="{'create-error':errors.first('update_user_email')}"
                           name="update_user_email" type="email" class="form-control d-inline-block"
                           placeholder="Enter email" v-model="updateUserData.email">
                    <select v-validate="'required'" :class="{'create-error':errors.first('update_user_role_id')}"
                            name="update_user_role_id" class="custom-select mb-2 mr-sm-2 mb-sm-0"
                            v-model="updateUserData.role_id">
                      <option value="" disabled>Choose role</option>
                      <option v-for="role in allRoles" :value="role.id">{{role.role_title}}</option>
                    </select>
                    <button type="submit" class="btn btn-primary d-inline-block">Update</button>
                  </div>
                </form>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserList",
    props: [
      'allUsers',
      'allRoles',
      'updateUserData'

    ],
    methods: {
      validateBeforeUpdate() {
        this.$validator.validateAll(['update_user_name', 'update_user_email', 'update_user_role_id', 'update_user_password']).then((result) => {
          if (result) {
            this.$emit('updateUser', this.updateUserData);
          }
        }).catch(() => {
          return false
        });
      },
    },
  }
</script>

<style scoped>
  .addNewUser input, .addNewUser select {
    width: 23%;
    display: inline-block;
  }
</style>