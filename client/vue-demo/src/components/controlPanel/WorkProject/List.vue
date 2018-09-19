<template>
  <div class="list">
    <div class="project" v-for="d in data">
      <div class="card">
        <div class="card-block">
          <div class="row">
            <div class="col-10 text-center">
              <div class=" updateProject alert alert-warning m-2 p-0"
                   @click="$emit('currentData',d.id)">{{d[name + '_title']}}
              </div>
            </div>
            <div class="col-2 ">
              <button class="btn btn-danger btn-sm m-1"
                      @click="$emit('delete',d.id)"
              >Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "List",
    props: [
      'data',
      'name'
    ],
  }
</script>

<style scoped>
.list .alert:hover{
  cursor: pointer;
  background-color: rgb(0, 183, 255);
}
</style>