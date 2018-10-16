<template>
   <div id="app">
       <modalForm @reverseModalClose="changeActive($event)"
                  @reloadPosts="reloadPosts($event)"

                  :style="{display:container == true?'flex':'none'}">
       </modalForm>
       <myHead></myHead>
       <!--<navbar></navbar>-->
       <myMain :activeReloadPosts="reloads" @activeDoneFormModal="changeActive($event)" ></myMain>
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
              container: false,
              reloads:null,
              count:1
          }
      },
      methods:{
          changeActive(value){
               this.container = value
          },
          reloadPosts(value){
               this.count++
               this.reloads = 'activeReloadPosts' + this.count
          },
          scroller(){
              let elem = document.querySelector('.md-toolbar')
              let style = elem.getBoundingClientRect().bottom
              let page = window.pageYOffset
              if(page > style){
                elem.style.padding = 5 + 'px'
              } else {
                elem.style.padding = 20 + 'px'
              }
          }
      },
      created(){
        localStorage.setItem('path','Office')
      },
      mounted(){
        window.addEventListener('wheel',this.scroller);
        window.addEventListener('scroll',this.scroller);

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
