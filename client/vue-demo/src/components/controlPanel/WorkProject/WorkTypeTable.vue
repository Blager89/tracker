<template>
  <div class="groupInput">
    <group-input
        v-on:add="addWorkType($event)"
        v-on:update="updateProject($event)"
        v-bind="{place: 'Work Type',data:workTypeData}"
    ></group-input>
    <div class="list">
      <list
          v-bind:data="work_type"
          v-bind:name="'work'"
          v-on:delete="deleteWorkType($event)"
          v-on:currentData="showCurrentWorkType($event)"
      ></list>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import GroupInput from './GroupInput'
  import List from './List'

  export default {
    name: "WorkTypeTable",
    components: {
      GroupInput,
      List
    },
    data() {
      return {
        work_type: [],
        workTypeData: {},
      }
    },
    methods: {
      addWorkType(data) {
        axios({
          method: 'post',
          url: '/api/type/create',
          data: data
        }).then(() => {
          this.loadAllWorkType();
          this.workTypeData = {};
        });
      },
      loadAllWorkType() {
        axios({
          method: 'get',
          url: '/api/type',
        }).then(res => {
          this.work_type = res.data;
        })
      },

      deleteWorkType(id) {
        axios({
          method: 'delete',
          url: '/api/type/delete/' + id,
        }).then(() => {
          this.workTypeData = {};
          this.loadAllWorkType();
        });
      },
      updateProject(data) {
        axios({
          method: 'put',
          url: '/api/type/update/' + data.id,
          data: data
        }).then(() => {
          this.workTypeData = {};
          this.loadAllWorkType();
        })
      },
      showCurrentWorkType(id) {
        axios({
          method: 'get',
          url: '/api/type/' + id,
        }).then(res => {
          this.workTypeData = res.data;
          this.workTypeData.title = res.data.work_title;
          this.workTypeData.update = true;
        })
      },
    },
    mounted() {
      this.loadAllWorkType();
    }

  }
</script>

<style scoped>

</style>