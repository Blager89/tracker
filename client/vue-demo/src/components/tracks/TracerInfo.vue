<template>
  <div class="tracker-info">
    <div class="card">
      <div class="card-block text-center">
        <div class="row">
          <div class="col-6">
            <h2 class="text-success">{{data.length}}</h2>
            <small class="form-text text-muted">Tracks</small>
          </div>
          <div class="col-6">
            <h2 class="text-success">{{result}}</h2>
            <small class="form-text text-muted">Hours</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TracerInfo",
    props:[
      'data',
      'result'
    ]
  }
</script>

<style scoped>

</style>