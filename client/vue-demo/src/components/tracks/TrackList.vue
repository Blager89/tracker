<template>
  <div>
  <div class="track " v-for="d in groupDateData">
    <div class="row">
      <div class="col-auto">
        <div class="alert alert-info text-center" role="alert">
          {{d.date | formatDate}}
        </div>
      </div>
    </div>
    <div class="card " v-for="t in d.tasks">
      <div class="card-block text-center">
        <div class="row">
          <div class="col-2">
            <div class="alert alert-warning uppercase">
              {{t.work_title}}
            </div>

          </div>
          <div class="col-1">
            {{t.name}}

          </div>
          <div class="col-2">
            <span>{{t.project_title}}</span>

          </div>
          <div class="col-4 track_update"
               @click="[updateSidebar(),$emit('showUpdateTrack',t.id),$emit('up',{trackSidebar,updateTrackData})]">
            <span>{{t.task}}</span>

          </div>
          <div class="col-1">
            {{t.hours}}

          </div>
          <div class="col-2">
            <button class="btn btn-danger" @click="$emit('deleteTrack',t.id)">delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: "TrackList",
    props: [
      'groupDateData'
    ],
    data() {
      return{
        trackSidebar: false,
        updateTrackData: false
      }
    },
    methods: {
      updateSidebar(){
        this.updateTrackData = true;
        this.trackSidebar=true
      }
    }
  }
</script>

<style scoped>
  .track .card{
    margin: 2px 0 5px 0;
  }
  .track .card-block {
    padding: 13px;
  }
  .track .alert {
    padding: 8px;
    margin: 0;
  }
  .track_update {
    cursor: pointer;

  }
  .track_update:hover {
    color: rgb(0, 183, 255);
  }
</style>