<template>
  <div class="tracker-wrapp">
    <div class="container">
      <tracker-info
          v-bind:data="data"
          v-bind:result="result"
      ></tracker-info>
    </div>

    <div class="cont">
      <div class="container">
        <div class="admin-nav">
          <vs-tabs vs-color="#000">
            <div>
              <vs-tab vs-label="Tracks">
                <div class="row text-center">
                  <div class="col-2">
                    work type
                  </div>
                  <div class="col-1">
                    name
                  </div>
                  <div class="col-2">
                    project
                  </div>
                  <div class="col-4">
                    task
                  </div>
                  <div class="col-1">
                    hours
                  </div>
                  <div class="col-2">
                    active
                  </div>
                </div>
                <track-list
                    v-bind:groupDateData="groupDateData"

                    v-on:showUpdateTrack="showUpdateTrack($event)"
                    v-on:deleteTrack="deleteTrack($event)"
                    v-on:up="up($event)"
                ></track-list>
              </vs-tab>
              <vs-tab vs-label="Graphics">
                <div>
                  <graphics></graphics>
                </div>
              </vs-tab>
              <vs-tab v-if="userRole == 'admin'" vs-label="Control panel">
                <control-panel></control-panel>
              </vs-tab>
            </div>
          </vs-tabs>
        </div>
      </div>
    </div>
    <div id="parentx" class="sidebar">
      <vs-button @click="[trackSidebar=!trackSidebar,updateTrackData =false, clearData()]" vs-type="filled" class="p-3">
        +
      </vs-button>

      <vs-sidebar :vs-active.sync="trackSidebar" vs-pos="right">

        <h2 class="text-center">Add new track</h2>

        <alert-message
            v-if="updateSuccess || createSuccess"
            v-bind:successUpdate="updateSuccess"
        ></alert-message>


        <form class="p-4" @submit.prevent="validateBeforeSubmit">
          <div class="form-group">
            <small>Project</small>
            <select v-validate="'required'" :class="{'bg-error':errors.first('project_id')}" name="project_id"
                    class="custom-select mb-2 mr-sm-2 mb-sm-0" v-model="formData.project_id">

              <option v-for="p in project" :value="p.id">{{p.project_title}}</option>
            </select>
          </div>
          <div class="form-group">
            <small>Task</small>
            <textarea v-validate="'required'" :class="{'bg-error':errors.first('task')}" name="task" class="w-100"
                      rows="5" v-model="formData.task"></textarea>
          </div>
          <div class="form-group">
            <small>Work type</small>
            <select v-validate="'required'" :class="{'bg-error':errors.first('work_type_id')}" name="work_type_id"
                    class="custom-select mb-2 mr-sm-2 mb-sm-0" v-model="formData.work_type_id">

              <option v-for="type in work_type" :value="type.id">{{type.work_title}}</option>
            </select>
          </div>
          <div class="form-group">
            <small>Hours</small>
            <input v-validate="'required'" :class="{'bg-error':errors.first('hours')}" name="hours" class="form-control"
                   type="number" v-model="formData.hours">
          </div>
          <div class="form-group">
            <small>Date</small>
            <input class="form-control" type="date" :change="time(formData.date)" v-model="formData.date">
          </div>
          <button v-if="!updateTrackData" type="submit" class="btn btn-primary">Save</button>
          <button v-if="updateTrackData" type="submit" class="btn btn-warning">Update</button>
        </form>
      </vs-sidebar>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  import Graphics from '../Graphics'
  import TrackerInfo from '../tracks/TracerInfo'
  import TrackList from '../tracks/TrackList'
  import ControlPanel from '../controlPanel/ControlPanel'
  import AlertMessage from './../Alert'
  import moment from 'moment'

  export default {
    name: 'Home',
    components: {
      Graphics,
      ControlPanel,
      TrackerInfo,
      TrackList,
      AlertMessage
    },
    data: () => ({
      userRole: '',
      formData: {},
      trackSidebar: false,
      updateSidebar: false,
      data: [],
      project: [], //control panel
      work_type: [], //control panel
      sumHours: [],
      result: 0,
      groupDateData: [],
      updateTrackData: false,
      updateSuccess: false,
      createSuccess: false,


    }),
    methods: {
      /*----------------------------------load all ----------------------------*/
      loadAllProject() {
        axios({
          method: 'get',
          url: '/api/project',
        }).then(res => {
          this.project = res.data;
        })
      },
      loadAllWorkType() {
        axios({
          method: 'get',
          url: '/api/type',
        }).then(res => {
          this.work_type = res.data;
        })
      },
      /*--------------------------------------------------------------*/

      validateBeforeSubmit(e) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            if (!this.updateTrackData) {
              try {
                this.addTrack();
                this.createSuccess = true;

                setTimeout(() => {
                  this.createSuccess = false;

                }, 3000)
              } catch (e) {
                return false
              }

            } else {
              try {
                this.updateTrack(this.formData.id);
                this.updateSuccess = true;
                setTimeout(() => {
                  this.updateSuccess = false;

                }, 3000)
              } catch (e) {
                return false
              }

            }
            return;
          }
        }).catch(() => {
          return false
        });
      },
      up(data) {
        this.trackSidebar = data.trackSidebar;
        this.updateTrackData = data.updateTrackData;
      },
      clearData() {
        this.formData = {};
      },
      showUpdateTrack(id) {
        axios({
          method: 'get',
          url: '/api/tracker/' + id,
        }).then(res => {
          this.formData = res.data;
        })
      },
      checkUser() {
        axios.get('/api/role').then(res => {
          this.userRole = res.data;
        })
      },
      addTrack() {
        axios({
          method: 'post',
          url: '/api/tracker/create',
          data: this.formData
        }).then(() => {

          this.loadAllTracks();
        })
      },
      updateTrack(id) {
        axios({
          method: 'put',
          url: '/api/tracker/' + id,
          data: this.formData
        }).then(() => {
          this.loadAllTracks();

        })
      },
      loadAllTracks() {
        axios({
          method: 'get',
          url: '/api/tracker',
        }).then(res => {
          this.data = res.data;
          this.groupDateData = this.groupData(res.data);
          this.hoursCount(res.data);
        }).catch(() => {
          this.result = 0;
        });
      },
      deleteTrack(id) {
        axios({
          method: 'delete',
          url: '/api/tracker/delete/' + id
        }).then(() => {
          this.loadAllTracks();
        }).catch(error => {
          console.log(error.response);
        });
      },
      time(time) {
        return this.formData.date = moment(time).format("YYYY-MM-DD");

      },
      hoursCount(hours) {
        this.sumHours = [];
        for (let i = 0; i < hours.length; i++) {
          this.sumHours.push(hours[i].hours);
        }
        return this.result = this.sumHours.reduce((a, b) => +a + +b);
      },
      groupData(obj) {
        const arr = {};
        let resArr = [];
        for (let i = 0; i < obj.length; i++) {
          if (!arr[obj[i].date]) {
            arr[obj[i].date] = [];
          }
          arr[obj[i].date].push(obj[i]);
        }
        for (let key in arr) {
          resArr.push({
            date: key, tasks: arr[key]
          })
        }
        return resArr;
      }
    },
    mounted() {
      this.checkUser();
      this.loadAllProject();
      this.time();
      this.loadAllTracks();
      this.loadAllWorkType();
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tracker-info {
    margin-bottom: 40px;
  }

  .tracker-wrapp {
    margin-top: 10px;
  }

  .tracker-wrapp .track .card {
    min-height: 50px;
    margin: 2px 0 10px 0;

  }

  .tracker-wrapp .track .card-block {
    padding: 13px;
  }

  .track .alert {
    padding: 8px;
    margin: 0;
  }

  .sidebar {
    position: absolute;
    top: 40%;
    right: 1%;

  }

  .bg-error {
    background: #dc354570;
  }

  .track_update {
    cursor: pointer;

  }

  .track_update:hover {
    color: rgb(0, 183, 255);
  }

  .project .card {
    margin: 0px 0 10px 0;
  }

  .addNewUser input, .addNewUser select {
    width: 23%;
    display: inline-block;
  }

  .addNewUser button {
    display: inline-block;
  }


</style>
