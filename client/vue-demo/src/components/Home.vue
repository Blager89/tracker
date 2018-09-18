<template>
  <div class="tracker-wrapp">

    <div class="container">
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
                             @click="[trackSidebar=!trackSidebar,showUpdateTrack(t.id),updateTrackData = true]">
                          <span>{{t.task}}</span>

                        </div>
                        <div class="col-1">
                          {{t.hours}}

                        </div>
                        <div class="col-2">
                          <button class="btn btn-danger" @click="deleteTrack(t.id)">delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </vs-tab>
              <vs-tab vs-label="Graphics">
                <div>
                  <graphics></graphics>
                </div>
              </vs-tab>
              <vs-tab v-if="userRole == 'admin'" vs-label="Control panel">
                <vs-tabs>
                  <vs-tab vs-label="Work/Type">
                    <div class="projectInput">
                      <div class="row">
                        <div class="col-6">
                          <div class="projectAdd">
                            <form>
                              <div class="input-group">
                                <input type="text" v-model="projectData.project_title" v-validate="'required'"
                                       :class="{'project-error':errors.first('project_title')}" name="project_title"
                                       id="ppp" class="form-control" placeholder="Project">
                                <div class="input-group-append">

                                  <button v-if="!projectUpdate" class="btn btn-success" type="submit"
                                          @click.prevent="addProject()">Save
                                  </button>
                                  <button v-if="projectUpdate" class="btn btn-warning" type="submit"
                                          @click.prevent="updateProject(currentProjectId)">Update
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div class="col-6">

                          <div class="workTypeAdd">
                            <form>
                              <div class="input-group">
                                <input type="text" v-model="workTypeData.work_title" v-validate="'required'"
                                       :class="{'work-error':errors.first('work_title')}" name="work_title"
                                       class="form-control" placeholder="Work Type">
                                <div class="input-group-append">

                                  <button v-if="!workTypeUpdate" class="btn btn-success" type="submit"
                                          @click.prevent="addWorkType()">Save
                                  </button>
                                  <button v-if="workTypeUpdate" class="btn btn-warning" type="submit"
                                          @click.prevent="updateWorkType(currentWorkTypeId)">Update
                                  </button>

                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="controllPanelWrapp">
                      <div class="row">
                        <div class="col-6">
                          <div class="project" v-for="p in project">
                            <div class="card">
                              <div class="card-block">
                                <div class="row">
                                  <div class="col-10 text-center">
                                    <div class=" updateProject alert alert-warning m-2 p-0"
                                         @click="showCurrentProject(p.id)">{{p.project_title}}
                                    </div>
                                  </div>
                                  <div class="col-2 ">
                                    <!--<button class="btn btn-warning m-2" >Update</button>-->
                                    <button class="btn btn-danger btn-sm m-1" @click="deleteProject(p.id)">Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                        <div class="col-6">

                          <div class="project" v-for="w in work_type">
                            <div class="card">
                              <div class="card-block">
                                <div class="row">
                                  <div class="col-10 text-center">
                                    <div class=" updateProject alert alert-warning m-2 p-0"
                                         @click="showCurrentWorkType(w.id)">{{w.work_title}}
                                    </div>
                                  </div>
                                  <div class="col-2 ">
                                    <!--<button class="btn btn-warning m-2" >Update</button>-->
                                    <button class="btn btn-danger btn-sm m-1" @click="deleteWorkType(w.id)">Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </vs-tab>
                  <vs-tab vs-label="User">
                    <div class="addNewUser">
                      <div class="row ">
                        <div class="col-12">
                          <div class="emailError m-2">
                            <vs-alert v-if="uniqueEmail" title="Error" active="true" color="danger">
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
                    <div class="showUser">
                      <div class="row">
                        <div class="col-12">


                          <b-card no-body class="mb-1 userCard addNewUser" v-for="(u,index) in allUsers" :key="u.id">
                            <b-card-header header-tag="header" class="p-1" role="tab">
                              <div class="row text-center" v-b-toggle="'accordion' + index"
                                   @click="loadCurrentUser(u.id)">
                                <div class="col-2 p-1">{{index+1}}</div>
                                <div class="col-2 p-1">{{u.name}}</div>
                                <div class="col-4 p-1">{{u.email}}</div>
                                <div class="col-2 p-1">{{u.role_title}}</div>
                                <div class="col-2 p-1">
                                  <b-btn variant="danger" @click="deleteUser(u.id)">delete</b-btn>
                                </div>
                              </div>
                            </b-card-header>
                            <b-collapse :id="'accordion' + index" accordion="my-accordion" role="tabpanel">
                              <b-card-body>
                                <div class="card-text">
                                  <form @submit.prevent="validateBeforeUpdate(u.id)">
                                    <div class="form-group text-center">
                                      <input v-validate="'required'"
                                             :class="{'create-error':errors.first('update_user_name')}"
                                             name="update_user_name" type="text" class="form-control d-inline-block"
                                             placeholder="Name" v-model="updateUserData.name">
                                      <input v-validate="'required'"
                                             :class="{'create-error':errors.first('update_user_email')}"
                                             name="update_user_email" type="email" class="form-control d-inline-block"
                                             placeholder="Enter email" v-model="updateUserData.email">
                                      <select v-validate="'required'"
                                              :class="{'create-error':errors.first('update_user_role_id')}"
                                              name="update_user_role_id" class="custom-select mb-2 mr-sm-2 mb-sm-0"
                                              v-model="updateUserData.role_id">
                                        <option value="" disabled>Choose role</option>
                                        <option v-for="role in allRoles" :value="role.id">{{role.role_title}}</option>
                                      </select>
                                      <!--<input v-validate="'required'" :class="{'create-error':errors.first('user_password')}"
                                             type="password" name="update_user_password" class="form-control d-inline-block"
                                             placeholder="Enter password" v-model="updateUserData.password">-->
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
                  </vs-tab>
                  <!--<vs-tab vs-label="user">3</vs-tab>-->
                </vs-tabs>

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

        <vs-alert v-if="updateSuccess" title="Success" active="true" color="success m-1">
          You successfully update track.
        </vs-alert>
        <vs-alert v-if="createSuccess" title="Success" active="true" color="success m-1">
          You successfully create track.
        </vs-alert>


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
  import Slide from 'vue-burger-menu'
  import Graphics from './Graphics'
  import moment from 'moment'


  export default {
    name: 'Home',
    components: {
      Slide,
      Graphics
    },
    data: () => ({
      userRole: '',
      userData: {
        role_id: ''
      },
      updateUserData: {},
      updateUserId: 0,
      formData: {},
      trackSidebar: false,
      updateSidebar: false,
      actives: 3,
      data: [],
      project: [],
      projectData: {},
      work_type: [],
      workTypeData: {},
      sumHours: [],
      allUsers: {},
      allRoles: {},
      result: 0,
      groupDateData: [],
      updateTrackData: false,
      projectUpdate: false,
      workTypeUpdate: false,
      currentProjectId: 0,
      currentWorkTypeId: 0,
      updateSuccess: false,
      createSuccess: false,
      uniqueEmail: false


    }),
    methods: {
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
      validateBeforeCreate(e) {
        this.$validator.validateAll(['user_name', 'user_email', 'user_role_id', 'user_password']).then((result) => {
          if (result) {
            try {
              this.createNewUser();
              this.loadAllUser();
            } catch (e) {
              return next(e);
            }

          }
        }).catch(() => {
          return false
        });
      },
      validateBeforeUpdate(e) {
        this.$validator.validateAll(['update_user_name', 'update_user_email', 'update_user_role_id', 'update_user_password']).then((result) => {
          console.log(this.updateUserId);
          if (result) {
            this.updateUser(this.updateUserId)

          }
        }).catch(() => {
          return false
        });
      },


      clearData() {
        this.formData = {};
      }
      ,
      showUpdateTrack(id) {
        axios({
          method: 'get',
          url: '/api/tracker/' + id,
        }).then(res => {
          this.formData = res.data;
        })
      }
      ,
      checkUser() {
        axios.get('/api/role').then(res => {
          this.userRole = res.data;
        })
      }
      ,
      addTrack() {
        axios({
          method: 'post',
          url: '/api/tracker/create',
          data: this.formData
        }).then(res => {

          this.loadAllTracks();
        })
      }
      ,

      updateTrack(id) {
        axios({
          method: 'put',
          url: '/api/tracker/' + id,
          data: this.formData
        }).then(res => {
          this.loadAllTracks();

        })
      }
      ,
      loadAllTracks() {
        axios({
          method: 'get',
          url: '/api/tracker',
        }).then(res => {
          this.data = res.data;
          this.groupDateData = this.groupData(res.data);

          this.hoursCount(res.data);


        }).catch(error => {
          this.result = 0;
        });
      }
      ,
      addProject() {
        this.$validator.validate('project_title').then((result) => {
          if (result) {
            this.projectData.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
            axios({
              method: 'post',
              url: '/api/project/create',
              data: this.projectData

            }).then(res => {
              this.loadAllProject();
              this.projectData = {};

            });
            return;
          }
        }).catch(() => {
          return false
        });
      }
      ,
      showCurrentProject(id) {
        this.currentProjectId = id;

        axios({
          method: 'get',
          url: '/api/project/' + id,
        }).then(res => {
          this.projectData = res.data;
          this.projectData.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
          this.projectUpdate = true;

        })
      },
      updateProject(id) {
        axios({
          method: 'put',
          url: '/api/project/update/' + id,
          data: this.projectData
        }).then(res => {
          this.projectUpdate = false;
          this.projectData = {};
          this.loadAllProject();
        })
      },
      deleteProject(id) {
        axios({
          method: 'delete',
          url: '/api/project/delete/' + id,

        }).then(res => {
          this.projectUpdate = false;
          this.projectData = {};
          this.loadAllProject();
        });

      }
      ,
      loadAllProject() {
        axios({
          method: 'get',
          url: '/api/project',
        }).then(res => {
          this.project = res.data;
        })
      }
      ,

      /* ------------------------------------------------------------------------------------------------------ */
      loadAllWorkType() {
        axios({
          method: 'get',
          url: '/api/type',
        }).then(res => {
          this.work_type = res.data;
        })
      }
      ,
      addWorkType() {
        this.$validator.validate('work_title').then((result) => {
          if (result) {
            this.workTypeData.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
            axios({
              method: 'post',
              url: '/api/type/create',
              data: this.workTypeData

            }).then(res => {
              this.loadAllWorkType();
              this.workTypeData = {};

            });
            return;
          }
        }).catch(() => {
          return false
        });
      }
      ,
      showCurrentWorkType(id) {
        this.currentWorkTypeId = id;

        axios({
          method: 'get',
          url: '/api/type/' + id,
        }).then(res => {
          this.workTypeData = res.data;
          this.workTypeData.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
          this.workTypeUpdate = true;

        })
      }
      ,
      updateWorkType(id) {
        axios({
          method: 'put',
          url: '/api/type/update/' + id,
          data: this.workTypeData
        }).then(res => {
          this.workTypeUpdate = false;
          this.workTypeData = {};
          this.loadAllWorkType();
        })
      }
      ,
      deleteWorkType(id) {
        axios({
          method: 'delete',
          url: '/api/type/delete/' + id,

        }).then(res => {
          this.workTypeUpdate = false;
          this.workTypeData = {};
          this.loadAllWorkType();
        });

      }
      ,

      deleteTrack(id) {
        axios({
          method: 'delete',
          url: '/api/tracker/delete/' + id
        }).then(res => {
          this.loadAllTracks();
        }).catch(error => {
          console.log(error.response);
        });
      }
      ,
      loadAllUser() {
        axios({
          method: 'get',
          url: '/api/user'
        }).then(res => {
          this.allUsers = res.data;
        })
      },
      loadCurrentUser(id) {
        axios({
          method: 'get',
          url: '/api/user/' + id
        }).then(res => {
          this.updateUserData = res.data;
          this.updateUserId = id;
        })
      },
      createNewUser() {
        axios({
          method: 'post',
          url: '/api/user/create/',
          data: this.userData
        }).then(res => {
          this.uniqueEmail = false;
          this.userData = {
            role_id: ''
          };
          this.loadAllUser();
        }).catch(error => {
          if (error.response.data.errors.email) {
            this.uniqueEmail = true;
          }

        })
      },
      updateUser(id) {
        axios({
          method: 'put',
          url: '/api/user/update/' + id,
          data: this.updateUserData
        }).then(res => {
          this.loadAllUser();
        })
      },
      deleteUser(id) {
        axios({
          method: 'delete',
          url: '/api/user/delete/' + id,
        }).then(res => {
          this.loadAllUser();
        })
      },
      loadAllRoles() {
        axios({
          method: 'get',
          url: '/api/role/all'
        }).then(res => {
          this.allRoles = res.data
        });
      },
      time(time) {
        return this.formData.date = moment(time).format("YYYY-MM-DD");

      }
      ,
      hoursCount(hours) {
        this.sumHours = [];
        for (let i = 0; i < hours.length; i++) {
          this.sumHours.push(hours[i].hours);
        }
        return this.result = this.sumHours.reduce((a, b) => +a + +b);
      }
      ,
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
      this.loadAllUser();
      this.loadAllRoles();

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

  .track_info {
    margin: 10px;
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

  .updateButton {
    position: absolute;
    top: 60px;
  }

  .bg-error, .project-error, .work-error, .create-error {
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

  .projectInput {
    margin-top: 20px;

  }

  .controllPanelWrapp {

  }

  .projectAdd, .workTypeAdd {
    margin-bottom: 20px;
  }

  .updateProject:hover {
    cursor: pointer;
    background-color: rgb(0, 183, 255);

  }

  .addNewUser input, .addNewUser select {
    width: 23%;
    display: inline-block;
  }

  .addNewUser button {
    display: inline-block;
  }

  .userCard {
    cursor: pointer;
  }

  .userCard:hover {
    background-color: #fbfbfb;
  }


</style>
