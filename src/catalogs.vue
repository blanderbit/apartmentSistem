<template>
  <div id="app">
    <myHead></myHead>
    <navbar></navbar>
    <myMain></myMain>
    <myFoot></myFoot>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  import  footer from './work/footer.vue'
  import  header from './work/header.vue'
  import  navbar from './work/navbar.vue'
  import  main from './work/main.vue'
  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created(){
      // this.$router.push({name:'main'})
    },
    components:{
      myFoot:footer,
      myHead:header,
      navbar:navbar,
      myMain:main
    }
  }
</script>

<style lang="scss">
  body, html{
    margin: 0;
    padding: 0;
  }
</style>
