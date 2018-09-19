<template>
  <div class="controlPanel">
    <vs-tabs>
      <vs-tab vs-label="Work/Type">
        <div class="projectInput">
          <div class="row">
            <div class="col-6">
              <project-table></project-table>
            </div>
            <div class="col-6">
              <work-type-table></work-type-table>
            </div>
          </div>
        </div>
      </vs-tab>
      <vs-tab vs-label="User">
            <user-table></user-table>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
  import ProjectTable from './WorkProject/ProjectTable'
  import WorkTypeTable from './WorkProject/WorkTypeTable'
  import UserTable from './user/UserTable'

  export default {
    name: "ControlPanel",
    components: {
      ProjectTable,
      WorkTypeTable,
      UserTable
    }
  }
</script>

<style scoped>
  .projectInput {
    margin-top: 20px;
  }
  .projectAdd, .workTypeAdd {
    margin-bottom: 20px;
  }
  .bg-error, .project-error, .work-error, .create-error {
    background: #dc354570;
  }
</style>