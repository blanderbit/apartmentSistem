<template>
  <div id="list" @resize="hendleResize($event)">
    <div class="m-container">
      <ion-icon name="menu" class="icon pointer" @click="open"></ion-icon>
      <ul class="listsMenu">
        <li v-for="list in lists">
          <a href="#" @click.prevent="to('main')" :class="{activeLiNav:active('main')}">
            {{list}}
          </a>
        </li>
      </ul>
      <div class="icon two-icon"></div>
    </div>
  </div>
</template>
<style leng="sass">
  .pointer{
    cursor:pointer
  }
  #list{
    width: 100vw;
    border-bottom: 1px solid lightgray;
    border-top: 1px solid lightgray;
    padding: 0px;
    margin:0px;
    background: white;
    display: flex;
    justify-content: center;
  }
  .m-container{
    position: relative;
    width: 1200px;
    display: flex;
    margin-bottom: -1px;
    margin-top: -2px;
    transition: all 1.2s;
    box-sizing: border-box;
  }
  .listsMenu{
    top: 50px;
    z-index: 1000;
    padding: 0px;
    margin:0px;
    transition: all 0.4s;
    display: flex;
  }
  .listsMenu > li{
    list-style: none;
    padding: 20px;
  }
  .listsMenu  a{
    padding: 20px;
    color:hotpink;
    text-decoration: none;
    transition-property: background, color;
    transition-duration: 1s;
    transition-timing-function: ease;
  }
  .listsMenu  a:hover{
    background: hotpink;
    color:white;
  }
  .listsMenu .activeLiNav{
    background: hotpink;
    color:white;
  }
  .clear{
    clear: both;
  }
  .icon{
    font-size: 40px;
    position: relative;
    margin: 10px;
    display: none;
    transition: all 1.2s;
  }
  @media screen and (max-width: 720px){
    .listsMenu{
      position: absolute;
      text-align: left;
      flex-direction: column;
      background: white;
      width: 100%;
      left:-100%;
      border-bottom: 1px solid lightgray;
    }
    .icon{
      display:block
    }
    .two-icon{
      position: absolute;
      right: 0px;
      top:0px;
    }
    .listsMenu  a:hover{
      background: hotpink;
      color:white;
    }
    .listsMenu  a {
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
      display: inline-block;
    }
    .listsMenu li{
      padding: 0;
    }
}
</style>
<script>
  export default{
    data(){
      return{
        pathTo:localStorage.getItem('path'),
        lists:['Aviabileti', 'jd bileti', 'avtobus', 'komnati', 'oteli','transport', 'tour']
      }
    },
    methods:{
      open:function(){
        if(window.innerWidth < 720) {
          let target = event.target
          let elem = event.target.nextElementSibling
          let style = getComputedStyle(elem).left
          let position = style.indexOf('p')
          let number = style.substr(0, position)
          if (number < 0) {
            target.style.transform = 'rotate(90deg)'
            elem.style.left = '0px'
          }
          else {
            target.style.transform = 'rotate(180deg)'
            elem.style.left = '-725px'
          }
        }
      },
      active:function(value){
        return this.pathTo == value?true:false
      },
      hendleResize:function(){
        let elem = document.querySelector('.listsMenu')
        if(window.innerWidth > 720){
          elem.style.display = 'flex'
          elem.style.borderBottom = 'none'
        }
        else{
          elem.style.borderBottom = '1px solid lightgray'
        }
      },
      to:function(name){
        this.$router.push({name:name})
      },
    },
    mounted(){
      window.addEventListener('resize',this.hendleResize)
    },
    beforeDestroy(){

    }
  }
  </script>
