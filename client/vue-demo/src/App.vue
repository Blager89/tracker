<template>
  <div id="app">
    <div id="navbar">
      <navbar></navbar>
    </div>
    <div class="container-fluid">
      <div id="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'


  export default {
    name: 'App',
    components: {
      Navbar,
    },

  }
</script>

<style>
  body{
    background-color: #f6f6f6;
  }
  #navbar {
    /*height: 50px;*/
    background-color: rgba(255,255,255,0.9);
  }

  #sidebar {
    background-color: #123;
  }
  #content{

  }
</style>
