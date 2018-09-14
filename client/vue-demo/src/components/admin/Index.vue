<template>
  <div class="row">
       <div class="col-2">
         <div id="sidebar">
           <sidebar></sidebar>
         </div>
       </div>
       <div class="col-10">
         <div id="content">
           <router-view></router-view>
         </div>
       </div>
     </div>
</template>

<script>
  import Sidebar from './Sidebar';
  export default {
    name: "index",
    components: {
      Sidebar

    },
    data() {
      return{

      }
    }
  }
</script>

<style scoped>

</style>