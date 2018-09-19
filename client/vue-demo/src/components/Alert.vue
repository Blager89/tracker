<template>
  <div>
    <vs-alert title="Success" active="true" color="success m-1">
      You successfully {{message}} track.
    </vs-alert>
  </div>
</template>

<script>

  export default {
    name: "Alert",
    props: [
      'successUpdate',
    ],
    data() {
      return{
        message: ''
      }
    },
    mounted() {
      if (this.successUpdate) {
        this.message = 'update'
      }else{
        this.message = 'create'

      }
    },


  }
</script>

<style scoped>

</style>