<template>
  <aside>
    <div class="asideContainer">
      <div class="resultSearch">
      </div>
      <div class="title" v-if="closes">
        <ion-icon name="close" @click="close()"></ion-icon>
        <ion-icon name="cube"></ion-icon>
        <p>Свободные комнаты на любой вкус</p>
      </div>
      <div class="asideSearch">
        <form action="" class="search">
          <input type="search" placeholder="Search apartments" class="input" />
          <input type="submit"  value="" class="submit" />
        </form>
      </div>
      <div class="searchStar">
        <div class="containerSearch" v-for="stars in star">
          <input type="checkbox"/>
          <div>
            <ion-icon v-for="star in stars.one" name="star"></ion-icon>
            <ion-icon v-for="star in stars.two" name="star-outline"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
  export default {
    data(){
      return{
        star:[
          {
            one:5,
            two:0
          },
          {
            one:4,
            two:1
          },
          {
            one:3,
            two:2
          },
          {
            one:2,
            two:3
          },
          {
            one:1,
            two:4
          },
        ],
          closes:true
      }
    },
      methods:{
          close:function(){
              this.closes = false;
          }
      }
  }
</script>

<style lang="scss">
  aside{
      width: 25%;
      padding: 20px;
  }
  aside{
      .asideContainer{
          width: 100%;
      }
    .asideContainer{

      .title{
        position: relative;
        padding: 10px;
        width: 100%;
        background: slateblue;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white
      }
        .title{
            ion-icon[name="cube"]{
                color: yellow;
            }
            ion-icon[name="close"]{
                position: absolute;
                right: 5px;
                top:5px;
                cursor: pointer;
            }
        }
          .asideSearch{
            width: 100%;
            background: white;
            padding: 10px;
          }
        .asideSearch{
            .search{
                position: relative;
            }
            .search .input {
                width: 100%;
                height: 20%;
                padding: 8px 37px 9px 15px;
                -moz-box-sizing: border-box;
                border-radius: 20px;
                font: 13px Tahoma, Arial, sans-serif;
                border:1px solid grey;
                color: #555;
                outline: none;
                padding-left: 50px;
            }
            .search .input:focus {
                box-shadow: inset 0 0 5px rgba(0,0,0,0.2), inset 0 1px 2px rgba(0,0,0,0.4);
                background: #E8E8E8;
                color: #333;
            }
            .search .submit {
                position: absolute;
                top:0;
                width: 37px;
                height: 100%;
                cursor: pointer;
                background: url(https://lh4.googleusercontent.com/-b-5aBxcxarY/UAfFW9lVyjI/AAAAAAAABUg/gQtEXuPuIds/s13/go.png) 50% no-repeat;
                border:none
            }
        }
        .searchStar{
            width: 100%;
            padding: 10px;
            background: white;
            border-top: 1px solid grey;
        }
        .searchStar{
            .containerSearch{
                display: flex;
                padding: 10px;
            }
            .containerSearch ion-icon[name="star"]{
                color:deeppink;
            }
        }

    }
}


  @media screen and (max-width: 900px){
    aside{
      display: none;
    }
  }
</style>
