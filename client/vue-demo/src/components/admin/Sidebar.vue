<template>
  <div>
    <div class="sidebar-nav">
      <ul>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/admin/tracks">Tracks</router-link></li>
        <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
        <li><router-link to="/admin/project">Project</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "Sidebar",
    data() {
      return {};
    },
    methods:{
    }
  }
</script>

<style scoped>

</style>