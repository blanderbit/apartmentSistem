<template>
   <div id="app">
       <modalForm @reverseModalClose="changeActive($event)" :style="{display:container == true?'flex':'none'}"></modalForm>
       <myHead></myHead>
       <navbar></navbar>
       <myMain @activeDoneFormModal="changeActive($event)" ></myMain>
      <myFoot></myFoot>
   </div>
</template>
<style>

</style>
<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import  footer from './work/footer.vue'
  import  header from './work/header.vue'
  import  navbar from './work/navbar.vue'
  import  main from './work/main.vue'
  import  modalForm from './modal/formModal.vue'
  Vue.use(VueRouter)
  export default {
      name: 'app',
      data () {
          return {
              container: false
          }
      },
      methods:{
          changeActive(value){
               this.container = value
          },
      },
      created(){
        localStorage.setItem('path','Office')
      },
      components:{
          myFoot:footer,
          myHead:header,
          navbar:navbar,
          myMain:main,
          modalForm:modalForm,
      }
  }
</script>
