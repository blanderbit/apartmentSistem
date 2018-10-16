<template>
  <div id="app">
      <div class="side">
          <ion-icon @click="scrollTo('+')" v-show="down" name="arrow-down"></ion-icon>
          <ion-icon @click="scrollTo('-')" v-show="up" name="arrow-up"></ion-icon>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  Vue.config.silent = true
  Vue.config.errorHandler = function (err, vm, info) {
    if (err.indexOf('ion-icon') === -1) {
      console.log('');
    }
  }

  Vue.config.warnHandler = function (msg, vm, trace) {
    // if (msg.indexOf('ion-icon') === -1) {
      console.log();
    // }
  }

export default {
  name: 'app',
  data () {
      return {
          up: false,
          down:true,
          step: 100,
      }
  },
  methods:{
      scrollTo:function (simvol) {
          let simvols = simvol;
          let scroll = document.body.scrollHeight;
          let pix = window.pageYOffset;
          let steps = this.step;
          requestAnimationFrame(to);
          function to(){
              if(simvols == '+'){
                  pix = pix + steps;
                  window.scrollTo(0,pix);
                  if(pix < scroll){
                     requestAnimationFrame(to);
                  }
              } else {
                  pix = pix - steps;
                  window.scrollTo(0,pix);
                  if(pix > 0){
                      requestAnimationFrame(to);
                  }
              }
          }
      },
      scroller:function(){
          let scroll = window.pageYOffset;
          scroll > 0?this.up = true:this.up = false;
          scroll > this.downYpage? this.down = false:this.down = true;
      },
  },
  created(){
      let locations = location.pathname.split("/")[1]
      let arr = this.$router.options.routes
      for(let i = 0; i < arr.length; i++){
          let path = arr[i].path.split('/')
          if(arr.length > 2){
              if(path[1] == locations){
                  this.$router.push({name:path[1],params:{id:path[2]}})
              }
              if(i == arr.length -1 && path[1] != locations){
                  this.$router.push({name:'catalogs'});
              }
          } else {
              if(path[1] == locations){
                  this.$router.push({name:path[1]})
              }
              if(i == arr.length -1 && path[1] != locations){
                  this.$router.push({name:'catalogs'});
              }
          }
      }
  },
  mounted(){
      window.addEventListener('wheel',this.scroller);
      window.addEventListener('scroll',this.scroller);
  },
}
</script>

<style lang="scss">
body, html{
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
.side{
  position: fixed;
  right: 0;
  top:45%;
  display: flex;
  z-index: 1000;
  flex-direction: column-reverse;
}
.side ion-icon {
  padding: 10px;
  border: 1px solid white;
  color: black;
  border-radius: 50%;
  cursor: pointer;
  background: pink;
  opacity: 0.6;
}
.side ion-icon:hover{
  border: 1px solid black;
  color: deeppink;
  background: white;
  /*opacity: 1;*/
}
body::-webkit-scrollbar{
  width: 5px;
  background: url("/src/assets/scroll.png");
}
body::-webkit-scrollbar-thumb{
  width: 5px;
  background: lightblue;
  border-radius: 10px;
  height: 1px;
}
</style>
