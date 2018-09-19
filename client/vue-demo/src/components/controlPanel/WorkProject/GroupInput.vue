<template>
  <div class="groupInput">
    <form @submit.prevent="validateBeforeCreate">
      <div class="input-group">
        <input type="text"
               v-model="inputData.title"
               v-validate="'required'"
               :class="{'project-error':errors.first('project_title')}"
               name="project_title"
               class="form-control"
               :placeholder="place">
        <div class="input-group-append">
          <button v-if="!data.update"
                  class="btn btn-success"
                  type="submit"
                  >Save
          </button>
          <button v-if="data.update"
                  class="btn btn-warning"
                  type="submit"
                  >Update
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Type",
    props: [
      'place',
      'data'
    ],
    methods:{
      validateBeforeCreate(e) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            try {
              if (!this.data.update) {
                this.$emit('add', this.inputData);
              }else{
                this.$emit('update', this.inputData);
              }
            } catch (e) {
              return next(e);
            }
          }
        }).catch(() => {
          return false
        });
      }
    },
    computed: {
      inputData: function () {
        return {
          id: this.data.id,
          title: this.data.title
        }
      },
    }
  }

</script>

<style scoped>
  .groupInput {
    margin-bottom: 20px;
  }
  .project-error {
    background: #dc354570;
  }

</style>