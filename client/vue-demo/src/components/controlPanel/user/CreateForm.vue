<template>
  <div class="addNewUser">
    <div class="row ">
      <div class="col-12">
        <div class="emailError m-2">
          <vs-alert v-if="emailError" title="Error" active="true" color="danger">
            This email already exists
          </vs-alert>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="validateBeforeCreate">
          <div class="form-group text-center">
            <input v-validate="'required'" :class="{'create-error':errors.first('user_name')}"
                   name="user_name" type="text" class="form-control d-inline-block" id="name"
                   placeholder="Name" v-model="userData.name">
            <input v-validate="'required'" :class="{'create-error':errors.first('user_email')}"
                   name="user_email" type="email" class="form-control d-inline-block" id="email"
                   placeholder="Enter email" v-model="userData.email">
            <select v-validate="'required'" :class="{'create-error':errors.first('user_role_id')}"
                    name="user_role_id" class="custom-select mb-2 mr-sm-2 mb-sm-0"
                    v-model="userData.role_id">
              <option value="" disabled>Choose role</option>
              <option v-for="role in allRoles" :value="role.id">{{role.role_title}}</option>
            </select>
            <input v-validate="'required'" :class="{'create-error':errors.first('user_password')}"
                   type="password" name="user_password" class="form-control d-inline-block"
                   id="password"
                   placeholder="Enter password" v-model="userData.password">
            <button type="submit" class="btn btn-primary d-inline-block">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CreateForm",
    props: [
      'allRoles',
      'userData',
      'emailError',
    ],
    methods:{
      validateBeforeCreate() {
        this.$validator.validateAll(['user_name', 'user_email', 'user_role_id', 'user_password']).then((result) => {
          if (result) {
            try {
              this.$emit('createNewUser', this.userData);
            } catch (e) {
              return next(e);
            }
          }
        }).catch(() => {
          return false
        });
      }
    },
    mounted() {
      this.userData.role_id = '';
    }
  }
</script>

<style scoped>
  .addNewUser input, .addNewUser select {
    width: 23%;
    display: inline-block;
  }

  .addNewUser button {
    display: inline-block;
  }
  .create-error {
    background: #dc354570;
  }
</style>