<template>
  <div class="groupInput">
    <group-input
        v-on:add="addProject($event)"
        v-on:update="updateProject($event)"
        v-bind="{place: 'Project',data:projectData}"
    ></group-input>
    <div class="list">
      <list
          v-bind:data="project"
          v-bind:name="'project'"
          v-on:delete="deleteProject($event)"
          v-on:currentData="showCurrentProject($event)"
      ></list>
    </div>


  </div>
</template>

<script>
  import axios from 'axios'
  import GroupInput from './GroupInput'
  import List from './List'
  export default {
    name: "ProjectTable",
    components: {
      GroupInput,
      List
    },
    data() {
      return{
        project: [],
        projectData: {},

      }
    },
    methods: {
      addProject(data) {
        axios({
          method: 'post',
          url: '/api/project/create',
          data: data

        }).then(() => {
          this.loadAllProject();
          this.projectData = {};
        });
      },

      loadAllProject() {
        axios({
          method: 'get',
          url: '/api/project',
        }).then(res => {
          this.project = res.data;
        })
      },
      deleteProject(id) {
        console.log(id);
        axios({
          method: 'delete',
          url: '/api/project/delete/' + id,
        }).then(() => {
          this.projectData = {};
          this.loadAllProject();
        });
      },
      updateProject(data) {
        console.log(data);
        axios({
          method: 'put',
          url: '/api/project/update/' + data.id,
          data: data
        }).then(() => {
          this.loadAllProject();
          this.projectData = {};
        })
      },
      showCurrentProject(id) {
        axios({
          method: 'get',
          url: '/api/project/' + id,
        }).then(res => {
          console.log(res.data);
           this.projectData = res.data;
          this.projectData.title = res.data.project_title;
          this.projectData.update = true;
        })
      },

    },
    mounted() {
      this.loadAllProject();
    }

  }
</script>

<style scoped>

</style>