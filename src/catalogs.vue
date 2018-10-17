<template>
   <div id="catalogMain">
       <modalForm @reverseModalClose="changeActive($event)"
                  @reloadPosts="reloadPosts($event)"

                  :style="{display:container == true?'flex':'none'}">
       </modalForm>
       <myHead @activeFormModal="changeActive($event)"></myHead>
       <myMain :activeReloadPosts="reloads" ></myMain>
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
      },
      created(){
        localStorage.setItem('path','Office')
      },
      mounted(){
        window.addEventListener('wheel',this.scroller);
        window.addEventListener('scroll',this.scroller);
      },
      beforeDestroy(){
        window.removeEventListener('wheel',this.scroller);
        window.removeEventListener('scroll',this.scroller);
      },
      components:{
          myFoot:footer,
          myHead:header,
          myMain:main,
          modalForm:modalForm,
      }
  }
</script>
<style>
  .buttonFilters{
    transition: all 0.5s;
    left:10%;top: 100px
  }

</style>
